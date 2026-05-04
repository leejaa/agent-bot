import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import {
  deleteConversation,
  getConversationById,
} from '@/db/queries/conversations';
import { listTurnsByConversation } from '@/db/queries/turns';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

// GET /api/conversations/:id — get conversation with turns
export async function GET(_req: Request, { params }: Params) {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const conversation = await getConversationById(id, userId);
  if (!conversation) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const turns = await listTurnsByConversation(id);
  return NextResponse.json({ conversation, turns });
}

// DELETE /api/conversations/:id
export async function DELETE(_req: Request, { params }: Params) {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await deleteConversation(id, userId);
  return new Response(null, { status: 204 });
}
