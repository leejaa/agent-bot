import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';

// GET /api/conversations — list user's conversations
export async function GET() {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = sql();
  const rows = await db`
    SELECT id, title, created_at, updated_at
    FROM conversations
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
    LIMIT 50
  `;
  return NextResponse.json(rows);
}

// POST /api/conversations — create a new conversation
export async function POST(req: Request) {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const title: string | null = body?.title ?? null;

  const db = sql();
  const rows = await db`
    INSERT INTO conversations (user_id, title)
    VALUES (${userId}, ${title})
    RETURNING *
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
