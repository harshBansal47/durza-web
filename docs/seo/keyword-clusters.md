# Keyword clusters — Google Trends research (15 Nov 2026)

Evidence basis: 7 raw exports in `google-trends/raw/` (IN — India). Scores are
**relative interest (0–100 within each export)**, not search volume. "Breakout"
means Google saw an increase too large to express numerically for the window.
Deltas reference the exact file/window.

The one export that matters most is
`searched_with_top-searches_queries_IN_20251115-1955_20261115-1955.csv` — a
sports-nutrition seed. It is the strongest, most honest content signal in the
whole set.

Reader guide: **ACCEPTED** = page for it already exists or was improved today;
**OPPORTUNITY** = real but requires recruitment/build (not done yet);
**REJECTED** = deliberately not targeted, with reason.

---

## 1. Sports nutrition / muscle-building supplements — **ACCEPTED** (work done)

| Query | Interest | Window/file | Delta |
|---|---|---|---|
| creatine | 100 | 12m top (1955) | −40% |
| muscletech coupon code | 59 | 12m top (1955) | −40% |
| yoga bar coupon code | 46 | 12m top (1955) | Breakout |
| bigmuscles coupon code | 45 | 12m top (1955) | −50% |
| yoga bar | 42 | 12m top (1955) | Breakout |
| muscleblaze coupon code | 38 | 12m top (1955) | −50% |
| creatine monohydrate | 34 | 12m top (1955) | −50% |
| gnc coupon code | 33 | 12m top (1955) | −60% |
| yoga bar oats | 31 | 12m top (1955) | Breakout |
| big muscles coupon code | 21 | 12m top (1955) | −20% |
| nutrabay coupon code | 18 | 12m top (1955) | −10% |
| muscleblaze | 35 | 12m top (2001) | −60% |

- **Intent:** transactional, coupon-led. **Seasonality:** evergreen with October–January and June–August (cutting/bulk) upticks.
- **Honest trend read:** absolute interest is the strongest of any cluster in the export, but several entries trend down over 12 months. This is a *demand* signal, not *growth* — page for the intent, not the spike.
- **Durza fit:** Excellent — three owning hubs live today (`/stores/healthkart`, `/stores/alpino`, `/stores/fuelone`), plus a CPS-active program store `/stores/muscleblaze-com-ecommerce-cps-india` (Admitad, live since 2026-11-10, slug tied to an Admitad campaign landing URL).
- **Actions taken 2026-11-15:** HealthKart meta description now names MuscleBlaze + creatine monohydrate; new FAQ on HealthKart (MuscleBlaze runs through the HK checkout); Fuel One FAQ added (creatine price moves with promotions; panel is source of truth).
- **Opportunity:** a dedicated `/stores/muscleblaze` hub if/when the DB record is renamed or a proper page is built — see `future-work.md` #1. Do NOT touch the current ugly slug casually — it is wired into tracking and sitemap.

## 2. Head coupon terms — **ACCEPTED** (no structural change)

| Query | 12m top | 3m top | 1m top | Trend |
|---|---|---|---|---|
| code | 100 | 100 | 100 | flat (−4/−10%) |
| coupon | 67 (+30%) | 64 | 62 | cooled |
| coupon code | 43 (+20%) | 44 | 43 | flat |
| coupons | 10 | 10 | 10 | flat |
| promo code | 9 | 11 | 9 | flat |
| voucher | 8 | 9 | 9 | flat |
| deal | 3 | 3 | 3 | depreciating |
| hsn code | 12 | 12 | 12 | −6/−30% |
| myntra coupon code | 1 | 1 | 1 | cooling (−9/−20/+40%) |

- **Intent:** navigational/transactional head. **Seasonality:** flat year-round with window spikes around Diwali/BF/CM.
- **Durza fit:** homepage + `/coupons` + `/deals` already carry these; `/coupons` title is keyword-rich ("Coupon Codes & Deals — <N> Live Offers").
- **Action:** none required. Defend, don't stuff. The 6–30% readings indicate effective vs. brand-pill queries — head terms are for `/coupons`, not store pages.

## 3. Grocery / quick commerce — **OPPORTUNITY** (recruitment, blocked today)

| Query | Value | Window |
|---|---|---|
| jiomart | 6 (12m top) / Breakout tag on rising | sustained +300% |
| jiomart coupon | 5 / (+250%) | 12m top + rising |
| jiomart coupon code | 3 / (+300%) | 12m top + 1m |
| jiomart coupons | 1 | 12m rising |
| jiomart coupon code today | 1 | 12m rising |
| jiomart promo code today | 0 | 12m rising |
| blinkit coupon code | 1 (+170%) | 12m top + 3m |
| blinkit coupon codes | 0 | 12m rising |
| blinkit coupon | 1 | 12m top |
| bigbasket coupon code | 0 | 12m rising |

- **Intent:** transactional grocery coupon queries — genuine, growing, India-first.
- **Hard blocker:** **not one of these stores exists in our catalogue** (verified 2026-11-15: `stores` empty for jiomart, blinkit, bigbasket). No program, no store row, no affiliate link, no page to invent offers for.
- **Action:** see `future-work.md` #2 — recruitment (Admitad / vCommission availability check) before any page is built.

## 4. QSR / fast food (Dominos, KFC) — **OPPORTUNITY** (recruitment, blocked today)

| Query | Value | Window |
|---|---|---|
| dominos | 4–5, rising_1m up | 12m/3m/1m |
| dominos coupon code | 2–3 (+20–40%) | all windows, rising_1m |
| dominos coupon code today | 1 (+70% / +20%) | 12m + 1m rising |
| dominos offer today | 0 (+40%) | 1m rising |
| dominos coupons / offers | 0 (+50% / +20%) | 1m rising |
| kfc today offer buy 1 get 1 free price | 0 (+450%) | 1m rising |
| kfc buy 1 get 1 offer | 0 (+250%) | 1m rising |
| pringles | 1 | 12m/3m |

- **Intent:** hungry-shopper, time-boxed, "today" intent — the exact "today" phrasing recurs in every window.
- **Hard blocker:** no Dominos / KFC store in catalogue. No affiliate relationship either (Dominos India is not typically on Admitad/vCommission; KFC has a campaign via specific partners — unknown at time of writing).
- **Action:** `future-work.md` #2 (recruitment). Zomato & Swiggy hubs exist and capture restaurant intent generally.

## 5. Bank rewards & card-points redemption — **ACCEPTED** (covered)

| Query | Value | Window |
|---|---|---|
| hdfc | 5 | 12m / 1m |
| hdfc reward points | 2 (−9%) | 12m |
| hdfc rewards | 1 (+10%) | 1m + 12m |
| hdfc credit card points redeem | 1 (+20%) | rising_1m |
| how to redeem hdfc credit card points | 0 (+20%) | rising_1m |
| mastercard | 1 (+450%) | 3m rising |
| mastercard rewards | 1 (+550–950%) | 12m + 3m rising |
| mastercard travel rewards | 0 (+400–3,550%) | 12m + 3m rising |

- **Intent:** informational + transactional; "how to redeem" guides. **Seasonality:** quarter-end and festive.
- **Durza fit:** exactly what our bank hub and guides cover.
- **Action taken 2026-11-15:** capstone guide `/guides/best-credit-card-online-shopping-india-2026` gained an FAQ on redeeming points (SmartBuy / card portal ownership, honestly framed — no invented exchange rates); bank pages untouched (intentionally — do not keyword-stuff bank pages).

## 6. Travel — **OPPORTUNITY** (recruitment to consider)

| Query | Value | Window |
|---|---|---|
| redbus | 3–4 (+10–40%) | 12m / 3m / 1m / 1m-rising |
| redbus coupon code | 2 (+40% / +9% / +10%) | 12m / 3m / 1m |
| red bus coupon | 1 | all |
| redbus coupon codes | 0 (+40–140%) | 12m + 1m rising |
| red bus coupon code | 1 (+30%) | 1m rising |
| rapido coupon code | 1 (+100%) | 12m rising |
| rapido coupon codes | 0 (+20%) | 1m rising |
| rapido coupon | 1 | 1m |

- **Coverage gap:** `/stores/ixigo` and makemytrip live in catalogue with coupons; **redbus and rapido do not**. Documented in `future-work.md`.

## 7. Gifting — **ACCEPTED** (improved)

| Query | Value | Window |
|---|---|---|
| fnp coupon code | 0 (+50%) | rising_1m |
| igp coupon code | 0 (+30%) | rising_1m |

- **Durza fit:** `/stores/igp` live (custom page, IGP10, midnight gifting — the exact query intent). FNP not in catalogue.
- **Action taken:** new FAQ on `/stores/igp` (no fabricated "today-only" grinds; occasion-code honesty); FNP stays `future-work.md`.

## 8. Nykaa beauty — **ACCEPTED** (improved)

| Query | Value | Window |
|---|---|---|
| nykaa coupon code today | 0 (+30%) | rising_1m |

- **Action taken:** `/stores/nykaa` meta now reads "Live Nykaa coupon codes for today", FAQ added (no fake daily code; panel as truth). Nykaa carries 7 live catalogue offers — the page is legitimately the home for this intent.

## 9. Fashion budget brands (shein, savana) — **REJECTED (today)**

- `shein coupon code` 0 (+120%), `savana coupon code` 0 (+80%) — both rising. Neither brand is in our catalogue and both are outside our affiliate relationships; building fictional coverage for Shein is off-brand. Noted; revisit if recruitment happens.

## 10. Baby & kids (superbottoms) — **OPPORTUNITY** (watch)

- `superbottoms coupons` 0 (**+3,350%**, 1m rising) — an Indian baby-apparel DTC. FirstCry-adjacent; FirstCry is our priority-10 store in catalogue. Not in catalogue ourselves; no program joined. Recruitment watch item — see `future-work.md`.

## 11. Electronics events (croma, oneplus) — **OPPORTUNITY** (seasonal)

- `croma apple sale discounts` 0 (Breakout, 12m rising) — Croma store row exists (`croma`, active) but has **0 offers** in catalogue; no program synced. `oneplus freedom sale discounts` 0 (Breakout, 12m rising) — OnePlus not in catalogue at all.
- Seasonality: Apple events are September–October (festive) + April–June (summer) and November–December (Christmas). Sequence accordingly.

## 12. Marketplace brands — **ACCEPTED** (defend, don't change)

| Query | Value | Window |
|---|---|---|
| amazon | 3 | 12m/3m/1m |
| amazon coupons | 0 (+150%) | 12m rising |
| myntra | 2 | 12m |
| myntra coupon code | 1 (−9/−20/+40%) | all windows |
| flipkart | 1 | 1m |

- Pages already carry these: `/stores/myntra` head term, `/deals` title explicitly names Amazon/Flipkart, `/stores/[slug]` generic template for amazon-in. No edits needed; demand is relative-flat/negative in the windows.

## 13. Education / student discounts — **REJECTED (today, honest scope)**

- `adobe student plan` 0 (+130%), `apple student discount` ~1 (−10/−20/−30%), `student discount` 4 (−4%), `pw coupon code` 1 (+5–20%), `code with harry` 1 (flat/code-genesis in India), `chatgpt` 1, `chegg` 1–2.

Off-target for a coupon-store site; Lenovo/Acer student pricing is covered inside our two laptop guides (honest, generic wording — not specific numbers). Not pursuing coupon codes for Adobe/Apple — no affiliate programs and no approved-path pages.

## 14. Entertainment & live events — **OPPORTUNITY** (not in catalogue)

- `fancode` 16–28 (moves +40% → +7%, persistent top query), `district app coupon code` 0 (+80%), `sonyliv` 1 (+40%), `bookmyshow` 1 (+10%), `crex`, `cricbuzz`.
- FanCode is a sports streaming service with a coupon-ish search profile; district/Zomato app; bookmyshow — none in catalogue. Documented as watchlist; do not page-map until a program exists.

## 15. Crypto / game codes / rewards apps / MLM — **REJECTED** (explicit)

- `binance`/`bitget`/`gate`/`polyx` cluster (crypto exchange promos) — 15 unique queries, +400–1,600%;
- `free fire max redemption codes`, `mech arena promo codes`, `forge codes`, `fc mobile redeem code`, `rivals codes`, `eldoradogg` (game gold/airdrop codes) — 16 queries;
- `mypoints`, `feature points`, `google opinion rewards`, `be 10x`, `content reward`, `5dplanner` (paid-to-watch apps) — 8 queries;
- `dxn` cluster (MLM wellness, off-brand), `chadwick boseman`, `crcs sahara` (news events).

None of these are India shopping intent, none are affiliate-able in our model, and none would pass the Durza brand bar. They are recorded in `google-trends-consolidated.csv` for completeness and then left alone.

## 16. Hosting / SaaS (hostinger, godaddy, lemlist, namecheap) — **REJECTED**

`hostinger discount code` (+950%), `hostinger promo code` (+500%), `godaddy promo code`, `lemlist`, `namecheap` (flat candidates) — these trend huge but target web hosting, not India shopping. Recruitment (Admitad) as future consideration only; not for this site.

## 17. Auto (toyota, volkswagen SUV offers) — **REJECTED**

`toyota car discount offers august` (Breakout), `volkswagen suv offers and discounts` (Breakout) — car purchases don't fit coupon/redemption workflows. Mentioned in the dataset; skipped.
