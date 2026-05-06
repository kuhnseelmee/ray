export interface FAQItem {
  question: string;
  answer: string;
  category: 'services' | 'availability' | 'pricing' | 'process' | 'technical';
}

export const faq: FAQItem[] = [
  {
    question: 'What services do you offer?',
    answer: 'I offer IT support and computer repair, websites and web systems, business systems and workflow improvement, technical troubleshooting, automation and AI solutions, and digital design. Check the services page for full details.',
    category: 'services',
  },
  {
    question: 'Do you work remotely?',
    answer: 'Yes. Most of my work is done remotely which lets me help clients anywhere. I also work with clients in the local area when on-site work is needed.',
    category: 'availability',
  },
  {
    question: 'How quickly can you help?',
    answer: 'I typically respond within 24-48 hours. For urgent issues, let me know in your message and I will prioritise where possible.',
    category: 'availability',
  },
  {
    question: 'Do you offer consulting?',
    answer: 'Yes. I provide technical consulting for small businesses, including IT strategy, system planning, and process improvement advice.',
    category: 'services',
  },
  {
    question: 'Can you help with automation?',
    answer: 'Yes. I set up automation using tools like Zapier, Make, and custom scripts to reduce manual repetitive work.',
    category: 'services',
  },
  {
    question: 'What kinds of businesses do you work with?',
    answer: 'Mainly small businesses, service organisations, property managers, and operators who need practical technical help. I work with a range of industries including healthcare operations, disability services, and property management.',
    category: 'availability',
  },
  {
    question: 'How does the process work?',
    answer: 'Get in touch with a description of what you need. I will respond to discuss the situation, and we decide on next steps together. No high-pressure sales.',
    category: 'process',
  },
  {
    question: 'What are your rates?',
    answer: 'Rates vary depending on the work. I am happy to discuss your specific needs in our initial conversation. I do not do fixed-blind estimates for complex work.',
    category: 'pricing',
  },
  {
    question: 'Do you work with AI and automation?',
    answer: 'Yes. I help businesses set up AI-assisted workflows and automation to save time and reduce manual work. This includes smart integrations and process automation.',
    category: 'technical',
  },
  {
    question: 'Do you handle ongoing maintenance?',
    answer: 'Yes. I offer ongoing support and maintenance arrangements for clients who need continuous technical support. We can discuss what makes sense for your situation.',
    category: 'services',
  },
]

export function getFAQByCategory(category: FAQItem['category']): FAQItem[] {
  return faq.filter(f => f.category === category)
}