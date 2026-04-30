import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

// GET /api/conversations/:id — get conversation with turns
export async function GET(_req: Request, { params }: Params) {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const db = sql();

  const convRows = await db`
    SELECT * FROM conversations WHERE id = ${id} AND user_id = ${userId} LIMIT 1
  `;
  if (!convRows[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const turns = await db`
    SELECT * FROM turns WHERE conversation_id = ${id} ORDER BY created_at ASC
  `;

  return NextResponse.json({ conversation: convRows[0], turns });
}

// DELETE /api/conversations/:id
export async function DELETE(_req: Request, { params }: Params) {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const db = sql();

  await db`DELETE FROM conversations WHERE id = ${id} AND user_id = ${userId}`;
  return new Response(null, { status: 204 });
}
