import Link from 'next/link'
import type { SkillGroup } from '@/types/content'

interface SkillGroupCardProps {
  group: SkillGroup
}

const confidenceColors = {
  advanced: 'bg-green-100 text-green-800',
  strong: 'bg-blue-100 text-blue-800',
  developing: 'bg-yellow-100 text-yellow-800'
}

export function SkillGroupCard({ group }: SkillGroupCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6">
      <h3 className="text-lg font-bold text-dark mb-2">
        {group.category}
      </h3>
      
      <p className="text-sm text-gray-600 mb-4">
        {group.context}
      </p>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {group.items.map((skill) => (
            <span 
              key={skill}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg mb-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Proof
        </p>
        <p className="text-sm text-gray-700 mb-2">
          {group.proof.example}
        </p>
        <p className="text-sm text-green-700 font-medium">
          → {group.proof.outcome}
        </p>
      </div>

      {group.proof.relatedProjectIds.length > 0 && (
        <div className="mb-4">
          <Link 
            href={`/projects/${group.proof.relatedProjectIds[0]}`}
            className="text-sm text-primary hover:underline"
          >
            See proof in action →
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-1">
        {group.relatedServices.map((serviceId) => (
          <Link 
            key={serviceId}
            href={`/services#${serviceId}`}
            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100"
          >
            {serviceId.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </div>
  )
}