export type GovernanceChecklistStatus =
  | 'not_started'
  | 'in_progress'
  | 'blocked'
  | 'ready_for_review'
  | 'approved'
  | 'rejected'
  | 'deferred'

export type GovernanceChecklistItem = {
  id: string
  phaseId: string
  gateId?: string
  criterionId?: string
  title: string
  type: 'control_gate' | 'exit_criterion' | 'artefact' | 'simulation_test'
  status: GovernanceChecklistStatus
  owner: string
  dueDate?: string
  evidenceLinks: {
    label: string
    href: string
  }[]
  requiredEvidence: string[]
  reviewNotes?: string
  approvedBy?: string
  approvedAt?: string
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  blocksProgression: boolean
}

export type GovernancePhaseReadiness = {
  phaseId: string
  totalItems: number
  approvedItems: number
  openBlockingItems: number
  highRiskOpenItems: number
  criticalOpenItems: number
  readinessStatus: 'not_ready' | 'partially_ready' | 'ready_for_review' | 'ready'
  readinessScore: number
}

export const foundationGovernanceChecklist: GovernanceChecklistItem[] = [
  {
    id: 'chk-gate-1',
    phaseId: 'phase-1-scope-risk-baseline',
    gateId: 'gate-1',
    title: 'Gate 1: Production write restriction enforced',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Systems Admin',
    dueDate: '2026-05-20',
    evidenceLinks: [],
    requiredEvidence: ['Permission matrix', 'Environment separation record', 'Read/write access audit'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-2',
    phaseId: 'phase-1-scope-risk-baseline',
    gateId: 'gate-2',
    title: 'Gate 2: Outbound integration restriction enforced',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Platform Owner',
    dueDate: '2026-05-20',
    evidenceLinks: [],
    requiredEvidence: ['Integration owner', 'Data flow diagram', 'Risk assessment', 'Approval record'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-3',
    phaseId: 'phase-1-scope-risk-baseline',
    gateId: 'gate-3',
    title: 'Gate 3: Sensitive workflow restriction and rollback requirement',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Governance Lead',
    dueDate: '2026-05-20',
    evidenceLinks: [],
    requiredEvidence: ['Failure scenario list', 'Manual fallback process', 'Rollback procedure', 'Named responder'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-4',
    phaseId: 'phase-2-control-architecture-policy-encoding',
    gateId: 'gate-4',
    title: 'Gate 4: Action classification model operational (Class 0-5)',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Platform Owner',
    dueDate: '2026-05-27',
    evidenceLinks: [],
    requiredEvidence: ['Action classification register', 'Classification test evidence'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-5',
    phaseId: 'phase-2-control-architecture-policy-encoding',
    gateId: 'gate-5',
    title: 'Gate 5: Human-in-the-loop approval enforcement',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Ops Lead',
    dueDate: '2026-05-27',
    evidenceLinks: [],
    requiredEvidence: ['Reviewer + timestamp', 'Decision reason', 'Reviewed output record', 'Rollback confirmation'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-6',
    phaseId: 'phase-2-control-architecture-policy-encoding',
    gateId: 'gate-6',
    title: 'Gate 6: Auditability gate enforced for all agent actions',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Engineering Lead',
    dueDate: '2026-05-27',
    evidenceLinks: [],
    requiredEvidence: ['Input/context log schema', 'Actor identity fields', 'Approval status field', 'Rollback reference field'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-7',
    phaseId: 'phase-3-sandbox-runtime-failure-testing',
    gateId: 'gate-7',
    title: 'Gate 7: Sandbox isolation proven',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Systems Admin',
    dueDate: '2026-06-03',
    evidenceLinks: [],
    requiredEvidence: ['Environment separation evidence', 'Disabled outbound sends', 'Integration stubs'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-8',
    phaseId: 'phase-3-sandbox-runtime-failure-testing',
    gateId: 'gate-8',
    title: 'Gate 8: Failure mode test suite executed for high-risk workflows',
    type: 'control_gate',
    status: 'not_started',
    owner: 'QA Lead',
    dueDate: '2026-06-03',
    evidenceLinks: [],
    requiredEvidence: ['Wrong/missing data tests', 'Unauthorized request tests', 'Timeout/API failure tests'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-9',
    phaseId: 'phase-3-sandbox-runtime-failure-testing',
    gateId: 'gate-9',
    title: 'Gate 9: Safe failure behaviour validated',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Engineering Lead',
    dueDate: '2026-06-03',
    evidenceLinks: [],
    requiredEvidence: ['Stop/log/notify/escalate evidence', 'No destructive auto-retry evidence'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-10',
    phaseId: 'phase-4-controlled-pilot-readiness',
    gateId: 'gate-10',
    title: 'Gate 10: Pilot scope constrained and approved',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Operations Owner',
    dueDate: '2026-06-10',
    evidenceLinks: [],
    requiredEvidence: ['Included/excluded workflow list', 'Approved users/agents/systems', 'Success metrics'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-11',
    phaseId: 'phase-4-controlled-pilot-readiness',
    gateId: 'gate-11',
    title: 'Gate 11: Pilot stop condition register approved',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Governance Lead',
    dueDate: '2026-06-10',
    evidenceLinks: [],
    requiredEvidence: ['Immediate stop triggers register', 'Approval bypass trigger', 'Audit log failure trigger'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-12',
    phaseId: 'phase-4-controlled-pilot-readiness',
    gateId: 'gate-12',
    title: 'Gate 12: Rollback authority and disable pathway assigned',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Platform Owner',
    dueDate: '2026-06-10',
    evidenceLinks: [],
    requiredEvidence: ['Primary + backup rollback owner', 'Disable procedure', 'Recovery checklist'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-13',
    phaseId: 'phase-5-pilot-runtime-governance',
    gateId: 'gate-13',
    title: 'Gate 13: Evidence-based expansion assessment pack complete',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Governance Lead',
    dueDate: '2026-06-24',
    evidenceLinks: [],
    requiredEvidence: ['Usage logs', 'Error/approval/override rates', 'Value + quality review'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-14',
    phaseId: 'phase-5-pilot-runtime-governance',
    gateId: 'gate-14',
    title: 'Gate 14: Serious incident auto-pause control active',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Incident Manager',
    dueDate: '2026-06-24',
    evidenceLinks: [],
    requiredEvidence: ['Incident class register', 'Auto-pause execution evidence'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-15',
    phaseId: 'phase-6-expansion-readiness',
    gateId: 'gate-15',
    title: 'Gate 15: Expansion risk reassessment complete',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Risk Owner',
    dueDate: '2026-07-01',
    evidenceLinks: [],
    requiredEvidence: ['Updated risk register', 'New scope risk review'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-16',
    phaseId: 'phase-6-expansion-readiness',
    gateId: 'gate-16',
    title: 'Gate 16: Control scalability assessed',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Technical Owner',
    dueDate: '2026-07-01',
    evidenceLinks: [],
    requiredEvidence: ['Approval workload assessment', 'Monitoring and incident capacity assessment'],
    riskLevel: 'moderate',
    blocksProgression: true,
  },
  {
    id: 'chk-gate-17',
    phaseId: 'phase-6-expansion-readiness',
    gateId: 'gate-17',
    title: 'Gate 17: Formal expansion approval complete',
    type: 'control_gate',
    status: 'not_started',
    owner: 'Platform Owner',
    dueDate: '2026-07-01',
    evidenceLinks: [],
    requiredEvidence: ['Multi-owner signed approval record'],
    riskLevel: 'critical',
    blocksProgression: true,
  },

  {
    id: 'chk-criterion-p1-scope-signed',
    phaseId: 'phase-1-scope-risk-baseline',
    criterionId: 'p1-c1',
    title: 'Exit: Scope statement signed',
    type: 'exit_criterion',
    status: 'ready_for_review',
    owner: 'Admin + Ops',
    evidenceLinks: [],
    requiredEvidence: ['Approved scope document'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-criterion-p1-risk-register',
    phaseId: 'phase-1-scope-risk-baseline',
    criterionId: 'p1-c2',
    title: 'Exit: Risk register created',
    type: 'exit_criterion',
    status: 'not_started',
    owner: 'Governance Lead',
    evidenceLinks: [],
    requiredEvidence: ['Risk register with owner per risk'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-criterion-p2-action-classes',
    phaseId: 'phase-2-control-architecture-policy-encoding',
    criterionId: 'p2-c1',
    title: 'Exit: Action classes defined',
    type: 'exit_criterion',
    status: 'not_started',
    owner: 'Platform Owner',
    evidenceLinks: [],
    requiredEvidence: ['Action classification register'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-criterion-p2-policy-encoded',
    phaseId: 'phase-2-control-architecture-policy-encoding',
    criterionId: 'p2-c2',
    title: 'Exit: Policy rules encoded',
    type: 'exit_criterion',
    status: 'not_started',
    owner: 'Engineering Lead',
    evidenceLinks: [],
    requiredEvidence: ['Policy enforcement notes'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-criterion-p3-sandbox-validated',
    phaseId: 'phase-3-sandbox-runtime-failure-testing',
    criterionId: 'p3-c1',
    title: 'Exit: Sandbox validated',
    type: 'exit_criterion',
    status: 'not_started',
    owner: 'Systems Admin',
    evidenceLinks: [],
    requiredEvidence: ['Environment validation record'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-criterion-p4-pilot-signed',
    phaseId: 'phase-4-controlled-pilot-readiness',
    criterionId: 'p4-c1',
    title: 'Exit: Pilot scope signed',
    type: 'exit_criterion',
    status: 'not_started',
    owner: 'Operations Owner',
    evidenceLinks: [],
    requiredEvidence: ['Pilot charter'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-criterion-p5-pilot-completed',
    phaseId: 'phase-5-pilot-runtime-governance',
    criterionId: 'p5-c1',
    title: 'Exit: Pilot completed and reviewed',
    type: 'exit_criterion',
    status: 'not_started',
    owner: 'Governance Lead',
    evidenceLinks: [],
    requiredEvidence: ['Pilot report', 'Incident register', 'Go/No-Go decision record'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-criterion-p6-gov-approval',
    phaseId: 'phase-6-expansion-readiness',
    criterionId: 'p6-c1',
    title: 'Exit: Governance approval granted for expansion',
    type: 'exit_criterion',
    status: 'not_started',
    owner: 'Platform Owner',
    evidenceLinks: [],
    requiredEvidence: ['Signed approval record'],
    riskLevel: 'critical',
    blocksProgression: true,
  },

  {
    id: 'chk-artefact-scope-statement',
    phaseId: 'phase-1-scope-risk-baseline',
    title: 'Artefact: Platform Scope Statement',
    type: 'artefact',
    status: 'ready_for_review',
    owner: 'Admin + Ops',
    evidenceLinks: [],
    requiredEvidence: ['Scope statement document'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-artefact-prohibited-actions',
    phaseId: 'phase-1-scope-risk-baseline',
    title: 'Artefact: Prohibited Action Register',
    type: 'artefact',
    status: 'not_started',
    owner: 'Governance Lead',
    evidenceLinks: [],
    requiredEvidence: ['Blocked action classes register'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-artefact-risk-register',
    phaseId: 'phase-1-scope-risk-baseline',
    title: 'Artefact: Risk Register',
    type: 'artefact',
    status: 'not_started',
    owner: 'Governance Lead',
    evidenceLinks: [],
    requiredEvidence: ['Risk register with owners and controls'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-artefact-decision-matrix',
    phaseId: 'phase-2-control-architecture-policy-encoding',
    title: 'Artefact: Decision Authority Matrix',
    type: 'artefact',
    status: 'not_started',
    owner: 'Platform Owner',
    evidenceLinks: [],
    requiredEvidence: ['Approval authority mapping'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-artefact-audit-standard',
    phaseId: 'phase-2-control-architecture-policy-encoding',
    title: 'Artefact: Audit Log Standard',
    type: 'artefact',
    status: 'not_started',
    owner: 'Engineering Lead',
    evidenceLinks: [],
    requiredEvidence: ['Audit event field schema'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-artefact-integration-register',
    phaseId: 'phase-2-control-architecture-policy-encoding',
    title: 'Artefact: Integration Register',
    type: 'artefact',
    status: 'not_started',
    owner: 'Technical Owner',
    evidenceLinks: [],
    requiredEvidence: ['Connected system registry'],
    riskLevel: 'moderate',
    blocksProgression: false,
  },
  {
    id: 'chk-artefact-rollback-plan',
    phaseId: 'phase-4-controlled-pilot-readiness',
    title: 'Artefact: Rollback Plan',
    type: 'artefact',
    status: 'not_started',
    owner: 'Platform Owner',
    evidenceLinks: [],
    requiredEvidence: ['Rollback steps', 'Communication and recovery checklist'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-artefact-pilot-charter',
    phaseId: 'phase-4-controlled-pilot-readiness',
    title: 'Artefact: Pilot Charter',
    type: 'artefact',
    status: 'not_started',
    owner: 'Operations Owner',
    evidenceLinks: [],
    requiredEvidence: ['Pilot scope and metrics'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-artefact-incident-register',
    phaseId: 'phase-5-pilot-runtime-governance',
    title: 'Artefact: Incident Register',
    type: 'artefact',
    status: 'not_started',
    owner: 'Incident Manager',
    evidenceLinks: [],
    requiredEvidence: ['Incident log with severity and response outcome'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-artefact-expansion-report',
    phaseId: 'phase-6-expansion-readiness',
    title: 'Artefact: Expansion Readiness Report',
    type: 'artefact',
    status: 'not_started',
    owner: 'Governance Lead',
    evidenceLinks: [],
    requiredEvidence: ['Consolidated go/no-go evidence package'],
    riskLevel: 'high',
    blocksProgression: true,
  },

  {
    id: 'chk-sim-p2-approval-gate',
    phaseId: 'phase-2-control-architecture-policy-encoding',
    title: 'Simulation: Approval gate blocks unapproved Class 2+ action',
    type: 'simulation_test',
    status: 'not_started',
    owner: 'QA Lead',
    dueDate: '2026-05-28',
    evidenceLinks: [],
    requiredEvidence: ['Simulation run log', 'Blocked state evidence', 'Reviewer prompt log'],
    riskLevel: 'critical',
    blocksProgression: true,
  },
  {
    id: 'chk-sim-p2-audit-completeness',
    phaseId: 'phase-2-control-architecture-policy-encoding',
    title: 'Simulation: Audit log completeness for proposed and blocked actions',
    type: 'simulation_test',
    status: 'not_started',
    owner: 'Engineering Lead',
    dueDate: '2026-05-28',
    evidenceLinks: [],
    requiredEvidence: ['Audit field completeness report', 'Missing field exception log'],
    riskLevel: 'high',
    blocksProgression: true,
  },
  {
    id: 'chk-sim-p2-escalation-path',
    phaseId: 'phase-2-control-architecture-policy-encoding',
    title: 'Simulation: Escalation path triggers for high-risk classification conflict',
    type: 'simulation_test',
    status: 'not_started',
    owner: 'Ops Lead',
    dueDate: '2026-05-28',
    evidenceLinks: [],
    requiredEvidence: ['Escalation timeline', 'Owner acknowledgment record'],
    riskLevel: 'high',
    blocksProgression: true,
  },
]

function isOpen(item: GovernanceChecklistItem) {
  return item.status !== 'approved' && item.status !== 'deferred'
}

export function getGovernancePhaseReadiness(
  items: GovernanceChecklistItem[]
): GovernancePhaseReadiness[] {
  const grouped = new Map<string, GovernanceChecklistItem[]>()

  for (const item of items) {
    const group = grouped.get(item.phaseId) ?? []
    group.push(item)
    grouped.set(item.phaseId, group)
  }

  return Array.from(grouped.entries()).map(([phaseId, phaseItems]) => {
    const totalItems = phaseItems.length
    const approvedItems = phaseItems.filter((item) => item.status === 'approved').length
    const openBlockingItems = phaseItems.filter(
      (item) => item.blocksProgression && isOpen(item)
    ).length
    const highRiskOpenItems = phaseItems.filter(
      (item) => item.riskLevel === 'high' && isOpen(item)
    ).length
    const criticalOpenItems = phaseItems.filter(
      (item) => item.riskLevel === 'critical' && isOpen(item)
    ).length

    if (totalItems === 0) {
      return {
        phaseId,
        totalItems: 0,
        approvedItems: 0,
        openBlockingItems: 0,
        highRiskOpenItems: 0,
        criticalOpenItems: 0,
        readinessStatus: 'not_ready' as const,
        readinessScore: 0,
      }
    }

    const ratio = approvedItems / totalItems
    const readinessScore = Math.round(ratio * 100)

    let readinessStatus: GovernancePhaseReadiness['readinessStatus'] = 'partially_ready'

    if (criticalOpenItems > 0) {
      readinessStatus = 'not_ready'
    } else if (openBlockingItems > 0) {
      readinessStatus = 'not_ready'
    } else if (highRiskOpenItems > 0) {
      readinessStatus = 'partially_ready'
    } else if (ratio < 0.8) {
      readinessStatus = 'partially_ready'
    } else if (ratio === 1) {
      readinessStatus = 'ready'
    } else {
      readinessStatus = 'ready_for_review'
    }

    return {
      phaseId,
      totalItems,
      approvedItems,
      openBlockingItems,
      highRiskOpenItems,
      criticalOpenItems,
      readinessStatus,
      readinessScore,
    }
  })
}

export const foundationGovernancePhaseReadiness =
  getGovernancePhaseReadiness(foundationGovernanceChecklist)
