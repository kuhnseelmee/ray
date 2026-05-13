import type { PlatformCapability } from '@/data/admin/enterprise-ai-agent-platform'
import { Card, CardContent } from '@/components/ui/Card'

type PlatformCapabilityCardProps = {
  capability: PlatformCapability
}

export function PlatformCapabilityCard({
  capability,
}: PlatformCapabilityCardProps) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <h3 className="text-lg font-semibold text-dark">{capability.name}</h3>
        <p className="text-sm text-gray-700">{capability.description}</p>
        <div className="space-y-2 rounded-lg bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Current state
          </p>
          <p className="text-sm text-gray-800">{capability.currentState}</p>
        </div>
        <div className="space-y-2 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Next step
          </p>
          <p className="text-sm text-gray-800">{capability.nextStep}</p>
        </div>
      </CardContent>
    </Card>
  )
}
