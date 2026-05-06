export const aiConfig = {
  provider: process.env.AI_PROVIDER || 'openai',
  model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  temperature: 0.7,
  maxTokens: 500,
  timeoutMs: 20000,
  enableAI: process.env.NEXT_PUBLIC_ENABLE_AI === 'true',
  rateLimit: {
    maxRequestsPerMinute: 20,
    maxRequestsPerHour: 100,
  },
  history: {
    maxMessages: 10,
    maxAge: 3600000,
  },
}

export const promptConfig = {
  frankSystem: 'data/prompts/frank-system.md',
  assistantRules: 'data/prompts/assistant-rules.md',
  intakeClassifier: 'data/prompts/intake-classifier.md',
  portfolioExplainer: 'data/prompts/portfolio-explainer.md',
}