export interface Service {
  slug: string;
  name: string;
  summary: string;
  whoItFor: string;
  problemsSolved: string[];
  deliverables: string[];
  exampleOutcomes: string[];
  ctaLabel: string;
}

export const services: Service[] = [
  {
    slug: 'it-support',
    name: 'IT Support & Computer Repair',
    summary: 'Troubleshooting, repairs, maintenance, and remote support for all your computing needs.',
    whoItFor: 'Individuals and small businesses who need fast, reliable technical help.',
    problemsSolved: [
      'Slow or unresponsive computers',
      'Virus and malware removal',
      'Hardware issues and diagnostics',
      'Software conflicts and errors',
      'Data recovery',
      'System setup and configuration',
    ],
    deliverables: [
      'Working systems',
      'Maintenance plans',
      'Remote support sessions',
      'Preventive recommendations',
    ],
    exampleOutcomes: [
      'Recovered data from a failed hard drive',
      'Set up reliable backup system',
      'Removed ransomware and secured network',
    ],
    ctaLabel: 'Get IT Support',
  },
  {
    slug: 'websites',
    name: 'Websites & Web Systems',
    summary: 'Building practical websites and web applications that actually solve your business problems.',
    whoItFor: 'Businesses needing an online presence or custom web tools.',
    problemsSolved: [
      'Need a new website',
      'Outdated or broken site',
      'Custom web application needed',
      'Booking or scheduling system',
      'Online forms and data collection',
    ],
    deliverables: [
      'New websites',
      'Web applications',
      'API integrations',
      'Content management systems',
    ],
    exampleOutcomes: [
      'Built booking system for service business',
      'Created custom CRM integration',
      'Migrated old site to modern platform',
    ],
    ctaLabel: 'Discuss Your Website',
  },
  {
    slug: 'business-systems',
    name: 'Business Systems & Workflow',
    summary: 'Streamlining processes and improving efficiency without unnecessary complexity.',
    whoItFor: 'Small businesses and organisations looking to work smarter.',
    problemsSolved: [
      'Manual and repetitive processes',
      'Data scattered in multiple places',
      'Inefficient workflows',
      'Lack of organisation',
    ],
    deliverables: [
      'Automated workflows',
      'Integrations between systems',
      'Process documentation',
      'Efficiency reports',
    ],
    exampleOutcomes: [
      'Automated invoice processing',
      'Reduced data entry by 70%',
      'Created unified dashboard',
    ],
    ctaLabel: 'Improve Your Workflow',
  },
  {
    slug: 'troubleshooting',
    name: 'Technical Troubleshooting & Recovery',
    summary: 'Diagnosing and fixing broken systems quickly and effectively.',
    whoItFor: 'Anyone with technology problems they cannot resolve.',
    problemsSolved: [
      'System crashes and failures',
      'Data access issues',
      'Configuration problems',
      'Recovery from breakdown',
    ],
    deliverables: [
      'Working systems',
      'Recovered data',
      'Clear explanation of issues',
      'Prevention measures',
    ],
    exampleOutcomes: [
      'Fixed network outage in 2 hours',
      'Recovered 10 years of business records',
      'Resolved chronic crashes',
    ],
    ctaLabel: 'Fix My System',
  },
  {
    slug: 'automation',
    name: 'Automation & AI Solutions',
    summary: 'Setting up automation and AI-assisted solutions to save time and reduce manual work.',
    whoItFor: 'Businesses wanting to reduce manual repetitive tasks.',
    problemsSolved: [
      'Too much time on manual tasks',
      'Data entry overhead',
      'Notification handling',
      'Report generation',
    ],
    deliverables: [
      'Automated workflows',
      'AI-assisted processes',
      'Time savings analysis',
      'Integration setups',
    ],
    exampleOutcomes: [
      'Automated appointment reminders',
      'Auto-categorized support tickets',
      'Weekly reports on autopilot',
    ],
    ctaLabel: 'Automate Something',
  },
  {
    slug: 'digital-design',
    name: 'Digital Design & Marketing',
    summary: 'Creating clean, functional digital designs and marketing materials.',
    whoItFor: 'Businesses needing professional digital presence.',
    problemsSolved: [
      'Need marketing materials',
      'Social media graphics',
      'Presentations',
      'Professional documents',
    ],
    deliverables: [
      'Designed materials',
      'Brand templates',
      'Social assets',
      'Presentation decks',
    ],
    exampleOutcomes: [
      'Created brand style guide',
      'Built presentation templates',
      ' Designed social media kit',
    ],
    ctaLabel: 'Design Something',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug)
}