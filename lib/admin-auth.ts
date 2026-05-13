import crypto from 'node:crypto'

export const ADMIN_SESSION_COOKIE = 'ray_admin_session'
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

function getAdminPassword() {
  const value = process.env.ADMIN_PASSWORD ?? process.env.ADMIN_ACCESS_TOKEN ?? ''
  return value.trim()
}

function getAdminSessionSecret() {
  const value = process.env.ADMIN_SESSION_SECRET?.trim()
  return value || getAdminPassword()
}

function timingSafeEquals(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)

  if (left.length !== right.length) {
    return false
  }

  return crypto.timingSafeEqual(left, right)
}

export function isAdminPasswordValid(password: string) {
  const expected = getAdminPassword()

  if (!expected) {
    return false
  }

  return timingSafeEquals(password, expected)
}

export function isAdminLoginConfigured() {
  return Boolean(getAdminPassword())
}

function signPayload(payload: string) {
  const secret = getAdminSessionSecret()

  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET or ADMIN_PASSWORD is required')
  }

  return crypto.createHmac('sha256', secret).update(payload).digest('base64url')
}

export function createAdminSessionToken() {
  const payload = JSON.stringify({
    exp: Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000,
    iat: Date.now(),
  })
  const encodedPayload = Buffer.from(payload).toString('base64url')
  const signature = signPayload(encodedPayload)

  return `${encodedPayload}.${signature}`
}

export function verifyAdminSessionToken(token?: string | null) {
  if (!getAdminSessionSecret()) {
    return false
  }

  if (!token) {
    return false
  }

  const [encodedPayload, signature] = token.split('.')

  if (!encodedPayload || !signature) {
    return false
  }

  const expectedSignature = signPayload(encodedPayload)

  if (!timingSafeEquals(signature, expectedSignature)) {
    return false
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8')
    ) as { exp?: number }

    if (!payload.exp || Date.now() > payload.exp) {
      return false
    }
  } catch {
    return false
  }

  return true
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  }
}

export function getSafeAdminRedirectPath(value: string | null | undefined) {
  if (!value) {
    return '/admin'
  }

  if (!value.startsWith('/admin') || value.startsWith('//')) {
    return '/admin'
  }

  return value
}
