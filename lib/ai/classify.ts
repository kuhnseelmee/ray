import fs from 'fs'
import path from 'path'
import { createProvider } from './provider'
import { aiConfig, promptConfig } from './config'
import { IntakeRequest, IntakeResponse } from './types'

function loadPrompt(filename: string): string {
  const filepath = path.join(process.cwd(), filename)
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath, 'utf-8')
  }
  return ''
}

export async function classifyIntake(request: IntakeRequest): Promise<IntakeResponse> {
  const provider = createProvider()
  const classifierPrompt = loadPrompt(promptConfig.intakeClassifier)

  const userMessage = `Contact request from ${request.name || 'unknown'} (${
    request.email || 'no email'
  })${request.company ? ` at ${request.company}` : ''}:

Message: ${request.message}

Please classify this request and return a JSON response.`

  try {
    const result = await provider.generate({
      system: classifierPrompt,
      user: userMessage,
      temperature: 0.3,
      maxTokens: 300,
    })

    const parsed = JSON.parse(result)

    return {
      summary: parsed.summary || 'Request received',
      category: parsed.category || 'other',
      urgency: parsed.urgency || 'medium',
      recommendedNextStep: parsed.recommendedNextStep || 'Review and respond',
      suggestedServices: parsed.suggestedServices || [],
      confidence: parsed.confidence || 0.5,
      followUpQuestions: parsed.followUpQuestions || [],
    }
  } catch (error) {
    console.error('Intake classification error:', error)
    return {
      summary: request.message.substring(0, 100),
      category: 'other',
      urgency: 'medium',
      recommendedNextStep: 'Manual review recommended',
      suggestedServices: [],
      confidence: 0.3,
    }
  }
}