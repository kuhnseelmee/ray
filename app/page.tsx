import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { getSiteSettings } from '@/lib/site-settings'

const services = [
  {
    title: 'IT Support & Computer Repair',
    description: 'Troubleshooting, repairs, maintenance, and remote support for all your computing needs.',
  },
  {
    title: 'Websites & Web Systems',
    description: 'Building practical websites and web applications that actually solve your business problems.',
  },
  {
    title: 'Business Systems & Workflow',
    description: 'Streamlining processes and improving efficiency without unnecessary complexity.',
  },
  {
    title: 'Technical Troubleshooting',
    description: 'Diagnosing and fixing broken systems quickly and effectively.',
  },
  {
    title: 'Automation & AI Solutions',
    description: 'Setting up automation and AI-assisted solutions to save time and reduce manual work.',
  },
  {
    title: 'Digital Design & Support',
    description: 'Creating clean, functional digital designs and marketing materials.',
  },
]

const whyWorkWithMe = [
  {
    title: 'Practical approach',
    description: 'Focus on solutions that work, not theoretical complexity.',
  },
  {
    title: 'Real experience',
    description: 'Years of hands-on work across multiple industries.',
  },
  {
    title: 'No jargon',
    description: 'Clear communication at your pace.',
  },
  {
    title: 'Long-term thinking',
    description: 'Building relationships, not just fixing problems.',
  },
]

export default async function Home() {
  const siteSettings = await getSiteSettings()

  return (
    <div className="bg-light">
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6">
              Practical technology help for real-world business problems
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
              I help businesses and individuals solve technical problems, improve systems, and build practical 
              digital solutions without unnecessary complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={siteSettings.heroCtaHref || '/contact'}>
                <Button size="lg" className="w-full sm:w-auto">
                  {siteSettings.heroCtaLabel || 'Book a consultation'}
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">
            What I do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.title} href="/services">
                <Card className="h-full hover:border-primary transition-colors">
                  <CardContent>
                    <h3 className="text-lg font-semibold text-dark mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">
            Why work with me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyWorkWithMe.map((item) => (
              <Card key={item.title} className="text-center">
                <CardContent>
                  <h3 className="text-lg font-semibold text-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark text-center mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
            Whether you need help fixing a broken system, building something new, or improving 
            what you already have, I'm here to help.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button size="lg">Get in touch</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
