import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

let initialized = false;

/**
 * Lazily initialize the LS SDK. Call before any LS API operation.
 * Idempotent — safe to call repeatedly.
 */
export function ensureLemonSqueezy() {
  if (initialized) return;
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) throw new Error('LEMONSQUEEZY_API_KEY is not set');
  lemonSqueezySetup({ apiKey });
  initialized = true;
}

export const LS_STORE_ID = process.env.LEMONSQUEEZY_STORE_ID ?? '';
export const LS_VARIANT_ID_STARTER = process.env.LEMONSQUEEZY_VARIANT_ID_STARTER ?? '';
