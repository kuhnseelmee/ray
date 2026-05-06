import { NextRequest, NextResponse } from 'next/server'
import { generateChatResponse } from '@/lib/ai/chat'
import { validateInput } from '@/lib/ai/guardrails'
import { ChatRequest } from '@/lib/ai/types'
import { isProviderConfigured } from '@/lib/ai/provider'

export async function POST(request: NextRequest) {
  try {
    if (!isProviderConfigured()) {
      return NextResponse.json(
        { error: 'AI provider not configured' },
        { status: 503 }
      )
    }

    const body: ChatRequest = await request.json()

    if (!body.message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const validation = validateInput(body.message)
    if (!validation.passed) {
      return NextResponse.json(
        { error: validation.reason },
        { status: 400 }
      )
    }

    const response = await generateChatResponse({
      ...body,
      message: validation.sanitized || body.message,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}