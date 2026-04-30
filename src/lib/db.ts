import postgres from 'postgres';

let _sql: ReturnType<typeof postgres> | null = null;

export function sql(): ReturnType<typeof postgres> {
  if (!_sql) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
    _sql = postgres(process.env.DATABASE_URL, {
      // Disable prepare for compatibility with connection poolers (Vercel/Neon).
      // For local dev with direct connections, this is harmless.
      prepare: false,
    });
  }
  return _sql;
}
