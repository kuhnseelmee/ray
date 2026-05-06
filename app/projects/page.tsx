import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects | Ray Wooler',
  description: 'Real projects demonstrating practical capability. See how I solve real problems with real solutions.',
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'systems', label: 'Systems' },
  { id: 'software', label: 'Software' },
  { id: 'automation', label: 'Automation' },
  { id: 'cybersecurity', label: 'Security' },
  { id: 'business-operations', label: 'Operations' },
]

export default function Projects() {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-6">
            Proof through execution
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Real projects demonstrating what I can do. Not case studies fabricated for marketing—actual work with actual outcomes.
          </p>
          <Link 
            href="/contact"
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Discuss your project
          </Link>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark mb-4">
            Have a project in mind?
          </h2>
          <p className="text-gray-600 mb-8">
            Let's discuss what you need. I don't do fixed-blind estimates for complex work—we'll figure out the approach together.
          </p>
          <Link 
            href="/contact"
            className="px-8 py-4 bg-primary text-white text-lg font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  )
}