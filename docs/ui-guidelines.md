# Durza UI guidelines

Single source of truth for the Durza interface. Tokens, type scale, spacing,
motion, button variants and icon rules live here so a fourth redesign never
starts from scratch.

## Behaviour you must preserve (do not undo)

- Codes are masked on list surfaces (`BIG•••••`) and link to the
  reveal-and-copy flow on the offer page. Never print full codes in lists.
- Voting is reveal-gated: "Did it work?" only after the code is revealed or
  the deal opened on this device; the device remembers its vote and is never
  asked twice. Expired offers cannot be voted on or opened from the sticky
  bar.
- Honest copy: success rates and "verified by shoppers" appear only when
  real votes exist ("No votes yet" otherwise; "Top offers" until confirmed).
  "Up to" only when the store's own title or terms say so, with the cap
  shown. No marketing claims, ratings or invented stats.
- One expiry label per card; each offer appears once across homepage rows;
  near-identical offers (same headline, different code) collapse into one
  expandable card on store pages.
- Store icons are self-hosted in `/public/stores` and mapped in
  `lib/storeLogos.ts` (two-letter monogram fallback). Per-store accent
  colours are decorative only — never text, status or anything a reader
  must read.
- "How it works" → `/how-it-works`; "How Durza works" → `/trust`. Mobile
  menu must not repeat the tab bar's Saved.
- Price-alert CTA sits above the footer and is dismissible for good
  (`localStorage` via `useSyncExternalStore`). Install prompt: touch devices
  only, at most once.
- Outbound links keep `rel="sponsored nofollow noopener"`. JSON-LD, ISR
  windows (300s) and tracked `/go` links are untouched.

## Tokens

All tokens are defined in `@theme` in `app/globals.css`. Public token names
must never be renamed or deleted — only values changed or tokens added.

Colours: `--color-paper`, `--color-paper-raised`, `--color-paper-alt`,
`--color-ink`, `--color-ink-soft`, `--color-accent`, `--color-accent-soft`,
`--color-accent-faint`, `--color-verified`, `--color-verified-soft`,
`--color-rust`, `--color-rust-soft`, `--color-durza`, `--color-durza-deep`,
`--color-durza-soft`, `--color-ledger-line`, `--color-inkblue`,
`--color-ink-on-dark`, `--color-ink-soft-on-dark`,
`--color-ledger-line-on-dark`, plus legacy aliases (`--color-violet`,
`--color-pink`, `--color-sun`, …) retained for migration.

Fonts: `--font-sans` (Geist), `--font-mono` (Geist Mono), `--font-serif`
(Newsreader Variable).

Radius: `--radius-xs` 8px, `--radius-sm` 12px, `--radius-md` 16px,
`--radius-lg` 20px, `--radius-full` 999px.

Motion: `--duration-fast` 160ms, `--duration-base` 280ms,
`--duration-slow` 640ms, `--ease-out` `cubic-bezier(0.22, 1, 0.36, 1)`.

## Type scale

`text-caption` 12px, `text-small` 14px, `text-body` 16px,
`text-heading` 20px, `text-title` 28px,
`text-display` clamp(30px → 40px). Use `PageTitle` for page/section titles
(display serif, medium weight 400–500).

## Cascade layers

Element defaults live in `@layer base`; design-system classes (`.btn`,
`.input`, `.ticket`, `.marker`, `.lift`, `.info-card`, `.section-panel`,
`.stamp`, `.savings-figure`, `.bg-brand*`, `.text-gradient`, `.reveal`,
`.ticket-wrap`, `.marquee-track`, `.shimmer`, `.confetti-piece`,
`.perforated-bottom`, `.page-shell`, `.dark-surface`, `.light-surface`,
plus the 640px media query) in `@layer components`; custom utilities in
`@layer utilities`. Anything unlayered (keyframes, reduced-motion and print
overrides) intentionally wins. Never put component classes outside a layer.

## Dark surfaces

Apply `.dark-surface` to navy/ink panels. It redefines `--color-ink`,
`--color-ink-soft` and `--color-ledger-line` to readable values. A nested
light card resets them with `.light-surface`.

## Buttons

Classes: `.btn` (base), `.btn-primary`, `.btn-cta`, `.btn-outline`,
`.btn-verified`, `.btn-danger`, `.btn-ghost`. Minimum 44px touch target.
Icon-only buttons (`h-11 w-11`) add `p-0` so base padding never fights the
fixed size.

## Icons

One line set: `lucide-react`, single stroke width (1.75 for inline, 1.5 for
large, 2 for compact marks). Decorative SVGs: `aria-hidden`, inline, small,
`pointer-events-none`. No emoji or Unicode glyphs in UI.

## Accessibility and motion

WCAG 2.2 AA: 4.5:1 text, 3:1 large text/graphics, 44px touch targets,
visible `:focus-visible`, full keyboard use. All animation off under
`prefers-reduced-motion` (CSS override already in place).

## Exceptions

- OG images (`opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx`) and the
  banner route (`app/banners/[slug]/route.tsx`) may keep colour literals,
  centralised in `lib/brand.ts`.
- `lib/storeLogos.ts` accent hex values are store-sourced data, not UI
  tokens.
- `app/globals.css` itself defines tokens as literals (by definition).


## Persuasion patterns

Every persuasive pattern is data-backed and calm. Copy lives in `lib/persuasion.ts` so it stays consistent.

| Pattern | Data source | Threshold | Never show |
|---|---|---|---|
| One-tap reveal + copy | `CouponPublic.code`, tracked `/go` URL | code exists | bare `window.open`, forced sign-in, full codes in lists |
| Community trust badge | `success_rate`, `success_count`, `fail_count` | at least 5 reports | “verified by our team” without a human-check field |
| Open loop (price alerts / saved / follow) | `TrackedProduct`, `SavedItem`, store follow state | real saved item or tracked product | repeated nagging, pre-ticked consent |
| Expiry tone | `expires_at` | under 48h = warning | countdown timers, fake “only 2 left” |
| Price insight | `PriceHistory` points + current price | current price equals window minimum | “lowest ever” without data |
| Smart-shopper confirmation | real action (reveal, vote, save, track, settings) | action completed | flattery, invented savings |

The audit in `docs/persuasion-audit.md` lists every surface and the BACKEND-NEEDED fields. Persuasion must never blur editorial, sponsored or affiliate content.
