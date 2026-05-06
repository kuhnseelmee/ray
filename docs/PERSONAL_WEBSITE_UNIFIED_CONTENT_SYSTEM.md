# PERSONAL_WEBSITE_UNIFIED_CONTENT_SYSTEM.md

## Codex Instructional Prompt
### Unified Services / Skills / Projects Content Architecture

Project: Ray Wooler Personal Website  
Purpose: Convert the website from static brochure pages into a structured, reusable, proof-driven content system.

---

# 1. Mission

Implement a unified content architecture for the personal website.

The site must clearly connect:

- **Services** = what Ray sells
- **Skills** = why Ray can deliver it
- **Projects** = proof Ray has already done it

These must not exist as disconnected pages.

They must share a common content model so that the website becomes a controlled credibility and conversion system.

---

# 2. Core Rule

Do not hardcode primary content inside page components.

All core website content must live in structured data files.

Pages and components must render from the shared content layer.

---

# 3. Required Files

Create or update the following files:

```txt
/data/profile.ts
/data/services.ts
/data/skills.ts
/data/projects.ts
/data/content-index.ts
/types/content.ts
/lib/content/validation.ts
/components/ServiceCard.tsx
/components/SkillGroup.tsx
/components/ProjectCard.tsx
/sections/ServicesGrid.tsx
/sections/SkillsList.tsx
/sections/ProjectsGrid.tsx
/app/services/page.tsx
/app/skills/page.tsx
/app/projects/page.tsx
/app/projects/[id]/page.tsx
```

If this repo uses `/pages` instead of `/app`, adapt the route structure accordingly.

---

# 4. Shared Type System

Create:

```txt
/types/content.ts
```

Implement the following TypeScript types:

```ts
export type ContentStatus =
  | "active"
  | "completed"
  | "in_progress"
  | "archived";

export type ServiceId =
  | "systems-automation"
  | "custom-software"
  | "it-support"
  | "cybersecurity"
  | "data-optimisation"
  | "web-development";

export type SkillCategoryId =
  | "systems-architecture"
  | "software-development"
  | "infrastructure-devops"
  | "data-automation"
  | "cybersecurity"
  | "business-operations"
  | "creative-media";

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
  summary: string;
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
  visuals: {
    src: string;
    alt: string;
  }[];
}
```

---

# 5. Profile Data

Create:

```txt
/data/profile.ts
```

Content must present Ray as a practical systems builder, computer technician, automation designer, property operations problem-solver, and technical consultant.

Use direct, professional wording.

Example structure:

```ts
export const profile = {
  name: "Ray Wooler",
  headline: "Systems builder, computer technician, automation designer, and practical technology consultant.",
  location: "Queensland, Australia",
  summary:
    "I help individuals, small businesses, and operational teams turn messy systems into clear, working processes using practical technology, automation, and real-world technical support.",
  contact: {
    email: "",
    phone: "",
    location: "Queensland, Australia"
  },
  primaryCta: {
    label: "Request a Consultation",
    href: "/contact"
  }
};
```

Leave email and phone blank unless already present in repo environment/content.

Do not invent private contact details.

---

# 6. Services Data

Create:

```txt
/data/services.ts
```

Must export:

```ts
import type { Service } from "@/types/content";

export const services: Service[] = [...]
```

Required service entries:

## 6.1 Systems & Workflow Automation

ID:

```txt
systems-automation
```

Must cover:

- workflow mapping
- process automation
- n8n or API automation
- reducing manual admin
- failover and monitoring thinking

## 6.2 Custom Software & Dashboard Development

ID:

```txt
custom-software
```

Must cover:

- dashboards
- admin panels
- internal tools
- database-backed systems
- operational visibility

## 6.3 IT Support & Technical Consulting

ID:

```txt
it-support
```

Must cover:

- computer repairs
- system setup
- troubleshooting
- infrastructure advice
- practical support

## 6.4 Cybersecurity & Risk Awareness

ID:

```txt
cybersecurity
```

Must cover:

- practical security advice
- device hardening
- phishing and scam awareness
- backup and recovery basics
- small business risk reduction

## 6.5 Data & Process Optimisation

ID:

```txt
data-optimisation
```

Must cover:

- data cleanup
- spreadsheets
- reporting
- process redesign
- workflow clarity

## 6.6 Website & Digital Presence Builds

ID:

```txt
web-development
```

Must cover:

- personal websites
- small business sites
- landing pages
- service pages
- conversion-focused structure

Each service must include:

- clear problem
- clear solution
- 3–6 deliverables
- 3–5 outcomes
- related skills
- related projects
- CTA object

No filler language.

Forbidden phrases:

- innovative solutions
- passionate developer
- results-driven professional
- cutting-edge
- world-class

---

# 7. Skills Data

Create:

```txt
/data/skills.ts
```

Must export:

```ts
import type { SkillGroup } from "@/types/content";

export const skills: SkillGroup[] = [...]
```

Required skill categories:

## 7.1 Systems & Architecture

ID:

```txt
systems-architecture
```

Include:

- workflow design
- systems thinking
- API integration
- event-driven architecture
- process mapping

## 7.2 Software Development

ID:

```txt
software-development
```

Include:

- JavaScript
- TypeScript
- Node.js
- Python
- Perl / CGI
- SQL
- HTML / CSS
- React / Next.js

## 7.3 Infrastructure & DevOps

ID:

```txt
infrastructure-devops
```

Include:

- Linux
- Docker
- self-hosted systems
- Traefik / NGINX
- environment management
- deployment planning

## 7.4 Data & Automation

ID:

```txt
data-automation
```

Include:

- structured data
- reporting
- workflow automation
- spreadsheet systems
- database thinking

## 7.5 Cybersecurity

ID:

```txt
cybersecurity
```

Include:

- threat awareness
- secure configuration
- access control basics
- backup strategy
- user education

## 7.6 Business & Operations

ID:

```txt
business-operations
```

Include:

- property operations
- stakeholder coordination
- service workflows
- compliance awareness
- practical problem solving

## 7.7 Creative Media

ID:

```txt
creative-media
```

Include:

- digital design
- advertising artwork
- content layout
- DJ/event experience
- audience engagement

Each skill category must include:

- context
- skill list
- related services
- proof example
- proof outcome
- related project IDs

Do not create a resume dump.

---

# 8. Projects Data

Create:

```txt
/data/projects.ts
```

Must export:

```ts
import type { Project } from "@/types/content";

export const projects: Project[] = [...]
```

Minimum required project entries:

## 8.1 Amma Care Connect

ID:

```txt
amma-care-connect
```

Category:

```txt
systems
```

Status:

```txt
active
```

Must describe:

- NDIS operations platform
- property management
- document intelligence
- workflows
- auditability
- compliance-oriented architecture
- dashboard and automation direction

## 8.2 Personal Website

ID:

```txt
personal-website
```

Category:

```txt
software
```

Status:

```txt
in_progress
```

Must describe:

- conversion-focused personal website
- structured content architecture
- services/skills/projects relationship
- deployable repo

## 8.3 Computer Repair / Technical Support Workflow

ID:

```txt
computer-repair-workflow
```

Category:

```txt
business-operations
```

Status:

```txt
active
```

Must describe:

- technical triage
- repair estimation
- service tracking
- client communication
- practical IT support

## 8.4 Automation / Local AI Stack

ID:

```txt
local-ai-automation-stack
```

Category:

```txt
automation
```

Status:

```txt
active
```

Must describe:

- local AI tooling
- Docker/self-hosting
- Ollama/Open WebUI style stack if relevant to repo content
- automation workflows
- controlled infrastructure

## 8.5 Cybersecurity Education Material

ID:

```txt
cybersecurity-education-material
```

Category:

```txt
cybersecurity
```

Status:

```txt
in_progress
```

Must describe:

- public education
- practical threat awareness
- small business/community security education

Each project must include:

- context
- problem
- solution
- implementation
- stack
- features
- outcome
- related services
- related skills
- visuals with alt text

If real screenshots do not exist yet, use a safe local placeholder component instead of broken image paths.

Do not use generic placeholder image URLs.

---

# 9. Content Index

Create:

```txt
/data/content-index.ts
```

This file must connect the site content.

Example:

```ts
import { services } from "./services";
import { skills } from "./skills";
import { projects } from "./projects";

export const contentIndex = {
  services,
  skills,
  projects,
  getProjectsForService(serviceId: string) {
    return projects.filter((project) =>
      project.relatedServices.includes(serviceId as any)
    );
  },
  getSkillsForService(serviceId: string) {
    return skills.filter((skill) =>
      skill.relatedServices.includes(serviceId as any)
    );
  },
  getProjectsForSkill(skillId: string) {
    return projects.filter((project) =>
      project.relatedSkills.includes(skillId as any)
    );
  }
};
```

Improve typings where possible.

No `any` if avoidable.

---

# 10. Validation Layer

Create:

```txt
/lib/content/validation.ts
```

Implement validation checks to ensure:

- every service related skill exists
- every service related project exists
- every skill related service exists
- every skill proof related project exists
- every project related service exists
- every project related skill exists
- every project has at least one visual or a defined visual fallback
- every service has at least one CTA
- every project has problem, solution, and outcome

This validation can run at build time or be exported as a function used in tests.

Example:

```ts
export function validateContentGraph() {
  const errors: string[] = [];

  // validate relationships

  return {
    valid: errors.length === 0,
    errors
  };
}
```

---

# 11. Page Behaviour

## 11.1 Services Page

Route:

```txt
/app/services/page.tsx
```

Must render:

1. Hero
2. ServicesGrid
3. Related proof section showing linked projects
4. CTA section

Each service card must include:

- title
- summary
- problem
- solution
- deliverables
- outcomes
- CTA
- small related project count or preview

## 11.2 Skills Page

Route:

```txt
/app/skills/page.tsx
```

Must render:

1. Hero
2. SkillsList
3. Proof references from related projects
4. CTA section

Each skill group must include:

- category
- context
- tags/chips
- proof example
- proof outcome
- related services

## 11.3 Projects Page

Route:

```txt
/app/projects/page.tsx
```

Must render:

1. Hero
2. ProjectsGrid
3. Optional filters by category and status
4. CTA section

Each project card must include:

- title
- category
- status
- summary
- problem
- solution
- stack tags
- outcome
- detail link

## 11.4 Project Detail Page

Route:

```txt
/app/projects/[id]/page.tsx
```

Must render:

1. Title
2. Status badge
3. Category
4. Context
5. Problem
6. Solution
7. Implementation
8. Stack
9. Features
10. Outcome
11. Metrics if available
12. Related services
13. Related skills
14. CTA back to contact

If project ID is invalid, render 404 using framework-standard notFound handling.

---

# 12. Component Rules

## 12.1 ServiceCard

Must accept a typed `Service`.

No data fetching inside component.

## 12.2 SkillGroup

Must accept a typed `SkillGroup`.

No data fetching inside component.

## 12.3 ProjectCard

Must accept a typed `Project`.

No data fetching inside component.

## 12.4 Visual Fallback

Create a lightweight placeholder visual component if images are unavailable.

It must:

- not use fake external image URLs
- show project title/category
- remain visually professional
- include accessible text

---

# 13. SEO and Metadata

Each page must export metadata where supported.

Required metadata:

- title
- description
- Open Graph title
- Open Graph description

Examples:

Services:

```txt
Services | Ray Wooler
```

Skills:

```txt
Skills | Ray Wooler
```

Projects:

```txt
Projects | Ray Wooler
```

---

# 14. Styling Rules

Use existing repo styling system.

If Tailwind is available:

- use responsive grids
- use semantic spacing
- use cards
- use badges
- maintain clean hierarchy

No visual clutter.

No gimmicks.

No excessive animation.

---

# 15. Testing Requirements

Add tests if the repo already has a test setup.

Minimum tests:

```txt
validateContentGraph returns valid true
services have related skills
skills have proof blocks
projects have problem/solution/outcome
project IDs are unique
```

If no test setup exists, add a documented validation script instead.

Recommended script:

```txt
scripts/validate-content.ts
```

Package script:

```json
{
  "scripts": {
    "validate:content": "tsx scripts/validate-content.ts"
  }
}
```

Only add `tsx` if already present or appropriate for the stack. Otherwise use the repo’s existing TypeScript execution method.

---

# 16. Acceptance Criteria

Codex must not stop until:

- Services page renders from `/data/services.ts`
- Skills page renders from `/data/skills.ts`
- Projects page renders from `/data/projects.ts`
- Project detail route works
- Shared types are implemented
- Content relationship validation exists
- No broken images exist
- No dead CTA buttons exist
- No lorem ipsum exists
- No hardcoded core content exists inside page components
- Build passes
- README updated with content architecture notes

---

# 17. README Update

Update README with:

```md
## Content Architecture

This site uses a structured content graph:

- Services define what is offered.
- Skills define capability and credibility.
- Projects prove execution.

Core content lives in `/data`.
Shared types live in `/types/content.ts`.
Content relationship validation lives in `/lib/content/validation.ts`.
```

---

# 18. Final Principle

This is not a static website.

It is a structured trust engine.

Every content item must either:

- clarify the offer
- prove capability
- reduce buyer doubt
- create a path to contact

If it does none of those, remove it.
