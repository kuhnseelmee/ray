import { services, getServiceById } from '@/data/services'
import { skills, getSkillById } from '@/data/skills'
import { projects, getProjectById } from '@/data/projects'
import type { ServiceId, SkillCategoryId } from '@/types/content'

export interface ValidationError {
  type: 'service' | 'skill' | 'project' | 'relationship';
  id: string;
  message: string;
}

export function validateContentGraph(): { valid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = []

  // Validate services
  for (const service of services) {
    // Check related skills exist
    for (const skillId of service.relatedSkills) {
      if (!getSkillById(skillId)) {
        errors.push({
          type: 'service',
          id: service.id,
          message: `Service "${service.id}" references non-existent skill "${skillId}"`
        })
      }
    }

    // Check related projects exist
    for (const projectId of service.relatedProjects) {
      if (!getProjectById(projectId)) {
        errors.push({
          type: 'service',
          id: service.id,
          message: `Service "${service.id}" references non-existent project "${projectId}"`
        })
      }
    }

    // Check CTA exists
    if (!service.cta || !service.cta.href) {
      errors.push({
        type: 'service',
        id: service.id,
        message: `Service "${service.id}" missing CTA`
      })
    }
  }

  // Validate skills
  for (const skill of skills) {
    // Check related services exist
    for (const serviceId of skill.relatedServices) {
      if (!getServiceById(serviceId)) {
        errors.push({
          type: 'skill',
          id: skill.id,
          message: `Skill "${skill.id}" references non-existent service "${serviceId}"`
        })
      }
    }

    // Check proof has example and outcome
    if (!skill.proof?.example || !skill.proof?.outcome) {
      errors.push({
        type: 'skill',
        id: skill.id,
        message: `Skill "${skill.id}" missing proof example or outcome`
      })
    }
  }

  // Validate projects
  for (const project of projects) {
    // Check related services exist
    for (const serviceId of project.relatedServices) {
      if (!getServiceById(serviceId)) {
        errors.push({
          type: 'project',
          id: project.id,
          message: `Project "${project.id}" references non-existent service "${serviceId}"`
        })
      }
    }

    // Check related skills exist
    for (const skillId of project.relatedSkills) {
      if (!getSkillById(skillId)) {
        errors.push({
          type: 'project',
          id: project.id,
          message: `Project "${project.id}" references non-existent skill "${skillId}"`
        })
      }
    }

    // Check required fields
    if (!project.problem || !project.solution || !project.outcome) {
      errors.push({
        type: 'project',
        id: project.id,
        message: `Project "${project.id}" missing problem, solution, or outcome`
      })
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

// Run validation and log results
if (require.main === module) {
  const result = validateContentGraph()
  if (result.valid) {
    console.log('✅ Content validation passed')
  } else {
    console.error('❌ Content validation failed:')
    result.errors.forEach(e => console.error(`  - ${e.type}: ${e.message}`))
    process.exit(1)
  }
}