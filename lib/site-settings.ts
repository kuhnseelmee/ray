import {
  getSiteSettingsRow,
  resetSiteSettings,
  saveSiteSettings,
  type SiteSettingsInput,
  type SiteTheme,
} from '@/lib/db'

export type SiteSettings = {
  siteName: string
  headerBrandText: string
  headerLogoUrl: string
  contactEmail: string
  contactPhone: string
  locationLabel: string
  githubUrl: string
  linkedinUrl: string
  theme: SiteTheme
  heroCtaLabel: string
  heroCtaHref: string
  footerTagline: string
  updatedAt?: string
  configSource: 'database' | 'defaults'
}

export const defaultSiteSettings: SiteSettingsInput = {
  siteName: 'Ray Wooler',
  headerBrandText: 'Ray',
  headerLogoUrl: '',
  contactEmail: 'hello@ray.dev',
  contactPhone: '',
  locationLabel: 'Available remotely & local area',
  githubUrl: 'https://github.com/Ray-Wooler',
  linkedinUrl: 'https://www.linkedin.com/in/raymond-wooler-391866394/',
  theme: 'light',
  heroCtaLabel: 'Book a consultation',
  heroCtaHref: '/contact',
  footerTagline:
    'Practical technology help for real-world business problems. I help businesses and individuals solve technical problems, improve systems, and build practical digital solutions.',
}

function normalizeUrl(value: string | null | undefined) {
  return (value || '').trim()
}

function normalizeEmail(value: string | null | undefined) {
  return (value || '').trim().toLowerCase()
}

function withDefaults(input: Partial<SiteSettingsInput>): SiteSettingsInput {
  return {
    siteName: input.siteName?.trim() || defaultSiteSettings.siteName,
    headerBrandText:
      input.headerBrandText?.trim() || defaultSiteSettings.headerBrandText,
    headerLogoUrl: normalizeUrl(input.headerLogoUrl),
    contactEmail:
      normalizeEmail(input.contactEmail) || defaultSiteSettings.contactEmail,
    contactPhone: normalizeUrl(input.contactPhone),
    locationLabel: (input.locationLabel || '').trim(),
    githubUrl: normalizeUrl(input.githubUrl),
    linkedinUrl: normalizeUrl(input.linkedinUrl),
    theme: input.theme === 'dark' ? 'dark' : 'light',
    heroCtaLabel: input.heroCtaLabel?.trim() || defaultSiteSettings.heroCtaLabel,
    heroCtaHref: normalizeUrl(input.heroCtaHref) || defaultSiteSettings.heroCtaHref,
    footerTagline:
      input.footerTagline?.trim() || defaultSiteSettings.footerTagline,
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const row = await getSiteSettingsRow()
    if (!row) {
      return {
        ...defaultSiteSettings,
        headerLogoUrl: defaultSiteSettings.headerLogoUrl || '',
        contactPhone: defaultSiteSettings.contactPhone || '',
        locationLabel: defaultSiteSettings.locationLabel || '',
        githubUrl: defaultSiteSettings.githubUrl || '',
        linkedinUrl: defaultSiteSettings.linkedinUrl || '',
        heroCtaLabel: defaultSiteSettings.heroCtaLabel,
        heroCtaHref: defaultSiteSettings.heroCtaHref,
        configSource: 'defaults',
      }
    }

    return {
      siteName: row.siteName,
      headerBrandText: row.headerBrandText,
      headerLogoUrl: row.headerLogoUrl || '',
      contactEmail: row.contactEmail,
      contactPhone: row.contactPhone || '',
      locationLabel: row.locationLabel || '',
      githubUrl: row.githubUrl || '',
      linkedinUrl: row.linkedinUrl || '',
      theme: row.theme === 'dark' ? 'dark' : 'light',
      heroCtaLabel: row.heroCtaLabel,
      heroCtaHref: row.heroCtaHref,
      footerTagline: row.footerTagline,
      updatedAt: row.updatedAt,
      configSource: 'database',
    }
  } catch (error) {
    console.error('Failed to load site settings:', error)
    return {
      ...defaultSiteSettings,
      headerLogoUrl: defaultSiteSettings.headerLogoUrl || '',
      contactPhone: defaultSiteSettings.contactPhone || '',
      locationLabel: defaultSiteSettings.locationLabel || '',
      githubUrl: defaultSiteSettings.githubUrl || '',
      linkedinUrl: defaultSiteSettings.linkedinUrl || '',
      heroCtaLabel: defaultSiteSettings.heroCtaLabel,
      heroCtaHref: defaultSiteSettings.heroCtaHref,
      configSource: 'defaults',
    }
  }
}

export async function saveGlobalSiteSettings(input: Partial<SiteSettingsInput>) {
  const normalized = withDefaults(input)
  const saved = await saveSiteSettings(normalized)

  return {
    siteName: saved.siteName,
    headerBrandText: saved.headerBrandText,
    headerLogoUrl: saved.headerLogoUrl || '',
    contactEmail: saved.contactEmail,
    contactPhone: saved.contactPhone || '',
    locationLabel: saved.locationLabel || '',
    githubUrl: saved.githubUrl || '',
    linkedinUrl: saved.linkedinUrl || '',
    theme: saved.theme,
    heroCtaLabel: saved.heroCtaLabel,
    heroCtaHref: saved.heroCtaHref,
    footerTagline: saved.footerTagline,
    updatedAt: saved.updatedAt,
    configSource: 'database' as const,
  }
}

export async function resetGlobalSiteSettings() {
  return saveGlobalSiteSettings(defaultSiteSettings)
}
