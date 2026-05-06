import Link from 'next/link'
import type { Project } from '@/types/content'

interface ProjectCardProps {
  project: Project
}

const statusLabels = {
  active: { label: 'Active', class: 'bg-green-100 text-green-800' },
  completed: { label: 'Completed', class: 'bg-blue-100 text-blue-800' },
  in_progress: { label: 'In Progress', class: 'bg-yellow-100 text-yellow-800' },
  archived: { label: 'Archived', class: 'bg-gray-100 text-gray-800' }
}

const categoryLabels: Record<string, { label: string }> = {
  systems: { label: 'Systems' },
  software: { label: 'Software' },
  automation: { label: 'Automation' },
  cybersecurity: { label: 'Security' },
  'business-operations': { label: 'Operations' },
  creative: { label: 'Creative' }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const status = statusLabels[project.status]
  const category = categoryLabels[project.category]?.label || project.category

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6 h-full">
        <div className="flex items-start justify-between mb-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${status.class}`}>
            {status.label}
          </span>
          <span className="text-xs text-gray-500">
            {category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-dark mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.stack.slice(0, 4).map((tech) => (
            <span 
              key={tech}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2 py-1 text-gray-500 text-xs">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        <div className="text-sm text-gray-500">
          <span className="font-medium text-green-700">→ </span>
          {project.outcome.substring(0, 80)}...
        </div>
      </div>
    </Link>
  )
}