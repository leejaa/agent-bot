# Polymind — Marketing Activity Log

> Single source of truth for every marketing action. **Update immediately** after any submission, post, or share so future sessions (and future-you) can pick up context without re-reading transcripts.
>
> Companion: `docs/marketing-assets.md` (the *what* — copy, FAQ, logos, screenshots, demo video to attach). This file tracks the *where / when / status*.

## How to update

- Add or update a row **right after** taking an action — don't batch
- Status values:
  - `pending` — listed as a target, not yet submitted
  - `submitted` — form sent, awaiting review
  - `live` — publicly visible
  - `rejected` — declined (note reason)
  - `expired` — listing went stale or was removed
- Date format: `YYYY-MM-DD` (ISO)
- Once `live`, paste the public URL in the URL column
- Keep `Notes` short. Long context → bottom **Action timeline** section
- For sessions: read the **Current snapshot** + **Roadmap progress** sections first to recover state in <30s

---

## Current snapshot

| | |
|---|---|
| **Phase** | Pre-launch beta — social channels live, Lemon Squeezy review pending |
| **Live URL** | https://usepolymind.app |
| **X account** | [@usepolymind](https://x.com/usepolymind) — profile complete, 3 tweets live |
| **Email** | team@usepolymind.app (Zoho Mail, fully operational) |
| **Demo video** | `public/demo.mp4` (1920×1080 · 30 s · 2.3 MB) |
| **Twitter banner** | `public/twitter-banner.png` (1500×500, dark gradient) |
| **Screenshots** | `public/screenshots/01-landing.png · 02-streaming.png · 03-done.png` |
| **Logo PNG** | `public/brand/polymind-logo-{256,512,1024}.png` |
| **First blog post** | `/blog/gpt-vs-claude-vs-gemini-10-prompts` (2026-05-08) |
| **Pricing** | Starter $9.99/25cr · Pro $24.99/75cr · Free trial 10cr |
| **Last updated** | 2026-05-12 |

---

## Roadmap progress

| Phase | Status | Notes |
|---|---|---|
| Asset preparation (tagline, descriptions, FAQ, logo, demo video, screenshots) | ✅ Done — 2026-05-07 | `docs/marketing-assets.md` + `public/` |
| AI directory — top 10 priority | 🟡 Paused (2/10 submitted, 3/10 blocked, 5/10 not attempted) | See table + analysis below |
| AI directory — long tail (40+) | ⚪ Pending | Consider bulk submission service ($20-50) after top 10 |
| SEO Phase 0 (technical foundations) | ✅ Done — 2026-05-07 | proxy/sitemap/llms.txt/JSON-LD/OG image/headings live |
| Google Search Console | ✅ Verified — 2026-05-07 | Domain property; sitemap submitted (queued for fetch) |
| Bing Webmaster | ✅ Verified — 2026-05-08 | HTML meta tag method; sitemap submitted (Processing) |
| Product Hunt launch | ⚪ Pending | Target launch date: TBD (Tue/Wed/Thu PST 0:01 ≈ KST 17:01) |
| Hacker News (Show HN) | ⚪ Pending | Same day as PH or following day |
| Reddit posts (r/SideProject, r/ChatGPT, r/SaaS) | ⚪ Pending | Same week as PH |
| Twitter/X build-in-public | 🟡 Started — 2026-05-12 | @usepolymind live, 3 tweets posted, tweet 1 pinned. Ongoing posting needed. |
| LinkedIn personal post | ⚪ Pending | Optional, founder-focused |
| Content engine — blog infrastructure | ✅ Done — 2026-05-08 | MDX + `/blog` routes (en/ko), sitemap, Article schema, force-static |
| Content engine — first post | ✅ Drafted — 2026-05-08 | "GPT vs Claude vs Gemini: 10 prompts to compare them yourself" — awaiting deploy + share |
| Programmatic SEO — infra | ✅ Done — 2026-05-08 | `/compare/[slug]`, `/alternatives/[slug]` routes; data layer in `src/lib/seo/`; 8 template components |
| Programmatic SEO — first 4 pages | ✅ Drafted — 2026-05-08 | `/compare/gpt-vs-claude`, `/compare/claude-vs-gemini`, `/compare/gpt-vs-gemini`, `/alternatives/chatgpt`. Article + FAQPage JSON-LD, ~1100 words each |

---

## AI Directories — top 10 priority

Submit using copy from `docs/marketing-assets.md`. Logo: `public/brand/polymind-logo-512.png`. Categories: AI Chat, AI Comparison, ChatGPT Alternative, Productivity.

| Date | Site | Status | Live URL | Notes |
|---|---|---|---|---|
| 2026-05-07 | TheresAnAIForThat (theresanaiforthat.com) | submitted |  | Approval queue 2-4 weeks. Submitted via Claude Desktop computer use. |
| 2026-05-07 | Future Tools (futuretools.io) | submitted |  | Matt Wolfe manually curates; awaiting his review. |
| 2026-05-07 | AlternativeTo (alternativeto.net) | blocked |  | IP banned during signup attempt — anti-bot detection. Retry manually from a different network later. |
| 2026-05-07 | Toolify (toolify.ai) | blocked |  | Paid-only listing ($99). No free submission option. Skip unless we decide to pay. |
| 2026-05-07 | AI Tool Hunt (aitoolhunt.com) | blocked |  | Site 404'd at the time (LiteSpeed error page). Recheck in a few days. |
| | Top AI Tools (topai.tools) | pending |  | Not attempted — paused submissions after blockers above. |
| | AI Library (library.phygital.plus) | pending |  | Not attempted. |
| | AI Scout (aiscout.net) | pending |  | Not attempted. |
| | AItoolKit (aitoolkit.org) | pending |  | Not attempted. |
| | Insidr AI (insidr.ai/ai-tools) | pending |  | Not attempted. |

## AI Directories — long tail (after top 10)

Add rows as you submit additional directories beyond the priority 10.

| Date | Site | Status | Live URL | Notes |
|---|---|---|---|---|

---

## Lemon Squeezy

| Date | Action | Status | Notes |
|---|---|---|---|
| 2026-05-12 | Initial application | submitted | Awaiting review |
| 2026-05-12 | Review email received (Sama) | — | Requested: demo video, pricing plan, social profiles |
| 2026-05-12 | Review reply sent | submitted | Attached demo.mp4, provided pricing plan + @usepolymind X profile |

**Pricing plan confirmed (2026-05-12):**
- Free trial: 10 credits on signup (no card)
- Starter Pack: $9.99 / 25 credits
- Pro Pack: $24.99 / 75 credits
- Pay-as-you-go, no subscription, credits never expire
- 1 credit = 1 prompt to all 3 frontier models simultaneously

**Note:** Pro Pack ($24.99) needs to be created in LS dashboard once approved. Currently only Starter variant exists (`LEMONSQUEEZY_VARIANT_ID_STARTER`).

---

## Product Hunt

| Date | Action | Status | Link | Notes |
|---|---|---|---|---|
| | PH account creation / login | pending |  | Verify avatar + bio populated for credibility |
| | Twitter/X account linked to PH | pending |  | Increases launch-day reach |
| | Product page draft | pending |  | Schedule for upcoming Tue/Wed/Thu |
| | Launch scheduled | pending |  | Date: TBD |
| | Launch day — publish + first comment | pending |  | First comment template in `marketing-assets.md` |
| | Launch day — AMA response | pending |  | Be active 9 AM-9 PM PST that day |

---

## Reddit posts

| Date | Subreddit | Post URL | Status | Engagement (24h) | Notes |
|---|---|---|---|---|---|

Suggested subreddits when ready: r/SideProject · r/ChatGPT · r/ClaudeAI · r/SaaS · r/InternetIsBeautiful · r/artificial · r/LocalLLaMA · r/ProductHunt · r/Korean (한국어 변형 시). Tone: humble "I built this" not promotional.

---

## Twitter / X

**Account**: [@usepolymind](https://x.com/usepolymind) · Profile complete (photo, banner, bio, website) · Email: team@usepolymind.app

| Date | Tweet URL | Topic | Notes |
|---|---|---|---|
| 2026-05-12 | https://x.com/usepolymind | "The insight behind Polymind" | Build-in-public, why we built it. Posted 3rd (earliest). |
| 2026-05-12 | https://x.com/usepolymind | GPT vs Claude vs Gemini blog post share | Links to /blog/gpt-vs-claude-vs-gemini-10-prompts. Posted 2nd. |
| 2026-05-12 | https://x.com/usepolymind | "Polymind is live 🟠" | Product intro + beta CTA. Posted 1st (latest), **📌 pinned**. |

Suggested next tweet types: build-in-public progress, demo screen recordings, ask-me-anything, comparison threads ("Asked GPT, Claude, Gemini same question — here's what each said").

---

## Hacker News

| Date | Title | URL | Score | Comments | Notes |
|---|---|---|---|---|---|

Suggested title patterns: `Show HN: Polymind – One prompt to GPT, Claude, and Gemini side by side` (no marketing fluff, technical-honest). Submit Tue/Wed/Thu morning PT.

---

## LinkedIn / personal

| Date | Post URL | Topic | Notes |
|---|---|---|---|

---

## Press / mentions / inbound

| Date | Outlet | URL | Notes |
|---|---|---|---|

---

## Email outreach

| Date | Recipient (org/role) | Subject | Status | Notes |
|---|---|---|---|---|

---

## Action timeline (chronological — newest first)

### 2026-05-07
- ✅ Marketing assets finalized → `docs/marketing-assets.md`
- ✅ Demo video rendered (Remotion, 30 s, 1920×1080) → `public/demo.mp4`
- ✅ 3 screenshots captured → `public/screenshots/`
- ✅ Marketing log file created (this file) — `docs/marketing-log.md`
- ✅ TheresAnAIForThat — submitted via Claude Desktop computer use (awaiting review)
- ✅ Future Tools — submitted via Claude Desktop computer use (awaiting Matt Wolfe review)
- 🚫 AlternativeTo — IP blocked during automated signup; needs manual attempt later
- 🚫 Toolify — paid-only ($99); skipped
- 🚫 AI Tool Hunt — site returning 404; recheck in a few days
- ⏸️  AI directory campaign paused after 5 attempts (2 success, 3 blocked). Reassessing strategy before continuing the remaining 5.
- ✅ SEO Phase 0 — proxy matcher fix, OG/Twitter image, fallback URLs, JSON-LD (3 schemas), llms.txt, heading hierarchy → all live on production
- ✅ Google Search Console — property `usepolymind.app` (Domain type) verified via DNS TXT, sitemap submitted (4 URLs, status "Couldn't fetch" — Google will retry within 24h)
- ⏸️ Bing Webmaster — account signed in (Google SSO), Import-from-GSC blocked by Bing outage; retry later

### 2026-05-12
- ✅ Lemon Squeezy review email received (reviewer: Sama) — requested demo video, pricing plan, social profiles
- ✅ Pricing plan finalized: Starter $9.99/25cr · Pro $24.99/75cr · Free 10cr. Gross margin ~87.5% (Vercel AI Gateway zero markup, API costs pass-through)
- ✅ Lemon Squeezy review reply sent — attached `public/demo.mp4`, pricing plan, @usepolymind X profile
- ✅ Zoho Mail set up — `team@usepolymind.app` (free plan, send + receive). Cloudflare DNS (MX×3, SPF, DKIM, TXT verification) added via API.
- ✅ X account created — @usepolymind. Profile: logo, dark gradient banner (`public/twitter-banner.png`), bio, website.
- ✅ First 3 tweets posted on @usepolymind — "Polymind is live" (📌 pinned), blog post share, build-in-public insight
- ✅ Locale switcher removed — app is English-only now

### 2026-05-08
- ✅ Content engine — blog infrastructure: MDX (next-mdx-remote + gray-matter + remark-gfm), `/blog` index + `/blog/[slug]` routes under `[locale]`, Article JSON-LD per post, OG/Twitter metadata per post, sitemap auto-includes posts. All blog routes `force-static`. Build green: `/en/blog`, `/ko/blog`, `/en/blog/<slug>`, `/ko/blog/<slug>` all SSG.
- ✅ First blog post drafted — `gpt-vs-claude-vs-gemini-10-prompts.mdx` (~2.5k words, MDX). Framework-style hands-on comparison (10 prompts for readers to run themselves) — avoids fabricated benchmark numbers, drives readers into Polymind to do the actual comparison. SEO target: "GPT vs Claude vs Gemini" + adjacent intent queries. GEO-friendly (TL;DR, table, named framework, quotable section headers).
- ✅ Programmatic SEO infrastructure — `/compare/[slug]`, `/alternatives/[slug]` routes under `[locale]`; data layer (`src/lib/seo/models.ts`, `comparisons/`, `alternatives/`); 8 template components (`ComparisonPage`, `AlternativePage`, `TaskMatrix`, `ModelSpecCard`, `ComparisonVerdict`, `WhenToPickPanel`, `FaqList`, `PolymindCTA`). All routes `force-static`. Article + FAQPage JSON-LD per page. Sitemap + middleware + footer wired.
- ✅ pSEO first 4 pages live in build (10 SSG routes incl. en/ko + indexes): `/compare/gpt-vs-claude`, `/compare/claude-vs-gemini`, `/compare/gpt-vs-gemini`, `/alternatives/chatgpt`. Each ~1100 words of unique copy (10-task matrix + verdict + when-to-pick + 5 FAQs + reasons-to-switch). Designed to avoid thin-content penalty — every page contains an actual argument, not template variable substitution.
- ✅ Geist font replacement — Jua removed; `next/font/google` Geist + Geist_Mono with Pretendard as Korean fallback. DevTools verified: Geist applies sitewide, Pretendard fallback registered, `--font-jua` reference 0. Visual + computed-style checks passed on landing, blog, and pSEO pages.
- ✅ GSC manual indexing requests — submitted 6 URLs via Claude Desktop computer use: `/compare/gpt-vs-claude`, `/compare/claude-vs-gemini`, `/compare/gpt-vs-gemini`, `/alternatives`, `/alternatives/chatgpt`, plus one more (likely `/blog/gpt-vs-claude-vs-gemini-10-prompts`). All "URL not on Google" → "색인 생성 요청됨" confirmed. Expected indexing in 24-72h.
  - 🔍 Note: `/compare` index page may not have been included in the batch. If GSC report 24-72h later shows it not indexed, re-submit manually.
- ✅ IndexNow infrastructure installed — Bing/Yandex/Naver/Seznam instant-indexing protocol.
  - Key: `859d35dc-4eae-4750-bf9a-bc7597e40c28` (verification file at `public/<key>.txt`)
  - Library: `src/lib/seo/indexnow.ts` (runtime helper, not yet wired into deploy hook)
  - Script: `scripts/notify-indexnow.mjs` — reads sitemap, submits all URLs in one call
  - Run after each deploy: `npm run notify-indexnow`
  - Optional: pass specific URLs as args to submit only those, e.g. `npm run notify-indexnow -- https://usepolymind.app/compare/gpt-vs-claude`
  - Bing daily quota: ~10K URLs (vs Google's much tighter). 200 = success, 202 = first-time key verification.
- ✅ IndexNow first call — 2026-05-08, 15 URLs submitted (all sitemap entries: landing en/ko, sign-in en/ko, blog en/ko index + 1 post, compare en/ko index + 3 comparisons, alternatives en/ko index + 1 alternative). Response 202 Accepted (first-time key verification). Bing/Yandex/Naver/Seznam should index within hours.
- 🚫 HN Show HN attempt — 2026-05-08, blocked by HN's "new account / low karma" Show HN restriction. Account `leeJahun` has 1 karma. Title/URL/copy all correct; submission engine refused. Pivoting to Reddit. HN re-attempt deferred until karma ~30+ (achievable via 5-10 quality comments on existing threads over a few days).
- 🚫 Reddit r/SideProject attempt — 2026-05-08, posted then auto-removed by Reddit's spam filters within ~1h ([https://www.reddit.com/r/SideProject/comments/1t6zb78/](https://www.reddit.com/r/SideProject/comments/1t6zb78/)). Account `u/No-Writer189` appears new/low-karma; combined with new domain (usepolymind.app, no reputation history) → auto-filtered. Body/title/link all correct — pure account-trust issue, not content issue.
- 📋 Account-trust strategy: HN + Reddit promotion both blocked by same root cause (low-karma accounts + new domain). Pivoting to channels that don't gate on account reputation: Dev.to cross-post, Indie Hackers, LinkedIn personal. Long-term: build karma on both platforms with 1-2 quality comments/day for 1-2 weeks before retrying primary submission.
- ✅ Bing Webmaster — verified `usepolymind.app/` via HTML meta tag (`msvalidate.01`); sitemap submitted, status "Processing" (normal — Bing will crawl within hours)
- 🔍 Minor finding: `<meta name="msvalidate.01">` renders on `/` and `/ko` but not on `/en`. Likely a next-intl `localePrefix: 'as-needed'` quirk where `/en` is non-canonical. Bing fetches `/` (the registered URL) so verification works. Logged for later investigation.
- ✅ Phase 1 #9, #10 — FAQ section added to landing (matches FAQPage schema), Features keywords boosted ("Compare GPT, Claude, and Gemini")
- 🔍 Speed Insights baseline (mobile P75, 7d): RES 64; FCP 4.86s, LCP 4.86s, TTFB 1.92s, INP 120ms (good), CLS 0 (good). Worst route /chat (RES 57); best /sign-in (100).
- ✅ web-quality-audit (Addy Osmani skill) installed; cross-checked RUM with code review — 3 root causes identified (Pretendard CDN render-blocking, getModels SSR blocking, HeroDemo bundle in critical path)
- ✅ SEO/perf Phase A deployed: Pretendard self-hosted via next/font/local; landing made `force-static` with auth redirect moved to middleware; HeroDemo split into dynamic chunk; getModels() now streams via Suspense boundary
  - Verification: `x-nextjs-prerender: 1` + `x-vercel-cache: HIT` confirmed (icn1 POP serving Korea); 0 references to cdn.jsdelivr.net; Pretendard auto-preloaded same-origin
  - RUM impact will surface in 24-48h; expected: Korean P75 TTFB 1.92s → ~150ms, RES 64 → 88+

---

## TODOs / follow-up

- [ ] Lemon Squeezy — await approval; once approved, create Pro Pack ($24.99/75cr) in LS dashboard and add `LEMONSQUEEZY_VARIANT_ID_PRO` env var
- [ ] Pick Product Hunt launch date (Tue/Wed/Thu, KST 17:01 = PST 0:01)
- [ ] Schedule PH product at least 7 days in advance for "Coming Soon" page boost
- [ ] Link @usepolymind X account to Product Hunt profile before launch
- [ ] After top 10 AI directories: evaluate bulk submission service for the long-tail 40+
- [ ] Continue posting on @usepolymind — aim for 3-5 tweets/week
- [ ] Confirm Reddit account in good standing before posting
- [ ] Decide whether to create separate LinkedIn company page or post via personal
- [ ] Plan post-launch retention email (first thank-you to beta signups)

---

## Tips for future-you / future Claude

- **Don't repeat asset work.** Everything you need is in `docs/marketing-assets.md` and `public/`. If a directory's form has fields not covered, add it to `marketing-assets.md`, don't recreate copy from scratch.
- **Track everything.** Even "soft" actions (DM'd a creator, replied to a tweet) belong in this log — saves duplicated effort and reveals what's working.
- **Update the snapshot.** When taking a multi-day break, refresh the **Current snapshot** section so the next session knows the state in 5 seconds.
- **Roadmap order matters.** AI directories first → SEO/social proof → PH launch (max impact) → Reddit/HN/X amplify. Don't skip directories before PH; they raise PH's launch ceiling.
