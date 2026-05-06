import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectById } from '@/data/projects'
import { getServiceById } from '@/data/services'
import { getSkillById } from '@/data/skills'

interface ProjectPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectById(params.id)
  if (!project) {
    return { title: 'Project Not Found' }
  }
  return {
    title: `${project.title} | Projects`,
    description: project.summary,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.id)

  if (!project) {
    notFound()
  }

  const statusLabels = {
    active: { label: 'Active', class: 'bg-green-100 text-green-800' },
    completed: { label: 'Completed', class: 'bg-blue-100 text-blue-800' },
    in_progress: { label: 'In Progress', class: 'bg-yellow-100 text-yellow-800' },
    archived: { label: 'Archived', class: 'bg-gray-100 text-gray-800' }
  }

  const status = statusLabels[project.status]

  return (
    <div className="bg-light">
      {/* Back Navigation */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects" className="text-primary hover:underline text-sm">
            ← Back to Projects
          </Link>
        </div>
      </section>

      {/* Project Header */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${status.class}`}>
              {status.label}
            </span>
            <span className="text-gray-500 text-sm capitalize">
              {project.category}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-dark mb-4">
            {project.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Context & Problem */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold text-dark mb-3">Context</h2>
              <p className="text-gray-600">{project.context}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold text-dark mb-3">The Problem</h2>
              <p className="text-gray-600">{project.problem}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark mb-6">The Solution</h2>
          <p className="text-gray-600 mb-8">{project.solution}</p>
          
          <h3 className="text-lg font-bold text-dark mb-4">Implementation</h3>
          <ul className="space-y-2 mb-8">
            {project.implementation.map((item, i) => (
              <li key={i} className="flex items-start text-gray-600">
                <span className="text-primary mr-3">•</span>
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-bold text-dark mb-4">Features</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.features.map((feature) => (
              <span 
                key={feature}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="py-12 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark mb-4">Outcome</h2>
          <p className="text-lg text-gray-700 mb-6">{project.outcome}</p>
          
          {project.metrics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.metrics.performance && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Performance</p>
                  <p className="text-gray-700">{project.metrics.performance}</p>
                </div>
              )}
              {project.metrics.efficiency && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Efficiency</p>
                  <p className="text-gray-700">{project.metrics.efficiency}</p>
                </div>
              )}
              {project.metrics.impact && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Impact</p>
                  <p className="text-gray-700">{project.metrics.impact}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Related Services & Skills */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark mb-6">Related</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">Services</h3>
              <div className="flex flex-wrap gap-2">
                {project.relatedServices.map((serviceId) => {
                  const service = getServiceById(serviceId)
                  return service ? (
                    <Link 
                      key={serviceId}
                      href={`/services#${serviceId}`}
                      className="px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      {service.title}
                    </Link>
                  ) : null
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">Skills Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.relatedSkills.map((skillId) => {
                  const skill = getSkillById(skillId)
                  return skill ? (
                    <span 
                      key={skillId}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg"
                    >
                      {skill.category}
                    </span>
                  ) : null
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">
            Have a similar project in mind?
          </h2>
          <p className="text-gray-600 mb-6">
            Let's discuss what you need. I can help plan and execute something similar.
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