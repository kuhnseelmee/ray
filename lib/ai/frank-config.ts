import fs from 'node:fs'
import path from 'node:path'
import { profile } from '@/data/site/profile'
import { services } from '@/data/site/services'
import { portfolio } from '@/data/site/portfolio'
import {
  DEFAULT_FRANK_ASSISTANT_NAME,
  DEFAULT_FRANK_GREETING,
  DEFAULT_FRANK_PERSONA,
} from './frank-defaults'
import { getFrankConfigRow, saveFrankConfig, type FrankConfigInput, type FrankConfigRow } from '@/lib/db'

export type FrankAssistantConfig = FrankConfigInput & {
  updatedAt?: string
  configSource?: 'database' | 'local_fallback' | 'defaults'
}

export type FrankAssistantPublicConfig = {
  enabled: boolean
  assistantName: string
  greeting: string
}

const FRANK_LOCAL_CONFIG_PATH = path.join(
  process.cwd(),
  'data',
  'runtime',
  'frank-config.local.json'
)

function loadPromptFile(filename: string) {
  const filepath = path.join(process.cwd(), 'data', 'prompts', filename)

  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath, 'utf-8')
  }

  return ''
}

function createDefaultFrankConfig(): FrankAssistantConfig {
  return {
    enabled: true,
    assistantName: DEFAULT_FRANK_ASSISTANT_NAME,
    greeting: DEFAULT_FRANK_GREETING,
    systemPrompt: loadPromptFile('frank-system.md'),
    persona: DEFAULT_FRANK_PERSONA,
    assistantRules: loadPromptFile('assistant-rules.md'),
  }
}

function ensureFrankLocalConfigDir() {
  const dir = path.dirname(FRANK_LOCAL_CONFIG_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function readFrankLocalConfig(): FrankAssistantConfig | null {
  try {
    if (!fs.existsSync(FRANK_LOCAL_CONFIG_PATH)) {
      return null
    }

    const raw = fs.readFileSync(FRANK_LOCAL_CONFIG_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as Partial<FrankAssistantConfig>
    const defaults = createDefaultFrankConfig()

    return {
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : defaults.enabled,
      assistantName: (parsed.assistantName || '').trim() || defaults.assistantName,
      greeting: (parsed.greeting || '').trim() || defaults.greeting,
      systemPrompt: (parsed.systemPrompt || '').trim() || defaults.systemPrompt,
      persona: (parsed.persona || '').trim() || defaults.persona,
      assistantRules: (parsed.assistantRules || '').trim() || defaults.assistantRules,
      updatedAt: parsed.updatedAt,
    }
  } catch (error) {
    console.error('Failed to read local Frank config:', error)
    return null
  }
}

function writeFrankLocalConfig(config: FrankAssistantConfig) {
  try {
    ensureFrankLocalConfigDir()
    fs.writeFileSync(
      FRANK_LOCAL_CONFIG_PATH,
      JSON.stringify(
        {
          ...config,
          updatedAt: config.updatedAt || new Date().toISOString(),
        },
        null,
        2
      ),
      'utf-8'
    )
  } catch (error) {
    console.error('Failed to write local Frank config:', error)
  }
}

function mapFrankConfigRow(row: FrankConfigRow): FrankAssistantConfig {
  const defaults = createDefaultFrankConfig()

  return {
    enabled: row.enabled,
    assistantName: row.assistantName || defaults.assistantName,
    greeting: row.greeting || defaults.greeting,
    systemPrompt: row.systemPrompt || defaults.systemPrompt,
    persona: row.persona || defaults.persona,
    assistantRules: row.assistantRules || defaults.assistantRules,
    updatedAt: row.updatedAt,
    configSource: 'database',
  }
}

export function renderFrankPrompt(config: FrankAssistantConfig) {
  const defaults = createDefaultFrankConfig()
  const template = config.systemPrompt.trim() || defaults.systemPrompt
  const persona = config.persona.trim() || defaults.persona
  const assistantRules = config.assistantRules.trim() || defaults.assistantRules

  const rendered = template
    .replaceAll('{profile}', JSON.stringify(profile, null, 2))
    .replaceAll('{services}', JSON.stringify(services, null, 2))
    .replaceAll('{portfolio}', JSON.stringify(portfolio, null, 2))
    .replaceAll('{persona}', persona)

  return `${rendered}\n\n${assistantRules}`
}

export async function getFrankAssistantConfig() {
  const localConfig = readFrankLocalConfig()

  try {
    const row = await getFrankConfigRow()
    if (!row) {
      if (localConfig) {
        return {
          ...localConfig,
          configSource: 'local_fallback' as const,
        } satisfies FrankAssistantConfig
      }

      return {
        ...createDefaultFrankConfig(),
        configSource: 'defaults' as const,
      } satisfies FrankAssistantConfig
    }

    const config = mapFrankConfigRow(row)
    writeFrankLocalConfig(config)
    return config
  } catch (error) {
    console.error('Failed to load Frank config:', error)
    if (localConfig) {
      return {
        ...localConfig,
        configSource: 'local_fallback' as const,
      } satisfies FrankAssistantConfig
    }

    return {
      ...createDefaultFrankConfig(),
      configSource: 'defaults' as const,
    } satisfies FrankAssistantConfig
  }
}

export async function getFrankAssistantPublicConfig(): Promise<FrankAssistantPublicConfig> {
  const config = await getFrankAssistantConfig()
  return {
    enabled: config.enabled,
    assistantName: config.assistantName,
    greeting: config.greeting,
  }
}

export async function saveFrankAssistantConfig(input: FrankAssistantConfig) {
  const defaults = createDefaultFrankConfig()
  const normalized: FrankConfigInput = {
    enabled: Boolean(input.enabled),
    assistantName: input.assistantName.trim() || DEFAULT_FRANK_ASSISTANT_NAME,
    greeting: input.greeting.trim() || DEFAULT_FRANK_GREETING,
    systemPrompt: input.systemPrompt.trim() || defaults.systemPrompt,
    persona: input.persona.trim() || defaults.persona,
    assistantRules: input.assistantRules.trim() || defaults.assistantRules,
  }

  try {
    const saved = await saveFrankConfig(normalized)
    const mapped = mapFrankConfigRow(saved)
    writeFrankLocalConfig(mapped)
    return mapped
  } catch (error) {
    console.error('Failed to persist Frank config in database, using local fallback:', error)
    const localFallback: FrankAssistantConfig = {
      ...normalized,
      updatedAt: new Date().toISOString(),
      configSource: 'local_fallback',
    }
    writeFrankLocalConfig(localFallback)
    return localFallback
  }
}

export async function resetFrankAssistantConfig() {
  return saveFrankAssistantConfig(createDefaultFrankConfig())
}

export function getDefaultFrankAssistantConfig(): FrankAssistantConfig {
  return createDefaultFrankConfig()
}
