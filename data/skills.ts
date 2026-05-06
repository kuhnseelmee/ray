import type { SkillGroup } from '@/types/content'

export const skills: SkillGroup[] = [
  {
    id: 'systems-architecture',
    category: 'Systems Architecture & Workflow Design',
    context: 'Designing practical systems that connect people, data, tools, and decisions into repeatable workflows.',
    items: ['Workflow mapping', 'Process redesign', 'Operational system design', 'Event-driven thinking', 'Governance-aware workflows', 'Failure-point analysis'],
    relatedServices: ['systems-automation', 'custom-dashboards'],
    proof: {
      example: 'Designed structured operational systems for Amma Care Connect, including document management, workflow automation, property management concepts, and agent-based orchestration.',
      outcome: 'Reduced platform ambiguity by turning scattered operational needs into defined modules, workflows, and build instructions.',
      relatedProjectIds: ['amma-care-connect']
    }
  },
  {
    id: 'software-development',
    category: 'Software Development',
    context: 'Building practical tools, scripts, interfaces, and application logic across multiple languages and environments.',
    items: ['JavaScript', 'TypeScript', 'Python', 'Perl / CGI', 'SQL', 'HTML', 'CSS', 'Bootstrap'],
    relatedServices: ['custom-dashboards', 'ai-assisted-business'],
    proof: {
      example: 'Built and planned systems using Perl/CGI, MySQL, Bootstrap, Python, JavaScript, and modern web stacks for repair, property, and operational workflows.',
      outcome: 'Created working pathways from raw operational problems to usable software tools.',
      relatedProjectIds: ['computer-repair-workflow', 'personal-website']
    }
  },
  {
    id: 'frontend-web',
    category: 'Web Development & Frontend Systems',
    context: 'Creating clear, usable interfaces that present information cleanly and support real user actions.',
    items: ['Responsive layouts', 'React fundamentals', 'Next.js structure', 'Tailwind CSS', 'Bootstrap UI', 'Component-based design', 'Form layouts'],
    relatedServices: ['custom-dashboards'],
    proof: {
      example: 'Designed dashboard concepts for property management, document management, service workflows, and operational command views.',
      outcome: 'Turned complex information into structured interfaces that are easier to navigate and act on.',
      relatedProjectIds: ['amma-care-connect', 'personal-website']
    }
  },
  {
    id: 'backend-databases-apis',
    category: 'Backend, Databases & APIs',
    context: 'Structuring the server-side logic, database foundations, and integrations needed to make systems reliable.',
    items: ['MySQL', 'PostgreSQL concepts', 'REST API planning', 'Data modelling', 'Authentication concepts', 'Server-side scripting', 'Import/export workflows'],
    relatedServices: ['custom-dashboards', 'data-optimisation'],
    proof: {
      example: 'Planned and implemented database-backed workflows for repair scheduling, property operations, document indexing, and automation systems.',
      outcome: 'Created structured backends that support reporting, automation, and future scaling.',
      relatedProjectIds: ['amma-care-connect', 'computer-repair-workflow']
    }
  },
  {
    id: 'automation-ai',
    category: 'Automation & AI-Assisted Workflows',
    context: 'Using automation and AI tools to reduce repetitive work while keeping humans in control of important decisions.',
    items: ['n8n workflow planning', 'Prompt system design', 'AI-assisted documentation', 'Document indexing concepts', 'Local AI tooling', 'Open WebUI / Ollama workflows', 'Notification logic'],
    relatedServices: ['systems-automation', 'ai-assisted-business'],
    proof: {
      example: 'Developed detailed plans for AI-assisted agents including DocBot, NotifyBot, and AMA-style orchestration for operational support.',
      outcome: 'Created safer automation designs with review points, auditability, and controlled execution instead of blind automation.',
      relatedProjectIds: ['local-ai-automation-stack']
    }
  },
  {
    id: 'it-support-infrastructure',
    category: 'IT Support, Diagnostics & Infrastructure',
    context: 'Hands-on technical support across devices, systems, hosting, local environments, and troubleshooting.',
    items: ['Computer diagnostics', 'Windows support', 'Linux environments', 'Docker basics', 'Networking basics', 'Hosting and cPanel', 'Backup and recovery thinking', 'Hardware and peripheral support'],
    relatedServices: ['it-support-consulting'],
    proof: {
      example: 'Worked across computer repair, retail service, warranty handling, systems administration, hosting, and local development environments.',
      outcome: 'Built a practical support skillset grounded in real faults, real users, and real constraints.',
      relatedProjectIds: ['computer-repair-workflow']
    }
  },
  {
    id: 'cybersecurity-risk',
    category: 'Cybersecurity Awareness & Risk Reduction',
    context: 'Helping people and organisations understand practical digital risks and reduce common exposure points.',
    items: ['Threat awareness', 'Phishing education', 'Account security', 'MFA guidance', 'Basic hardening', 'Privacy-aware workflows', 'Incident prevention thinking'],
    relatedServices: ['cybersecurity-awareness'],
    proof: {
      example: 'Prepared cybersecurity education material focused on real-world threats, plain-language prevention, and practical safety habits.',
      outcome: 'Converted complex security topics into advice that ordinary users and small teams can act on.',
      relatedProjectIds: ['cybersecurity-education-material']
    }
  },
  {
    id: 'business-property-operations',
    category: 'Business Operations, Property Systems & Stakeholder Coordination',
    context: 'Connecting technical systems to operational reality, especially where people, properties, compliance, and communication intersect.',
    items: ['Property management workflows', 'Stakeholder communication', 'Operational documentation', 'Supplier coordination', 'Maintenance tracking', 'NDIS service context awareness', 'Compliance-oriented thinking'],
    relatedServices: ['systems-automation', 'data-optimisation'],
    proof: {
      example: 'Worked on property management and IT systems for an NDIS service provider, including operational workflows, property documentation, and dashboard concepts.',
      outcome: 'Bridged the gap between technology, compliance pressure, and day-to-day service operations.',
      relatedProjectIds: ['amma-care-connect']
    }
  }
]

export function getSkillById(id: string): SkillGroup | undefined {
  return skills.find(s => s.id === id)
}