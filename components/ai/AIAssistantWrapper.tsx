'use client'

import { AIAssistant } from './AIAssistant'
import { aiConfig } from '@/lib/ai/config'

export function AIAssistantWrapper() {
  if (!aiConfig.enableAI) {
    return null
  }

  return <AIAssistant />
}