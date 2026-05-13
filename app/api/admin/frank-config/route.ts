import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth'
import {
  getFrankAssistantConfig,
  resetFrankAssistantConfig,
  saveFrankAssistantConfig,
} from '@/lib/ai/frank-config'

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

function parseEnabled(value: unknown) {
  return value === true || value === 'true' || value === 'on' || value === 1
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const config = await getFrankAssistantConfig()
    return NextResponse.json(config)
  } catch (error) {
    console.error('Frank config GET error:', error)
    return NextResponse.json(
      { error: 'Failed to load Frank config' },
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

    const saved = await saveFrankAssistantConfig({
      enabled: parseEnabled(body.enabled),
      assistantName: cleanText(body.assistantName, 120),
      greeting: cleanText(body.greeting, 500),
      systemPrompt: cleanText(body.systemPrompt, 50000),
      persona: cleanText(body.persona, 5000),
      assistantRules: cleanText(body.assistantRules, 20000),
    })

    return NextResponse.json(saved)
  } catch (error) {
    console.error('Frank config PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to save Frank config' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const reset = await resetFrankAssistantConfig()
    return NextResponse.json(reset)
  } catch (error) {
    console.error('Frank config DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to reset Frank config' },
      { status: 500 }
    )
  }
}
