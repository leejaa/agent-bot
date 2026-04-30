import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { sql } from '@/lib/db';
import { z } from 'zod';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

const schema = z.object({
  user_message: z.string(),
  openai_response: z.string().nullable().optional(),
  anthropic_response: z.string().nullable().optional(),
  google_response: z.string().nullable().optional(),
});

// POST /api/conversations/:id/turns — save a completed turn
export async function POST(req: Request, { params }: Params) {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const db = sql();

  const convRows = await db`
    SELECT id FROM conversations WHERE id = ${id} AND user_id = ${userId} LIMIT 1
  `;
  if (!convRows[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const { user_message, openai_response, anthropic_response, google_response } = parsed.data;

  const turnRows = await db`
    INSERT INTO turns (conversation_id, user_message, openai_response, anthropic_response, google_response)
    VALUES (${id}, ${user_message}, ${openai_response ?? null}, ${anthropic_response ?? null}, ${google_response ?? null})
    RETURNING *
  `;

  await db`UPDATE conversations SET updated_at = now() WHERE id = ${id}`;

  const convCheck = await db`SELECT title FROM conversations WHERE id = ${id}`;
  if (!convCheck[0]?.title) {
    const autoTitle = user_message.slice(0, 60);
    await db`UPDATE conversations SET title = ${autoTitle} WHERE id = ${id}`;
  }

  return NextResponse.json(turnRows[0], { status: 201 });
}
