import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@/db/schema';
import * as relations from '@/db/relations';

const fullSchema = { ...schema, ...relations };

declare global {
  var __pgClient: ReturnType<typeof postgres> | undefined;
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const client =
  globalThis.__pgClient ??
  (globalThis.__pgClient = postgres(process.env.DATABASE_URL, { prepare: false }));

export const db = drizzle(client, { schema: fullSchema, casing: 'snake_case' });
export type DB = typeof db;
