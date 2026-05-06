import type { Project } from '@/types/content'

export const projects: Project[] = [
  {
    id: 'amma-care-connect',
    title: 'Amma Care Connect',
    category: 'systems',
    status: 'active',
    summary: 'NDIS operations platform with property management, document intelligence, and comprehensive workflow automation.',
    context: 'An NDIS service provider needed to unify their operations across property management, participant services, and compliance requirements.',
    problem: 'Scattered systems, manual processes, poor visibility into operations, and compliance pressure mounting.',
    solution: 'Designed a structured operations platform connecting property management, document workflows, task tracking, and compliance-oriented architecture.',
    implementation: [
      'Property management module',
      'Document intelligence workflows',
      'Task and participant tracking',
      'Automated notifications',
      'Audit trail and compliance logging',
      'Dashboard for operational visibility'
    ],
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'n8n', 'Docker'],
    features: [
      'Role-based access control',
      'Document workflow automation',
      'Property lifecycle management',
      'Compliance reporting',
      'Notification system',
      'Audit trail'
    ],
    outcome: 'Transformed scattered operational needs into defined modules, automated workflows, and a buildable system. Reduced ambiguity and provided clear operational visibility.',
    metrics: {
      efficiency: 'Automated 60% of manual document handling',
      impact: 'Clear compliance pathway for NDIS requirements'
    },
    relatedServices: ['systems-automation', 'custom-dashboards', 'data-optimisation'],
    relatedSkills: ['systems-architecture', 'frontend-web', 'backend-databases-apis', 'business-property-operations']
  },
  {
    id: 'personal-website',
    title: 'Personal Website',
    category: 'software',
    status: 'in_progress',
    summary: 'Conversion-focused personal website with structured content architecture connecting services, skills, and projects.',
    context: 'Ray needed a professional website to demonstrate capabilities and convert visitors into enquiries.',
    problem: 'No clear online presence, potential clients unable to understand services or credibility.',
    solution: 'Built a Next.js website with unified content system, AI assistant, and conversion-focused design.',
    implementation: [
      'Services page with structured offers',
      'Skills page with proof-driven content',
      'Projects page with real examples',
      'AI assistant (Frank) for engagement',
      'Smart contact form with intake classification',
      'Docker deployment ready'
    ],
    stack: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Docker'],
    features: [
      'Responsive design',
      'AI-powered assistant',
      'Smart contact intake',
      'Service/skill relationship mapping',
      'Portfolio Q&A capability',
      'SEO optimized'
    ],
    outcome: 'Production-ready website demonstrating technical capability while generating leads.',
    metrics: {
      impact: 'Provides credibility proof and conversion pathway'
    },
    relatedServices: ['custom-dashboards', 'ai-assisted-business'],
    relatedSkills: ['software-development', 'frontend-web', 'automation-ai']
  },
  {
    id: 'computer-repair-workflow',
    title: 'Computer Repair / Technical Support Workflow',
    category: 'business-operations',
    status: 'active',
    summary: 'Technical triage, repair estimation, service tracking, and client communication system.',
    context: 'A computer repair service needed to systematize their workflow from customer contact through repair completion.',
    problem: 'Inconsistent tracking, unclear status updates, manual follow-up, and no systematic estimation process.',
    solution: 'Built a workflow system covering triage, estimation, repair tracking, and client communication.',
    implementation: [
      'Initial triage questionnaire',
      'Repair estimation logic',
      'Status tracking dashboard',
      'Client notification system',
      'Completion workflow',
      'Follow-up automation'
    ],
    stack: ['Google Sheets', 'Apps Script', 'Zapier', 'Email automation'],
    features: [
      'Automated status updates',
      'Estimation templates',
      'Repair tracking',
      'Client communication',
      'Reporting dashboard'
    ],
    outcome: 'Systematic approach to repair workflow with clear status visibility and automated client communication.',
    metrics: {
      efficiency: 'Reduced manual status updates by 70%',
      impact: 'Clear customer communication pathway'
    },
    relatedServices: ['it-support-consulting', 'systems-automation'],
    relatedSkills: ['it-support-infrastructure', 'backend-databases-apis', 'automation-ai']
  },
  {
    id: 'local-ai-automation-stack',
    title: 'Local AI Automation Stack',
    category: 'automation',
    status: 'active',
    summary: 'Self-hosted AI tooling for automation workflows with controlled infrastructure.',
    context: 'Businesses want AI capabilities but need control, privacy, and governance over automated processes.',
    problem: 'Off-the-shelf AI solutions lack governance, can be expensive, and create dependency on external providers.',
    solution: 'Implemented local AI stack using Docker with Ollama, n8n for orchestration, and Open WebUI for interface.',
    implementation: [
      'Ollama installation and model management',
      'Open WebUI interface setup',
      'n8n workflow automation',
      'Document indexing pipeline',
      'Prompt template system',
      'Human review checkpoints'
    ],
    stack: ['Ollama', 'Open WebUI', 'n8n', 'Docker', 'Linux'],
    features: [
      'Local model hosting',
      'Workflow automation',
      'Document QA capability',
      'Controlled execution',
      'Audit logging',
      'Human-in-the-loop reviews'
    ],
    outcome: 'Governed AI automation without blind execution. Created safer automation with review points and auditability.',
    metrics: {
      efficiency: 'Automated document processing with human oversight',
      impact: 'Safer AI adoption with governance'
    },
    relatedServices: ['ai-assisted-business', 'systems-automation'],
    relatedSkills: ['automation-ai', 'it-support-infrastructure']
  },
  {
    id: 'cybersecurity-education-material',
    title: 'Cybersecurity Education Material',
    category: 'cybersecurity',
    status: 'in_progress',
    summary: 'Practical cybersecurity education for small businesses and community groups.',
    context: 'Most security failures come from lack of awareness rather than technical gaps.',
    problem: 'Small businesses and community groups lack practical security knowledge and are vulnerable to scams.',
    solution: 'Created plain-language security education covering practical threats, prevention habits, and response procedures.',
    implementation: [
      'Threat awareness presentations',
      'Password and account security guide',
      'Device hardening checklist',
      'Phishing recognition training',
      'Incident response guide',
      'Small business security checklist'
    ],
    stack: ['Google Slides', 'Notion', 'PDF templates'],
    features: [
      'Plain language explanations',
      'Actionable checklists',
      'Visual guides',
      'Real-world examples',
      'Response procedures'
    ],
    outcome: 'Converted complex security topics into advice ordinary users and small teams can act on.',
    metrics: {
      impact: 'Improved security awareness in community settings'
    },
    relatedServices: ['cybersecurity-awareness'],
    relatedSkills: ['cybersecurity-risk', 'it-support-infrastructure']
  }
]

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(p => p.category === category)
}