#!/usr/bin/env node
/**
 * Submit production URLs to IndexNow (Bing, Yandex, Naver, Seznam).
 *
 * Default: read all URLs from the live sitemap and submit every one of them.
 * Override: pass specific URLs as args, e.g.
 *   node scripts/notify-indexnow.mjs https://usepolymind.app/compare/gpt-vs-claude
 *
 * Run AFTER deploying — the verification key file at /<KEY>.txt must be
 * reachable from production for the search engines to trust the request.
 *
 * Note: this file intentionally hard-codes HOST/KEY rather than importing
 * from src/lib/seo/indexnow.ts. The lib version is for runtime app code;
 * this script is plain Node ESM with no TS toolchain.
 */

const HOST = 'usepolymind.app';
const KEY = '859d35dc-4eae-4750-bf9a-bc7597e40c28';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Sitemap fetch failed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((u) => {
      try {
        return new URL(u).hostname === HOST;
      } catch {
        return false;
      }
    });
  if (urls.length === 0) {
    throw new Error(
      `No URLs matching host=${HOST} found in sitemap. ` +
        'Check NEXT_PUBLIC_APP_URL on production.',
    );
  }
  return urls;
}

async function submit(urls) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });
  const body = await res.text();
  return { status: res.status, statusText: res.statusText, body };
}

async function main() {
  const args = process.argv.slice(2);
  const urls = args.length > 0 ? args : await fetchSitemapUrls();

  console.log(`Submitting ${urls.length} URL${urls.length === 1 ? '' : 's'} to IndexNow…`);
  for (const u of urls) console.log(`  - ${u}`);

  const r = await submit(urls);
  console.log('');
  console.log(`Response: ${r.status} ${r.statusText}`);
  if (r.body) console.log(r.body);

  // 200 = accepted + key already verified
  // 202 = accepted, key being verified for the first time (subsequent calls return 200)
  if (r.status === 200 || r.status === 202) {
    console.log('\n✅ Submission accepted.');
    if (r.status === 202) {
      console.log('   First-time key verification in progress — future runs will return 200.');
    }
    return;
  }

  console.error('\n❌ Submission failed.');
  console.error('   Common causes:');
  console.error('   - Key file not deployed yet (check ' + KEY_LOCATION + ')');
  console.error('   - URL host doesn\'t match HOST in this script');
  console.error('   - Daily quota exceeded (~10K URLs/day on Bing)');
  process.exit(1);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
