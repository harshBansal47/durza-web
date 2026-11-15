@AGENTS.md

# Durza — Coupons, Deals & Smart Savings (India)

> Root context for this workspace. Read this first. Both repos live here (see §2).
> When working inside a repo, also respect `couponza-web/AGENTS.md` (Next.js custom rules) and, for backend context, nothing — this file is the backend guide.

## 1. What Durza is

Durza.in is an Indian coupon & deals site for online shoppers — the anti-banner-blind spot for ads: every offer is real, refreshed, and honest. Brand positioning: a helpful, trustworthy shopping assistant, never hypey.

**Product truths that must hold everywhere (non-negotiable):**

- Every coupon card shows brand logo + name and an honest `₹` figure; no fake strikethroughs, no fake MRP math.
- No fake verification. Offer verification status comes from the backend; UI hides or delegates to it.
- Affiliate disclosures are always visible: "Durza may earn a commission…" — the shopper's price never changes.
- Every outbound tap goes through `/go/{slug}` (server-side vCommission redirect) or `getAffiliateLink(brand, url, subId)` (vCommission + per-brand campaign id, p1 placement tag).
- `rel="nofollow sponsored noopener"` (+ `noreferrer` on `<a target="_blank">`) on all outbound affiliate links.

## 2. Workspace layout

| Path | Repo | Git remote |
|---|---|---|
| `couponza/` | Backend — Durza API + workers (FastAPI) | `git@github.com:harshBansal47/durza.git` |
| `couponza-web/` | Frontend — Durza.in site (Next.js) | `git@github.com:harshBansal47/durza-web.git` |
| `/home/ubuntu/durza` (remote VM) | Same backend repo — production | same remote |

Root itself is **not** a git repo (the `.github/workflows` at root is a reference copy; neither deploy is triggered from here).

## 3. Stack

**Backend** (`couponza/` — branch `main`)
- Python 3.14 target (see `python_requires`), FastAPI, SQLAlchemy (async), Postgres 16, Redis, Alembic
- `uv` + `uv.lock`; `pytest` + `ruff` (pre-commit + CI)
- Entry points: `app/routers/api/v1/*.py` (public), `app/admin/*` (admin), `app/services/*.py` (business logic: `coupon_service.py`, `affiliate.py`, `store_router.py`, `quality.py` = ranking), `app/ingestion/*.py` (feeds + pipeline)
- Ranking: `quality_score` (v1) drives `sort=recommended`, `is_exploration` cookie for explore slots; `id` is the final tiebreak everywhere (pagination stays stable)
- Tests: `cd couponza && uv run pytest tests/ -q` (sleeps use 2 s, not real time waits); uv cache on CI box is already warm

**Frontend** (`couponza-web/` — branch `main`)
- Next.js **16.3.6**, React 19, Tailwind 4, TS — read `node_modules/next/dist/docs/` before writing APIs (Next is custom here; do not guess conventions)
- Local checks: `npm run typecheck|lint|test` all work; `npm run build` **always panics locally** (Turbopack `parse_css`) — production builds run on Vercel/CI only
- Port 3000 dev server: it is the user's own — **do not kill it**

## 4. Deploy flows (two completely separate pipelines)

### Frontend — push `main` → Vercel
- Push `main` of `harshBansal47/durza-web` → Vercel auto-builds → serves `https://durza.in` (`www` 307s to apex)
- Build env on Vercel: `.env.local` has `NEXT_PUBLIC_API_URL` pointing at prod API; `API_INTERNAL_URL` must point at the private VM address if set, else same path
- Verify deploy by curling the page (e.g. `curl -sL --max-time 60 -A "Mozilla/5.0" https://durza.in/stores/<slug>`) and checking title/`<meta name="robots">`/JSON-LD
- ISR: custom store pages + categories = `revalidate = 300`; home/search = dynamic SSR

### Backend — Oracle Cloud VM, podman
- Host: `<oci-vm-host>`, `ssh -i <your-ssh-key> ubuntu@<oci-vm-host>`, repo at `~/durza`
- Containers: `durza_app_1` (API, `--net durza_default`), `durza_db_1` (postgres), `durza_redis_1`
- Reload API after code changes: `podman restart durza_app_1` (app code is **bind-mounted** from `~/durza/app`; no image rebuild needed for Python changes)
- Run a Python one-shot (migration/fix scripts):
  ```bash
  scp -i <your-ssh-key> /tmp/x.py ubuntu@<oci-vm-host>:/tmp/x.py
  ssh -i <your-ssh-key> -o StrictHostKeyChecking=no ubuntu@<oci-vm-host> \
    "cd ~/durza && podman run --rm -i --user root -e PYTHONPATH=/code --env-file /home/ubuntu/durza/.env \
     -v /home/ubuntu/durza/app:/code/app -v /tmp/x.py:/tmp/x.py --net durza_default \
     durza_app python -B /tmp/x.py"
  ```
- CI (GitHub) runs on push to `main`: `backend` job (Postgres-service containers, `uv run pytest`) — it does **not** deploy; the VM is updated by hand (edit → `git pull` → `podman restart durza_app_1`)
- Env on the VM: `/home/ubuntu/durza/.env` (Postgres connection string, vCommission publisher id `133499`, etc.) — **never print or copy any of it**; treat as sacred

### Database access patterns
- Direct `podman run … durza_app python -B …` scripts (see above) using `AsyncSessionLocal`; avoid `SELECT * ...; UPDATE ...` without a `WHERE`.
- Big verification/fix/reclassify scripts: write to `/tmp/*.py`, scp, run inside container (see above); never point `uv run` or `python` at the prod DB from your laptop.

## 5. Data model that matters

| Thing | Notes |
|---|---|
| `coupons` | `code` nullable (NULL = deal), `is_active`, `verification_status` (usually `unverified`), `quality_score` (drives rankings), `restrictions` JSONB: `kind="offer"` (coded evergreen) / `kind="product"` (products for brand pages), prices are **strings with ₹ prefix** — no cents-on-the-floor rules, do not unit-narrow them |
| `stores` | `is_active`, `offer_count`; store card kinds: `evergreen-promo` vs `product` |
| `categories` | flat list, no parent requirement; `live_only` on API filters empty ones out; empty pages auto-noindex |
| Cross-catalog `/stores/<slug>` | cards from DB via `lib/store-offers.ts` mappers (`toOfferCards`, `toProductCards`, `productTabs`); empty image trap — `src` must not be empty |

## 6. Store pages — how they're composed

- **Custom**: `app/stores/<slug>/page.tsx` (server: metadata + data fetch) + `client.tsx` (interactive UI). 41 live now, all with: StoreHero, best offers first, ₹ stacking walkthrough (illustrative), How-to-apply, "what verified means", 3–6 FAQs single-sourced (JSON-LD ↔ visible accordion), affiliate disclosure, mobile sticky CTA, `/go/<slug>` links for deal targets.
- **Generic**: `app/stores/[slug]/page.tsx` + `StorePageClient.tsx` (stats row, tabs: best/recent/expiring, PRODUCT cards, pagination, "Show all", filters incl. `Under ₹500`)
- **Mappers**: `lib/store-offers.ts` — coded offers only → `toOfferCards` (sort key `restrictions.sort`, fallback MAX_SAFE_INTEGER); `toProductCards` (MRPs/prices = strings I can't unit-annotate, see `parseRupeePrice`); `productTabs`. **Always route offers through DB, never hardcode.**
- **Sitemaps**: `app/sitemap/[...path]/route.ts` — `revalidate=3600`, `live_only` categories resolve automatically; ISR 300 on category pages

## 7. Categories — current state (Nov 2026)

- `electronics 489` · `fashion 288` · `beauty 145` · `supplements 83` · `software 52` (Software & Digital Services) · `home-kitchen 75` · `gifts 10` · `baby-kids 9` · `tools-hardware 8` · `finance 8` · `grocery 19` · `food-delivery 4` · `travel 11` · `fitness 22` · `other 11` · `vpn-security 9` · `hosting 4`
- DB `id`s needed for raw scripts: look them up at runtime; don't cache
- Recently added (created by request): `baby-kids`, `gifts`, `tools-hardware` (then 54 offers moved)

## 8. vCommission system

- Publisher id **133499** (constant client-side: `lib/affiliate.ts:VCOMMISSION_PUB_ID`, same in backend config)
- Per-brand campaign ids: `lib/affiliate.ts → VCOMMISSION_CAMPAIGNS`; matching map in backend `affiliate.py` / `store_router.py` (store campaigns come from the DB `affiliate_campaign` table)
- Two redirect paths:
  - `/go/{slug}?src=<placement>` — server-side match campaign to store/channel, attaches `click_id` for attribution (commit `2d00987`)
  - Direct `api.goUrl(id)` → same redirect handling by coupon
- Deep links: `https://track.vcommission.com/click?…&p1=<placement>` for direct-brand CTAs (prefer `/go/` everywhere)
- Never use tracking urls with `placeholder|xxxxx|TODO|your-title|_id$` (regex-checked)

## 9. Promotion workflow (Demigd)

- Campaigns planned: start with HealthKart (180 store offers, heavy repeat traffic)
- Channels: Instagram feed+stories, Telegram (t.me/durzacoupons), WhatsApp channel, Facebook (Durza page)
- Creatives are 1080×1920 story-reel covers; Gemini prompts are provided by the user (9:16, no fake verified badges, no fake MRP)
- Brand CTA: "durza.in/stores/healthkart"; Instagram bio → store page; Telegram link in bio
- Language: English (Indian), simple words, ₹ > USD

## 10. Agent working rules

1. **Never handwrite to the production DB** without explicit user confirmation of scope/row counts. Always print planned affected rows first; moderate in one transaction; verify afterwards.
2. **Verify live**, never assume: `curl -sL --max-time 60 -A "Mozilla/5.0" <url>` after every deploy; ISR stays 300 s — allow it.
3. **Scroll from evidence**: after every task, re-fetch the page and quote the check.
4. Use funded shells: podman run…, scp, ssh per §4 — never bare `psql`, never `uv run` against the production database from a laptop.
5. **Don't kill user processes** — dev servers, `next dev`, `next dev --turbo`, `next` in foreground
6. Minimize scope creep; commit message describes the driving request, not me
7. Writing code: follow existing style; do not invent frameworks (`node_modules/next/dist/docs/` is the law of the land on the frontend; `ruff`/`pytest` is the law on the backend)
8. **Never commit `.env*`, never print secrets**, never echo DB contents to chat
9. If stuck on a two-path decision, ask before silently choosing — Indian shopper copy-tone; category assignment; what to surface as "new"
10. **DB hygiene**: `refresh services`; `podman logs durza_app_1 | tail`; `curl -o /dev/null -w '%{http_code}'` for smokes
11. **Don't assume apt/pip/bundles exist** for user workflows — podman, uv, node exist per box
12. *(cosmetic)* user works on Windows occasionally — prefer WSL/Linux shell semantics

## 11. Known-good quick diagnostics

```bash
# frontend production build check
npx tsc --noEmit                       # zero errors expected
npx eslint <changed files>              # zero errors expected
npx vitest run                          # 9 pre-existing baseline failures remain
# Prod status
curl -sL https://durza.in -o /tmp/x.html -w '%{http_code}'
# Backend health
ssh -i <your-ssh-key> ubuntu@<oci-vm-host> 'podman ps --format "{{.Names}} {{.Status}}"'
# Reload backend after python-only changes
ssh -i <your-ssh-key> ubuntu@<oci-vm-host> 'podman restart durza_app_1'
```

## 12. File map (hot paths)

| Path | What |
|---|---|
| `couponza-web/app/stores/[slug]/page.tsx` | Generic store page (server) |
| `couponza-web/components/StoreHero.tsx` | All store heroes call it |
| `couponza-web/components/OfferCard.tsx` | Every coded offer card;
| `couponza-web/components/store/TrustStats.tsx` | Verification strip |
| `couponza-web/components/store/StorePageClient.tsx` | Generic store client |
| `couponza-web/lib/affiliate.ts` | Campaign/campaign-id map + warnings |
| `couponza-web/lib/store-offers.ts` | DB→cards mappers |
| `couponza-web/app/sitemap/[...path]/route.ts` | Sitemap shards |
| `couponza/app/services/coupon_service.py` | Listing + ranking |
| `couponza/app/services/quality.py` | The ranking formula |
| `couponza/app/services/affiliate.py` | Campaign→network assignment |
| `couponza/app/models/coupon.py` | Coupon model + VerificationStatus |

## 13. SEO research (Google Trends, India)

Keyword decisions for this site are driven from evidence in `docs/seo/` — you must consult it before doing any content changes that affect query visibility.

- **Read first:** `docs/seo/README.md` → `docs/seo/keyword-clusters.md` → `docs/seo/page-map.md`
- **Raw evidence:** `docs/seo/google-trends/raw/*.csv` — preserved unedited; never invent numbers in docs.
- **Merged master:** `docs/seo/google-trends-consolidated.csv` — regenerated by `scripts/seo/consolidate_trends.py` (idempotent).
- **Rules:** never create a page without checking `page-map.md` for the existing owner; one query, one owning page; no keyword stuffing; no “volume” numbers borrowed from memory. Google Trends scores are relative (0–100), not volumes.
- **Content work that retargets queries** must also update `page-map.md` and log itself in `docs/seo/optimization-log-YYYY-MM.md` (same commit).
- **When new CSV exports land** (Google Trends or Keyword Planner), follow `docs/seo/maintenance.md` — preserve raw, re-run the script, update cluster/page-map docs, never start from scratch.
- **Blocking items / opportunities** are tracked in `docs/seo/future-work.md` (recruitment targets, muscleblaze hub build, Croma seasonal, GSC verification loop).
