'use client'

import { FormEvent, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import type { EnterpriseAgentPlatformConfig } from '@/lib/enterprise-ai-agent-platform'

type EnterpriseAgentPlatformFormProps = {
  initialConfig: EnterpriseAgentPlatformConfig
  role: string
  canEdit: boolean
  canPublish: boolean
}

const REQUIRED_APPROVAL_PHRASE = 'APPROVE ENTERPRISE AI-AGENT PLATFORM CHANGES'

function parseArrayJson(text: string, fieldName: string) {
  const parsed = JSON.parse(text) as unknown
  if (!Array.isArray(parsed)) {
    throw new Error(`${fieldName} must be a JSON array`)
  }
  return parsed
}

export function EnterpriseAgentPlatformForm({
  initialConfig,
  role,
  canEdit,
  canPublish,
}: EnterpriseAgentPlatformFormProps) {
  const [stagesJson, setStagesJson] = useState(
    JSON.stringify(initialConfig.stages, null, 2)
  )
  const [capabilitiesJson, setCapabilitiesJson] = useState(
    JSON.stringify(initialConfig.capabilities, null, 2)
  )
  const [notesJson, setNotesJson] = useState(JSON.stringify(initialConfig.notes, null, 2))
  const [approvalNote, setApprovalNote] = useState('')
  const [approvalPhrase, setApprovalPhrase] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [publishedAt, setPublishedAt] = useState(initialConfig.publishedAt)
  const [publishedByRole, setPublishedByRole] = useState(initialConfig.publishedByRole)
  const [updatedAt, setUpdatedAt] = useState(initialConfig.updatedAt)

  const publishReady = useMemo(
    () =>
      approvalPhrase.trim() === REQUIRED_APPROVAL_PHRASE &&
      approvalNote.trim().length >= 20,
    [approvalNote, approvalPhrase]
  )

  const saveDraft = async (event: FormEvent) => {
    event.preventDefault()
    if (!canEdit) return

    setIsSaving(true)
    setStatus(null)
    setError(null)
    try {
      const payload = {
        stages: parseArrayJson(stagesJson, 'stages'),
        capabilities: parseArrayJson(capabilitiesJson, 'capabilities'),
        notes: parseArrayJson(notesJson, 'notes'),
      }

      const response = await fetch('/api/admin/ai-agent-platform', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(result?.error || 'Failed to save draft')
      }

      setStagesJson(JSON.stringify(result.stages, null, 2))
      setCapabilitiesJson(JSON.stringify(result.capabilities, null, 2))
      setNotesJson(JSON.stringify(result.notes, null, 2))
      setUpdatedAt(result.updatedAt)
      setStatus('Draft saved.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save draft')
    } finally {
      setIsSaving(false)
    }
  }

  const publish = async () => {
    if (!canPublish || !publishReady) return
    setIsPublishing(true)
    setStatus(null)
    setError(null)
    try {
      const response = await fetch('/api/admin/ai-agent-platform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approvalNote,
          approvalPhrase,
        }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(result?.error || 'Failed to publish changes')
      }

      setPublishedAt(result.publishedAt)
      setPublishedByRole(result.publishedByRole)
      setUpdatedAt(result.updatedAt)
      setStatus('Changes published.')
      setApprovalNote('')
      setApprovalPhrase('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish changes')
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <Card>
      <CardContent className="space-y-5">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
          <p>
            Current role: <strong className="text-dark">{role}</strong>
          </p>
          <p className="mt-1">
            Permissions: {canEdit ? 'edit enabled' : 'read only'} /{' '}
            {canPublish ? 'publish enabled' : 'publish blocked'}
          </p>
          <p className="mt-1">
            Last published: {publishedAt ? new Date(publishedAt).toLocaleString() : 'Not published'}
            {publishedByRole ? ` by ${publishedByRole}` : ''}
          </p>
          <p className="mt-1">
            Last updated: {updatedAt ? new Date(updatedAt).toLocaleString() : 'Not available'}
          </p>
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

        <form onSubmit={saveDraft} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-dark">Stages JSON</label>
            <textarea
              className="min-h-[220px] w-full rounded-xl border border-gray-200 p-3 font-mono text-xs text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={stagesJson}
              onChange={(event) => setStagesJson(event.target.value)}
              disabled={!canEdit || isSaving || isPublishing}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-dark">
              Capabilities JSON
            </label>
            <textarea
              className="min-h-[220px] w-full rounded-xl border border-gray-200 p-3 font-mono text-xs text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={capabilitiesJson}
              onChange={(event) => setCapabilitiesJson(event.target.value)}
              disabled={!canEdit || isSaving || isPublishing}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-dark">Notes JSON</label>
            <textarea
              className="min-h-[120px] w-full rounded-xl border border-gray-200 p-3 font-mono text-xs text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={notesJson}
              onChange={(event) => setNotesJson(event.target.value)}
              disabled={!canEdit || isSaving || isPublishing}
            />
          </div>
          <Button type="submit" disabled={!canEdit || isSaving || isPublishing}>
            {isSaving ? 'Saving...' : 'Save draft'}
          </Button>
        </form>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-800">
            Approval-gated publish
          </h3>
          <p className="mt-2 text-sm text-amber-900">
            Publishing is restricted to `owner` role and requires an explicit approval phrase and note.
          </p>
          <div className="mt-3 grid gap-3">
            <input
              className="w-full rounded-lg border border-amber-300 px-3 py-2 text-sm"
              placeholder={REQUIRED_APPROVAL_PHRASE}
              value={approvalPhrase}
              onChange={(event) => setApprovalPhrase(event.target.value)}
              disabled={!canPublish || isSaving || isPublishing}
            />
            <textarea
              className="min-h-[90px] w-full rounded-lg border border-amber-300 px-3 py-2 text-sm"
              placeholder="Approval note (minimum 20 characters)"
              value={approvalNote}
              onChange={(event) => setApprovalNote(event.target.value)}
              disabled={!canPublish || isSaving || isPublishing}
            />
            <Button
              type="button"
              onClick={() => void publish()}
              disabled={!canPublish || !publishReady || isSaving || isPublishing}
            >
              {isPublishing ? 'Publishing...' : 'Publish changes'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
