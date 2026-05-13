CREATE TABLE IF NOT EXISTS enterprise_agent_platform_config (
  id TEXT PRIMARY KEY,
  stages_json TEXT NOT NULL,
  capabilities_json TEXT NOT NULL,
  notes_json TEXT NOT NULL,
  published_at TIMESTAMPTZ,
  published_by_role TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
