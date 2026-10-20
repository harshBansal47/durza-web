# Persuasion rollout report

Branch: `persuasion-rollout`.

## Shipped

- `docs/persuasion-audit.md` — surface-by-surface audit with data-field existence.
- `lib/persuasion.ts` — pure, unit-tested decision logic for trust level, expiry tone, price insight and saved count.
- `components/TrustBadge.tsx` — real community verification above 5 reports; honest low-data / no-votes copy otherwise. Uses design tokens, not raw palette classes.
- `components/TrustBadge.test.tsx` — covers verified, low-data and no-data states.
- `components/CodeRevealButton.tsx` — one-tap reveal + copy + tracked open, with safe fallback and success state.
- `components/TrackDealBanner.tsx` — open-loop promise with email capture and success state.
- `components/DealCard.tsx`, `components/CouponCard.tsx` — expiry tone uses the shared 48h rule; trust badge is present.
- `components/CouponRow.tsx`, `components/CouponGroupCard.tsx` — honest trust badge; masked codes remain masked.
- `components/product/PriceHistory.tsx` + `app/products/[slug]/page.tsx` — “Lowest price in N months” only when computed from real `PriceHistory` data.
- `docs/ui-guidelines.md` — “Persuasion patterns” section with data source, threshold and banned copy.

## Skipped (no real data)

- “N similar offers expired this week” — no backend aggregate exists.
- Account savings figure — no field proves actual savings. Dashboard structure stays behind the existing placeholder; the figure is hidden.
- “Verified by our team” — no distinct human-verification field. Source-check dates are shown instead.

## BACKEND-NEEDED

1. Human-verification flag separate from source-check timestamps.
2. Similar-offer expiry aggregate per product.
3. Savings proof for the account dashboard.

## Open questions

- Should the account savings dashboard be feature-flagged with `getVariant` once real savings data exists?
- Should the trust threshold (currently 5 reports) be tuned per category?

## Verification

- `npx tsc --noEmit` passes.
- `npm run test -- --run` passes: 366 tests.
- `npm run lint` is blocked by a pre-existing `react-hooks/set-state-in-effect` error in `components/account/AccountTabs.tsx`; no new lint errors were introduced.
