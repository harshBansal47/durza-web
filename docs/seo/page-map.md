# Keyword → page ownership map

One keyword, one owning page. If a query moves cluster, the assignment here
moves in the same commit. The purpose is to stop two pages competing for the
same phrase and to stop page-generation "for completeness".

Confidence column: **HIGH** = evidenced by Google Trends + live catalogue fit;
**MEDIUM** = prioritised from Trends + brand presence, ordering signals weaker;
**WATCH** = signals noted, page decision pending.

## A. Assigned to live pages (current ownership)

| Query / cluster | Page | Intent | Confidence | Notes |
|---|---|---|---|---|
| coupon code / coupons / promo code / code / voucher (head) | `/coupons` | transactional head | HIGH | title already dense; do not re-target |
| coupon codes & deals — brand-store lists | `/deals` | transactional | HIGH | title names Amazon, Flipkart, Myntra, Nykaa |
| durza coupons (branded) | `/` | navigational | HIGH | homepage title; brand owns this outright |
| myntra coupon code | `/stores/myntra` | transactional | HIGH | custom page live (BFF500 framing) |
| muscleblaze coupon code / big muscle coupons | `/stores/muscleblaze-com-ecommerce-cps-india` | transactional | MEDIUM | CPS-active since 2026-11; needs proper hub — see future-work |
| healthkart coupon code / big muscle coupons | `/stores/healthkart` | transactional | HIGH | 8 live HB offers; FAQ updated 2026-11-15 |
| muscleblaze via HealthKart (same label) | `/stores/healthkart` | transactional | MEDIUM | MuscleBlaze = HK label — mention only, do not compete with a future muscleblaze hub |
| fuel one creatine / whey coupons | `/stores/fuelone` | transactional | MEDIUM | creatine monohydrate is the trend anchor term |
| alpino peanut butter oats coupons | `/stores/alpino` | transactional | MEDIUM | priority-10 own-SKU; no trend reading in export |
| nykaa coupon code today | `/stores/nykaa` | transactional | HIGH | rising +30% (1m rising); meta+FAQ updated |
| igp coupon code | `/stores/igp` | transactional | HIGH | rising +30% (1m rising); FAQ updated |
| croma apple sale discounts | `/stores/croma` | event | MEDIUM | store row active; 0 offers today; generic hub serves the query until a program sync |
| hdfc coupon/reward redemptions | `/guides/best-credit-card-online-shopping-india-2026` | informational | MEDIUM | capstone — FAQ on SmartBuy redemption (2026-11-15) |
| icici offers (ixigo/makemytrip) | `/guides/icici-bank-offers-india-2026` | transactional | HIGH | live grid from catalogue |
| rbl offers (ixigo/Tatacliq) | `/guides/rbl-bank-offers-india-2026` | transactional | HIGH | live grid; hotels focus |
| bank rewards — general strategy | `/bank-offers` | informational | MEDIUM | hub: 6 live bank groups; authority hub |
| amazon/flipkart sale calendar 2026 | `/guides/amazon-flipkart-sale-dates-2026` | informational | HIGH | targets "amazon sale dates" autosuggest + seasonal |
| black friday 2026 — hub | `/black-friday` | event | HIGH | stable URL; owned by that route by design |

## B. Queries read from Trends — deliberately unassigned

| Cluster / queries | Why not mapped | Recruitment needed? |
|---|---|---|
| jiomart / blinkit / bigbasket coupons | no store, no program, zero real offers to show | YES — see future-work #2 |
| dominos / kfc coupons | no affiliate relationship | YES — see future-work #2 |
| fnp / fern & petals coupons | would need an FNP program + page | YES — future-work #3 |
| superbottoms coupons | would need program + baby page | YES — future-work #3 |
| redbus / rapido coupons | would need program + travel page | YES — future-work #3 |
| fancode / district app / bookmyshow / sonyliv | not in catalogue, not coupon-aligned today | review in Q1 2027 |
| hostinger / godaddy / lemlist (SaaS) | web hosting — off-brand audience | not pursuing |
| binance / bitget / gate (crypto) | off-brand; zero coupon mechanics | rejected permanently |
| free fire / mech arena / forge / fc mobile (game codes) | wrong intent; not India shopping | rejected permanently |
| adobe / apple student discount / pw coupon | no coupon mechanics permitted in our model | rejected permanently |
| hedonism — tower analytics/rewards apps | off-brand | rejected permanently |

## C. Decisions to make at next export

1. Re-home all unassigned entries above once/if programs are joined —
   they must move to section A in this file **in the same commit as the page**.
2. Muscleblaze slug strategy — ugly slug hurts click-through and keyword
   density; safe to rename only with slug redirect + tracking audit.
3. If/when GSC "queries" export arrives, sync row-level ranking data back into
   the HIGH/MEDIUM tiers above (see `maintenance.md` §6).
