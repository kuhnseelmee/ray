import { NextRequest, NextResponse } from 'next/server'
import { saveContactSubmission } from '@/lib/db'

export const runtime = 'nodejs'

type ContactPayload = {
  name?: string
  email?: string
  company?: string
  service?: string
  message?: string
}

function cleanText(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.trim()
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload
    const name = cleanText(body.name)
    const email = cleanText(body.email)
    const company = cleanText(body.company)
    const service = cleanText(body.service)
    const message = cleanText(body.message)

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    if (message.length > 4000) {
      return NextResponse.json(
        { error: 'Message too long (max 4000 characters)' },
        { status: 400 }
      )
    }

    const saved = await saveContactSubmission({
      name,
      email,
      company: company || null,
      service: service || null,
      message,
    })

    return NextResponse.json({
      ok: true,
      id: saved.id,
      createdAt: saved.created_at,
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Failed to save contact request' },
      { status: 500 }
    )
  }
}
