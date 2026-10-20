# Clarity pass report

Branch: `clarity-pass`.

## Changed

- `docs/clarity-audit.md` — route/component audit with purpose and copy problems.
- `docs/content-guide.md` — standard, glossary, offer order, length budgets, error/empty-state rules, formats.
- `lib/copy.ts` + `lib/copyLint.ts` + `lib/__tests__/copy.test.ts` — central strings and copy lint.
- Offer flow copy: `CouponCard`, `StickyDealBar`, `CouponCodePanel`, `CodeRevealButton`, `StorePageClient`.
- Metadata: `/trust` and `/how-it-works` now describe the actual page; `/how-it-works` has a canonical.
- Product price history states the capture range.
- `docs/copy-changelog.md` records before → after.

## Left alone

- Legal page text.
- Backend-owned feed titles/terms.
- Email/push templates.
- Editorial backend content.

## BACKEND-NEEDED

- Missing terms fields for conditions.
- Provider feed normalisation for amounts/dates/codes (backend-owned).
- Email/push template copy review.

## Proposed legal summaries

- Add a short plain-language summary above legal pages, proposed only; not shipped.

## Verification

- `npx tsc --noEmit` passes.
- `npm run test -- --run` passes: 368 tests.
- `npm run build` passes.
- `npm run lint` is blocked by a pre-existing `react-hooks/set-state-in-effect` error in `components/account/AccountTabs.tsx`; no new lint errors introduced.
