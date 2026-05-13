CREATE TABLE IF NOT EXISTS frank_config (
  id TEXT PRIMARY KEY,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  assistant_name TEXT NOT NULL,
  greeting TEXT NOT NULL,
  system_prompt TEXT NOT NULL,
  persona TEXT NOT NULL,
  assistant_rules TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
