import type { PlatformStage } from '@/data/admin/enterprise-ai-agent-platform'
import { Card, CardContent } from '@/components/ui/Card'

type PlatformStageCardProps = {
  stage: PlatformStage
}

const statusStyles: Record<PlatformStage['status'], string> = {
  planned: 'bg-amber-50 text-amber-700 border-amber-200',
  'in-progress': 'bg-blue-50 text-blue-700 border-blue-200',
  ready: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

const statusLabel: Record<PlatformStage['status'], string> = {
  planned: 'Planned',
  'in-progress': 'In progress',
  ready: 'Ready',
}

export function PlatformStageCard({ stage }: PlatformStageCardProps) {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-dark">{stage.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{stage.objective}</p>
          </div>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[stage.status]}`}
          >
            {statusLabel[stage.status]}
          </span>
        </div>

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-wide text-gray-500">Owner</p>
            <p className="mt-1 text-gray-800">{stage.owner}</p>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-wide text-gray-500">Target window</p>
            <p className="mt-1 text-gray-800">{stage.targetWindow}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Deliverables
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {stage.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
