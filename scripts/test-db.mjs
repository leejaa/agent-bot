// Quick connectivity test against the local Postgres.
// Run: node --env-file=.env.local scripts/test-db.mjs
import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { prepare: false });

try {
  const version = await sql`SELECT version()`;
  console.log('✓ connected:', version[0].version);

  const tables = await sql`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' ORDER BY table_name
  `;
  console.log('✓ tables:', tables.map(t => t.table_name).join(', '));

  // Insert + read + cleanup test
  const inserted = await sql`
    INSERT INTO users (email, password_hash) VALUES ('test@example.com', 'dummy')
    RETURNING id, email
  `;
  console.log('✓ insert ok:', inserted[0]);

  const found = await sql`SELECT id, email FROM users WHERE email = 'test@example.com'`;
  console.log('✓ select ok:', found[0]);

  await sql`DELETE FROM users WHERE email = 'test@example.com'`;
  console.log('✓ cleanup ok');

  await sql.end();
  console.log('\n✅ all checks passed');
} catch (err) {
  console.error('❌ failed:', err);
  process.exit(1);
}
