import { NextResponse } from 'next/server'
import {
  DEFAULT_FRANK_ASSISTANT_NAME,
  DEFAULT_FRANK_GREETING,
} from '@/lib/ai/frank-defaults'
import { getFrankAssistantPublicConfig } from '@/lib/ai/frank-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const config = await getFrankAssistantPublicConfig()
    return NextResponse.json(config)
  } catch (error) {
    console.error('Frank config API error:', error)
    return NextResponse.json(
      {
        enabled: true,
        assistantName: DEFAULT_FRANK_ASSISTANT_NAME,
        greeting: DEFAULT_FRANK_GREETING,
      },
      { status: 200 }
    )
  }
}
