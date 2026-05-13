'use client'

import { FormEvent, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { profile } from '@/data/site/profile'
import { services } from '@/data/site/services'
import { portfolio } from '@/data/site/portfolio'
import type { FrankAssistantConfig } from '@/lib/ai/frank-config'

interface FrankConfigFormProps {
  initialConfig: FrankAssistantConfig
}

function formatTimestamp(timestamp?: string) {
  if (!timestamp) {
    return 'just now'
  }

  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) {
    return timestamp
  }

  return date.toISOString()
}

function compilePreview(config: FrankAssistantConfig) {
  const rendered = (config.systemPrompt || '')
    .replaceAll('{profile}', JSON.stringify(profile, null, 2))
    .replaceAll('{services}', JSON.stringify(services, null, 2))
    .replaceAll('{portfolio}', JSON.stringify(portfolio, null, 2))
    .replaceAll('{persona}', config.persona || '')

  return `${rendered}\n\n${config.assistantRules || ''}`.trim()
}

export function FrankConfigForm({ initialConfig }: FrankConfigFormProps) {
  const [config, setConfig] = useState(initialConfig)
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const updateField = <K extends keyof FrankAssistantConfig>(
    key: K,
    value: FrankAssistantConfig[K]
  ) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const submitConfig = async (method: 'PUT' | 'DELETE') => {
    setIsSaving(true)
    setStatus(null)
    setError(null)

    try {
      const response = await fetch('/api/admin/frank-config', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body:
          method === 'PUT'
            ? JSON.stringify({
                enabled: config.enabled,
                assistantName: config.assistantName,
                greeting: config.greeting,
                systemPrompt: config.systemPrompt,
                persona: config.persona,
                assistantRules: config.assistantRules,
              })
            : undefined,
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to save Frank settings')
      }

      const nextConfig = payload as FrankAssistantConfig
      setConfig(nextConfig)
      setStatus(
        method === 'DELETE'
          ? 'Frank settings reset to defaults.'
          : 'Frank settings saved.'
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save Frank settings')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await submitConfig('PUT')
  }

  const preview = compilePreview(config)
  const sourceLabel = config.configSource === 'database'
    ? 'Database'
    : config.configSource === 'local_fallback'
      ? 'Local fallback'
      : 'Defaults'

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Frank
            </p>
            <h2 className="mt-2 text-2xl font-bold text-dark">Assistant settings</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Edit the public name and greeting, then tune the prompt, persona, and
              response rules that Frank uses at runtime.
            </p>
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(event) => updateField('enabled', event.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            Enabled
          </label>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
          <span className="font-medium text-dark">Config source:</span> {sourceLabel}
        </div>

        {status && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            {status}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Assistant name"
              value={config.assistantName}
              onChange={(event) => updateField('assistantName', event.target.value)}
              placeholder="Frank"
              maxLength={120}
            />
            <Input
              label="Greeting"
              value={config.greeting}
              onChange={(event) => updateField('greeting', event.target.value)}
              placeholder="Hi, I'm Frank..."
              maxLength={500}
            />
          </div>

          <Textarea
            label="Persona"
            value={config.persona}
            onChange={(event) => updateField('persona', event.target.value)}
            rows={8}
            placeholder="Describe the tone and character Frank should use..."
          />

          <Textarea
            label="System prompt template"
            value={config.systemPrompt}
            onChange={(event) => updateField('systemPrompt', event.target.value)}
            rows={16}
            placeholder="Core instructions for Frank"
          />
          <p className="-mt-3 text-xs text-gray-500">
            Use <code className="rounded bg-gray-100 px-1 py-0.5">{`{persona}`}</code>{' '}
            where you want the persona block injected into the system prompt.
          </p>

          <Textarea
            label="Assistant rules"
            value={config.assistantRules}
            onChange={(event) => updateField('assistantRules', event.target.value)}
            rows={10}
            placeholder="Operational rules, safety boundaries, and response constraints"
          />

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Prompt preview
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  This is the prompt Frank will receive after placeholders are resolved.
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Updated {formatTimestamp(config.updatedAt)}
              </p>
            </div>
            <pre className="mt-4 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-xl bg-white p-4 text-xs leading-6 text-gray-700">
              {preview}
            </pre>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              onClick={() => void submitConfig('DELETE')}
            >
              Reset to defaults
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
