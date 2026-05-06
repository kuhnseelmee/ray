import type { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/data/services'
import { ServiceCard } from '@/components/ServiceCard'

export const metadata: Metadata = {
  title: 'Services | Ray',
  description: 'Practical systems, workflow automation, dashboards, IT support, cybersecurity awareness, data cleanup, and AI-assisted business systems.',
}

const processSteps = [
  { 
    title: 'Diagnose', 
    description: 'I identify the real problem, not just the symptoms you see.' 
  },
  { 
    title: 'Simplify', 
    description: 'I find the simplest solution that actually solves the problem.' 
  },
  { 
    title: 'Build', 
    description: 'I implement practical solutions that work in the real world.' 
  },
  { 
    title: 'Support', 
    description: 'I stick around to make sure things keep working.' 
  },
]

export default function Services() {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-6">
            Practical systems, automation, and technical support that solve real operational problems.
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            I help individuals, small businesses, and service providers improve how their technology, data, workflows, and systems operate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              Request a consultation
            </Link>
            <Link 
              href="/skills"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              View skills
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} showRelatedProjects />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">
            How I work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark mb-6">
            Why these services work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-dark mb-2">Focused on outcomes</h3>
              <p className="text-sm text-gray-600">I solve real problems, not just implement tech for its own sake.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="font-bold text-dark mb-2">Hands-on experience</h3>
              <p className="text-sm text-gray-600">Decades of real-world troubleshooting across multiple industries.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-bold text-dark mb-2">No gatekeeping</h3>
              <p className="text-sm text-gray-600">Clear communication. I explain things at your pace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-600 mb-8">
            Tell me what problem you're trying to solve. We'll figure out the best approach together.
          </p>
          <Link 
            href="/contact"
            className="px-8 py-4 bg-primary text-white text-lg font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Request a consultation
          </Link>
        </div>
      </section>
    </div>
  )
}