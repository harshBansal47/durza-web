# Couponbase web: Phase 2 brief (read fully at the start of every session)

## Goal
After a visitor clicks through to a store and comes back, ask once, politely, "Did the code
work?" and send the answer to the existing verification endpoint. This keeps success rates
fresh and is the product's core promise (community-verified codes).

## What already exists (reuse)
- Stack: Next.js 16 App Router, React 19, Tailwind 4 (CSS-first tokens in `app/globals.css`),
  TypeScript, Vitest + React Testing Library. `vitest.setup.ts` mocks IntersectionObserver.
- Tracked outbound links (Phase 1): `api.goUrl(couponId, src)` in `lib/api.ts`; used by
  `components/CouponCodePanel.tsx` ("coupon-page") and `components/StickyDealBar.tsx`
  ("sticky-bar"). Links carry `rel="sponsored nofollow noopener"`.
- Verification: `components/VerifyWidget.tsx` already submits worked / didn't work to the
  backend (via `api.verifyCoupon(couponId, worked, note?)` or a server action; read the file
  and reuse the SAME mechanism) and already handles the rate-limit (429) and
  already-voted cases. Reuse its behaviour and messages; do not invent a second path.
- UI primitives and tokens: `.btn`, `.btn-primary`, `.btn-cta`, `.btn-ghost`, `.btn-outline`,
  colors `bg-white`, `border-ledger-line`, `text-ink`, `text-ink-soft`, `bg-verified`,
  `shadow-[var(--shadow-overlay)]`, `rounded-[22px]`. Light theme only. Toast component:
  check `components/ui/` for an existing one before adding anything.
- Layout: `app/layout.tsx` (root); `components/StickyDealBar.tsx` is a server component.

## Hard rules
1. Honest and non-annoying: ask at most once per click; never again after answer or dismiss;
   never block the page; never steal focus; no countdowns, no pressure wording.
2. Privacy: store only `{couponId, title, storeName, hadCode, at}` in `localStorage` under
   key `couponbase:last-go`. No tracking IDs, no personal data. Wrap every storage call in
   try/catch (storage can be disabled) and render nothing if it fails.
3. Server Components by default; "use client" only on the small leaf components.
4. Do not change `lib/api.ts` request shapes, SEO files, or the backend contract.
5. Accessibility: `role="dialog"` (non-modal) with an accessible name, `aria-live="polite"`,
   Escape dismisses, buttons are real `<button>`s, visible focus rings, works at 360px.
6. Honor `prefers-reduced-motion` (no slide/transform animation, opacity only).
7. No new dependencies. Brand name is **Couponbase**.
8. After every task: `npx tsc --noEmit && npx eslint . && npm test`. All green before commit.
   (One pre-existing lint warning about an unused `user` variable in DeleteAccountForm is fine.)
9. One commit per task: `phase2 <id>: <summary>`; tick the task in PHASE2_TASKS.md.