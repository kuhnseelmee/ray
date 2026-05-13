import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth'
import {
  canEditEnterprisePlatform,
  canPublishEnterprisePlatform,
  getCurrentAdminRole,
} from '@/lib/admin-rbac'
import {
  getEnterpriseAgentPlatformConfig,
  publishEnterpriseAgentPlatform,
  saveEnterpriseAgentPlatformDraft,
} from '@/lib/enterprise-ai-agent-platform'

export const runtime = 'nodejs'

function isAuthorized(request: NextRequest) {
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  return verifyAdminSessionToken(session)
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const role = getCurrentAdminRole()
    const config = await getEnterpriseAgentPlatformConfig()
    return NextResponse.json({
      role,
      permissions: {
        canEdit: canEditEnterprisePlatform(role),
        canPublish: canPublishEnterprisePlatform(role),
      },
      config,
    })
  } catch (error) {
    console.error('Enterprise platform GET error:', error)
    return NextResponse.json(
      { error: 'Failed to load enterprise platform config' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const role = getCurrentAdminRole()
    if (!canEditEnterprisePlatform(role)) {
      return NextResponse.json(
        { error: 'Insufficient role to edit enterprise platform config' },
        { status: 403 }
      )
    }

    const body = (await request.json().catch(() => ({}))) as {
      stages?: unknown
      capabilities?: unknown
      notes?: unknown
    }

    if (!Array.isArray(body.stages) || !Array.isArray(body.capabilities) || !Array.isArray(body.notes)) {
      return NextResponse.json(
        { error: 'stages, capabilities, and notes must be arrays' },
        { status: 400 }
      )
    }

    const saved = await saveEnterpriseAgentPlatformDraft({
      stages: body.stages as never[],
      capabilities: body.capabilities as never[],
      notes: body.notes as string[],
    })

    return NextResponse.json(saved)
  } catch (error) {
    console.error('Enterprise platform PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to save enterprise platform config' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const role = getCurrentAdminRole()
    if (!canPublishEnterprisePlatform(role)) {
      return NextResponse.json(
        { error: 'Insufficient role to publish enterprise platform changes' },
        { status: 403 }
      )
    }

    const body = (await request.json().catch(() => ({}))) as {
      approvalNote?: string
      approvalPhrase?: string
    }

    const approvalNote = (body.approvalNote || '').trim()
    const approvalPhrase = (body.approvalPhrase || '').trim()
    const requiredPhrase = 'APPROVE ENTERPRISE AI-AGENT PLATFORM CHANGES'

    if (approvalPhrase !== requiredPhrase || approvalNote.length < 20) {
      return NextResponse.json(
        {
          error:
            'Approval phrase mismatch or note too short (minimum 20 characters).',
        },
        { status: 400 }
      )
    }

    const published = await publishEnterpriseAgentPlatform(role)
    return NextResponse.json(published)
  } catch (error) {
    console.error('Enterprise platform POST error:', error)
    return NextResponse.json(
      { error: 'Failed to publish enterprise platform config' },
      { status: 500 }
    )
  }
}
