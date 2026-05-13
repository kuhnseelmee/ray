'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { FoundationGovernanceChecklist } from '@/components/admin/FoundationGovernanceChecklist'
import {
  foundationGovernanceRoadmap,
  governanceArtefacts,
  governanceCommandPrinciple,
  governanceCorePrinciple,
  governanceDecisionModel,
  governancePurpose,
  type GovernanceRoadmapPhase,
} from '@/data/admin/foundation-governance-roadmap'

function PhaseCard({ phase }: { phase: GovernanceRoadmapPhase }) {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-dark">{phase.phase}</h3>
            <p className="mt-1 text-sm text-gray-600">{phase.objective}</p>
          </div>
          <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
            {phase.timebox}
          </span>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Outcomes
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {phase.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Control Gates
          </p>
          {phase.controlGates.map((gate) => (
            <div key={gate.id} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <p className="text-sm font-semibold text-dark">{gate.title}</p>
              <p className="mt-1 text-sm text-gray-700">{gate.rule}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Evidence required
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {gate.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Exit Criteria
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {phase.exitCriteria.map((item) => (
              <li key={`${phase.id}-${item.criterion}`}>
                <span className="font-medium text-dark">{item.criterion}:</span> {item.evidence}
                {item.owner ? ` (${item.owner})` : ''}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

function RoadmapView() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-3">
          <h3 className="text-lg font-semibold text-dark">Purpose</h3>
          <p className="text-sm text-gray-700">{governancePurpose}</p>
          <p className="text-sm font-medium text-dark">{governanceCorePrinciple}</p>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {foundationGovernanceRoadmap.map((phase) => (
          <PhaseCard key={phase.id} phase={phase} />
        ))}
      </div>

      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-dark">Core Governance Artefacts</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {governanceArtefacts.map((item) => (
              <li key={item.artefact}>
                <span className="font-medium text-dark">{item.artefact}:</span> {item.purpose}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3">
          <h3 className="text-lg font-semibold text-dark">Go / No-Go Decision Model</h3>
          <div className="grid gap-3 md:grid-cols-3">
            {governanceDecisionModel.map((model) => (
              <div key={model.decision} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <p className="text-sm font-semibold text-dark">{model.label}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                  {model.conditions.map((condition) => (
                    <li key={condition}>{condition}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-dark">Command Principle</h3>
          <p className="mt-2 text-sm font-medium text-dark">{governanceCommandPrinciple}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function FoundationGovernanceRoadmap() {
  const [view, setView] = useState<'roadmap' | 'checklist'>('roadmap')

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1">
        <button
          type="button"
          onClick={() => setView('roadmap')}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            view === 'roadmap'
              ? 'bg-primary text-white'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          Roadmap
        </button>
        <button
          type="button"
          onClick={() => setView('checklist')}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            view === 'checklist'
              ? 'bg-primary text-white'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          Checklist
        </button>
      </div>

      {view === 'roadmap' ? <RoadmapView /> : <FoundationGovernanceChecklist />}
    </div>
  )
}
