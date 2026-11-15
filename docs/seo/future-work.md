# Future work — prioritised, with decision points

Ordered by (relevance × demand × our readiness). Nothing here is committed —
each item needs an owner decision before it becomes a task.

## #1 Build a proper MuscleBlaze hub — **HIGH** (trends + CPS catalogue ready)

- **Signal:** sports-nutrition is the strongest cluster in the export (creatine 100, muscleblaze coupon code 38, bigmuscles 45 — all 12m top).
- **Current:** CPS-active store row since 2026-11-10; slug `muscleblaze-com-ecommerce-cps-india` breaks keyword density and CTR; 1 offer live; not in `isIndexableStore` hints at custom page; not in `/stores` priority map.
- **Proposal:** (a) ask owner whether to rename DB slug to `muscleblaze` + 301 + sitemap/priority bump, or keep slug and build a custom page on it, (b) 1 deliverable guide "muscleblaze creatine — which one to buy" (only if catalogue confirms the SKU exists — no invention), (c) priority lift (10-tier; Indian own-SKU D2C muscle-nutrition), (d) wire RelatedGuides tile on alpino/fuelone/healthkart pages to it.
- **Avoid:** new coupon copy about specific NFOFF pricing we haven't seen; verification language.

## #2 Recruit grocery / quick-commerce affiliate programs — **HIGH** (biggest unmet demand)

- **Signal:** `jiomart` +300%, `jiomart coupon` +250%, `jiomart coupon code today`/`jio mart coupons` all tagged Breakout-ish; `blinkit coupon code` +170%; `bigbasket coupon code` +500%; all 0/100 interest floor → clean-rising.
- **Blockers:** zero store rows; no known program relationships today; JioMart availability via affiliate networks is limited (check Admitad + vCommission catalogues for latest terms); Blinkit uncertain; BigBasket historically on vCommission (ask-on-verification).
- **Proposal:** if any of the three is accepted → build custom hubs using the priority-10 template (hero + live catalogue + FAQ + JSON-LD), register in sitemap, wire into `RelatedGuides` on `/stores/*` where contextually honest.
- **If none available:** document the loss in this file (rejected-for-today) with date; no fake coverage.

## #3 Recruit gifting FNP + travel redbus/rapido + baby superbottoms — **MEDIUM**

| Brand | Trend signal | Export |
|---|---|---|
| FNP (Ferns N Petals) | `fnp coupon code` +50% (1m rising) | 20261015 |
| redbus | `redbus coupon codes` +40–140% (12m + 1m rising) | 20251115, 20261015 |
| rapido | `rapido coupon code` +20% | 20261015 |
| superbottoms | `superbottoms coupons` +3,350% (1m rising) | 20261015 |

- All four are recruitment targets. Superbottoms (baby apparel, India D2C) fits the own-SKU-D2C priority the site already carries (Alpino, HealthKart formulas) — ideal *if* the program exists; check on verification.
- If recruitment happens, IGP playbook (custom hub + standing IGP10-equivalent + FAQ) is the template. FNP/superbottoms/redbus must not be created before a real program is joined — empty hubs get deleted from the sitemap the same day as any failed launch.

## #4 Croma — unlock Apple-event coverage — **MEDIUM** (seasonal)

- `croma apple sale discounts` Breakout (12m rising). Croma is in catalogue (`croma` active) but has **0 offers** and no synced program.
- **Next festive cycle (Apr–Jun + Sep–Oct 2026/27):** if/when Croma's program is synced and offers land, write "Croma Apple sale deals" inside the apple sell story — never before offers exist.
- Until then: no code, no copy changes, keep 0-offers page nomindex behavior as-is (check built-in emptiness filter).

## #5 Close Google Search Console loop — **HIGH** (already blocked on you)

- Request indexing for: `/guides/amazon-flipkart-sale-dates-2026`, `/guides/best-credit-card-online-shopping-india-2026`, `/guides/icici-bank-offers-india-2026`, `/guides/rbl-bank-offers-india-2026`, `/stores/healthkart`, `/stores/nykaa`, `/stores/fuelone`.
- Two weeks later: export Queries CSV from GSC → drop into `maintenance.md` recipe → reconcile against `page-map.md`. This is the missing measurement half of this entire file.
- If position 4–20 answers exist for the store pages, the fix is content specificity + internal links to those pages — not mass page publishing.

## #6 Keyword Planner exports — **MEDIUM**

- No Keyword Planner data received yet. When it arrives, extend `scripts/seo/` with a sibling parser (different column names), then merge its volume columns into `page-map.md` urgency tiers (see maintenance §5).

## #7 Watchlist (reviewed, parked)

| Item | Why parked |
|---|---|
| Dominos / KFC coupons | no affiliate program tracked; brand ends at redemption (not our model) — revisit at next recruit cycle |
| FanCode coupons | persistent top query; zero affiliate track today; useful coverage is FanCode login guides (out of scope) |
| OnePlus freedom sale discounts | no OnePlus in catalogue; recruitment candidate with croma |
| Google Opinion Rewards / rewards apps | off-brand permanently |
| Discount price charts for creatine | future guide candidate — needs catalogue confirmation + creator/authority investment |
| HDFC + Mastercard coupon layers | covered within capstone FAQ; new HDFC deep page only if GSC shows impressions for it |

## Generic caveat

`google-trends-consolidated.csv` outranks every summary in this folder when
they conflict. When in doubt, open it and read the raw windows.
