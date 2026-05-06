import fs from 'fs'
import path from 'path'
import { createProvider } from './provider'
import { aiConfig, promptConfig } from './config'
import { ChatRequest, ChatResponse, ChatMessage } from './types'
import { profile } from '@/data/site/profile'
import { services } from '@/data/site/services'
import { portfolio } from '@/data/site/portfolio'

function loadPrompt(filename: string): string {
  const filepath = path.join(process.cwd(), filename)
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath, 'utf-8')
  }
  return ''
}

function buildSystemPrompt(): string {
  const frankSystem = loadPrompt(promptConfig.frankSystem)
  const assistantRules = loadPrompt(promptConfig.assistantRules)

  let systemPrompt = frankSystem
    .replace('{profile}', JSON.stringify(profile, null, 2))
    .replace('{services}', JSON.stringify(services, null, 2))
    .replace('{portfolio}', JSON.stringify(portfolio, null, 2))

  systemPrompt += '\n\n' + assistantRules

  return systemPrompt
}

function buildContextMessage(request: ChatRequest): string {
  let context = ''

  if (request.pageContext) {
    context += `Current page context: ${request.pageContext}\n`
  }

  if (request.serviceSlug) {
    const service = services.find(s => s.slug === request.serviceSlug)
    if (service) {
      context += `Currently viewing service: ${service.name}\n`
      context += `Service details: ${JSON.stringify(service)}\n`
    }
  }

  if (request.portfolioSlug) {
    const item = portfolio.find(p => p.slug === request.portfolioSlug)
    if (item) {
      context += `Currently viewing project: ${item.title}\n`
      context += `Project details: ${JSON.stringify(item)}\n`
    }
  }

  return context
}

function buildConversationHistory(messages: ChatMessage[]): string {
  const recentMessages = messages.slice(-aiConfig.history.maxMessages)
  return recentMessages
    .filter(m => m.role !== 'system')
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n')
}

export async function generateChatResponse(request: ChatRequest): Promise<ChatResponse> {
  const provider = createProvider()
  const systemPrompt = buildSystemPrompt()
  const context = buildContextMessage(request)

  let userMessage = context 
    ? `${context}\n\nUser question: ${request.message}`
    : request.message

  if (request.history && request.history.length > 0) {
    const historyStr = buildConversationHistory(request.history)
    userMessage = `Previous conversation:\n${historyStr}\n\nCurrent question: ${request.message}`
  }

  try {
    const reply = await provider.generate({
      system: systemPrompt,
      user: userMessage,
      temperature: aiConfig.temperature,
      maxTokens: aiConfig.maxTokens,
    })

    const shouldShowContactCta = reply.length > 300 || 
      reply.includes('contact') ||
      reply.includes('Get in touch')

    return {
      reply: reply.trim(),
      suggestions: generateSuggestions(reply),
      recommendedServiceSlugs: extractServiceRecommendations(reply),
      shouldShowContactCta,
    }
  } catch (error) {
    console.error('AI chat error:', error)
    return {
      reply: "I'm having trouble responding right now. Please try again or get in touch directly with your question.",
      shouldShowContactCta: true,
    }
  }
}

function generateSuggestions(reply: string): string[] {
  const suggestions: string[] = []

  if (reply.includes('IT support') || reply.includes('computer')) {
    suggestions.push('Tell me more about IT support')
  }
  if (reply.includes('website')) {
    suggestions.push('What can you do for my website?')
  }
  if (reply.includes('automation')) {
    suggestions.push('How does automation work?')
  }

  if (suggestions.length === 0) {
    suggestions.push('What other services interest you?')
    suggestions.push('How do I get started?')
  }

  return suggestions.slice(0, 3)
}

function extractServiceRecommendations(reply: string): string[] {
  const slugs: string[] = []

  const mappings: [RegExp, string][] = [
    [/it support|computer repair|hardware/i, 'it-support'],
    [/website|web app|online/i, 'websites'],
    [/workflow|business system|process/i, 'business-systems'],
    [/troubleshoot|fix|recover/i, 'troubleshooting'],
    [/automation|ai|automate/i, 'automation'],
    [/design|graphic|brand/i, 'digital-design'],
  ]

  for (const [pattern, slug] of mappings) {
    if (pattern.test(reply)) {
      slugs.push(slug)
    }
  }

  return Array.from(new Set(slugs))
}