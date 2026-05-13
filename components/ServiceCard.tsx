import Link from 'next/link'
import type { Service } from '@/types/content'

interface ServiceCardProps {
  service: Service
  showRelatedProjects?: boolean
}

export function ServiceCard({ service, showRelatedProjects = false }: ServiceCardProps) {
  return (
    <div id={service.id} className="scroll-mt-24 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark mb-2">
          {service.title}
        </h3>
        
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Problem: </span>
            {service.problem}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-700">
            <span className="font-medium text-gray-700">Solution: </span>
            {service.solution}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Deliverables
          </p>
          <ul className="space-y-1">
            {service.deliverables.slice(0, 4).map((del, i) => (
              <li key={i} className="flex items-start text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                {del}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Outcomes
          </p>
          <ul className="space-y-1">
            {service.outcomes.slice(0, 3).map((out, i) => (
              <li key={i} className="flex items-start text-sm text-gray-600">
                <span className="text-blue-500 mr-2">→</span>
                {out}
              </li>
            ))}
          </ul>
        </div>

        {showRelatedProjects && service.relatedProjects.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs font-medium text-blue-700 uppercase tracking-wide mb-2">
              Related Projects ({service.relatedProjects.length})
            </p>
            <Link 
              href={`/projects/${service.relatedProjects[0]}`}
              className="text-sm text-primary hover:underline"
            >
              View project evidence →
            </Link>
          </div>
        )}

        <Link 
          href={service.cta.href}
          className="block w-full px-4 py-3 bg-primary text-white text-center font-medium rounded-lg hover:bg-primary-dark transition-colors"
        >
          {service.cta.label}
        </Link>
      </div>
    </div>
  )
}
