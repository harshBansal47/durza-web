# SEO research — Durza.in (single source)

This file is the only SEO knowledge-base that is kept. Historical CSVs and the consolidated Trends export have been retired from the repo. Everything needed to operate is below.

Sub-doc: [`../README.md`](../README.md) — operating rules (deployment, truths, ops).

---

## 1. Current site snapshot (Nov 2026)

- Sitemap ≈ **411 URLs** (pruned ~1,020 dead/reduced coupons).
- ~46 custom store pages; ~17 static+dynamic buying guides; 1 generic `StorePageClient` route for everything else.
- Priority system (1–10) is live on stores/coupons/editorials; homepage & catalog sort semantics inherit it.
- Generic Trends seeds inspected Nov 15 2026: **sports-nutrition / yoga bar / muscleblaze** dominated set; coupon-crossed-unlock queries behaved like brand queries, not purchase intent (usually); head terms like `code`, `coupon code`, `deal`, `promo code`, `voucher` carry nav intent to `/coupons`, not to store pages.

## 2. Keyword → intent → page map (summary)

One keyword, one page. If you add a page, it claims a slot in the table below.

| Intent / cluster | Target page(s) | Evidence | State / action |
|---|---|---|---|
| Sports nutrition & muscle-building (creatine, MuscleBlaze, BigMuscles, Yoga Bar, GNC, NutraBay) | `/stores/healthkart`, `/stores/alpino`, `/stores/fuelone` + refresh | 199 unique queries; sports-nutrition = single strongest cluster in the export | **Shipped** — meta+FAQ changes live on all three pages |
| Head coupon terms (`code`, `coupon code`, `promo code`, `voucher`) | `/coupons` (head), `/deals` | flat trend, nav intent | **Shipped** — no change needed |
| Bank rewards (`hdfc`, `hdfc reward points`, `mastercard`) | `/bank-offers`; `/guides/best-credit-card-online-shopping-india-2026` (FAQ redemption) | `+10 to +20%` Rising 1m | **Shipped** — FAQ added 11/15 |
| Gifting (`fnp coupon code`, `igp coupon code`) | `/stores/igp` (IGP live) · FNP blocked | `+30 to +50%` | **Partial** — FNP needs program join; no page built |
| Nykaa (`nykaa coupon code today`, `pink sale`) | `/stores/nykaa` (custom) | `+30%` Rising 1m | **Shipped** — FAQ + meta tagline |
| Croma (`croma apple sale discounts`) | `/stores/croma` | Breakout 12m | **Watch** — 0 offers today, program blocked; no page |
| Marketplace brands (Amazon, Flipkart, Myntra) | `/stores/myntra`, `/stores/[slug]` generic, `/deals` head | `+150%` amazon coupons, `+40%` myntra coupon code (not net-growing) | **Shipped** — no structural change |
| Lenovo / Acer student education | `/guides/lenovo-laptop-offers-india-2026`, `/guides/best-acer-laptop-deals-promo-codes` | `-10 to -30%` student, no catalogue relation | **REJECTED** — no path |
| Q-commerce/grocery (`jiomart`, `blinkit`, `bigbasket`) | — | `+170 to +500%` Breakout | **Blocked** — no catalogue row, no program joined |
| QSR (`dominos`, `kfc buy 1 get 1 free`) | — | `+20 to +450%` | **Blocked** — no affiliate relationship |
| FanCode, BookMyShow, SonyLIV, District App | — | `+10 to +80%` | **Blocked** — not in catalogue |
| Crypto codes (binance/bitget/gate/polyx) | — | `+400 to +1,600%` | **REJECTED** — off-brand |
| Game codes (free fire, Mech Arena, FC Mobile, Forge codes…) | — | up to +700% | **REJECTED** — off-brand |
| Free rewards apps (Feature Points, 5DPlanner, Google Opinion Rewards) | — | `+550%` | **REJECTED** — off-brand |
| Hostinger / GoDaddy / lemlist / namecheap | — | `+300 to +950%` | **REJECTED** — SaaS off-brand |
| Toyota / VW SUV offers | — | Breakout | **REJECTED** — off-brand |
| Student discount / PW coupon | — | flat-ish | **REJECTED** — no relation |
| `yoga bar oats` / `yoga bar coupon code` | `/stores/healthkart` (YogaBar ties into HK health drinks), `/stores/alpino` | 46-42 (Breakout) | **Shipped** through refreshed HK/Alpino hubs |
| Sports nutrition (creatine, muscleblaze) | `/stores/fuelone`, `/stores/muscleblaze-com-ecommerce-cps-india`, `/guides/muscleblaze-creatine-buying-guide` (future work) | creatine 100, muscleblaze coupon code 38, Fuel1 100  | **Partial** — MuscleBlaze slug ugly; redirect strategy pending |
| `militzer` / `bigmuscles` coupon code | `/stores/healthkart` (they own BigMuscles) | 45 | **Shipped** via HK |

## 3. Pages to request indexing in GSC (owner executes)

Request these in GSC UI — I cannot, and must not:

1. `/guides/amazon-flipkart-sale-dates-2026`
2. `/guides/best-credit-card-online-shopping-india-2026`
3. `/guides/icici-bank-offers-india-2026`
4. `/guides/rbl-bank-offers-india-2026`
5. `/stores/healthkart`
6. `/stores/nykaa`
7. `/stores/fuelone`
8. up to 100 individual coupon pages (e.g. `/coupons/{slug}` for Acer/Amazon flagship offers — from the pruned live set).

## 4. What's blocking the next growth loop

1. **AdSense re-review** — sites must show crawl recovery over at least 2 weeks post-pruned-sitemap. User must re-submit AdSense re-approval after that.
2. **Search Console reconciliation** — no GSC queries export received yet; every week without the GSC traffic CSV leaves us blind to actual rankings. Cover FAQ stays “what/how/when you need to”; keyword density stays flat.
3. **FNP / Croma / JioMart recruitment** — the offers exist, but no affiliate program is live. Until they land, pages stay off; if any program is joined, the matching store page becomes a candidate to build

## 5. When new Trends / GSC data arrives

Update this file only — it is the single source:

1. Note the signal (file name + date) and what moved.
2. Update the intent table above; mark the state (`SHIPPED`, `PARTIAL`, `WATCH`, `REJECTED`, `BLOCKED`).
3. Confirm keyword economy: every keyword in the table maps to exactly one page. One keyword, one page — if you add a page, add its keyword in the same commit.
4. Never trust volume numbers directly — Trends interest is relative (0–100 within the export);`Numbers only compare within the same window.`

## 6. Honesty rules (carried over)

- Never claim "verified" codes — only `/checkout` success telemetry or real shopper votes.
- Never invent savings (MRP math, strikethroughs).
- Never invent offers purely to fill a slot. Empty hubs beat fake coverage.
- Never claim a page “ranks #1 for X” — we never know; we say "we cover X with Y".

## 7. Slug priority reminders (the stores you must care about)

- **10**: HealthKart, Fuel One, MuscleBlaze (cps), Alpino, Bewakoof, Bliss Club, Boult, Boldfit, Dot & Key, Fitspire, Gritzo, HKvitals, Kama Ayurveda, Kapiva, Milton, MuscleBlaze (cps), Sirona, Indus Valley, The Man Company, The Natural Wash, Nourish Mantra, Zoff Foods, ZeroHarm, Havells, MyMuse, The Bear House, Wonderchef, TrueBasics, MuscleBlaze(cps)
- **9**: FirstCry, Nykaa, Lenskart, Meesho
- **8**: Acer, Lenovo India, Asus, Adidas, Zomato, Swiggy, MakeMyTrip, ixigo
- **7**: Amazon India, Flipkart, Croma, Reliance Digital
- **2**: off-target / utility (kept off homepage rails)

Coupons inherit their store's priority. Editorial rows get their own priority; it sits on the editorial record directly.
