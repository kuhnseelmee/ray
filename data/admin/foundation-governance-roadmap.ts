export type GovernanceDecision = 'go' | 'conditional-go' | 'no-go'

export type GovernanceControlGate = {
  id: string
  title: string
  rule: string
  evidence: string[]
}

export type GovernanceExitCriterion = {
  criterion: string
  evidence: string
  owner?: string
}

export type GovernanceRoadmapPhase = {
  id: string
  phase: string
  objective: string
  timebox: string
  outcomes: string[]
  controlGates: GovernanceControlGate[]
  exitCriteria: GovernanceExitCriterion[]
}

export type GovernanceArtefact = {
  artefact: string
  purpose: string
}

export type GovernanceDecisionModel = {
  decision: GovernanceDecision
  label: string
  conditions: string[]
}

export const governancePurpose =
  'Establish the governance, control gates, readiness criteria, and expansion logic required before autonomous or semi-autonomous capabilities are allowed into runtime or pilot expansion.'

export const governanceCorePrinciple =
  'Capability does not imply permission. Every agent action must pass governance controls before affecting live systems, users, records, finances, communications, compliance, or operational decisions.'

export const foundationGovernanceRoadmap: GovernanceRoadmapPhase[] = [
  {
    id: 'phase-1-scope-risk-baseline',
    phase: 'Phase 1: Scope & Risk Baseline',
    objective:
      'Define exactly what the platform is allowed to do, what it is not allowed to do, and where risk concentration exists.',
    timebox: 'Week 1',
    outcomes: [
      'Platform mission boundaries documented and approved',
      'High-risk action catalogue drafted',
      'Agent-to-business function ownership map published',
    ],
    controlGates: [
      {
        id: 'gate-1',
        title: 'Gate 1: Production Write Restriction',
        rule: 'No autonomous agent may write to production systems.',
        evidence: [
          'Permission matrix',
          'Environment separation record',
          'Read/write access audit',
          'Policy note confirming production writes are blocked',
        ],
      },
      {
        id: 'gate-2',
        title: 'Gate 2: Outbound Integration Restriction',
        rule: 'No outbound integration may be enabled without owner sign-off.',
        evidence: [
          'Integration owner',
          'Data flow diagram',
          'Risk assessment',
          'Rollback procedure',
          'Approval record',
        ],
      },
      {
        id: 'gate-3',
        title: 'Gate 3: Sensitive Workflow Restriction',
        rule: 'No sensitive workflow may be enabled without a rollback plan.',
        evidence: [
          'Workflow owner',
          'Failure scenario list',
          'Manual fallback process',
          'Rollback procedure',
          'Audit log location',
          'Named responder',
        ],
      },
    ],
    exitCriteria: [
      {
        criterion: 'Scope statement signed',
        evidence: 'Approved scope document',
        owner: 'Admin + Ops',
      },
      {
        criterion: 'Risk register created',
        evidence: 'Risk register with owner per risk',
        owner: 'Governance Lead',
      },
      {
        criterion: 'Blocked action classes encoded',
        evidence: 'Policy notes / system rules / access controls',
        owner: 'Platform Owner',
      },
      {
        criterion: 'Agent ownership map published',
        evidence: 'Agent-function-owner register',
        owner: 'Ops Lead',
      },
    ],
  },
  {
    id: 'phase-2-control-architecture-policy-encoding',
    phase: 'Phase 2: Control Architecture & Policy Encoding',
    objective: 'Convert governance decisions into enforceable system controls.',
    timebox: 'Week 2',
    outcomes: [
      'Control framework designed',
      'Policy enforcement layer drafted',
      'Decision authority matrix approved',
    ],
    controlGates: [
      {
        id: 'gate-4',
        title: 'Gate 4: Action Classification Gate',
        rule: 'Every agent action must be classified before execution (Class 0-5).',
        evidence: ['Action classification register', 'Classification test evidence'],
      },
      {
        id: 'gate-5',
        title: 'Gate 5: Human-in-the-Loop Gate',
        rule:
          'Any action affecting people, money, compliance, legal position, access, or live records requires human review.',
        evidence: [
          'Reviewer name',
          'Timestamp',
          'Decision + reason',
          'Reviewed output record',
          'Rollback pathway confirmation',
        ],
      },
      {
        id: 'gate-6',
        title: 'Gate 6: Auditability Gate',
        rule: 'No agent action is valid unless it can be reconstructed later.',
        evidence: [
          'Input and context log',
          'Agent and user identity',
          'Action proposed and action taken',
          'Approval status',
          'System affected',
          'Timestamp, error state, rollback reference',
        ],
      },
    ],
    exitCriteria: [
      {
        criterion: 'Action classes defined',
        evidence: 'Action classification register',
      },
      {
        criterion: 'Approval matrix approved',
        evidence: 'Decision authority matrix',
      },
      {
        criterion: 'Policy rules encoded',
        evidence: 'Policy enforcement notes',
      },
    ],
  },
  {
    id: 'phase-3-sandbox-runtime-failure-testing',
    phase: 'Phase 3: Sandbox Runtime & Failure Testing',
    objective:
      'Validate platform behaviour in a non-production environment before operational exposure.',
    timebox: 'Week 3',
    outcomes: [
      'Sandbox environment operational',
      'Failure scenarios executed',
      'Control performance measured',
    ],
    controlGates: [
      {
        id: 'gate-7',
        title: 'Gate 7: Sandbox Isolation Gate',
        rule: 'No workflow proceeds unless sandbox isolation is proven.',
        evidence: [
          'Environment separation',
          'Test accounts and dummy records',
          'Outbound sends disabled',
          'Integration stubs',
          'Access review',
        ],
      },
      {
        id: 'gate-8',
        title: 'Gate 8: Failure Mode Gate',
        rule: 'Each high-risk workflow must be tested against predictable failure modes.',
        evidence: [
          'Wrong/missing data tests',
          'Unauthorized request tests',
          'Conflicting policy tests',
          'Timeout/API failure tests',
          'Sensitive data exposure tests',
        ],
      },
      {
        id: 'gate-9',
        title: 'Gate 9: Safe Failure Gate',
        rule: 'Platform must fail into containment, not improvisation.',
        evidence: [
          'Stop-log-notify-escalate behaviour evidence',
          'No destructive auto-retry evidence',
        ],
      },
    ],
    exitCriteria: [
      { criterion: 'Sandbox validated', evidence: 'Environment validation record' },
      { criterion: 'Failure scenarios tested', evidence: 'Test execution report' },
      { criterion: 'Unsafe actions blocked', evidence: 'Block test log' },
    ],
  },
  {
    id: 'phase-4-controlled-pilot-readiness',
    phase: 'Phase 4: Controlled Pilot Readiness',
    objective:
      'Prepare a limited pilot with strict containment, measurable success criteria, and rollback authority.',
    timebox: 'Week 4',
    outcomes: [
      'Pilot scope approved',
      'Pilot risk controls confirmed',
      'Pilot participants briefed',
    ],
    controlGates: [
      {
        id: 'gate-10',
        title: 'Gate 10: Pilot Scope Gate',
        rule: 'Pilot must be narrow enough to control.',
        evidence: [
          'Included and excluded workflows',
          'Approved users, agents, and systems',
          'Data boundaries',
          'Start/end dates',
          'Success metrics',
        ],
      },
      {
        id: 'gate-11',
        title: 'Gate 11: Stop Condition Gate',
        rule: 'Pilot must have predefined immediate stop conditions.',
        evidence: [
          'Stop condition register',
          'Unauthorized write trigger',
          'Approval bypass trigger',
          'Sensitive exposure trigger',
        ],
      },
      {
        id: 'gate-12',
        title: 'Gate 12: Rollback Authority Gate',
        rule: 'Named person must have authority to pause, disable, or roll back the pilot.',
        evidence: [
          'Primary and backup rollback owner',
          'Disable procedure',
          'Communication plan',
          'Recovery checklist',
        ],
      },
    ],
    exitCriteria: [
      { criterion: 'Pilot scope signed', evidence: 'Pilot charter' },
      { criterion: 'Stop conditions approved', evidence: 'Stop condition register' },
      { criterion: 'Rollback tested', evidence: 'Rollback test record' },
    ],
  },
  {
    id: 'phase-5-pilot-runtime-governance',
    phase: 'Phase 5: Pilot Runtime Governance',
    objective:
      'Run the pilot under active supervision and gather evidence before expansion decisions.',
    timebox: 'Pilot runtime window',
    outcomes: [
      'Daily review loop active',
      'Weekly governance review active',
      'Evidence pack assembled for expansion decision',
    ],
    controlGates: [
      {
        id: 'gate-13',
        title: 'Gate 13: Evidence Gate',
        rule: 'No expansion based on opinion; expansion requires evidence.',
        evidence: [
          'Usage logs',
          'Error/approval/override/incident rates',
          'User feedback',
          'Time saved and quality review',
          'Risk change summary',
        ],
      },
      {
        id: 'gate-14',
        title: 'Gate 14: Incident Gate',
        rule: 'Any serious incident pauses expansion automatically.',
        evidence: [
          'Incident classification register (minor/moderate/major/critical)',
          'Pause-and-review execution record',
        ],
      },
    ],
    exitCriteria: [
      { criterion: 'Pilot completed', evidence: 'Pilot report' },
      { criterion: 'Incidents reviewed', evidence: 'Incident register' },
      { criterion: 'Expansion decision made', evidence: 'Go / No-Go decision record' },
    ],
  },
  {
    id: 'phase-6-expansion-readiness',
    phase: 'Phase 6: Expansion Readiness',
    objective: 'Decide whether the platform is ready to expand beyond the initial pilot.',
    timebox: 'Post-pilot decision window',
    outcomes: [
      'Residual risk accepted by owners',
      'Control scalability assessed',
      'Expansion scope constrained and approved',
    ],
    controlGates: [
      {
        id: 'gate-15',
        title: 'Gate 15: Risk Reassessment Gate',
        rule: 'Before expansion, reassess risk for new scope dimensions.',
        evidence: [
          'New workflow/user/data/integration risk review',
          'Compliance and dependency impact review',
        ],
      },
      {
        id: 'gate-16',
        title: 'Gate 16: Control Scalability Gate',
        rule: 'Controls must scale with load and adoption.',
        evidence: [
          'Approval workload assessment',
          'Monitoring/incident capacity assessment',
          'Logging volume/admin overhead/training support assessment',
        ],
      },
      {
        id: 'gate-17',
        title: 'Gate 17: Expansion Approval Gate',
        rule: 'Expansion requires formal multi-owner approval.',
        evidence: [
          'Platform owner approval',
          'Operations owner approval',
          'Admin approval',
          'Compliance/risk owner approval',
          'Technical owner approval',
        ],
      },
    ],
    exitCriteria: [
      { criterion: 'Expansion risk review complete', evidence: 'Updated risk register' },
      { criterion: 'Controls scaled', evidence: 'Control capacity assessment' },
      { criterion: 'Governance approval granted', evidence: 'Signed approval record' },
    ],
  },
]

export const governanceArtefacts: GovernanceArtefact[] = [
  { artefact: 'Platform Scope Statement', purpose: 'Defines mission and boundaries' },
  { artefact: 'Prohibited Action Register', purpose: 'Lists blocked actions' },
  { artefact: 'High-Risk Action Catalogue', purpose: 'Identifies sensitive actions' },
  { artefact: 'Risk Register', purpose: 'Tracks risks, owners, controls' },
  { artefact: 'Agent Ownership Map', purpose: 'Assigns accountability' },
  { artefact: 'Decision Authority Matrix', purpose: 'Defines who approves what' },
  { artefact: 'Integration Register', purpose: 'Tracks connected systems' },
  { artefact: 'Data Flow Map', purpose: 'Shows data movement' },
  { artefact: 'Rollback Plan', purpose: 'Defines recovery process' },
  { artefact: 'Incident Register', purpose: 'Tracks failures and near misses' },
  { artefact: 'Audit Log Standard', purpose: 'Defines logging requirements' },
  { artefact: 'Pilot Charter', purpose: 'Defines controlled pilot conditions' },
  { artefact: 'Expansion Readiness Report', purpose: 'Supports go/no-go decision' },
]

export const governanceDecisionModel: GovernanceDecisionModel[] = [
  {
    decision: 'go',
    label: 'Go',
    conditions: [
      'Scope is controlled',
      'Risks are owned',
      'Controls are tested',
      'Logs are complete',
      'Rollback works',
      'Owners approve',
      'Users are briefed',
      'Stop conditions are active',
    ],
  },
  {
    decision: 'conditional-go',
    label: 'Conditional Go',
    conditions: [
      'Minor defects remain',
      'Risk is understood',
      'Compensating controls exist',
      'Additional monitoring is applied',
      'Expansion remains limited',
    ],
  },
  {
    decision: 'no-go',
    label: 'No-Go',
    conditions: [
      'Ownership is unclear',
      'Production write controls are untested',
      'Sensitive workflows lack rollback',
      'Audit logs are incomplete',
      'Approval paths are ambiguous',
      'High-risk actions are not classified',
      'Incident response is not ready',
      'Platform behaves unpredictably',
    ],
  },
]

export const governanceCommandPrinciple =
  'The platform should not be judged by what it can do. It should be judged by what it refuses to do without authority.'
