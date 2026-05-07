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
| **Phase** | Pre-launch beta — asset preparation complete, distribution starting |
| **Live URL** | https://usepolymind.app |
| **Demo video** | `public/demo.mp4` (1920×1080 · 30 s · 2.3 MB) |
| **Screenshots** | `public/screenshots/01-landing.png · 02-streaming.png · 03-done.png` |
| **Logo PNG** | `public/brand/polymind-logo-{256,512,1024}.png` |
| **Last updated** | 2026-05-07 |

---

## Roadmap progress

| Phase | Status | Notes |
|---|---|---|
| Asset preparation (tagline, descriptions, FAQ, logo, demo video, screenshots) | ✅ Done — 2026-05-07 | `docs/marketing-assets.md` + `public/` |
| AI directory — top 10 priority | 🟡 Paused (2/10 submitted, 3/10 blocked, 5/10 not attempted) | See table + analysis below |
| AI directory — long tail (40+) | ⚪ Pending | Consider bulk submission service ($20-50) after top 10 |
| SEO Phase 0 (technical foundations) | ✅ Done — 2026-05-07 | proxy/sitemap/llms.txt/JSON-LD/OG image/headings live |
| Google Search Console | ✅ Verified — 2026-05-07 | Domain property; sitemap submitted (queued for fetch) |
| Bing Webmaster | 🟡 Pending — Bing outage as of 2026-05-07 | Resume "Import from GSC" once Bing recovers |
| Product Hunt launch | ⚪ Pending | Target launch date: TBD (Tue/Wed/Thu PST 0:01 ≈ KST 17:01) |
| Hacker News (Show HN) | ⚪ Pending | Same day as PH or following day |
| Reddit posts (r/SideProject, r/ChatGPT, r/SaaS) | ⚪ Pending | Same week as PH |
| Twitter/X build-in-public | ⚪ Pending | Set up account first |
| LinkedIn personal post | ⚪ Pending | Optional, founder-focused |

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

| Date | Tweet URL | Topic | Notes |
|---|---|---|---|

Suggested tweet types: build-in-public progress, demo screen recordings, ask-me-anything, comparison threads ("Asked GPT, Claude, Gemini same question — here's what each said"). Pin the demo video tweet on launch day.

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

---

## TODOs / follow-up

- [ ] Pick Product Hunt launch date (Tue/Wed/Thu, KST 17:01 = PST 0:01)
- [ ] Schedule PH product at least 7 days in advance for "Coming Soon" page boost
- [ ] After top 10 AI directories: evaluate bulk submission service for the long-tail 40+
- [ ] Set up dedicated Twitter/X account if not using personal — write bio matching tagline
- [ ] Confirm Reddit account in good standing before posting
- [ ] Decide whether to create separate LinkedIn company page or post via personal
- [ ] Plan post-launch retention email (first thank-you to beta signups)

---

## Tips for future-you / future Claude

- **Don't repeat asset work.** Everything you need is in `docs/marketing-assets.md` and `public/`. If a directory's form has fields not covered, add it to `marketing-assets.md`, don't recreate copy from scratch.
- **Track everything.** Even "soft" actions (DM'd a creator, replied to a tweet) belong in this log — saves duplicated effort and reveals what's working.
- **Update the snapshot.** When taking a multi-day break, refresh the **Current snapshot** section so the next session knows the state in 5 seconds.
- **Roadmap order matters.** AI directories first → SEO/social proof → PH launch (max impact) → Reddit/HN/X amplify. Don't skip directories before PH; they raise PH's launch ceiling.
