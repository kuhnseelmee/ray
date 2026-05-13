export type ContentStatus = 
  | "active" 
  | "completed" 
  | "in_progress" 
  | "archived";

export type ServiceId = 
  | "systems-automation"
  | "custom-dashboards"
  | "it-support-consulting"
  | "cybersecurity-awareness"
  | "data-optimisation"
  | "ai-assisted-business"
  | "ndis-roi-calculator";

export type SkillCategoryId = 
  | "systems-architecture"
  | "software-development"
  | "frontend-web"
  | "backend-databases-apis"
  | "automation-ai"
  | "it-support-infrastructure"
  | "cybersecurity-risk"
  | "business-property-operations";

export type ProjectCategory = 
  | "systems"
  | "software"
  | "automation"
  | "cybersecurity"
  | "business-operations"
  | "creative";

export interface Service {
  id: ServiceId;
  title: string;
  shortTitle: string;
  problem: string;
  solution: string;
  deliverables: string[];
  outcomes: string[];
  relatedSkills: SkillCategoryId[];
  relatedProjects: string[];
  cta: {
    label: string;
    href: string;
  };
}

export interface SkillGroup {
  id: SkillCategoryId;
  category: string;
  context: string;
  items: string[];
  relatedServices: ServiceId[];
  proof: {
    example: string;
    outcome: string;
    relatedProjectIds: string[];
  };
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  status: ContentStatus;
  summary: string;
  context: string;
  problem: string;
  solution: string;
  implementation: string[];
  stack: string[];
  features: string[];
  outcome: string;
  metrics?: {
    performance?: string;
    efficiency?: string;
    impact?: string;
  };
  relatedServices: ServiceId[];
  relatedSkills: SkillCategoryId[];
  links?: {
    live?: string;
    repo?: string;
    caseStudy?: string;
  };
}

export interface Profile {
  name: string;
  headline: string;
  location: string;
  summary: string;
  contact: {
    email: string;
    location: string;
  };
  primaryCta: {
    label: string;
    href: string;
  };
}

export interface ContentIndex {
  services: Service[];
  skills: SkillGroup[];
  projects: Project[];
  profile: Profile;
  getProjectsForService: (serviceId: ServiceId) => Project[];
  getSkillsForService: (serviceId: ServiceId) => SkillGroup[];
  getProjectsForSkill: (skillId: SkillCategoryId) => Project[];
  getServicesForProject: (projectId: string) => Service[];
  getSkillsForProject: (projectId: string) => SkillGroup[];
}
