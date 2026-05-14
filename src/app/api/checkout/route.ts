import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { createCheckout } from '@lemonsqueezy/lemonsqueezy.js';
import { auth } from '@/lib/auth';
import {
  ensureLemonSqueezy,
  LS_STORE_ID,
  LS_VARIANT_ID_STARTER,
  LS_VARIANT_ID_PRO,
} from '@/lib/lemonsqueezy';

export const runtime = 'nodejs';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://agent-bot-kappa.vercel.app';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const headersList = await headers();
  const referer = headersList.get('referer') ?? `${SITE_URL}/chat`;
  // Append a marker so the client invalidates the credit-balance query as soon
  // as the user lands back on the app after the LS redirect.
  const redirectUrl = (() => {
    try {
      const u = new URL(referer);
      u.searchParams.set('purchased', '1');
      return u.toString();
    } catch {
      return `${SITE_URL}/chat?purchased=1`;
    }
  })();

  ensureLemonSqueezy();

  const body = await req.json().catch(() => ({}));
  const pack = (body.pack as string | undefined) ?? 'starter';
  const variantId = pack === 'pro' ? LS_VARIANT_ID_PRO : LS_VARIANT_ID_STARTER;

  const result = await createCheckout(LS_STORE_ID, variantId, {
    checkoutData: {
      email: session.user.email,
      name: session.user.name ?? undefined,
      custom: { user_id: session.user.id },
    },
    productOptions: {
      redirectUrl,
      receiptThankYouNote: 'Thanks for your purchase! Your credits are now available.',
    },
    checkoutOptions: {
      embed: false,
      dark: false,
    },
    testMode: process.env.NODE_ENV !== 'production',
  });

  if (result.error || !result.data) {
    return NextResponse.json(
      { error: 'Failed to create checkout', detail: result.error?.message },
      { status: 500 }
    );
  }

  const url = result.data.data.attributes.url;
  return NextResponse.json({ url });
}
