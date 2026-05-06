import fs from 'fs'
import path from 'path'
import { createProvider } from './provider'
import { aiConfig, promptConfig } from './config'
import { PortfolioRequest, PortfolioResponse } from './types'
import { getPortfolioBySlug } from '@/data/site/portfolio'

function loadPrompt(filename: string): string {
  const filepath = path.join(process.cwd(), filename)
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath, 'utf-8')
  }
  return ''
}

export async function explainPortfolio(request: PortfolioRequest): Promise<PortfolioResponse> {
  const provider = createProvider()
  const item = getPortfolioBySlug(request.portfolioSlug)

  if (!item) {
    return {
      answer: "I don't have information about that specific project.",
      followUps: [],
    }
  }

  const explainerPrompt = loadPrompt(promptConfig.portfolioExplainer)
  const systemPrompt = explainerPrompt.replace(
    '{portfolio}',
    JSON.stringify(item, null, 2)
  )

  const userMessage = `Question about ${item.title}: ${request.question}`

  try {
    const answer = await provider.generate({
      system: systemPrompt,
      user: userMessage,
      temperature: 0.6,
      maxTokens: 400,
    })

    return {
      answer: answer.trim(),
      followUps: item.possibleQuestions.slice(0, 2),
    }
  } catch (error) {
    console.error('Portfolio explain error:', error)
    return {
      answer: "I'm having trouble answering that question right now. Feel free to contact Ray directly for more details.",
      followUps: ['Contact Ray for more details'],
    }
  }
}