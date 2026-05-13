'use client'

import { useEffect, useState } from 'react'
import { AIAssistant } from './AIAssistant'
import { aiConfig } from '@/lib/ai/config'
import {
  DEFAULT_FRANK_ASSISTANT_NAME,
  DEFAULT_FRANK_GREETING,
} from '@/lib/ai/frank-defaults'
import type { FrankAssistantPublicConfig } from '@/lib/ai/frank-config'

export function AIAssistantWrapper() {
  const [config, setConfig] = useState<FrankAssistantPublicConfig | null>(null)

  useEffect(() => {
    if (!aiConfig.enableAI) {
      return
    }

    let cancelled = false

    const loadConfig = async () => {
      try {
        const response = await fetch('/api/ai/frank-config', {
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error('Failed to load Frank config')
        }

        const data = (await response.json()) as FrankAssistantPublicConfig

        if (!cancelled) {
          setConfig({
            enabled: data.enabled,
            assistantName: data.assistantName || DEFAULT_FRANK_ASSISTANT_NAME,
            greeting: data.greeting || DEFAULT_FRANK_GREETING,
          })
        }
      } catch {
        if (!cancelled) {
          setConfig({
            enabled: true,
            assistantName: DEFAULT_FRANK_ASSISTANT_NAME,
            greeting: DEFAULT_FRANK_GREETING,
          })
        }
      }
    }

    void loadConfig()

    return () => {
      cancelled = true
    }
  }, [])

  if (!aiConfig.enableAI || !config) {
    return null
  }

  if (!config.enabled) {
    return null
  }

  return (
    <AIAssistant
      assistantName={config.assistantName}
      greeting={config.greeting}
    />
  )
}
