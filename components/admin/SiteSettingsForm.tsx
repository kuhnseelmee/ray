'use client'

import { FormEvent, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import type { SiteSettings } from '@/lib/site-settings'

interface SiteSettingsFormProps {
  initialConfig: SiteSettings
}

function normalizeConfig(config: SiteSettings): SiteSettings {
  return {
    ...config,
    siteName: config.siteName || '',
    headerBrandText: config.headerBrandText || '',
    headerLogoUrl: config.headerLogoUrl || '',
    contactEmail: config.contactEmail || '',
    contactPhone: config.contactPhone || '',
    locationLabel: config.locationLabel || '',
    githubUrl: config.githubUrl || '',
    linkedinUrl: config.linkedinUrl || '',
    theme: config.theme === 'dark' ? 'dark' : 'light',
    heroCtaLabel: config.heroCtaLabel || '',
    heroCtaHref: config.heroCtaHref || '',
    footerTagline: config.footerTagline || '',
    configSource: config.configSource === 'database' ? 'database' : 'defaults',
  }
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

export function SiteSettingsForm({ initialConfig }: SiteSettingsFormProps) {
  const [config, setConfig] = useState(() => normalizeConfig(initialConfig))
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const updateField = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const submitConfig = async (method: 'PUT' | 'DELETE') => {
    setIsSaving(true)
    setStatus(null)
    setError(null)

    try {
      const response = await fetch('/api/admin/site-settings', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body:
          method === 'PUT'
            ? JSON.stringify({
                siteName: config.siteName,
                headerBrandText: config.headerBrandText,
                headerLogoUrl: config.headerLogoUrl,
                contactEmail: config.contactEmail,
                contactPhone: config.contactPhone,
                locationLabel: config.locationLabel,
                githubUrl: config.githubUrl,
                linkedinUrl: config.linkedinUrl,
                theme: config.theme,
                heroCtaLabel: config.heroCtaLabel,
                heroCtaHref: config.heroCtaHref,
                footerTagline: config.footerTagline,
              })
            : undefined,
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to save site settings')
      }

      const nextConfig = payload as SiteSettings
      setConfig(normalizeConfig(nextConfig))
      setStatus(
        method === 'DELETE'
          ? 'Site settings reset to defaults.'
          : 'Site settings saved.'
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save site settings')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await submitConfig('PUT')
  }

  const sourceLabel = config.configSource === 'database' ? 'Database' : 'Defaults'

  return (
    <Card>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Site settings
          </p>
          <h2 className="mt-2 text-2xl font-bold text-dark">Global website configuration</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            Update public contact details, social profiles, branding text, header logo URL,
            and default theme.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
          <span className="font-medium text-dark">Config source:</span> {sourceLabel}
          <span className="ml-4 text-gray-500">Updated {formatTimestamp(config.updatedAt)}</span>
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
              label="Site name"
              value={config.siteName}
              onChange={(event) => updateField('siteName', event.target.value)}
              placeholder="Ray Wooler"
              maxLength={120}
            />
            <Input
              label="Header brand text"
              value={config.headerBrandText}
              onChange={(event) => updateField('headerBrandText', event.target.value)}
              placeholder="Ray"
              maxLength={80}
            />
          </div>

          <Input
            label="Header logo URL (optional)"
            value={config.headerLogoUrl}
            onChange={(event) => updateField('headerLogoUrl', event.target.value)}
            placeholder="https://..."
            maxLength={500}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              type="email"
              label="Contact email"
              value={config.contactEmail}
              onChange={(event) => updateField('contactEmail', event.target.value)}
              placeholder="hello@ray.dev"
              maxLength={200}
            />
            <Input
              label="Contact phone (optional)"
              value={config.contactPhone}
              onChange={(event) => updateField('contactPhone', event.target.value)}
              placeholder="+61 ..."
              maxLength={80}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Location label (optional)"
              value={config.locationLabel}
              onChange={(event) => updateField('locationLabel', event.target.value)}
              placeholder="Available remotely & local area"
              maxLength={200}
            />
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Theme</label>
              <select
                value={config.theme}
                onChange={(event) => updateField('theme', event.target.value as SiteSettings['theme'])}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Hero CTA label"
              value={config.heroCtaLabel}
              onChange={(event) => updateField('heroCtaLabel', event.target.value)}
              placeholder="Book a consultation"
              maxLength={80}
            />
            <Input
              label="Hero CTA URL"
              value={config.heroCtaHref}
              onChange={(event) => updateField('heroCtaHref', event.target.value)}
              placeholder="/contact"
              maxLength={500}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="GitHub URL"
              value={config.githubUrl}
              onChange={(event) => updateField('githubUrl', event.target.value)}
              placeholder="https://github.com/your-profile"
              maxLength={500}
            />
            <Input
              label="LinkedIn URL"
              value={config.linkedinUrl}
              onChange={(event) => updateField('linkedinUrl', event.target.value)}
              placeholder="https://www.linkedin.com/in/your-profile/"
              maxLength={500}
            />
          </div>

          <Textarea
            label="Footer tagline"
            value={config.footerTagline}
            onChange={(event) => updateField('footerTagline', event.target.value)}
            rows={4}
            maxLength={600}
          />

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
