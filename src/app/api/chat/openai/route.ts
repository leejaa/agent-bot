import { streamText } from 'ai';
import { headers } from 'next/headers';
import { z } from 'zod';
import { getBalance } from '@/db/queries/credits';
import { getModel, getModels } from '@/lib/models';
import { noCreditsErrorMessage } from '@/lib/beta';

export const runtime = 'nodejs';

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const bodySchema = z.object({
  messages: z.array(messageSchema),
});

export async function POST(req: Request) {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response('Invalid request body', { status: 400 });
  }

  const balance = await getBalance(userId);
  if (balance <= 0) {
    return new Response(
      JSON.stringify({ error: noCreditsErrorMessage() }),
      { status: 402, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const models = await getModels();
  const { modelId } = getModel(models, 'openai');

  const result = streamText({
    model: modelId,
    messages: parsed.data.messages,
    providerOptions: {
      gateway: { user: userId, tags: ['feature:chat', 'provider:openai'] },
    },
    onError: ({ error }) => {
      console.error('[chat:openai] stream error', { message: (error as Error)?.message, error });
    },
  });

  const response = result.toTextStreamResponse();
  response.headers.set('x-credits-remaining', String(balance));
  return response;
}
