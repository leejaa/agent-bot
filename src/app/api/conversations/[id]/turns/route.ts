import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { z } from 'zod';
import { getConversationById } from '@/db/queries/conversations';
import { saveTurnAndTouchConversation } from '@/db/queries/turns';

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
  const conversation = await getConversationById(id, userId);
  if (!conversation) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const turn = await saveTurnAndTouchConversation({
    conversationId: id,
    userMessage: parsed.data.user_message,
    openaiResponse: parsed.data.openai_response ?? null,
    anthropicResponse: parsed.data.anthropic_response ?? null,
    googleResponse: parsed.data.google_response ?? null,
  });

  return NextResponse.json(turn, { status: 201 });
}
