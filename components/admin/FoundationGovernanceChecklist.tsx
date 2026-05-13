'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import {
  foundationGovernanceRoadmap,
  type GovernanceRoadmapPhase,
} from '@/data/admin/foundation-governance-roadmap'
import {
  foundationGovernanceChecklist,
  foundationGovernancePhaseReadiness,
  type GovernanceChecklistItem,
  type GovernancePhaseReadiness,
  type GovernanceChecklistStatus,
} from '@/data/admin/foundation-governance-checklist'

const statusLabel: Record<GovernanceChecklistStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  blocked: 'Blocked',
  ready_for_review: 'Ready for Review',
  approved: 'Approved',
  rejected: 'Rejected',
  deferred: 'Deferred',
}

const statusStyles: Record<GovernanceChecklistStatus, string> = {
  not_started: 'border-gray-200 bg-gray-50 text-gray-700',
  in_progress: 'border-blue-200 bg-blue-50 text-blue-700',
  blocked: 'border-red-200 bg-red-50 text-red-700',
  ready_for_review: 'border-amber-200 bg-amber-50 text-amber-800',
  approved: 'border-green-200 bg-green-50 text-green-700',
  rejected: 'border-red-300 bg-red-100 text-red-800',
  deferred: 'border-purple-200 bg-purple-50 text-purple-700',
}

const riskStyles: Record<GovernanceChecklistItem['riskLevel'], string> = {
  low: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  moderate: 'border-yellow-200 bg-yellow-50 text-yellow-700',
  high: 'border-orange-200 bg-orange-50 text-orange-800',
  critical: 'border-red-200 bg-red-50 text-red-800',
}

const readinessStyles: Record<GovernancePhaseReadiness['readinessStatus'], string> = {
  not_ready: 'border-red-200 bg-red-50 text-red-800',
  partially_ready: 'border-amber-200 bg-amber-50 text-amber-800',
  ready_for_review: 'border-blue-200 bg-blue-50 text-blue-800',
  ready: 'border-green-200 bg-green-50 text-green-800',
}

const readinessLabel: Record<GovernancePhaseReadiness['readinessStatus'], string> = {
  not_ready: 'Not Ready',
  partially_ready: 'Partially Ready',
  ready_for_review: 'Ready for Review',
  ready: 'Ready',
}

type FilterState = {
  phaseId: string
  status: string
  owner: string
  risk: string
}

function itemTypeLabel(type: GovernanceChecklistItem['type']) {
  if (type === 'control_gate') return 'Control Gate'
  if (type === 'exit_criterion') return 'Exit Criterion'
  if (type === 'artefact') return 'Artefact'
  return 'Simulation Test'
}

function isBlockingOpen(item: GovernanceChecklistItem) {
  return item.blocksProgression && item.status !== 'approved'
}

function PhaseSection({
  phase,
  items,
}: {
  phase: GovernanceRoadmapPhase
  items: GovernanceChecklistItem[]
}) {
  const approvedCount = items.filter((item) => item.status === 'approved').length

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-dark">{phase.phase}</h3>
            <p className="mt-1 text-sm text-gray-600">{phase.objective}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
            {approvedCount}/{items.length} approved
          </div>
        </div>

        <div className="grid gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border p-4 ${
                item.blocksProgression
                  ? 'border-red-200 bg-red-50/40'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-dark">{item.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">
                    {itemTypeLabel(item.type)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${statusStyles[item.status]}`}>
                    {statusLabel[item.status]}
                  </span>
                  <span className={`rounded-full border px-2 py-1 text-xs font-semibold uppercase ${riskStyles[item.riskLevel]}`}>
                    {item.riskLevel}
                  </span>
                  {item.blocksProgression ? (
                    <span className="rounded-full border border-red-300 bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                      Blocks progression
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="mt-3 grid gap-2 text-sm text-gray-700 md:grid-cols-2">
                <p>
                  <span className="font-medium text-dark">Owner:</span> {item.owner}
                </p>
                <p>
                  <span className="font-medium text-dark">Due:</span> {item.dueDate || 'Not set'}
                </p>
              </div>

              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Required Evidence
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-700">
                  {item.requiredEvidence.map((evidence) => (
                    <li key={evidence}>{evidence}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Evidence Links
                </p>
                {item.evidenceLinks.length ? (
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                    {item.evidenceLinks.map((link) => (
                      <li key={`${item.id}-${link.href}`}>
                        <a
                          href={link.href}
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-sm text-gray-500">No evidence links attached yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function FoundationGovernanceChecklist() {
  const [filters, setFilters] = useState<FilterState>({
    phaseId: 'all',
    status: 'all',
    owner: 'all',
    risk: 'all',
  })

  const owners = useMemo(
    () => Array.from(new Set(foundationGovernanceChecklist.map((item) => item.owner))).sort(),
    []
  )

  const filteredItems = useMemo(() => {
    return foundationGovernanceChecklist.filter((item) => {
      if (filters.phaseId !== 'all' && item.phaseId !== filters.phaseId) return false
      if (filters.status !== 'all' && item.status !== filters.status) return false
      if (filters.owner !== 'all' && item.owner !== filters.owner) return false
      if (filters.risk !== 'all' && item.riskLevel !== filters.risk) return false
      return true
    })
  }, [filters])

  const blockingItems = filteredItems.filter(isBlockingOpen)
  const unresolvedBlockingGlobal = foundationGovernanceChecklist.filter(isBlockingOpen)

  const phaseLabelById = useMemo(() => {
    const map = new Map<string, string>()
    for (const phase of foundationGovernanceRoadmap) {
      map.set(phase.id, phase.phase)
    }
    return map
  }, [])

  const groupedByPhase = useMemo(() => {
    return foundationGovernanceRoadmap
      .map((phase) => ({
        phase,
        items: filteredItems.filter((item) => item.phaseId === phase.id),
      }))
      .filter((entry) => entry.items.length > 0)
  }, [filteredItems])

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold text-dark">Checklist Filters</h3>
          <div className="grid gap-3 md:grid-cols-4">
            <select
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
              value={filters.phaseId}
              onChange={(event) => setFilters((prev) => ({ ...prev, phaseId: event.target.value }))}
            >
              <option value="all">All phases</option>
              {foundationGovernanceRoadmap.map((phase) => (
                <option key={phase.id} value={phase.id}>
                  {phase.phase}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
              value={filters.status}
              onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}
            >
              <option value="all">All statuses</option>
              {Object.entries(statusLabel).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
              value={filters.owner}
              onChange={(event) => setFilters((prev) => ({ ...prev, owner: event.target.value }))}
            >
              <option value="all">All owners</option>
              {owners.map((owner) => (
                <option key={owner} value={owner}>
                  {owner}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
              value={filters.risk}
              onChange={(event) => setFilters((prev) => ({ ...prev, risk: event.target.value }))}
            >
              <option value="all">All risk levels</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-dark">Phase Readiness</h3>
          <p className="mt-1 text-sm text-gray-600">
            Derived operational readiness by phase from checklist approval, blocking items, and
            unresolved risk.
          </p>
          <div className="mt-4 grid gap-3">
            {foundationGovernancePhaseReadiness.map((phase) => (
              <div key={`readiness-${phase.phaseId}`} className="rounded-xl border border-gray-200 p-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-dark">
                      {phaseLabelById.get(phase.phaseId) || phase.phaseId}
                    </p>
                    <p className="mt-1 text-xs text-gray-600">Phase ID: {phase.phaseId}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-2 py-1 text-xs font-semibold ${
                        readinessStyles[phase.readinessStatus]
                      }`}
                    >
                      {readinessLabel[phase.readinessStatus]}
                    </span>
                    <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-700">
                      Score {phase.readinessScore}%
                    </span>
                  </div>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-gray-700 md:grid-cols-4">
                  <p>
                    <span className="font-medium text-dark">Approved:</span> {phase.approvedItems}/
                    {phase.totalItems}
                  </p>
                  <p>
                    <span className="font-medium text-dark">Open blockers:</span>{' '}
                    {phase.openBlockingItems}
                  </p>
                  <p>
                    <span className="font-medium text-dark">High-risk open:</span>{' '}
                    {phase.highRiskOpenItems}
                  </p>
                  <p>
                    <span className="font-medium text-dark">Critical open:</span>{' '}
                    {phase.criticalOpenItems}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-dark">Expansion Signal</h3>
          <div
            className={`mt-3 rounded-xl border p-4 ${
              unresolvedBlockingGlobal.length
                ? 'border-red-200 bg-red-50'
                : 'border-blue-200 bg-blue-50'
            }`}
          >
            <p className="text-sm font-semibold text-dark">
              {unresolvedBlockingGlobal.length
                ? 'Expansion Blocked'
                : 'Expansion Ready for Review'}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              Unresolved blocking items: {unresolvedBlockingGlobal.length}
            </p>
            {unresolvedBlockingGlobal.length ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {unresolvedBlockingGlobal.slice(0, 3).map((item) => (
                  <li key={`expansion-block-${item.id}`}>
                    {item.title} ({item.owner})
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-dark">Blocking Items</h3>
          <p className="mt-1 text-sm text-gray-600">
            Open blockers that must be approved before progression.
          </p>
          {blockingItems.length ? (
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              {blockingItems.map((item) => (
                <li key={`blocking-${item.id}`} className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="font-medium text-dark">{item.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-red-700">
                    {item.phaseId} • {statusLabel[item.status]} • Owner: {item.owner}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-gray-500">No blocking items in current filter scope.</p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {groupedByPhase.map(({ phase, items }) => (
          <PhaseSection key={phase.id} phase={phase} items={items} />
        ))}
      </div>
    </div>
  )
}
