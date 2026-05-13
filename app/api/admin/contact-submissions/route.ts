import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth'
import { countContactSubmissions, listContactSubmissions } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value

    if (!verifyAdminSessionToken(session)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const limitParam = Number(request.nextUrl.searchParams.get('limit') ?? '20')
    const offsetParam = Number(request.nextUrl.searchParams.get('offset') ?? '0')
    const limit = Number.isFinite(limitParam)
      ? Math.min(Math.max(limitParam, 1), 100)
      : 20
    const offset = Number.isFinite(offsetParam)
      ? Math.max(offsetParam, 0)
      : 0

    const [items, total] = await Promise.all([
      listContactSubmissions(limit, offset),
      countContactSubmissions(),
    ])

    return NextResponse.json({
      items,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Admin contact submissions API error:', error)
    return NextResponse.json(
      { error: 'Failed to load submissions' },
      { status: 500 }
    )
  }
}
