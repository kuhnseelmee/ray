import type { Service } from '@/types/content'

export const services: Service[] = [
  {
    id: 'systems-automation',
    title: 'Systems & Workflow Automation',
    shortTitle: 'Workflow Automation',
    problem: 'Manual admin, duplicated data entry, missed follow-ups, and disconnected systems waste time and create avoidable risk.',
    solution: 'I map the workflow, identify friction points, and build practical automations that move information between people, systems, and decisions.',
    deliverables: [
      'Workflow audit and process map',
      'Automation design using n8n, scripts, APIs, email, forms, or spreadsheets',
      'Notification and escalation logic',
      'Error handling and simple operational documentation'
    ],
    outcomes: [
      'Less repetitive admin',
      'Fewer missed tasks',
      'Clearer accountability',
      'More reliable operational flow'
    ],
    relatedSkills: ['systems-architecture', 'automation-ai', 'business-property-operations'],
    relatedProjects: ['amma-care-connect', 'computer-repair-workflow', 'local-ai-automation-stack'],
    cta: {
      label: 'Automate a workflow',
      href: '/contact?service=systems-automation'
    }
  },
  {
    id: 'custom-dashboards',
    title: 'Custom Dashboards & Web Tools',
    shortTitle: 'Dashboards & Tools',
    problem: 'Important information is often spread across spreadsheets, emails, apps, and memory. That makes decisions slower and mistakes easier.',
    solution: 'I build practical dashboards and web tools that centralise key information, expose what matters, and support better decisions.',
    deliverables: [
      'Admin dashboards',
      'Operational status screens',
      'Property, task, client, or job tracking tools',
      'Basic database-backed web applications',
      'Exportable reports where required'
    ],
    outcomes: [
      'One place to see what is happening',
      'Less dependency on scattered spreadsheets',
      'Faster decisions',
      'Better operational visibility'
    ],
    relatedSkills: ['frontend-web', 'backend-databases-apis', 'software-development'],
    relatedProjects: ['amma-care-connect', 'personal-website'],
    cta: {
      label: 'Build a dashboard',
      href: '/contact?service=custom-dashboards'
    }
  },
  {
    id: 'it-support-consulting',
    title: 'IT Support & Technical Consulting',
    shortTitle: 'IT Consulting',
    problem: 'Unstable devices, poor setups, unclear systems, and reactive fixes create frustration and downtime.',
    solution: 'I provide direct technical support, system reviews, setup guidance, and practical repair-oriented advice based on decades of hands-on experience.',
    deliverables: [
      'Computer diagnostics and repair guidance',
      'Device setup and optimisation',
      'Network and email troubleshooting',
      'Backup and recovery advice',
      'Practical technology planning'
    ],
    outcomes: [
      'More reliable systems',
      'Reduced downtime',
      'Clearer technical decisions',
      'Better protection against avoidable failure'
    ],
    relatedSkills: ['it-support-infrastructure', 'software-development'],
    relatedProjects: ['computer-repair-workflow'],
    cta: {
      label: 'Get technical help',
      href: '/contact?service=it-support-consulting'
    }
  },
  {
    id: 'cybersecurity-awareness',
    title: 'Cybersecurity Hardening & Awareness',
    shortTitle: 'Cybersecurity',
    problem: 'Most security failures come from weak passwords, poor habits, exposed accounts, unsafe devices, and lack of awareness.',
    solution: 'I review the practical risk points and help implement simple, strong security improvements that reduce exposure.',
    deliverables: [
      'Basic security audit',
      'Password and account safety review',
      'Multi-factor authentication setup guidance',
      'Device and browser hardening advice',
      'Cyber safety training material'
    ],
    outcomes: [
      'Lower risk of account compromise',
      'Better awareness of scams and phishing',
      'Improved device hygiene',
      'Clearer incident prevention habits'
    ],
    relatedSkills: ['cybersecurity-risk', 'it-support-infrastructure'],
    relatedProjects: ['cybersecurity-education-material'],
    cta: {
      label: 'Harden my systems',
      href: '/contact?service=cybersecurity-awareness'
    }
  },
  {
    id: 'data-optimisation',
    title: 'Data Cleanup, Reporting & Process Optimisation',
    shortTitle: 'Data & Reporting',
    problem: 'Messy spreadsheets, duplicated records, unclear reports, and poor data structure slow everything down.',
    solution: 'I clean, structure, and reshape data so it becomes easier to use, report on, migrate, or automate.',
    deliverables: [
      'Spreadsheet cleanup and restructuring',
      'Data model recommendations',
      'Report templates',
      'CSV/Excel import and export workflows',
      'Process improvement notes'
    ],
    outcomes: [
      'Cleaner records',
      'Faster reporting',
      'Reduced confusion',
      'Better foundation for automation'
    ],
    relatedSkills: ['backend-databases-apis', 'automation-ai', 'business-property-operations'],
    relatedProjects: ['amma-care-connect'],
    cta: {
      label: 'Clean up my data',
      href: '/contact?service=data-optimisation'
    }
  },
  {
    id: 'ai-assisted-business',
    title: 'AI-Assisted Business Systems',
    shortTitle: 'AI Systems',
    problem: 'Many teams want to use AI but do not know where it is safe, useful, or worth the effort.',
    solution: 'I help design controlled AI-assisted workflows that support drafting, summarising, triage, documentation, search, and decision support without handing the wheel to blind automation.',
    deliverables: [
      'AI workflow scoping',
      'Prompt and template systems',
      'Document and knowledge-base workflows',
      'Local or cloud AI tooling advice',
      'Governance and human-review checkpoints'
    ],
    outcomes: [
      'Faster drafting and documentation',
      'Better use of internal knowledge',
      'Reduced repetitive cognitive load',
      'Safer adoption of AI tools'
    ],
    relatedSkills: ['automation-ai', 'software-development', 'backend-databases-apis'],
    relatedProjects: ['local-ai-automation-stack'],
    cta: {
      label: 'Plan an AI workflow',
      href: '/contact?service=ai-assisted-business'
    }
  },
  {
    id: 'ndis-roi-calculator',
    title: 'ACC ROI Calculator for NDIS Providers',
    shortTitle: 'ROI Calculator',
    problem: 'NDIS providers often know a system change feels worthwhile, but they still need a clear business case showing where the savings come from and how the investment pays back.',
    solution: 'I build a practical ROI calculator that estimates admin savings, missed-shift savings, incident reduction, and compliance risk reduction so decision-makers can see the financial impact before committing.',
    deliverables: [
      'ROI model based on participant count, admin load, missed shifts, and incident frequency',
      'Spreadsheet or web-based calculator',
      'Scenario comparisons for conservative, expected, and best-case assumptions',
      'Plain-language summary for stakeholders and approvals'
    ],
    outcomes: [
      'Clearer business case for NDIS operations investment',
      'Faster decisions on whether a system or workflow is worth funding',
      'Better visibility into where savings are likely to come from',
      'More confidence when presenting the proposal to managers or directors'
    ],
    relatedSkills: ['backend-databases-apis', 'automation-ai', 'business-property-operations'],
    relatedProjects: ['amma-care-connect'],
    cta: {
      label: 'Estimate ROI',
      href: '#ndis-roi-calculator'
    }
  }
]

export function getServiceById(id: string): Service | undefined {
  return services.find(s => s.id === id)
}
