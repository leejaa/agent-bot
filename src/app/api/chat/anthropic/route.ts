import { handleProviderChat } from '@/lib/chatStream';

export const runtime = 'nodejs';

export function POST(req: Request) {
  return handleProviderChat('anthropic', req);
}
