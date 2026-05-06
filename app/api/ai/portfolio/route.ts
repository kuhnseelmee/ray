import { NextRequest, NextResponse } from 'next/server'
import { explainPortfolio } from '@/lib/ai/portfolio'
import { isProviderConfigured } from '@/lib/ai/provider'
import { PortfolioRequest } from '@/lib/ai/types'
import { getPortfolioBySlug } from '@/data/site/portfolio'

export async function POST(request: NextRequest) {
  try {
    if (!isProviderConfigured()) {
      return NextResponse.json(
        { error: 'AI provider not configured' },
        { status: 503 }
      )
    }

    const body: PortfolioRequest = await request.json()

    if (!body.portfolioSlug || !body.question) {
      return NextResponse.json(
        { error: 'portfolioSlug and question are required' },
        { status: 400 }
      )
    }

    const item = getPortfolioBySlug(body.portfolioSlug)
    if (!item) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      )
    }

    if (body.question.length > 500) {
      return NextResponse.json(
        { error: 'Question too long (max 500 characters)' },
        { status: 400 }
      )
    }

    const response = await explainPortfolio(body)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Portfolio API error:', error)
    return NextResponse.json(
      { error: 'Failed to answer question' },
      { status: 500 }
    )
  }
}