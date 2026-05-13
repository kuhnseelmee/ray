import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, getAdminSessionCookieOptions } from '@/lib/admin-auth'

export async function POST() {
  const response = NextResponse.redirect('/admin/login', { status: 303 })
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    ...getAdminSessionCookieOptions(),
    maxAge: 0,
  })
  return response
}
