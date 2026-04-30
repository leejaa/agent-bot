import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { headers } from 'next/headers';
import { checkRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

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

  const { allowed, remaining } = await checkRateLimit(userId);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: '일일 메시지 한도에 도달했습니다. 내일 다시 시도해주세요.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const result = streamText({
    model: google('gemini-2.5-pro'),
    messages: parsed.data.messages,
  });

  const response = result.toTextStreamResponse();
  response.headers.set('x-ratelimit-remaining', String(remaining));
  return response;
}
