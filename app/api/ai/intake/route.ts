import { NextRequest, NextResponse } from 'next/server'
import { classifyIntake } from '@/lib/ai/classify'
import { isProviderConfigured } from '@/lib/ai/provider'
import { IntakeRequest } from '@/lib/ai/types'

export async function POST(request: NextRequest) {
  try {
    if (!isProviderConfigured()) {
      return NextResponse.json(
        { error: 'AI provider not configured' },
        { status: 503 }
      )
    }

    const body: IntakeRequest = await request.json()

    if (!body.message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (body.message.length > 2000) {
      return NextResponse.json(
        { error: 'Message too long (max 2000 characters)' },
        { status: 400 }
      )
    }

    const response = await classifyIntake(body)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Intake API error:', error)
    return NextResponse.json(
      { error: 'Failed to classify request' },
      { status: 500 }
    )
  }
}