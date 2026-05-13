import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  isAdminLoginConfigured,
  isAdminPasswordValid,
} from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    if (!isAdminLoginConfigured()) {
      return NextResponse.json(
        { error: 'Admin login is not configured' },
        { status: 503 }
      )
    }

    const body = (await request.json().catch(() => ({}))) as {
      password?: string
    }

    if (!body.password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    if (!isAdminPasswordValid(body.password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const response = NextResponse.json({ ok: true })
    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      createAdminSessionToken(),
      getAdminSessionCookieOptions()
    )
    return response
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Failed to sign in' },
      { status: 500 }
    )
  }
}
