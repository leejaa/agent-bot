# Polymind — Marketing Assets

Single source of truth for copy and creative used across Product Hunt, AI directories, social, and outreach. Update this file *first* when wording changes, then propagate to the site (`messages/en.json`, `opengraph-image.tsx`) and external listings.

> **Where, when, status of submissions/posts:** `docs/marketing-log.md` — every action goes there.

---

## Brand basics

| | |
|---|---|
| Name | **Polymind** |
| Domain | `https://usepolymind.app` |
| Primary color | `#ff8a33` (Coral Burst) |
| Logo (square, transparent BG) | `public/brand/polymind-logo-256.png` · `512.png` · `1024.png` |
| Favicon source | `src/app/icon.svg` |
| Live OG image | `https://usepolymind.app/opengraph-image` |

### Positioning (one-liner)

A multi-AI chat for power users who already compare answers across ChatGPT, Claude, and Gemini. One prompt, every top AI, side by side — instead of juggling tabs.

### Target user

People who **already** compare AI answers manually for important tasks (writing, research, planning, code review). Pain: copy-pasting the same prompt into 3+ AI tabs. Polymind = same workflow, minus the friction. Often already paying for multiple AI subscriptions.

---

## Tagline

**Primary (60-char limit, used on Product Hunt + site hero):**

> One prompt. Every top AI. Pick the best.
> *(41 chars)*

---

## Descriptions

### Short — ~100 chars
For: Twitter/X bio, compact directory listings, social previews.

> Stop juggling AI tabs. Send one prompt to GPT, Claude, and Gemini and compare answers side by side.

### Product Hunt — ~234 chars
For: Product Hunt main description field (260-char limit).

> Stop copy-pasting prompts between GPT, Claude, and Gemini tabs. Polymind sends one question to every top AI at once — answers stream side by side, you pick the answer that fits, then save it for later. Free during beta — no card needed.

### Long — 3 paragraphs (~570 chars)
For: AI directory detail pages, FAQ intros, About sections.

> If you already compare AI answers by jumping between ChatGPT, Claude, and Gemini tabs — pasting the same prompt into each — Polymind is built for you.
>
> Send one question to every top AI at once. Answers stream in parallel, side by side, in a single chat. No more copy-paste, no more "wait, which tab said that?". Just the workflow you already do, minus the friction.
>
> You're probably already paying for these AIs separately. Polymind just lets you use them all in one place. Free during beta — no card needed.

---

## Features (bullet list)

For: directory "Features" fields, structured listings, comparison tables.

- Send one prompt to every top AI at once
- Compare GPT, Claude, and Gemini answers side by side
- Pick the answer that fits, save what works
- No more tab-juggling or copy-pasting
- Free during open beta — no card required

---

## FAQ (6 questions)

### Q1. What is Polymind?
A multi-AI chat that sends one prompt to GPT, Claude, and Gemini at the same time. You see all three answers side by side and pick the one that fits — without juggling tabs or copy-pasting.

### Q2. Why not just use ChatGPT (or Claude, or Gemini) directly?
Because no single AI is best at everything. If you already check answers across multiple models for important tasks, Polymind removes the friction — same workflow, but in one chat instead of three tabs.

### Q3. Is it really free?
Yes, completely free during open beta. New accounts get 200 credits (1 credit ≈ 1 prompt to all 3 models). Need more? Email `leejahun0@gmail.com` — happy to top you up.

### Q4. Will you charge later?
Yes — paid plans launch when beta ends (estimated within 1-2 months). Pricing will be pay-as-you-go credit packs, not subscription. Beta users keep their feedback-shaping influence on the v1 launch.

### Q5. Where does my data go?
Prompts and responses are stored in your account so you can revisit them. They're never used to train models — Polymind routes through Vercel AI Gateway, which has zero data retention by default. You can delete any conversation anytime.

### Q6. Can I switch models?
Yes — each of the 3 columns can be set to any chat-capable model on Vercel AI Gateway (100+ models). Default is the latest GPT, Claude, and Gemini frontier models. Click any column header to swap.

---

## About the maker / Product Hunt first comment

Post this as the very first comment on the PH listing right after launching. Casual, founder-driven, AMA-friendly.

```
Hi 👋 — maker of Polymind here.

I built this because I was already comparing AI answers for important questions: opening ChatGPT, Claude, and Gemini in three tabs, pasting the same prompt, jumping between them. It felt like I was paying for three tools to do the work of one.

Polymind sends one prompt to every top AI at once and shows answers side by side. The whole conversation lives in one chat, so it's actually easier to compare and save what works.

Free during open beta — would love your feedback. Happy to AMA below.

— [Your name / handle]
```

Replace `[Your name / handle]` with your real name or X handle before posting.

---

## Pricing fields (directory submissions)

Most directories ask "Pricing model" — answer:

- **Pricing**: Freemium (free during beta) → pay-as-you-go after beta
- **Free trial**: Yes, 200 free credits at signup
- **Has free tier**: Yes (during beta)
- **Subscription required**: No

---

## Categories / Tags (directory submissions)

When a directory asks for tags or categories, pick from these (in priority order):

1. AI Chat
2. AI Comparison
3. ChatGPT Alternative
4. Productivity
5. Multi-AI / AI Aggregator
6. AI Tools
7. AI Workflow
8. Writing Assistant (if writing-focused listing)
9. Research / Analysis (if research-focused listing)

Avoid: code-only categories (Polymind isn't code-specific), image/audio categories.

---

## OG image (social-share preview)

Live at `https://usepolymind.app/opengraph-image` (1200×630 PNG). Source: `src/app/opengraph-image.tsx`.

Text on image:
- **Polymind** (large)
- **One prompt. Every top AI.** (medium)
- **Pick the best — GPT · Claude · Gemini** (caption)

---

## Site copy (current)

Defined in `messages/en.json`. Keep in sync with this file.

| Key | Value |
|---|---|
| `Brand.tagline` | One prompt. Every top AI. Pick the best. |
| `Brand.subtagline` | {models}, side by side. |
| `Metadata.title` | Polymind — One prompt to every top AI |
| `Metadata.description` | Send one prompt to every top AI — GPT, Claude, Gemini — and compare answers side by side. Skip the copy-paste. |
| `Landing.hero` | One prompt. Every top AI. Pick the best. |
| `Landing.heroSub` | Skip the tab-juggling. Send one prompt to every top AI and pick the answer that fits. |

---

## Channel mapping — where to use what

| Channel | Tagline | Short | PH | Long | Features | FAQ |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Product Hunt | ✅ | | ✅ | | (gallery) | (link to site) |
| Twitter/X bio | ✅ | ✅ | | | | |
| TheresAnAIForThat | ✅ | | | ✅ | ✅ | |
| Future Tools / Toolify / etc. | ✅ | ✅ | | ✅ | ✅ | |
| AlternativeTo | ✅ | | | ✅ | ✅ | |
| LinkedIn / personal site | ✅ | ✅ | | ✅ | | |
| Reddit (r/SideProject etc.) | | ✅ | ✅ | | | |
| Show HN | | | (rewrite, casual) | | | |

---

## Visual / asset checklist for Product Hunt launch

Required:
- [x] Logo PNG (≥240×240) — `public/brand/polymind-logo-512.png`
- [ ] **Demo video / GIF** (≤60s, 16:9 ideally) — *not yet recorded*
- [ ] **Gallery screenshots** (3-5, 1270×760 recommended) — *not yet captured*
- [x] Tagline (this file)
- [x] Description (this file)
- [x] First comment (this file)
- [ ] PH account with avatar/bio populated

---

## Korean (ko) copy

Out of scope for current launch — `messages/ko.json` retains pre-rebrand copy. Site defaults to English (`localeDetection: false`); Korean visitors only see Korean if they manually switch via the `EN/KO` toggle.

When Korea launch happens, update `messages/ko.json` to match the English tone here, and translate this file's tagline/descriptions to Korean.

---

## Blog post sharing copy

When a new blog post goes live, draft sharing copy here (don't fork copy across channels). Newest post first.

### `/blog/gpt-vs-claude-vs-gemini-10-prompts` — 2026-05-08

**Permalink:** https://usepolymind.app/blog/gpt-vs-claude-vs-gemini-10-prompts

#### Twitter/X — single tweet
> Most "GPT vs Claude vs Gemini" articles are out of date the day they ship.
>
> Wrote up the framework we actually use: 10 prompts you run yourself, plus what to look for when the answers diverge.
>
> https://usepolymind.app/blog/gpt-vs-claude-vs-gemini-10-prompts

#### Twitter/X — thread (5 tweets)
> 1/ The honest answer to "which AI model is best?" isn't a benchmark — it's "best at *what?*"
>
> So I wrote up the 10-prompt framework we use at Polymind to compare GPT, Claude, and Gemini on the work people actually do.
>
> 2/ The trap: benchmarks measure model performance on *general* tasks. You don't do general tasks. You write release notes, review PRs, summarize papers, draft customer emails.
>
> The right test is the one that mirrors your actual work.
>
> 3/ Each prompt has a constraint that filters models. e.g. "Draft a customer email — *don't apologize*."
>
> Some models can't help themselves. They sneak in "we know this may be frustrating" anyway. That's the thing you wanted to learn.
>
> 4/ The most useful pattern when running side-by-side: **disagreement between models is information.**
>
> All three agree → the answer is probably fine.
> Two agree, one dissents → read the dissent.
> All three disagree → think harder than the prompt asked.
>
> 5/ Full post with all 10 prompts + the criteria for judging answers:
>
> https://usepolymind.app/blog/gpt-vs-claude-vs-gemini-10-prompts
>
> Run them in any tool you like. We built Polymind because doing this in three browser tabs is miserable.

#### Hacker News — Show HN (technical-honest, no marketing fluff)
> **Title:** Show HN: 10 prompts to compare GPT, Claude, and Gemini on your actual work
>
> Most "model X vs Y" comparisons measure benchmarks that don't reflect how you'll use the model. Wrote up the framework I use to evaluate them on real work — 10 short prompts spanning summarization, code review, refactoring, customer copy, translation, and brainstorming, plus what to look for when answers diverge.
>
> The post is also a soft launch for Polymind, the side-by-side comparison tool I built so I'd stop doing this in three browser tabs. Free during open beta.
>
> https://usepolymind.app/blog/gpt-vs-claude-vs-gemini-10-prompts

#### Reddit — r/ClaudeAI / r/ChatGPT / r/SideProject
> **Title:** I wrote up the 10-prompt framework I use to compare GPT, Claude, and Gemini on real work
>
> Got tired of "vs." articles that benchmark trivia and call a winner. Wrote up the actual framework I use — 10 short prompts that mirror common knowledge work (code review, customer copy, translation, brainstorming, etc.), plus the criteria for judging which model wins on each.
>
> Run them in whatever tool you like. The point of the post is the framework, not a result that'll be obsolete in three weeks.
>
> https://usepolymind.app/blog/gpt-vs-claude-vs-gemini-10-prompts
>
> Curious which prompts surface the biggest model differences for *your* work — happy to add to the list.

#### LinkedIn — personal/founder
> Most "which AI model is best?" questions don't have an answer until you ask "best at *what?*"
>
> I wrote up the 10-prompt framework we use to evaluate GPT, Claude, and Gemini on real knowledge work — code review, customer copy, summarization, translation, and others — plus what to actually look for when the answers diverge.
>
> Read it: https://usepolymind.app/blog/gpt-vs-claude-vs-gemini-10-prompts
>
> Built Polymind because doing this comparison in three browser tabs is unsustainable. Side-by-side is now my default workflow for any nontrivial AI question.

---

## Maintenance

- When tagline or descriptions change, edit this file *first*, then update:
  1. `messages/en.json` (Brand + Metadata + Landing keys)
  2. `src/app/opengraph-image.tsx`
  3. External listings (re-submit forms or use the directory's edit flow)
- Don't fork copy — every channel pulls from this file.
- Korean (`messages/ko.json`) intentionally not synced; revisit when targeting Korea.
