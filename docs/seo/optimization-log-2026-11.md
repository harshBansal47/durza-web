# Optimization log — 15 November 2026

Second-pass Trend research after the SEO round of 2026-11-15. Every line below
came from a visible keyword assignment in `page-map.md` — nothing was added
without one.

## Pages changed

| Page | Change | Signal (file, window) |
|---|---|---|
| `/stores/healthkart` | Meta description now names MuscleBlaze + creatine monohydrate (and drops the stale "Verified HealthKart promo codes" claim); new FAQ — "Do HealthKart codes apply to MuscleBlaze?" | 198 queries mapped at `google-trends-consolidated.csv`; sports-nutrition cluster strongest in `…-1955_…csv` |
| `/stores/healthkart` | "Checked" card glossary tightened — no longer claims checkout testing; names shopper votes + feed checks honestly | honesty policy (content-guide), surfaced while editing |
| `/stores/healthkart` (client) | Trust strip wording: "code has been tested recently" → shopper-report model | content-guide honesty |
| `/stores/fuelone` | New FAQ — creatine monohydrate: no standing code; panel is weekly source of truth | `creatine` 100, `creatine monohydrate` 34, 12m top (1955) |
| `/stores/nykaa` | Meta description: "Live Nykaa coupon codes for today" (target query phrasing); new FAQ — "Is there a Nykaa coupon code today?" — honest answer, no fabricated daily code | `nykaa coupon code today` 1 (+30%) rising_1m (20261015) |
| `/stores/igp` | New FAQ — occasion-specific IGP codes; IGP10 stays the standing code | `igp coupon code` 0 (+30%) rising_1m (20261015) |
| `/guides/best-credit-card-online-shopping-india-2026` | New FAQ — redeeming points for shopping carts via card portals (SmartBuy et al.), no invented exchange rates | `how to redeem hdfc credit card points` 0 (+20%) rising_1m; `hdfc rewards`+10% |

## Files created (knowledge base)

- `docs/seo/google-trends/raw/*.csv` — the 7 unique exports, preserved unedited
- `docs/seo/google-trends-consolidated.csv` — deduped master (199 unique queries, windows merged)
- `docs/seo/README.md`, `docs/seo/keyword-clusters.md`, `docs/seo/page-map.md`,
  `docs/seo/future-work.md`, `docs/seo/maintenance.md`, `docs/seo/google-trends/README.md`
- `scripts/seo/consolidate_trends.py` — regen of the master CSV from `raw/`

## Explicitly NOT changed (and why)

- Homepage, `/coupons`, `/deals`, `/categories`, `/sales` — head terms already
  owned; keyword density doesn't grow without new evidence (GSC CTRs needed).
- `/stores/myntra` — title/description keyword-rich already.
- Lenovo/Acer guides — education intent rejected (Adobe/Apple student — no catalogue relationship).
- `/black-friday` — owns its event; BF↔calendar interlink set up 2026-11-15.

## What remains misprioritised

- **Muscleblaze** — CPS-active store with 1 offer and the ugliest slug of the
  site; the strongest nutrition signals (creatine 100, muscleblaze coupon
  code 38) land there. See future-work #1.
- **Feed gaps** — 0 offers for croma; MuscleBlaze has 1. Track ingestion runs before promising copy.
