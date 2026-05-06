# Polymind Design System

> Source of truth for visual design. Claude Code should consult this file before any UI work.
> Raw extraction data: `docs/refero-notion.json`

## Concept

Dark indigo canvas with precise, glowing interactive elements. High-tech control-panel feel softened by friendly Korean typography (Jua). Restrained accent palette — bright colors signal interaction, not decoration.

## Theme

- Mode: **light only** (default)
- Page bg uses `--color-ghost-white`, cards `--color-paper-white`, text `--color-deep-graphite`
- Notion's deep-indigo dark surface (`Midnight Ink`) is reserved for **occasional dark feature cards** that pop against the light canvas (rare, intentional)
- No light/dark toggle (out of scope for now)

## Tokens

All tokens live in `src/app/globals.css` under `@theme`. Reference tokens hold the palette; semantic tokens reference them and are what components consume.

### Color reference tokens (palette)

| Name | Hex | Group |
|---|---|---|
| `--color-canvas-dark` | `#000000` | neutral (level 0 surface) |
| `--color-midnight-ink` | `#02093a` | neutral (level 1 surface, signature dark indigo) |
| `--color-paper-white` | `#ffffff` | neutral (level 2 surface, primary text on dark) |
| `--color-ghost-white` | `#f6f5f4` | neutral (level 3 surface) |
| `--color-deep-graphite` | `#0b0b0b` | neutral (heavy text on light) |
| `--color-cool-gray` | `#c6c6c5` | neutral (subtle borders, muted text) |
| `--color-deep-slate` | `#615d59` | neutral (icons, secondary text) |
| `--color-input-border-gray` | `#dddddd` | neutral (input borders) |
| `--color-off-white` | `#f2f9ff` | neutral (info badge bg) |
| `--color-action-indigo` | `#455dd3` | brand (primary CTA) |
| `--color-blue-frost` | `#62aef0` | brand (highlights, glow) |
| `--color-ocean-glimmer` | `#0075de` | accent (links, secondary action) |
| `--color-sky-surge` | `#097fe8` | semantic (info badges, active states) |
| `--color-alert-red` | `#f77463` | accent (alerts) |
| `--color-forest-green` | `#1aae39` | accent (success) |
| `--color-team-teal` | `#2a9d99` | accent |
| `--color-sunny-yellow` | `#ffc95e` | accent |
| `--color-warm-umber` | `#b18164` | accent |
| `--color-coral-burst` | `#ff8a33` | accent |
| `--color-fuchsia-flare` | `#ff83dd` | accent |
| `--color-grape-glow` | `#ad6ded` | accent |
| `--color-harvest-gold` | `#ffb110` | accent |
| `--color-hot-chili` | `#f64932` | accent |

### Color semantic tokens (use these in components)

Light mode mapping:

| Token | Maps to | Purpose |
|---|---|---|
| `--color-bg` | ghost-white | page background |
| `--color-bg-elevated` | paper-white | elevated surfaces |
| `--color-bg-card` | paper-white | cards on page |
| `--color-bg-card-dark` | midnight-ink | rare dark feature cards (intentional pop) |
| `--color-fg` | deep-graphite | primary text |
| `--color-fg-muted` | deep-slate | secondary text |
| `--color-fg-faint` | cool-gray | tertiary text, icons |
| `--color-fg-on-dark` | paper-white | text on dark feature cards / Apple button |
| `--color-border` | rgba(0,0,0,0.08) | subtle borders |
| `--color-border-strong` | rgba(0,0,0,0.16) | stronger borders, focus rings |
| `--color-border-input` | input-border-gray | input field borders |
| `--color-primary` | action-indigo | primary CTA bg |
| `--color-primary-fg` | paper-white | text on primary CTA |
| `--color-accent` | sky-surge | links, info, active nav |
| `--color-success` | forest-green | success states |
| `--color-warning` | sunny-yellow | warning states |
| `--color-danger` | alert-red | error/destructive |

### Spacing & radius

| Token | Value | Use |
|---|---|---|
| `--radius-card` | `12px` | cards |
| `--radius-button` | `8px` | buttons |
| `--radius-pill` | `9999px` | badges, pills |
| `--radius-input` | `4px` | input fields |
| `--radius-general` | `5px` | misc |
| `--gap-element` | `8px` | adjacent elements |
| `--gap-section` | `32px` | between sections |
| `--padding-card` | `24px` | inside cards |

### Typography scale

7 roles. Sizes are numeric pixel values; line-heights and letter-spacings tuned for Jua/Pretendard rendering.

| Role | Size | Line height | Letter-spacing |
|---|---|---|---|
| `caption` | 12px | 1.5 | +0.01em |
| `body-sm` | 14px | 1.43 | -0.006em |
| `body` | 15px | 1.40 | -0.006em |
| `subheading` | 20px | 1.35 | -0.011em |
| `heading-sm` | 22px | 1.33 | -0.024em |
| `heading` | 26px | 1.27 | -0.033em |
| `heading-lg` | 40px | 1.23 | -0.035em |
| `display` | 64px | 0.83 | -0.036em |

### Fonts

```css
--font-sans: 'Jua', 'Pretendard Variable', 'Pretendard', -apple-system,
             BlinkMacSystemFont, system-ui, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
```

- **Jua** loaded via `next/font/google` (Korean playful)
- **Pretendard Variable** loaded via CDN (`cdn.jsdelivr.net`)
- Fallback chain handles missing glyphs (Jua has limited Latin set, Pretendard fills)

### Elevation (shadow)

```css
--shadow-elevated: rgba(0,0,0,0.01) 0 1px 3px,
                   rgba(0,0,0,0.02) 0 3px 7px,
                   rgba(0,0,0,0.02) 0 7px 15px,
                   rgba(0,0,0,0.04) 0 14px 28px,
                   rgba(0,0,0,0.05) 0 23px 52px;
```

Use sparingly — only on truly elevated components (modals, dropdowns).

## Component patterns

### Primary Action Button
- Background `--color-primary` (Action Indigo)
- Text `--color-primary-fg` (Paper White), font-weight 400
- Radius `--radius-button` (8px)
- Padding 12px vertical, 16px horizontal

### Ghost Button
- Background transparent
- Text `--color-fg`, font-weight 400
- Radius `--radius-button`, padding 6px / 15px
- Hover: subtle bg-elevated tint

### Feature Card (dark bg)
- Background `--color-bg-card` (Midnight Ink)
- Radius `--radius-card`, padding `--padding-card`
- No shadow on dark cards
- Headline: heading-sm (22px), weight 600, text fg
- Body: body (15px), weight 400, text fg-muted

### Input Field
- Background paper-white at low opacity OR transparent on dark
- Border `--color-border-input` (light theme) or border-white/10 (dark theme)
- Radius `--radius-input` (4px) for tight, or `--radius-button` (8px) for chat input
- Focus: 2px ring `--color-primary`

### Badge (info)
- Background `--color-off-white`
- Text `--color-accent` (Sky Surge), 12px Jua weight 400
- Radius `--radius-pill`, padding 4px 8px

## Do's

- Use Midnight Ink as the default elevated/card surface in dark mode
- Reserve Action Indigo for the single primary CTA per view
- Keep accent colors deliberate — not decorative, not adjacent without function
- Maintain the defined letter-spacing per type-scale role
- Pair Paper White text with Midnight Ink/Canvas Dark backgrounds

## Don'ts

- No generic gray backgrounds — use Canvas Dark / Midnight Ink for depth
- No multiple bright accents side-by-side without functional reason
- Don't override letter-spacing arbitrarily
- Don't use shadow on dark surfaces (use color depth instead)

## Layout principles (from Notion reference)

- Generous section gap (32px+)
- Hero/full-bleed bands alternate with contained content blocks
- Persistent sticky header on long scrolls (chat list excepted)
- 2- or 3-column grids for feature comparisons (perfect for our 3-model UI)
- Density: text-dominant, imagery used to break sections (not for our chat UI directly, but for empty states)

## Notion AI chat UX cues (apply to our chat)

- Conversation history as flat scrollable list, not threaded
- User message: subtle elevated bubble or just label
- AI response: card with model badge in corner
- Input: large, generous padding, single line that grows on multiline
- Streaming indicator: subtle, animated, not jarring

## File map

| File | Role |
|---|---|
| `src/app/globals.css` | All `@theme` tokens + base body styles |
| `src/app/layout.tsx` | Font loading (Jua + Pretendard CDN link) |
| `src/components/**` | Components consume semantic tokens via Tailwind utilities |

## Updating this doc

When tokens or patterns change, edit this file first, then propagate to `globals.css` and components. The raw `refero-notion.json` is read-only reference — do not edit.
