import {
  enterpriseAgentPlatformCapabilities,
  enterpriseAgentPlatformStages,
  enterprisePlatformCommencementNotes,
  type PlatformCapability,
  type PlatformStage,
} from '@/data/admin/enterprise-ai-agent-platform'
import {
  getEnterpriseAgentPlatformConfigRow,
  saveEnterpriseAgentPlatformConfig,
} from '@/lib/db'

export type EnterpriseAgentPlatformConfig = {
  stages: PlatformStage[]
  capabilities: PlatformCapability[]
  notes: string[]
  publishedAt: string | null
  publishedByRole: string | null
  updatedAt?: string
}

function getDefaultConfig(): EnterpriseAgentPlatformConfig {
  return {
    stages: enterpriseAgentPlatformStages,
    capabilities: enterpriseAgentPlatformCapabilities,
    notes: enterprisePlatformCommencementNotes,
    publishedAt: null,
    publishedByRole: null,
  }
}

function safeParseJson<T>(value: string, fallback: T): T {
  try {
    const parsed = JSON.parse(value) as T
    return parsed
  } catch {
    return fallback
  }
}

function normalizeConfig(input: EnterpriseAgentPlatformConfig): EnterpriseAgentPlatformConfig {
  return {
    stages: Array.isArray(input.stages) ? input.stages : [],
    capabilities: Array.isArray(input.capabilities) ? input.capabilities : [],
    notes: Array.isArray(input.notes) ? input.notes : [],
    publishedAt: input.publishedAt ?? null,
    publishedByRole: input.publishedByRole ?? null,
    updatedAt: input.updatedAt,
  }
}

function mapRowToConfig(row: Awaited<ReturnType<typeof getEnterpriseAgentPlatformConfigRow>>) {
  if (!row) {
    return getDefaultConfig()
  }

  return normalizeConfig({
    stages: safeParseJson(row.stagesJson, enterpriseAgentPlatformStages),
    capabilities: safeParseJson(row.capabilitiesJson, enterpriseAgentPlatformCapabilities),
    notes: safeParseJson(row.notesJson, enterprisePlatformCommencementNotes),
    publishedAt: row.publishedAt,
    publishedByRole: row.publishedByRole,
    updatedAt: row.updatedAt,
  })
}

export async function getEnterpriseAgentPlatformConfig() {
  const row = await getEnterpriseAgentPlatformConfigRow()
  return mapRowToConfig(row)
}

export async function saveEnterpriseAgentPlatformDraft(
  config: Pick<EnterpriseAgentPlatformConfig, 'stages' | 'capabilities' | 'notes'>
) {
  const current = await getEnterpriseAgentPlatformConfig()
  const saved = await saveEnterpriseAgentPlatformConfig({
    stagesJson: JSON.stringify(config.stages),
    capabilitiesJson: JSON.stringify(config.capabilities),
    notesJson: JSON.stringify(config.notes),
    publishedAt: current.publishedAt,
    publishedByRole: current.publishedByRole,
  })

  return mapRowToConfig(saved)
}

export async function publishEnterpriseAgentPlatform(role: string) {
  const current = await getEnterpriseAgentPlatformConfig()
  const publishedAt = new Date().toISOString()
  const saved = await saveEnterpriseAgentPlatformConfig({
    stagesJson: JSON.stringify(current.stages),
    capabilitiesJson: JSON.stringify(current.capabilities),
    notesJson: JSON.stringify(current.notes),
    publishedAt,
    publishedByRole: role,
  })

  return mapRowToConfig(saved)
}
