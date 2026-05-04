import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import {
  createConversation,
  listConversationsForUser,
} from '@/db/queries/conversations';

export const runtime = 'nodejs';

// GET /api/conversations — list user's conversations
export async function GET() {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const rows = await listConversationsForUser(userId);
  return NextResponse.json(rows);
}

// POST /api/conversations — create a new conversation
export async function POST(req: Request) {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const title: string | null = body?.title ?? null;

  const row = await createConversation(userId, title);
  return NextResponse.json(row, { status: 201 });
}
