import { services } from './services'
import { skills } from './skills'
import { projects } from './projects'
import { profile } from './profile'
import type { ServiceId, SkillCategoryId, ContentIndex } from '@/types/content'

export const contentIndex: ContentIndex = {
  services,
  skills,
  projects,
  profile,
  getProjectsForService(serviceId: ServiceId) {
    const service = services.find(s => s.id === serviceId)
    if (!service) return []
    return projects.filter(p => service.relatedProjects.includes(p.id))
  },
  getSkillsForService(serviceId: ServiceId) {
    const service = services.find(s => s.id === serviceId)
    if (!service) return []
    return skills.filter(s => service.relatedSkills.includes(s.id))
  },
  getProjectsForSkill(skillId: SkillCategoryId) {
    const skill = skills.find(s => s.id === skillId)
    if (!skill) return []
    return projects.filter(p => skill.proof.relatedProjectIds.includes(p.id) || p.relatedSkills.includes(skillId))
  },
  getServicesForProject(projectId: string) {
    const project = projects.find(p => p.id === projectId)
    if (!project) return []
    return services.filter(s => project.relatedServices.includes(s.id))
  },
  getSkillsForProject(projectId: string) {
    const project = projects.find(p => p.id === projectId)
    if (!project) return []
    return skills.filter(s => project.relatedSkills.includes(s.id))
  }
}