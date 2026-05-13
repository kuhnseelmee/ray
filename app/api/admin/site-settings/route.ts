import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth'
import {
  getSiteSettings,
  resetGlobalSiteSettings,
  saveGlobalSiteSettings,
} from '@/lib/site-settings'
import type { SiteTheme } from '@/lib/db'

export const runtime = 'nodejs'

function isAuthorized(request: NextRequest) {
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  return verifyAdminSessionToken(session)
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().slice(0, maxLength)
}

function parseTheme(value: unknown): SiteTheme {
  return value === 'dark' ? 'dark' : 'light'
}

function parseCtaHref(value: unknown) {
  const url = cleanText(value, 500)
  if (!url) {
    return '/contact'
  }
  if (url.startsWith('/')) {
    return url
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return '/contact'
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const config = await getSiteSettings()
    return NextResponse.json(config)
  } catch (error) {
    console.error('Site settings GET error:', error)
    return NextResponse.json(
      { error: 'Failed to load site settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>

    const saved = await saveGlobalSiteSettings({
      siteName: cleanText(body.siteName, 120),
      headerBrandText: cleanText(body.headerBrandText, 80),
      headerLogoUrl: cleanText(body.headerLogoUrl, 500),
      contactEmail: cleanText(body.contactEmail, 200),
      contactPhone: cleanText(body.contactPhone, 80),
      locationLabel: cleanText(body.locationLabel, 200),
      githubUrl: cleanText(body.githubUrl, 500),
      linkedinUrl: cleanText(body.linkedinUrl, 500),
      theme: parseTheme(body.theme),
      heroCtaLabel: cleanText(body.heroCtaLabel, 80),
      heroCtaHref: parseCtaHref(body.heroCtaHref),
      footerTagline: cleanText(body.footerTagline, 600),
    })

    return NextResponse.json(saved)
  } catch (error) {
    console.error('Site settings PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to save site settings' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const reset = await resetGlobalSiteSettings()
    return NextResponse.json(reset)
  } catch (error) {
    console.error('Site settings DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to reset site settings' },
      { status: 500 }
    )
  }
}
