# Persuasion rollout audit

Audit date: 2026-10-20. Scope: `couponza-web` only. Backend is reference only.

Legend: present = real data already rendered; missing = UI absent but data exists; n/a = principle does not apply; unsafe = existing UI may over-claim and must be changed; BACKEND-NEEDED = data field does not exist in `lib/types.ts` / `lib/api.ts`.

| Route / component | Cognitive ease | Social proof | Open loop | Factual loss aversion | Ego boost | Data field needed | Field exists? |
|---|---|---|---|---|---|---|---|
| `app/page.tsx` + home components | present (deal cards, search, carousels) | present via `DealCard`/`CouponCard` | present via `PriceAlertBanner` (dismiss-for-good) | present via expiry labels | present via save/vote flows | `CouponPublic`, `Product` | yes |
| `app/deals/page.tsx`, `DealFeed`, `SpotlightDeal` | present (masked codes, no full codes) | present via `DealCard` | missing (no track prompt on feed) | present via `DealCard` | missing | `TrackedProduct`, `Product` | yes for products; feed lacks prompt |
| `app/coupons/page.tsx` | present (masked codes) | present via `CouponCard` | missing | present | missing | `CouponPublic` | yes |
| `app/coupons/[slug]/page.tsx` | present (`CouponCodePanel` + `CodeRevealButton`) | present via `VerifiedGauge`, `TrustBadge` | present via `TrackDealBanner` | present via header + expiry | present via vote/save | `CouponPublic`, `PriceHistory` | yes |
| `components/CouponCard.tsx` | present (mask + reveal link) | present (`TrustBadge`) | n/a | present (one expiry label) | present (vote/save) | `success_rate`, `success_count`, `fail_count`, `expires_at` | yes |
| `components/CouponRow.tsx` | present (links to reveal page) | unsafe: “Not yet verified” when no votes; needs honest low-data badge | n/a | missing expiry | n/a | `success_rate`, `success_count`, `fail_count`, `expires_at` | yes |
| `components/CouponGroupCard.tsx` | present (masked codes) | missing | n/a | missing | n/a | `success_rate`, `reports`, `expires_at` | yes |
| `components/StickyDealBar.tsx` | present (mobile jump to reveal) | n/a | n/a | missing expiry | n/a | `expires_at` | yes |
| `components/store/StorePageClient.tsx` | present (masked codes) | present via `CouponCard` | present via `TrackDealBanner`, `StoreFollowButton` | present via cards | present via follow/save | `Store`, `CouponPublic` | yes |
| `app/stores/[slug]/page.tsx` | present | present | present | present | present | `Store`, `CouponPublic` | yes |
| `app/search/page.tsx`, `HeaderSearch`, `SearchBar` | present (links to reveal page) | missing | n/a | missing | n/a | `CouponPublic` | yes |
| `app/saved/page.tsx`, `SavedPageClient` | present | present via `CouponCard` | present (saved state) | present via cards | missing savings figure | `SavedItem`, `CouponPublic` | yes |
| `app/account/page.tsx` | present (stats, saved, tracked) | n/a | present (alerts, tracked products) | n/a | missing savings figure | `TrackedProduct`, `AlertEvent` | yes |
| `app/account/alerts/page.tsx` | present | n/a | present (pending/delivered alerts) | n/a | present via honest status | `AlertEvent` | yes |
| `app/account/products/page.tsx` | present (tracked products) | n/a | present | present via price history | present via target price | `TrackedProductView`, `PriceHistory` | yes |
| `app/products/[slug]/page.tsx`, `PriceHistory` | present (buy link) | missing | present via `TrackProductDialog` | present via price history | present via target | `PricePoint`, `Product`, `TrackedProduct` | yes |
| `app/bank-offers/page.tsx` | present (offer cards) | present via `CouponCard` | missing | present via cards | n/a | `CouponPublic` | yes |
| `app/compare/page.tsx`, `app/compare/[slug]/page.tsx` | present (editorial) | n/a | n/a | n/a | n/a | `EditorialContent` | yes |
| `app/guides`, `app/reviews`, `app/collections` | present (editorial) | n/a | n/a | n/a | n/a | `EditorialContent` | yes |
| `components/VerifiedGauge.tsx` | n/a | present (real votes only) | n/a | n/a | n/a | `success_rate`, `reports` | yes |
| `components/VerifyWidget.tsx` | present (reveal-gated vote) | present (vote) | n/a | n/a | present (“thanks for telling us”) | `CouponPublic` | yes |
| `components/PriceAlertBanner.tsx` | present (dismiss-for-good) | n/a | present (clear promise) | n/a | present (no flattery) | `session` | yes |
| `components/TrackProductDialog.tsx` | present (form) | n/a | present | n/a | present | `Product`, `TrackedProduct` | yes |
| `components/StoreFollowButton.tsx` | present | n/a | present | n/a | present | local store + session | yes |
| `components/EmptyState.tsx`, `ErrorState.tsx` | present (next action) | n/a | n/a | n/a | n/a | n/a | n/a |
| `components/ConsentBanner.tsx`, `ConsentPreferences.tsx` | present (no pre-ticked consent) | n/a | n/a | n/a | n/a | consent state | yes |
| `app/trust`, `app/how-it-works`, legal pages | n/a | n/a | n/a | n/a | n/a | n/a | n/a |

## BACKEND-NEEDED

- A per-product “similar offers expired this week” count. `PriceHistory` proves price movement, but there is no similar-offer expiry aggregate. Do not render this claim.
- A verified human-check flag distinct from `last_checked_at` / `last_verified_at`. `verification_status` exists, but “verified by our team” must map to a real human-verification field before we use that phrase. Until then, show the source-check date only.
- A savings figure for the account dashboard. No field proves what a user actually saved. Build the dashboard structure behind a flag and hide the figure until the backend can prove it.
