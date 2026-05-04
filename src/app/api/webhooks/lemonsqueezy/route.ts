import crypto from 'node:crypto';
import { addCredits, CREDITS_PER_STARTER_PACK } from '@/db/queries/credits';

export const runtime = 'nodejs';

function verifySignature(rawBody: string, signatureHeader: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(rawBody).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(digest, 'hex'), Buffer.from(signatureHeader, 'hex'));
  } catch {
    return false;
  }
}

type LSEvent = {
  meta: {
    event_name: string;
    custom_data?: { user_id?: string };
  };
  data: {
    id: string;
    type: string;
    attributes: Record<string, unknown> & {
      first_order_item?: { variant_id: number; quantity: number };
    };
  };
};

export async function POST(req: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return new Response('Webhook secret not configured', { status: 500 });
  }

  const signature = req.headers.get('x-signature') ?? '';
  const rawBody = await req.text();

  if (!verifySignature(rawBody, signature, secret)) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(rawBody) as LSEvent;
  const eventName = event.meta.event_name;
  const userId = event.meta.custom_data?.user_id;
  const orderId = event.data.id;

  if (!userId) {
    return new Response('Missing user_id in custom_data', { status: 400 });
  }

  if (eventName === 'order_created') {
    const quantity = event.data.attributes.first_order_item?.quantity ?? 1;
    const credits = CREDITS_PER_STARTER_PACK * quantity;
    await addCredits(userId, credits, 'purchase', `ls_order:${orderId}`);
  }

  return new Response(null, { status: 200 });
}
