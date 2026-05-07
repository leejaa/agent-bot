import 'server-only';
import { streamText } from 'ai';
import { headers } from 'next/headers';
import { z } from 'zod';
import { getBalance } from '@/db/queries/credits';
import { getModel, getModels, type ProviderKey } from '@/lib/models';
import {
  calcCostUsd,
  getAvailableModels,
  getPricing,
} from '@/lib/pricing';
import { stashUsage } from '@/lib/turnUsage';
import { noCreditsErrorMessage } from '@/lib/beta';

/**
 * Shared per-slot chat streaming handler used by /api/chat/openai,
 * /api/chat/anthropic, /api/chat/google. The route's provider key acts as a
 * *slot identifier* (column 1 / 2 / 3); the actual model is whatever the
 * client supplies in `modelId`, falling back to the provider's default.
 */

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const bodySchema = z.object({
  messages: z.array(messageSchema),
  modelId: z.string().optional(),
  turnId: z.string().optional(),
});

export async function handleProviderChat(slot: ProviderKey, req: Request) {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) return new Response('Unauthorized', { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return new Response('Invalid request body', { status: 400 });

  const balance = await getBalance(userId);
  if (balance <= 0) {
    return new Response(JSON.stringify({ error: noCreditsErrorMessage() }), {
      status: 402,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const modelId = await resolveModelId(slot, parsed.data.modelId);
  const turnId = parsed.data.turnId;

  const result = streamText({
    model: modelId,
    messages: parsed.data.messages,
    providerOptions: {
      gateway: { user: userId, tags: ['feature:chat', `slot:${slot}`] },
    },
    onError: ({ error }) => {
      console.error(`[chat:${slot}] stream error`, {
        message: (error as Error)?.message,
        error,
      });
    },
    onFinish: async ({ usage }) => {
      if (!turnId) return;
      try {
        const pricing = await getPricing(modelId);
        if (!pricing) return;
        const inputTokens = usage.inputTokens ?? 0;
        const outputTokens = usage.outputTokens ?? 0;
        const costUsd = calcCostUsd(pricing, inputTokens, outputTokens);
        await stashUsage(turnId, slot, { modelId, inputTokens, outputTokens, costUsd });
      } catch (e) {
        console.error(`[chat:${slot}] usage stash failed`, e);
      }
    },
  });

  const response = result.toTextStreamResponse();
  response.headers.set('x-credits-remaining', String(balance));
  return response;
}

async function resolveModelId(slot: ProviderKey, requested?: string): Promise<string> {
  if (requested) {
    const list = await getAvailableModels();
    if (list.find((m) => m.id === requested)) return requested;
  }
  const defaults = await getModels();
  return getModel(defaults, slot).modelId;
}
