export interface PortfolioItem {
  slug: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  toolsUsed: string[];
  outcome: string;
  tags: string[];
  link?: string;
  possibleQuestions: string[];
}

export const portfolio: PortfolioItem[] = [
  {
    slug: 'business-website-build',
    title: 'Business Website Development',
    summary: 'Built a modern website with booking system for a local service business.',
    challenge: 'The client needed an online presence with appointment scheduling but had no existing web infrastructure.',
    solution: 'Created a clean WordPress site with custom booking plugin and calendar integration.',
    toolsUsed: ['WordPress', 'PHP', 'MySQL', 'Google Calendar API', 'Tailwind CSS'],
    outcome: 'Client can now accept bookings 24/7. Reduced phone calls by 60% in first month.',
    tags: ['web development', 'booking system', 'small business'],
    possibleQuestions: [
      'How long did this take?',
      'Can you do something similar for my industry?',
      'What platform do you recommend?',
    ],
  },
  {
    slug: 'network-recovery',
    title: 'Network Recovery After outage',
    summary: 'Diagnosed and recovered a small office network after complete failure.',
    challenge: 'Office network went down with critical business data inaccessible during peak hours.',
    solution: 'Identified failed router, temporarily routed through backup, ordered replacement, restored full network within 4 hours.',
    toolsUsed: ['Cisco networking', 'Router configuration', 'UDP/TCP diagnostics', ' DHCP'],
    outcome: 'Full recovery with data intact. Implemented backup solution to prevent future downtime.',
    tags: ['networking', 'disaster recovery', 'small business'],
    possibleQuestions: [
      'How quickly can you respond?',
      'Do you handle ongoing maintenance?',
      'What backup solutions do you recommend?',
    ],
  },
  {
    slug: 'workflow-automation',
    title: 'Business Workflow Automation',
    summary: 'Automated manual processes for a小型 business, reducing data entry by 70%.',
    challenge: 'Client was spending 15+ hours weekly on manual data entry across multiple spreadsheets.',
    solution: 'Built automated workflow with Zapier integration and custom Google Sheets scripts.',
    toolsUsed: ['Zapier', 'Google Sheets', 'Apps Script', 'Slack', 'Email automation'],
    outcome: 'Reduced manual work from 15 hours to 4 hours weekly. Staff focused on higher-value work.',
    tags: ['automation', 'workflow', 'efficiency', 'small business'],
    possibleQuestions: [
      'What tools do you use for automation?',
      'How long does setup take?',
      'Do I need technical knowledge to maintain it?',
    ],
  },
  {
    slug: 'computer-repair-rescue',
    title: 'Computer Repair & Data Recovery',
    summary: 'Rescued critical business data from a non-booting system.',
    challenge: 'Key employee computer would not boot. 10 years of business records at risk.',
    solution: 'Diagnosed failed drive, retrieved data via Linux live USB, cloned to new drive, verified all files.',
    toolsUsed: ['Linux rescue distro', 'USB boot', 'Drive cloning', 'File recovery tools'],
    outcome: '100% data recovered. Computer running within 24 hours. Client was expecting total loss.',
    tags: ['computer repair', 'data recovery', 'hardware'],
    possibleQuestions: [
      'Can you recover from my specific failure?',
      'How long does recovery take?',
      'Is there a guarantee?',
    ],
  },
  {
    slug: 'dashboard-creation',
    title: 'Business Dashboard Creation',
    summary: 'Created unified dashboard showing key business metrics in one view.',
    challenge: 'Client had data spread across 5 different systems and no easy way to see overall business health.',
    solution: 'Built Google Data Studio dashboard with automatic data pulls from each source.',
    toolsUsed: ['Google Data Studio', 'BigQuery', 'API integrations', 'Sheets'],
    outcome: 'Client now sees daily health report. Makes decisions based on data, not gut feeling.',
    tags: ['data', 'dashboard', 'business intelligence'],
    possibleQuestions: [
      'What data sources can you connect?',
      'How often does it update?',
      'Can staff access it?',
    ],
  },
  {
    slug: 'system-migration',
    title: 'System Migration',
    summary: 'Migrated business from legacy system to modern cloud infrastructure.',
    challenge: 'Client using 15-year-old software with no support. Fear of data loss causing migration reluctance.',
    solution: 'Phased migration with parallel running, data validation at each step, staff training.',
    toolsUsed: ['Google Workspace', 'Cloud migration tools', 'CSV transformations', 'Team training'],
    outcome: 'Zero data loss. Staff trained and comfortable. Monthly costs reduced by 40%.',
    tags: ['migration', 'cloud', 'modernization'],
    possibleQuestions: [
      'How long does migration take?',
      'Will I lose access during migration?',
      'Do you train staff?',
    ],
  },
]

export function getPortfolioBySlug(slug: string): PortfolioItem | undefined {
  return portfolio.find(p => p.slug === slug)
}