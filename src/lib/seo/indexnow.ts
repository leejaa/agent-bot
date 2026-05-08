/**
 * IndexNow — open protocol for instant indexing on Bing, Yandex, Naver,
 * and Seznam. Google does NOT participate; for Google, the GSC web UI is
 * still the only path.
 *
 * Public key file lives at /<INDEXNOW_KEY>.txt and must be reachable from
 * the production host. Search engines fetch it once to verify ownership;
 * after that, every submission with the matching key is trusted.
 *
 * Single-call endpoint `api.indexnow.org` fans out to all participating
 * engines. Naver is included by default — we don't filter it out because
 * the marginal cost is zero and no Korean-language content exists yet
 * that Naver could surface anyway.
 */

export const INDEXNOW_HOST = 'usepolymind.app';
export const INDEXNOW_KEY = '859d35dc-4eae-4750-bf9a-bc7597e40c28';
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

export type IndexNowResult = {
  status: number;
  ok: boolean;
  bodyText: string;
};

/**
 * Submit one or more URLs to IndexNow. URLs must be absolute and live
 * under {@link INDEXNOW_HOST}. Returns the HTTP status — 200/202 are
 * both successful (202 means "key being verified, will index after").
 */
export async function notifyIndexNow(urls: string[]): Promise<IndexNowResult> {
  if (urls.length === 0) {
    throw new Error('notifyIndexNow: urls list must not be empty');
  }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList: urls,
    }),
  });
  const bodyText = await res.text();
  return { status: res.status, ok: res.ok, bodyText };
}
