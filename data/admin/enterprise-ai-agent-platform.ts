export type PlatformStageStatus = 'planned' | 'in-progress' | 'ready'

export type PlatformStage = {
  id: string
  title: string
  objective: string
  status: PlatformStageStatus
  owner: string
  targetWindow: string
  deliverables: string[]
}

export type PlatformCapability = {
  id: string
  name: string
  description: string
  currentState: string
  nextStep: string
}

export const enterpriseAgentPlatformStages: PlatformStage[] = [
  {
    id: 'foundation-governance',
    title: 'Foundation & Governance',
    objective:
      'Lock scope boundaries, approval policy, and audit controls so high-impact actions are gated before runtime expansion.',
    status: 'in-progress',
    owner: 'Admin + Ops',
    targetWindow: 'Weeks 1-4',
    deliverables: [
      'Mission boundaries and blocked-action classes',
      'Risk register with owner and mitigation per class',
      'Approval policy with explicit control gates',
      'Audit event schema for prompts, tool calls, and outcomes',
      'Readiness checklist and go/no-go criteria for pilot transition',
    ],
  },
  {
    id: 'runtime-control-plane',
    title: 'Runtime Control Plane',
    objective:
      'Introduce the first management surface for routing, monitoring, and safe operation of AI agents.',
    status: 'planned',
    owner: 'Engineering',
    targetWindow: 'Weeks 2-4',
    deliverables: [
      'Agent registry with service responsibilities',
      'Run-state tracking (idle, running, blocked, failed)',
      'Execution limits and timeout guardrails',
      'Incident fallback and manual override path',
    ],
  },
  {
    id: 'business-workflows',
    title: 'Business Workflow Pilots',
    objective:
      'Launch controlled pilot workflows tied to measurable business outcomes before broader rollout.',
    status: 'planned',
    owner: 'Ops + Delivery',
    targetWindow: 'Weeks 4-8',
    deliverables: [
      'Lead triage agent pilot',
      'Document intake and classification pilot',
      'Follow-up task generation pilot',
      'Pilot scorecard with cycle-time and quality metrics',
    ],
  },
]

export const enterpriseAgentPlatformCapabilities: PlatformCapability[] = [
  {
    id: 'agent-orchestration',
    name: 'Agent Orchestration',
    description:
      'Coordinate specialized agents with controlled task routing and clear ownership boundaries.',
    currentState: 'Concept defined, runtime behavior not yet centralized.',
    nextStep:
      'Implement a basic orchestration registry and expose status in admin.',
  },
  {
    id: 'compliance-observability',
    name: 'Compliance & Observability',
    description:
      'Track what agents do, why they did it, and what evidence exists for review.',
    currentState: 'No unified audit timeline in admin yet.',
    nextStep:
      'Capture per-run metadata and establish a review feed for operator sign-off.',
  },
  {
    id: 'human-in-the-loop',
    name: 'Human-in-the-Loop Controls',
    description:
      'Require explicit human review for sensitive actions and confidence-sensitive decisions.',
    currentState: 'Manual conventions exist but are not yet enforced by workflow state.',
    nextStep:
      'Add approval checkpoints and blocked-state transitions for high-risk actions.',
  },
  {
    id: 'knowledge-and-context',
    name: 'Knowledge & Context Layer',
    description:
      'Provide agents with reliable operational context from approved internal sources.',
    currentState:
      'Knowledge is distributed across data files and prompts with no unified retrieval policy.',
    nextStep:
      'Define source hierarchy and controlled retrieval rules per agent role.',
  },
]

export const enterprisePlatformCommencementNotes = [
  'This commencement defines the control model before scaling automation depth.',
  'Every pilot must include rollback conditions and manual continuity fallback.',
  'No autonomous high-impact actions should run without explicit approval workflow.',
]
