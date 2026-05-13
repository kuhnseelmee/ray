import { AiProvider } from './types'
import { aiConfig } from './config'

export class OpenAIProvider implements AiProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || ''
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY is not configured')
    }
  }

  async generate(input: {
    system: string;
    user: string;
    temperature?: number;
    maxTokens?: number;
  }): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: input.system },
          { role: 'user', content: input.user },
        ],
        temperature: input.temperature ?? 0.7,
        max_tokens: input.maxTokens ?? 500,
      }),
      signal: AbortSignal.timeout(aiConfig.timeoutMs),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`OpenAI API error: ${response.status} - ${error}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }
}

export class OllamaProvider implements AiProvider {
  private baseUrl: string;
  private model: string;

  constructor() {
    this.baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
    this.model = process.env.OLLAMA_MODEL || 'llama3.1'
  }

  async generate(input: {
    system: string;
    user: string;
    temperature?: number;
    maxTokens?: number;
  }): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        prompt: `System: ${input.system}\n\nUser: ${input.user}`,
        stream: false,
        options: {
          temperature: input.temperature ?? 0.7,
          num_predict: input.maxTokens ?? 500,
        },
      }),
      signal: AbortSignal.timeout(aiConfig.timeoutMs),
    })

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`)
    }

    const data = await response.json()
    return data.response || ''
  }
}

export function createProvider(): AiProvider {
  const provider = process.env.AI_PROVIDER || 'openai'
  
  switch (provider) {
    case 'ollama':
      return new OllamaProvider()
    case 'openai':
    default:
      return new OpenAIProvider()
  }
}

export function isProviderConfigured(): boolean {
  const provider = process.env.AI_PROVIDER || 'openai'
  
  if (provider === 'openai') {
    return !!process.env.OPENAI_API_KEY
  }
  
  return true
}

export function isOllamaConfigured(): boolean {
  return !!process.env.OLLAMA_BASE_URL || process.env.AI_PROVIDER === 'ollama'
}

export function isQuotaError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false
  }

  const message = error.message.toLowerCase()
  return message.includes('429') && message.includes('insufficient_quota')
}
