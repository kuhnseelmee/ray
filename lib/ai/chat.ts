import { createProvider, isQuotaError, OllamaProvider } from './provider'
import { aiConfig } from './config'
import { getFrankAssistantConfig, renderFrankPrompt } from './frank-config'
import { ChatRequest, ChatResponse, ChatMessage } from './types'
import { profile } from '@/data/site/profile'
import { services } from '@/data/site/services'
import { portfolio } from '@/data/site/portfolio'

function looksLikeContextLimitError(error: unknown) {
  if (!(error instanceof Error)) {
    return false
  }

  const message = error.message.toLowerCase()
  return (
    message.includes('context length') ||
    message.includes('maximum context') ||
    message.includes('too many tokens') ||
    message.includes('token limit')
  )
}

function buildCompactSystemPrompt() {
  const serviceNames = services.map((item) => item.name).join(', ')

  return [
    `You are Frank, the AI assistant for ${profile.name}.`,
    'Use the saved persona and assistant rules. Keep replies practical, concise, and grounded in listed services.',
    `Known services: ${serviceNames}.`,
    `Contact path: /contact.`,
    'If unsure, be explicit and ask one clarifying question.',
  ].join('\n')
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

function normalizeText(value: string): string {
  return value.toLowerCase().trim()
}

function buildOfflineReply(request: ChatRequest): string {
  const message = normalizeText(request.message)
  const contextBits: string[] = []

  if (request.serviceSlug) {
    const service = services.find(s => s.slug === request.serviceSlug)
    if (service) {
      contextBits.push(service.name)
      contextBits.push(service.summary)
    }
  }

  if (request.portfolioSlug) {
    const item = portfolio.find(p => p.slug === request.portfolioSlug)
    if (item) {
      contextBits.push(item.title)
      contextBits.push(item.summary)
    }
  }

  const contactEmail = profile.contact.email
  const contactPath = '/contact'

  if (message.includes('what can you do') || message.includes('services') || message.includes('help')) {
    return [
      `I can help with practical technical work across Ray's core offers: IT support, websites and web systems, business systems and workflow automation, troubleshooting and recovery, automation and AI-assisted workflows, and digital design.`,
      `If you want, I can narrow that down to the best fit for your problem, or you can contact Ray at ${contactEmail} via ${contactPath}.`,
    ].join(' ')
  }

  if (message.includes('website') || message.includes('web')) {
    return [
      'Ray builds practical websites and web systems, including business sites, dashboards, portals, booking flows, and tools that support real operations.',
      `If you have a site or web tool in mind, tell me what it needs to do and I will point you to the right starting point. You can also contact Ray at ${contactEmail}.`,
    ].join(' ')
  }

  if (message.includes('automation') || message.includes('workflow') || message.includes('process')) {
    return [
      'Ray can map your workflow, remove repetitive admin, and build automations that move information between people, forms, spreadsheets, email, and systems.',
      'That usually starts with identifying the bottleneck, then simplifying the steps, then building a practical automation that is easy to support.',
    ].join(' ')
  }

  if (message.includes('it') || message.includes('computer') || message.includes('laptop') || message.includes('network')) {
    return [
      'Ray provides hands-on IT support, diagnostics, setup help, network troubleshooting, backup advice, and practical repair-oriented consulting.',
      'If the problem is hard to pin down, send the symptoms, what has already been tried, and what the system is doing right now.',
    ].join(' ')
  }

  if (message.includes('security') || message.includes('cyber') || message.includes('password') || message.includes('mfa')) {
    return [
      'Ray helps with practical cybersecurity hardening, account protection, MFA setup guidance, phishing awareness, and basic risk reduction.',
      'The focus is on the weak points that actually cause incidents: account hygiene, device hygiene, and safe user habits.',
    ].join(' ')
  }

  if (message.includes('data') || message.includes('spreadsheet') || message.includes('report')) {
    return [
      'Ray can clean up messy spreadsheets, structure data, improve reporting, and turn unreliable records into something easier to use and automate.',
      'That is useful when records are duplicated, reports are slow, or nobody trusts the spreadsheet anymore.',
    ].join(' ')
  }

  if (contextBits.length > 0) {
    return [
      `I can give you a practical answer about ${contextBits[0]}.`,
      `Based on the available information, the next step is usually to define the problem clearly, then choose the smallest solution that solves it.`,
      `If you want a direct conversation, contact Ray at ${contactEmail}.`,
    ].join(' ')
  }

  return [
    'I can help with practical technical work across websites, automation, IT support, cybersecurity, data cleanup, and AI-assisted business systems.',
    `Tell me what problem you are trying to solve, and I will point you to the most relevant service. You can also contact Ray directly at ${contactEmail}.`,
  ].join(' ')
}

function buildOfflineSuggestions(request: ChatRequest): string[] {
  const message = normalizeText(request.message)

  if (message.includes('what can you do') || message.includes('services')) {
    return ['Tell me about workflow automation', 'Tell me about IT support', 'Tell me about websites']
  }

  if (message.includes('website') || message.includes('web')) {
    return ['What can you build?', 'Can you make a dashboard?', 'How do I get started?']
  }

  if (message.includes('automation') || message.includes('workflow') || message.includes('process')) {
    return ['Automate a workflow', 'What tools do you use?', 'Can you help me simplify this?']
  }

  if (message.includes('security') || message.includes('cyber')) {
    return ['Harden my systems', 'Can you review my accounts?', 'How do I reduce risk?']
  }

  return ['What services fit my problem?', 'How do I get started?', 'Contact Ray']
}

function buildOfflineServiceRecommendations(request: ChatRequest): string[] {
  const message = normalizeText(request.message)
  const slugs: string[] = []

  const keywordMatches: Array<[RegExp, string]> = [
    [/website|web|dashboard|portal|booking/, 'custom-dashboards'],
    [/automation|workflow|process|integrat/, 'systems-automation'],
    [/ai/, 'ai-assisted-business'],
    [/it support|computer|laptop|network|email|backup/, 'it-support-consulting'],
    [/security|cyber|mfa|password|phishing/, 'cybersecurity-awareness'],
    [/data|spreadsheet|report|csv|sql/, 'data-optimisation'],
    [/roi|ndis|participant|shift/, 'ndis-roi-calculator'],
  ]

  for (const [pattern, slug] of keywordMatches) {
    if (pattern.test(message)) {
      slugs.push(slug)
    }
  }

  if (request.serviceSlug) {
    slugs.push(request.serviceSlug)
  }

  return Array.from(new Set(slugs))
}

export async function generateChatResponse(request: ChatRequest): Promise<ChatResponse> {
  const frankConfig = await getFrankAssistantConfig()
  const fullSystemPrompt = renderFrankPrompt(frankConfig)
  const compactSystemPrompt = buildCompactSystemPrompt()
  const context = buildContextMessage(request)

  let userMessage = context 
    ? `${context}\n\nUser question: ${request.message}`
    : request.message

  if (request.history && request.history.length > 0) {
    const historyStr = buildConversationHistory(request.history)
    userMessage = `Previous conversation:\n${historyStr}\n\nCurrent question: ${request.message}`
  }

  try {
    const provider = createProvider()
    const reply = await provider.generate({
      system: fullSystemPrompt,
      user: userMessage,
      temperature: aiConfig.temperature,
      maxTokens: aiConfig.maxTokens,
    })

    const shouldShowContactCta = reply.length > 300 || 
      reply.includes('contact') ||
      reply.includes('Get in touch')

    return {
      reply: reply.trim() || buildOfflineReply(request),
      suggestions: generateSuggestions(reply),
      recommendedServiceSlugs: extractServiceRecommendations(reply),
      shouldShowContactCta,
      debug:
        process.env.NODE_ENV === 'production'
          ? undefined
          : { path: 'full-prompt' },
    }
  } catch (error) {
    console.error('AI chat error:', error)

    // Retry once with a compact prompt so updated Frank instructions still apply
    // even when the full prompt is too large for the provider context window.
    if (looksLikeContextLimitError(error)) {
      try {
        const provider = createProvider()
        const retryReply = await provider.generate({
          system: `${compactSystemPrompt}\n\nPersona:\n${frankConfig.persona}\n\nRules:\n${frankConfig.assistantRules}`,
          user: userMessage,
          temperature: aiConfig.temperature,
          maxTokens: aiConfig.maxTokens,
        })

        const trimmedRetry = retryReply.trim()
        return {
          reply: trimmedRetry || buildOfflineReply(request),
          suggestions: generateSuggestions(retryReply),
          recommendedServiceSlugs: extractServiceRecommendations(retryReply),
          shouldShowContactCta:
            trimmedRetry.length > 300 ||
            trimmedRetry.includes('contact') ||
            trimmedRetry.includes('Get in touch'),
          debug:
            process.env.NODE_ENV === 'production'
              ? undefined
              : { path: 'compact-retry' },
        }
      } catch (retryError) {
        console.error('AI compact prompt retry error:', retryError)
      }
    }

    if (isQuotaError(error)) {
      try {
        const ollamaReply = await new OllamaProvider().generate({
          system: fullSystemPrompt,
          user: userMessage,
          temperature: aiConfig.temperature,
          maxTokens: aiConfig.maxTokens,
        })

        const trimmedReply = ollamaReply.trim()

        return {
          reply: trimmedReply || buildOfflineReply(request),
          suggestions: generateSuggestions(ollamaReply),
          recommendedServiceSlugs: extractServiceRecommendations(ollamaReply),
          shouldShowContactCta: trimmedReply.length > 300 || trimmedReply.includes('contact') || trimmedReply.includes('Get in touch'),
          debug:
            process.env.NODE_ENV === 'production'
              ? undefined
              : { path: 'ollama-fallback' },
        }
      } catch (ollamaError) {
        console.error('Ollama fallback error:', ollamaError)
      }
    }

    const offlineReply = buildOfflineReply(request)

    return {
      reply: offlineReply,
      suggestions: buildOfflineSuggestions(request),
      recommendedServiceSlugs: buildOfflineServiceRecommendations(request),
      shouldShowContactCta: true,
      debug:
        process.env.NODE_ENV === 'production'
          ? undefined
          : { path: 'offline-fallback' },
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
    [/it support|computer repair|hardware/i, 'it-support-consulting'],
    [/website|web app|online|dashboard/i, 'custom-dashboards'],
    [/workflow|business system|process/i, 'systems-automation'],
    [/troubleshoot|fix|recover/i, 'it-support-consulting'],
    [/automation|ai|automate/i, 'ai-assisted-business'],
    [/design|graphic|brand/i, 'custom-dashboards'],
    [/data|spreadsheet|report/i, 'data-optimisation'],
    [/security|cyber|mfa|password/i, 'cybersecurity-awareness'],
    [/ndis|roi|participant|shift/i, 'ndis-roi-calculator'],
  ]

  for (const [pattern, slug] of mappings) {
    if (pattern.test(reply)) {
      slugs.push(slug)
    }
  }

  return Array.from(new Set(slugs))
}
