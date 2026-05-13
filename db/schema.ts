import { bigserial, boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const contactSubmissions = pgTable('contact_submissions', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company'),
  service: text('service'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .notNull()
    .defaultNow(),
})

export const frankConfig = pgTable('frank_config', {
  id: text('id').primaryKey(),
  enabled: boolean('enabled').notNull().default(true),
  assistantName: text('assistant_name').notNull(),
  greeting: text('greeting').notNull(),
  systemPrompt: text('system_prompt').notNull(),
  persona: text('persona').notNull(),
  assistantRules: text('assistant_rules').notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'string',
  })
    .notNull()
    .defaultNow(),
})

export const enterpriseAgentPlatformConfig = pgTable('enterprise_agent_platform_config', {
  id: text('id').primaryKey(),
  stagesJson: text('stages_json').notNull(),
  capabilitiesJson: text('capabilities_json').notNull(),
  notesJson: text('notes_json').notNull(),
  publishedAt: timestamp('published_at', {
    withTimezone: true,
    mode: 'string',
  }),
  publishedByRole: text('published_by_role'),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'string',
  })
    .notNull()
    .defaultNow(),
})

export const siteSettings = pgTable('site_settings', {
  id: text('id').primaryKey(),
  siteName: text('site_name').notNull(),
  headerBrandText: text('header_brand_text').notNull(),
  headerLogoUrl: text('header_logo_url'),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone'),
  locationLabel: text('location_label'),
  githubUrl: text('github_url'),
  linkedinUrl: text('linkedin_url'),
  theme: text('theme').notNull(),
  heroCtaLabel: text('hero_cta_label').notNull(),
  heroCtaHref: text('hero_cta_href').notNull(),
  footerTagline: text('footer_tagline').notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'string',
  })
    .notNull()
    .defaultNow(),
})

export type ContactSubmissionInsert = typeof contactSubmissions.$inferInsert
export type ContactSubmissionSelect = typeof contactSubmissions.$inferSelect
export type FrankConfigInsert = typeof frankConfig.$inferInsert
export type FrankConfigSelect = typeof frankConfig.$inferSelect
export type EnterpriseAgentPlatformConfigInsert = typeof enterpriseAgentPlatformConfig.$inferInsert
export type EnterpriseAgentPlatformConfigSelect = typeof enterpriseAgentPlatformConfig.$inferSelect
export type SiteSettingsInsert = typeof siteSettings.$inferInsert
export type SiteSettingsSelect = typeof siteSettings.$inferSelect
