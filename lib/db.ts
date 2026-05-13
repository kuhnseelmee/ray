import { desc, eq, sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import {
  contactSubmissions,
  enterpriseAgentPlatformConfig,
  frankConfig,
  siteSettings,
  type EnterpriseAgentPlatformConfigInsert,
  type FrankConfigInsert,
  type ContactSubmissionInsert,
  type SiteSettingsInsert,
} from '@/db/schema'

declare global {
  // eslint-disable-next-line no-var
  var __rayPgPool: Pool | undefined
  // eslint-disable-next-line no-var
  var __rayDrizzleDb:
    | ReturnType<typeof drizzle>
    | undefined
  // eslint-disable-next-line no-var
  var __rayContactTableReady: Promise<void> | undefined
  // eslint-disable-next-line no-var
  var __rayFrankConfigTableReady: Promise<void> | undefined
  // eslint-disable-next-line no-var
  var __rayEnterpriseAgentPlatformConfigTableReady: Promise<void> | undefined
  // eslint-disable-next-line no-var
  var __raySiteSettingsTableReady: Promise<void> | undefined
}

let pool: Pool | undefined

function getPool() {
  if (pool) {
    return pool
  }

  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is required')
  }

  pool = global.__rayPgPool ?? new Pool({ connectionString })

  if (process.env.NODE_ENV !== 'production') {
    global.__rayPgPool = pool
  }

  return pool
}

function getDb() {
  if (global.__rayDrizzleDb) {
    return global.__rayDrizzleDb
  }

  const db = drizzle(getPool())

  if (process.env.NODE_ENV !== 'production') {
    global.__rayDrizzleDb = db
  }

  return db
}

export type ContactSubmission = {
  name: string
  email: string
  company?: string | null
  service?: string | null
  message: string
}

export type ContactSubmissionRow = {
  id: number
  name: string
  email: string
  company: string | null
  service: string | null
  message: string
  created_at: string
}

export type FrankConfigRow = {
  id: string
  enabled: boolean
  assistantName: string
  greeting: string
  systemPrompt: string
  persona: string
  assistantRules: string
  updatedAt: string
}

export type FrankConfigInput = {
  enabled: boolean
  assistantName: string
  greeting: string
  systemPrompt: string
  persona: string
  assistantRules: string
}

export type EnterpriseAgentPlatformConfigRow = {
  id: string
  stagesJson: string
  capabilitiesJson: string
  notesJson: string
  publishedAt: string | null
  publishedByRole: string | null
  updatedAt: string
}

export type EnterpriseAgentPlatformConfigInput = {
  stagesJson: string
  capabilitiesJson: string
  notesJson: string
  publishedAt?: string | null
  publishedByRole?: string | null
}

export type SiteTheme = 'light' | 'dark'

export type SiteSettingsRow = {
  id: string
  siteName: string
  headerBrandText: string
  headerLogoUrl: string | null
  contactEmail: string
  contactPhone: string | null
  locationLabel: string | null
  githubUrl: string | null
  linkedinUrl: string | null
  theme: SiteTheme
  heroCtaLabel: string
  heroCtaHref: string
  footerTagline: string
  updatedAt: string
}

export type SiteSettingsInput = {
  siteName: string
  headerBrandText: string
  headerLogoUrl?: string | null
  contactEmail: string
  contactPhone?: string | null
  locationLabel?: string | null
  githubUrl?: string | null
  linkedinUrl?: string | null
  theme: SiteTheme
  heroCtaLabel: string
  heroCtaHref: string
  footerTagline: string
}

async function ensureContactSubmissionsTable() {
  const activePool = getPool()

  await activePool.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      service TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await activePool.query(`
    CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
      ON contact_submissions (created_at DESC, id DESC)
  `)
}

async function ensureFrankConfigTable() {
  const activePool = getPool()

  await activePool.query(`
    CREATE TABLE IF NOT EXISTS frank_config (
      id TEXT PRIMARY KEY,
      enabled BOOLEAN NOT NULL DEFAULT TRUE,
      assistant_name TEXT NOT NULL,
      greeting TEXT NOT NULL,
      system_prompt TEXT NOT NULL,
      persona TEXT NOT NULL,
      assistant_rules TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
}

async function ensureEnterpriseAgentPlatformConfigTable() {
  const activePool = getPool()

  await activePool.query(`
    CREATE TABLE IF NOT EXISTS enterprise_agent_platform_config (
      id TEXT PRIMARY KEY,
      stages_json TEXT NOT NULL,
      capabilities_json TEXT NOT NULL,
      notes_json TEXT NOT NULL,
      published_at TIMESTAMPTZ,
      published_by_role TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
}

async function ensureSiteSettingsTable() {
  const activePool = getPool()

  await activePool.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id TEXT PRIMARY KEY,
      site_name TEXT NOT NULL,
      header_brand_text TEXT NOT NULL,
      header_logo_url TEXT,
      contact_email TEXT NOT NULL,
      contact_phone TEXT,
      location_label TEXT,
      github_url TEXT,
      linkedin_url TEXT,
      theme TEXT NOT NULL,
      hero_cta_label TEXT NOT NULL,
      hero_cta_href TEXT NOT NULL,
      footer_tagline TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await activePool.query(`
    ALTER TABLE site_settings
    ADD COLUMN IF NOT EXISTS contact_phone TEXT,
    ADD COLUMN IF NOT EXISTS location_label TEXT,
    ADD COLUMN IF NOT EXISTS hero_cta_label TEXT NOT NULL DEFAULT 'Book a consultation',
    ADD COLUMN IF NOT EXISTS hero_cta_href TEXT NOT NULL DEFAULT '/contact'
  `)
}

export async function ensureContactSchema() {
  if (!global.__rayContactTableReady) {
    global.__rayContactTableReady = ensureContactSubmissionsTable()
  }

  await global.__rayContactTableReady
}

export async function ensureFrankConfigSchema() {
  if (!global.__rayFrankConfigTableReady) {
    global.__rayFrankConfigTableReady = ensureFrankConfigTable()
  }

  await global.__rayFrankConfigTableReady
}

export async function ensureEnterpriseAgentPlatformConfigSchema() {
  if (!global.__rayEnterpriseAgentPlatformConfigTableReady) {
    global.__rayEnterpriseAgentPlatformConfigTableReady =
      ensureEnterpriseAgentPlatformConfigTable()
  }

  await global.__rayEnterpriseAgentPlatformConfigTableReady
}

export async function ensureSiteSettingsSchema() {
  // Run on each call so dev hot-reload always applies latest column additions.
  await ensureSiteSettingsTable()
}

export async function saveContactSubmission(submission: ContactSubmission) {
  await ensureContactSchema()

  const db = getDb()
  const result = await db
    .insert(contactSubmissions)
    .values({
      name: submission.name,
      email: submission.email,
      company: submission.company ?? null,
      service: submission.service ?? null,
      message: submission.message,
    } satisfies ContactSubmissionInsert)
    .returning({
      id: contactSubmissions.id,
      created_at: contactSubmissions.createdAt,
    })

  return result[0] as { id: number; created_at: string }
}

export async function getFrankConfigRow() {
  await ensureFrankConfigSchema()

  const db = getDb()
  const rows = await db
    .select({
      id: frankConfig.id,
      enabled: frankConfig.enabled,
      assistantName: frankConfig.assistantName,
      greeting: frankConfig.greeting,
      systemPrompt: frankConfig.systemPrompt,
      persona: frankConfig.persona,
      assistantRules: frankConfig.assistantRules,
      updatedAt: frankConfig.updatedAt,
    })
    .from(frankConfig)
    .where(eq(frankConfig.id, 'frank'))
    .limit(1)

  return (rows[0] as FrankConfigRow | undefined) ?? null
}

export async function saveFrankConfig(input: FrankConfigInput) {
  await ensureFrankConfigSchema()

  const db = getDb()
  const result = await db
    .insert(frankConfig)
    .values({
      id: 'frank',
      enabled: input.enabled,
      assistantName: input.assistantName,
      greeting: input.greeting,
      systemPrompt: input.systemPrompt,
      persona: input.persona,
      assistantRules: input.assistantRules,
    } satisfies FrankConfigInsert)
    .onConflictDoUpdate({
      target: frankConfig.id,
      set: {
        enabled: input.enabled,
        assistantName: input.assistantName,
        greeting: input.greeting,
        systemPrompt: input.systemPrompt,
        persona: input.persona,
        assistantRules: input.assistantRules,
        updatedAt: sql`NOW()`,
      },
    })
    .returning({
      id: frankConfig.id,
      enabled: frankConfig.enabled,
      assistantName: frankConfig.assistantName,
      greeting: frankConfig.greeting,
      systemPrompt: frankConfig.systemPrompt,
      persona: frankConfig.persona,
      assistantRules: frankConfig.assistantRules,
      updatedAt: frankConfig.updatedAt,
    })

  return result[0] as FrankConfigRow
}

export async function resetFrankConfig(input: FrankConfigInput) {
  return saveFrankConfig(input)
}

export async function getEnterpriseAgentPlatformConfigRow() {
  await ensureEnterpriseAgentPlatformConfigSchema()

  const db = getDb()
  const rows = await db
    .select({
      id: enterpriseAgentPlatformConfig.id,
      stagesJson: enterpriseAgentPlatformConfig.stagesJson,
      capabilitiesJson: enterpriseAgentPlatformConfig.capabilitiesJson,
      notesJson: enterpriseAgentPlatformConfig.notesJson,
      publishedAt: enterpriseAgentPlatformConfig.publishedAt,
      publishedByRole: enterpriseAgentPlatformConfig.publishedByRole,
      updatedAt: enterpriseAgentPlatformConfig.updatedAt,
    })
    .from(enterpriseAgentPlatformConfig)
    .where(eq(enterpriseAgentPlatformConfig.id, 'enterprise-agent-platform'))
    .limit(1)

  return (rows[0] as EnterpriseAgentPlatformConfigRow | undefined) ?? null
}

export async function saveEnterpriseAgentPlatformConfig(
  input: EnterpriseAgentPlatformConfigInput
) {
  await ensureEnterpriseAgentPlatformConfigSchema()

  const db = getDb()
  const result = await db
    .insert(enterpriseAgentPlatformConfig)
    .values({
      id: 'enterprise-agent-platform',
      stagesJson: input.stagesJson,
      capabilitiesJson: input.capabilitiesJson,
      notesJson: input.notesJson,
      publishedAt: input.publishedAt ?? null,
      publishedByRole: input.publishedByRole ?? null,
    } satisfies EnterpriseAgentPlatformConfigInsert)
    .onConflictDoUpdate({
      target: enterpriseAgentPlatformConfig.id,
      set: {
        stagesJson: input.stagesJson,
        capabilitiesJson: input.capabilitiesJson,
        notesJson: input.notesJson,
        publishedAt: input.publishedAt ?? null,
        publishedByRole: input.publishedByRole ?? null,
        updatedAt: sql`NOW()`,
      },
    })
    .returning({
      id: enterpriseAgentPlatformConfig.id,
      stagesJson: enterpriseAgentPlatformConfig.stagesJson,
      capabilitiesJson: enterpriseAgentPlatformConfig.capabilitiesJson,
      notesJson: enterpriseAgentPlatformConfig.notesJson,
      publishedAt: enterpriseAgentPlatformConfig.publishedAt,
      publishedByRole: enterpriseAgentPlatformConfig.publishedByRole,
      updatedAt: enterpriseAgentPlatformConfig.updatedAt,
    })

  return result[0] as EnterpriseAgentPlatformConfigRow
}

export async function getSiteSettingsRow() {
  await ensureSiteSettingsSchema()

  const db = getDb()
  const rows = await db
    .select({
      id: siteSettings.id,
      siteName: siteSettings.siteName,
      headerBrandText: siteSettings.headerBrandText,
      headerLogoUrl: siteSettings.headerLogoUrl,
      contactEmail: siteSettings.contactEmail,
      contactPhone: siteSettings.contactPhone,
      locationLabel: siteSettings.locationLabel,
      githubUrl: siteSettings.githubUrl,
      linkedinUrl: siteSettings.linkedinUrl,
      theme: siteSettings.theme,
      heroCtaLabel: siteSettings.heroCtaLabel,
      heroCtaHref: siteSettings.heroCtaHref,
      footerTagline: siteSettings.footerTagline,
      updatedAt: siteSettings.updatedAt,
    })
    .from(siteSettings)
    .where(eq(siteSettings.id, 'site'))
    .limit(1)

  const row = rows[0] as SiteSettingsRow | undefined
  return row ? { ...row, theme: row.theme === 'dark' ? 'dark' : 'light' } : null
}

export async function saveSiteSettings(input: SiteSettingsInput) {
  await ensureSiteSettingsSchema()

  const db = getDb()
  const result = await db
    .insert(siteSettings)
    .values({
      id: 'site',
      siteName: input.siteName,
      headerBrandText: input.headerBrandText,
      headerLogoUrl: input.headerLogoUrl ?? null,
      contactEmail: input.contactEmail,
      contactPhone: input.contactPhone ?? null,
      locationLabel: input.locationLabel ?? null,
      githubUrl: input.githubUrl ?? null,
      linkedinUrl: input.linkedinUrl ?? null,
      theme: input.theme,
      heroCtaLabel: input.heroCtaLabel,
      heroCtaHref: input.heroCtaHref,
      footerTagline: input.footerTagline,
    } satisfies SiteSettingsInsert)
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: {
        siteName: input.siteName,
        headerBrandText: input.headerBrandText,
        headerLogoUrl: input.headerLogoUrl ?? null,
        contactEmail: input.contactEmail,
        contactPhone: input.contactPhone ?? null,
        locationLabel: input.locationLabel ?? null,
        githubUrl: input.githubUrl ?? null,
        linkedinUrl: input.linkedinUrl ?? null,
        theme: input.theme,
        heroCtaLabel: input.heroCtaLabel,
        heroCtaHref: input.heroCtaHref,
        footerTagline: input.footerTagline,
        updatedAt: sql`NOW()`,
      },
    })
    .returning({
      id: siteSettings.id,
      siteName: siteSettings.siteName,
      headerBrandText: siteSettings.headerBrandText,
      headerLogoUrl: siteSettings.headerLogoUrl,
      contactEmail: siteSettings.contactEmail,
      contactPhone: siteSettings.contactPhone,
      locationLabel: siteSettings.locationLabel,
      githubUrl: siteSettings.githubUrl,
      linkedinUrl: siteSettings.linkedinUrl,
      theme: siteSettings.theme,
      heroCtaLabel: siteSettings.heroCtaLabel,
      heroCtaHref: siteSettings.heroCtaHref,
      footerTagline: siteSettings.footerTagline,
      updatedAt: siteSettings.updatedAt,
    })

  const row = result[0] as SiteSettingsRow
  return { ...row, theme: row.theme === 'dark' ? 'dark' : 'light' }
}

export async function resetSiteSettings(input: SiteSettingsInput) {
  return saveSiteSettings(input)
}

export async function listContactSubmissions(limit = 20, offset = 0) {
  await ensureContactSchema()

  const db = getDb()
  const rows = await db
    .select({
      id: contactSubmissions.id,
      name: contactSubmissions.name,
      email: contactSubmissions.email,
      company: contactSubmissions.company,
      service: contactSubmissions.service,
      message: contactSubmissions.message,
      created_at: contactSubmissions.createdAt,
    })
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt), desc(contactSubmissions.id))
    .limit(limit)
    .offset(offset)

  return rows as ContactSubmissionRow[]
}

export async function countContactSubmissions() {
  await ensureContactSchema()

  const db = getDb()
  const rows = await db
    .select({
      count: sql<number>`count(*)::int`,
    })
    .from(contactSubmissions)

  return rows[0]?.count ?? 0
}

export async function closeDatabasePool() {
  await getPool().end()
}
