# Durza.in — Complete Handover (Nov 15 2026)

> **For any future agent working on Durza.in.** This file is the source of truth for what changed in November 2026, why it was done this way, and how to operate it. Read it *before* touching code, then read `CLAUDE.md` (root), `docs/RUNBOOK.md` (ops), `docs/ARCHITECTURE.md` (deeper structure).
>
> If you change anything documented here, either update this file in the same commit or delete/rewrite the section you invalidate.

---

## 1. What Durza.in is (30-second version)

An Indian coupon & deals site. A trustworthy, Indian-shopper-first shopping-assistant, never hypey. Brand = Bloomberg/Trustpilot-grade calm authority with Indian-D2C warmth. Non-negotiable truth-set:

- Every outbound link on Durza is tracked (vCommission `p1` for most, Admitad for Acer + all connected partners, Amazon Associates tag for Amazon, `/go/{slug}` / `/coupons/{id}/go` / `/out` for everything else)
- Every card shows honest facts (no fake strikethrough, no invented discount %, no fake verification)
- No fictitious countdown urgency
- Sponsored / affiliate placements are always labelled
- `rel="nofollow sponsored noopener"` on every external affiliate link (or `noreferrer` on `target="_blank"`)

---

## 2. Deployed code map at handoff

| Repo | Branch | Remote | Head commit |
|---|---|---|---|
| Backend | `main` | `git@github.com:harshBansal47/durza.git` | `ea500ef` (2026-11-15) |
| Frontend | `main` | `git@github.com:harshBansal47/durza-web.git` | `27e49c7` (2026-11-15) |

Production serving: **Vercel** (frontend) · **Oracle VM `144.24.124.148` (podman, backend)**

---

## 3. What changed in November 2026 (complete session)

### 3a. Discounting & UI
- Removed misleading strikethrough formatting across the site.
- Added **deal % fallback** from `restrictions.price` / `restrictions.mrp` when `discount_value` is absent: `formatDiscount` now derives "15% off" / "MADE-DEALS … X% OFF" from those fields (`lib/discount.ts`).
- Code-less offers now always carry something readable — `"MEGA DEALS — X% off"` or `"MEGA DEALS — No Code Needed"`; nothing ever renders empty.
- The word "verified" was removed from copy site-wide where no verification existed; re-used `checked` instead, or `Feed — codes come from the merchant's own feed, not hand-tested`.

### 3b. SEO & crawl budget
- Removing fake `BreadcrumbList` patterns and aggregateRating schema; soft-404 fixed (`notFound()` in metadata conflicted with `loading.tsx` boundary, HTTP 200 on missing stores was streaming shell commit).
- **All `loading.tsx` deleted** — streaming shells were committing 200 before `generateMetadata` could call `notFound()`. Now 404 status is real for `/stores/non-existent` (verified live).
- **~1,020 deal-type-only coupons de-indexed** (`is_indexable=false`); sitemap drops from 1,431 → ~411 URLs (verified); the `is_indexable=false` shard now correctly links out.
- **`/black-friday` added as primary Black Friday hub** — every page links to it (homepage, header, footer, guides, comparison).
- `/stores/{all}` paginated canonical + noindex rules for off-target pages.

### 3c. Telegram bot & channel
- Bot is **@durza_bot** (id 8374365630) and sits in **`@durzacoupons`** (Durza Coupons & Deals).
- Cron is OFF (`TELEGRAM_CHANNEL_ENABLED=false`). Admin-sent posts use `TELEGRAM_CHANNEL_ID` directly and are not blocked by that flag.
- Coded offers route buttons → `/stores/{slug}` (masked codes, no code leak in caption). Un-coded deals route `/coupons/{id}/go?src=tg_channel&content_ref=tg:tg:{slug}`.
- Fixed frontend admin timeout: 8s → **30s** (Telegram's retry-after can exceed it).
- Acer admin send previously showed "time limit of 8000ms exceeded"; now returns 200 in ~5s.

### 3d. Admitad — from zero to 24 live programs
- **Scopes** (`app/integrations/admitad.py`): added `advcampaigns_for_website` and `banners_for_website` (only `coupons_for_website` was granted before).
- **Sync job** `sync_admitad_campaigns` runs daily; pulls 26 connected programs, mints deeplinks via `deeplink_generator`, stores both `affiliate_campaigns` (with `network="admitad"`, rate-limited to `content` channel terms) and `affiliate_creatives` (716 banners; 13 programs carry banners; Indian-relevant carry 54).
- **24 of 25** (Netwall excluded) matched campaigns to stores via domain/site_url. Auto-discovered + seeded new India store hubs (Palmonas, Milton, Adidas, Asus, Lenovo India, Bewakoof, Aldo New, Digihaat, Charles & Keith, Bliss Club, Bath & Body works, Salty, Veromoda, Victoria's Secret).
- **Banner render**: New "Sponsored" block on store hubs renders only when a program has banners *and* the store is affiliate-routed. Currently live on Acer & Firstcry; other India hubs render tracked deeplinks.
- **Universal tracked CTA** — `/coupons/{id}/go` and Admitad roast through vCommission or admitad; **NEW** universal **`/api/v1/affiliate/out?program=&ulp=&src=`** renders a 302 with `clickref`-rewritten `subid` to any admitted-program deeplink (no Admitad API round-trip). Currently used by Lenovo & Adidas guides; can be used by anyone, anywhere.
- India-first editorial guides shipped: `/guides/lenovo-laptop-offers-india-2026`, `/guides/adidas-sale-india-2026`; Acer guide already existed.

### 3e. Indian premium priority system (new)
- **`priority`** integer (1-10, default 5, CHECK constraint, server_default=5) added to **stores**, **coupons**, **editorial_contents** (migration `l1m2n3o4p5q6`).
- **Every listing sorts by priority DESC** (coupons sort=recommended; stores list; editorial homepage; sales coupons picker; Telegram candidate selection). Other sort orders retain their primary semantics but carry priority as tiebreaker.
- Tier map (stores get 1-10; coupons inherit their store's tier; editorial rows assigned by hand):
  - **10** Indian premium own-SKU: `alpino`, `beast-life`, `bewakoof`, `bliss-club`, `boult`, `boldfit`, `dot-and-key`, `fitspire`, `fuelone`, `gritzo`, `healthkart`, `hkvitals`, `kama-ayurveda`, `kapiva`, `milton`, `milton-in`, `muscleblaze-com-ecommerce-cps-india`, `sirona`, `indus-valley`, `the-man-company`, `the-natural-wash`, `nourish-mantra`, `zoff-foods`, `zero-harm`, `havells`, `nuawoman-com-ecommerce-cps-india`, `mymuse`, `the-bear-house`, `wonderchef`, `truebasics`
  - **9** Indian own-SKU household / Indian-owned marketplaces: `firstcry`, `nykaa`, `lenskart`, `meesho`, `pepperfry-com-cps-india`, `pepperfry-com-ecommerce-cps-india`
  - **8** India-reachable partners (strong partners, India reach): `acer`, `lenovo-india`, `asus`, `adidas`, `zomato`, `swiggy`, `makemytrip`, `ixigo`
  - **7** India e-commerce brands (keener-on-narrow partners, not brand): `amazon-in`, `flipkart`, `croma`, `reliance-digital`
  - **2** off-target / WW / utility (kept off front rails; they surface only on deep/search pages)
  - Coupons inherit their store's priority; editorial guides have their own set (9 for `best-acer-laptop-deals-promo-codes`, 8 for `lenovo-laptop-offers-india-2026`; India-prime guide priority = 10).
- Frontend `lib/static-editorial.ts` mirrors the same ranks for the featured-guides strip on `/guides`.

### 3f. Deploy pipeline — lean
- **Frontend**: `git push origin main` → Vercel auto-builds (webpack, not Turbopack locally) → durza.in. Local `npm run build --webpack` confirmed working; `next dev` panics locally (pre-existing).
- **Backend**: edit in VM → `git pull` → `podman restart durza_app_1` (code is bind-mounted to `/code/app` so a restart suffices).
- Late-breaking fix in this session: **ALL `loading.tsx` removed** to fix 200-over-404 streaming commit. This affects any page that used a skeleton during load; the previous hide-screen-and-wait skeleton is gone.
- **Fix for local build**: Next.js 16 default (`turbo`) panics on `parse_css`; use `--webpack` locally; Vercel is unaffected.
- Vercel preview URLs matter for experimental deploys (`branch=preview`) but production=main=this path.

### 3g. AdSense
- Kill switch (`NEXT_PUBLIC_ADS_ENABLED`) still OFF — set to 1 only after Google approves the site. Do not flip it in a frontend-only push — reviewer must approve.
- Previously ad-snippet copy was added to ~9 static store guides; it renders only under the switch.
- Item count on the `MC-IA-100` policy on Advertisements.com avoided one by one this wave. **NOT reviewed by Google yet**.
- **Next**: verify ranking flow moves, ask owner to reapply after the next recrawl window.

---

## 4. Known broken / deliberately excluded

1. **13 pre-existing frontend vitest failures**, todos from before Nov 2026:
   `AffiliateCampaignCard`, `CouponCodePanel` (×2 click-to-reveal), `TrustBadge` (community verification), `deal-discovery`, `filters`, `landmarks`, `seo (organizationJsonLd)`, `site-brand` (×2), `Storefront`, `deals-mobile`, `storeLogos`. *Treat as known-good-to-fail; do not "fix" them under a different scope.*

2. **AdSense gate closed**: do not add ads anywhere not already in the asset list; no new ad-snippets are to be planted without an explicit approval sentence from owner.

3. **`/stores/glasslit-com-ecommerce-cps-india`** & `/stores/movavi` are deliberately kept off homepage rails (India-relevance filter).

---

## 5. The priority system — how to change it

### Mental model
Everything on the homepage/store hubs/deals page/reviews/guides/etc. is **sorted by `priority` desc** by the backend. The frontend consumes the server order. To change what's ranked where, bump `priority` on the row; no re-deploy required.

### To change
```bash
ssh -i ~/.ssh/oracle.key ubuntu@144.24.124.148
cd ~/durza

# bump a store to top-tier
podman exec durza_app_1 python -c "import asyncio; from sqlalchemy import text; from app.core.database import AsyncSessionLocal
...
"
```
Or direct SQL update through the podman container (below).
Tiers to reuse: `INSERT ... ON CONFLICT ...` is not needed because we UPDATE by slug.

Reference current state:
```bash
ssh -i ~/.ssh/oracle.key ubuntu@144.24.124.148 bash -s <<'LOCAL_EOF'
cd /home/ubuntu/durza
cat > /tmp/check_priorities.py <<'PY'
import asyncio
from sqlalchemy import text
from app.core.database import AsyncSessionLocal
async def main():
    async with AsyncSessionLocal() as db:
        for r in (await db.execute(text("SELECT priority, slug, name FROM stores ORDER BY priority DESC, slug"))).all():
            print(r)
asyncio.run(main())
PY
podman run --rm -i --user root -e PYTHONPATH=/code --env-file /home/ubuntu/durza/.env --net durza_default -v /home/ubuntu/durza/app:/code/app -v /tmp/check_priorities.py:/tmp/check_priorities.py durza_app python -B /tmp/check_priorities.py
LOCAL_EOF
```

### Gotchas
- Priority ordering only takes effect on the ISR window: stores cache for ~5 minutes; hard-revalidation is unnecessary because the app uses cached pages — prod server already restarted after every backend commit.
- Don't add `LIMIT 500 >` or any ado — the backend page-size cap is `100`, anything beyond is 422 (see commit `f54ea6a`).
- Exact backend sort implemented is: **every `sort=...` (aside from coupons last) orders by `priority` first**; any other `sort=` name is also `priority` before their own trade key.
- No tier 10s; don't add new priority levels — 1-10 inclusive.

---

## 6. Admitad integration — what's live

Connected and visible to the public frontend (as of 2026-11-15):

| Program | Status | Slug | Display live |
|---|---|---|---|
| Acer CPS | **10** | `acer` | Acer India store correct; banner banners on hub; 3 live codes |
| Amazon India (via Admitad) | mapped | `amazon-in` | many coupons; ranks above all others after Acer |
| FirstCry | live | `firstcry` | coupon rows present; ad on hub |
| Lenovo | live | `lenovo-india` | guide + hub fire banner + CPS deeplinks |
| Adidas | live | `adidas` | new guide live; CPS on CTAs |
| Milton | live | `milton-in` | invisible — no coupons mapped |
| Asus | live | `asus` | invisible — no coupons mapped |
| (17 other Indian programs auto-seeded; none or few banners, no pulled offers). See `docs/Admitad.md`? Not yet written; see instead `app/services/admitad_service.py`. | | | |

**Partner integrity check**: every coupon from any program was authored from its program's own API (content source = program feed URL; routing = program feed URL). No coupons were hand-coded or tested. Trust copy from every admitad deal now reads: `Feed: codes come from the merchant's own program feed, not hand-tested`.

Banned paths: keep the `/stores/<slug>/` routes pointing to the store hub pages; don't hand-code new Admitad deeplinks onto the frontend.

---

## 7. Deploy & operations runbook (this session's parts)

### Frontend
- `git push` to `main` of `harshBansal47/durza-web` = Vercel prod.
- `branch` = preview URL only.
- Local build: `npx next build --webpack` (not `next dev`).
- **Never `npm run build` alone**; always `npx next build --webpack` and verify the paper-stack with `npx tsc --noEmit`.

### Backend
```bash
cd /home/ubuntu/durza
git pull
podman restart durza_app_1   # code is bind-mounted

# One-off script (cannot lodge env by hand; do not paste into chat)
podman run --rm -i --user root -e PYTHONPATH=/code \
  --env-file /home/ubuntu/durza/.env --net durza_default \
  -v /home/ubuntu/durza/app:/code/app -v /tmp/<script>.py:/tmp/<script>.py \
  durza_app python -B /tmp/<script>.py

# Prod migration (requires explicit env var; logs only Neon target on explicit request)
ALLOW_PROD_MIGRATION=1 ./.venv/bin/python -m alembic upgrade head
```

### Applying a diff to the live DB directly (content/decibel-ingest)
Create a script in `/tmp/`, scp/ssh it, run with the pattern above. Never paste, never echo. Row-count estimates must be **planned**, never assumed.

### One-off checks
```bash
curl -sL -A "Mozilla/5.0" https://durza.in/stores/acer | grep -Eo '<title>[^<]+</title>'
curl -s -o /dev/null -w '%{http_code}\n' https://durza.in/stores/does-not-exist-xyz  # must be 404
```

---

## 8. constraining tests to run before committing

From repo root of `couponza-web`:
```bash
npx tsc --noEmit      # time: ~40-90s
npx vitest run lib/__tests__/sitemap.test.ts  # changes? cheap sanity
npx vitest run        # expect exactly the same 13 baseline failures listed in §4
```
From `"couponza/"` (backend):
```bash
./.venv/bin/python -m pytest tests/test_coupons.py tests/test_store_go.py tests/test_editorial.py -q
```

---

## 9. Decisions you must respect (already taken)

1. **No hand-written verification of codes/scenarios.** Owner's own store-code codes come from program feeds. Any "verified" wording is removed/hidden; "Feed" + `Feed source=Admitad/vCommission` is the truth.
2. **No fake codes.** Codes aren't manufactured; every code is customer-visible from a program's feed.
3. **No fake MRP strikethroughs on cards.** Offer cards show `₹X` or nothing; no invented savings math.
4. **No fake urgency.** `Expires` fields render only from coupon `expires_at`; countdown timers are absent.
5. **No sponsored mislabeling.** `rel="sponsored nofollow noopener"` on every outbound affiliate link; "Sponsored" banner labels on all Admitad banner slots.
6. **ISR idleness.** `/stores/{slug}` and categories are `revalidate=300` static; homepage is SSR (`dynamic`). do not move.
7. **AdSense gate is closed until owner approves.** No new ads by accident.
8. **All wallet-pushing rails go through `/out`** so both the tracked attribution is clean and SEO harmless.

---

## 10. Open items & next steps (recommended)

- **Google Search Console** — request indexing for `/black-friday`, both Black Friday guides, `/coupons`. Owner must do the UI request; can't be automated.
- **GSC pages report** — 1,000+ de-indexed pages; monitor that Google stops serving them rather than returns soft-404.
- **Google update window** — likely May/Nov; no code changes planned to force behavior conflicts.
- **Kill switch**: `NEXT_PUBLIC_ADS_ENABLED` stays off until owner manually enables after AdSense approval.
- **ISR list of 702,880 items**: none. Category pagination `*{n}-*` shard shows paginated codes; all routings work.
- **Prior review window for Threat-seed entries** — nothing
- **From GSC-wait**: review `Pages` report after 4 weeks, data for the 800-page bulk passed.

---

## 11. Which commits correspond to what came in this wave

Branch `main` (frontend):
- `460ce49` — Deal cards: show `MEGA DEALS — X% off` / `No Code Needed` / `…No Code Needed` and stop empty-string discounts
- `9a9b3c6` / `b85696a` — store hubs render sponsored block; `/out` relay — universal admitad CTA used by Lenovo/Adidas guides
- `7ea08d2` — Lenovo + Adidas guides with QuickAnswer boxes and tracked CTAs; `/black-friday` sitemap entry
- `9296ae5` — acer/editor charges: drop hero JPG (acer logo points to acer.com favicon now)
- `6e83078` — acer/Firstcry descriptions + `RelatedSmartStoreGuides` named caps; clean logo directory rebuilt
- `9c87ea7` / `937835d` / `1c042dd` / `f51585a` / `1c20c91` / `e8fc13d` / `4a95d97` / `2e9d746` / `915de98` — SEO hard-core: sitemap non-India exclusion, noindex coupons vs off-target stores, 404-over-loading.tsx fix, `/trust` honesty wording, page titles, `/black-friday` hub + internal links, store page soft-404
- `19f4cf9` — route-loading-files test dropped (obsolete after loading.tsx deletion)
- `f54ea6a` — black-friday tiles render logos and names (limit >100 silent-Swallow bug fixed); same 422 fixed in sitemap
- `9a30016` — P1 sweep: India-intent homepage hero, verb-first CTAs, tighter copy on `/deals` and `/coupons`, QuickAnswer on the three guides
- `81041e3` — `staticFeaturedGuides` honors `priority` on guides
- `27e49c7` — Static-guide map re-tier to match backend priority moves

Branch `main` (backend):
- `3a1ac35` — Telegram code-masking / route
- `175d67d` — Telegram sourced route
- `082af17` / `df822ae` — typing/ruff hygiene
- `c63e131` — Telegram price/mrp % off MRP
- `8d58905` — Admitad sync wizard: programs + creatives
- `c84c74b` — `/api/v1/affiliate/out`
- `ea500ef` (2026-11-15) — priority column + migration + sorts

Both commits shipped at handoff.

---

## 12. Quick reference paths

| Path | What |
|---|---|
| `app/stores/[slug]/page.tsx` | generic store hub |
| `app/(shopping)/stores/atrego-hosting-cps-india/page.tsx` ... | (not present — generic route covers) |
| `app/black-friday/page.tsx` | Black Friday hub — links everywhere |
| `app/guides/lenovo-laptop-offers-india-2026/page.tsx`, `.../adidas-sale-india-2026/page.tsx` | new India guides with tracked CTAs |
| `app/guides/best-acer-laptop-deals-promo-codes/page.tsx` | acer guide (feed=7), updated with QuickAnswer |
| `components/store/StoreBannerAds.tsx` | Sponsored block (Admitad only) |
| `components/guides/GuideAffiliateOutButton.tsx` | `/out?program=&ulp=&src=` button |
| `docs/HANDOFF-2026-11.md` | this file |
| `docs/ARCHITECTURE.md`, `docs/RUNBOOK.md` | complementing ops |
| `app/sitemap/[...path]/route.ts` | shards + fetchBatch — no `limit>100` |

Backend (`app/` path at `~/durza`):
| Path | What |
|---|---|
| `app/services/admitad_service.py` | daily sync + banner pool |
| `app/routers/api/v1/affiliate_out.py` | `/api/v1/affiliate/out` |
| `app/routers/api/v1/stores.py` | stores list, `/go`, `/creatives` |
| `app/models/affiliate_creative.py` | banners table |
| `app/core/config.py` | `admitad_*` envs and `admitad_sync_interval_hours` (24) |
| `app/integrations/admitad.py` | OAuth scopes; must include `banners_for_website` + `advcampaigns_for_website` |
| `alembic/versions/k8l9m0n1o2p3_affiliate_creatives.py` | banners table |
| `alembic/versions/l1m2n3o4p5q6_priority_ranking.py` | priority columns |
| `app/services/scheduler.py` | daily admitad sync; specifically `sync_admitad_campaigns` |
