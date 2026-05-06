import fs from 'fs'
import path from 'path'
import { promptConfig } from './config'

export function loadPromptFile(filename: string): string {
  const key = filename as keyof typeof promptConfig
  const filepath = path.join(process.cwd(), promptConfig[key] || filename)
  
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath, 'utf-8')
  }
  
  return ''
}

export function buildFrankSystemPrompt(): string {
  const frankSystem = loadPromptFile('frankSystem')
  const assistantRules = loadPromptFile('assistantRules')

  return `${frankSystem}\n\n${assistantRules}`
}

export function buildClassifierPrompt(): string {
  return loadPromptFile('intakeClassifier')
}

export function buildPortfolioPrompt(): string {
  return loadPromptFile('portfolioExplainer')
}