-- Run this against your Neon Postgres database to initialize the schema.
-- Example: psql $DATABASE_URL -f schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT        UNIQUE NOT NULL,
  password_hash TEXT      NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conversations (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS conversations_user_id_idx ON conversations(user_id);

-- Each "turn" = one user prompt + the 3 model responses
CREATE TABLE IF NOT EXISTS turns (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id     UUID        NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_message        TEXT        NOT NULL,
  openai_response     TEXT,
  anthropic_response  TEXT,
  google_response     TEXT,
  created_at          TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS turns_conversation_id_idx ON turns(conversation_id);
