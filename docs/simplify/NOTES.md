# Simplification pass — running notes

Branch: `simplify-remove-tooling` from `phase3-distribution-readiness` in both repos.
**No deploy, no push, no VM/Vercel access. No schema change, no production writes, no data deletion.**

## R0 — Baseline and inventory

**Baseline (recorded before any code change):**
- backend pytest: 1179 passed, 1 skipped; ruff/format/mypy clean
- frontend vitest: 19 failed / 757 passed (known baseline); `tsc --noEmit` clean; `next build` exit 0

### Feature inventories and originating commits

**R1 Evidence system**
- Backend Phase 2 `91f69d6`; Phase 3 bulk `4d89180`; frontend `aabc6e7` (helper), `f242c4d` (admin tool), `6b4329c` (public presentation), `94ff62c` (share/digest), `827ae1c` (content readiness).
- Backend files: `app/services/evidence_service.py`, `app/routers/api/v1/admin_evidence.py`, `app/schemas/evidence.py`, `tests/test_phase2_evidence.py`; router wiring in `app/main.py`; `tests/test_phase3_security.py` endpoint list.
- Frontend files: `app/admin/evidence/page.tsx`, `app/api/admin/evidence/[...path]/route.ts`, `lib/api/admin.ts` (EvidenceRow + 4 functions), `app/admin/readiness/*`, `lib/readiness.ts`, nav links in `app/admin/layout.tsx` and `app/admin/page.tsx`, `docs/phase2/EDITOR_RUNBOOK.md`.
- Shared display (not tool-only): `lib/offer-presentation.ts` (`evidenceTier`, `evidenceLine`), `components/OfferEvidence.tsx`, card/rail components, `lib/collections.ts`, `lib/share-text.ts`, `lib/collection-integrity.ts`, `app/admin/analytics/page.tsx` evidence bucket, `lib/api/admin.ts` scoreboard type.
- Data note: `restrictions.source_url/checked_on` are also written by `app/ingestion/normalize.py` and seed scripts, so removing the admin writer does **not** remove provenance data. Existing JSONB and audit rows stay untouched.

**R2 Collection publish gate**
- Backend `fa91a51`, `5e0251f`; frontend `9b01d15`, `6b4329c`; CLI `scripts/check-collections.sh`.
- Backend: `app/services/collection_service.py`; frontend: `lib/collection-integrity.ts`, `lib/collections.ts`, `lib/__tests__/collection-integrity.test.ts`, `lib/__tests__/collections-merge.test.ts`.

**R3 Digest draft / share**
- Frontend `94ff62c`, share images `9d95045`.
- `app/admin/digest/*`, `buildDigestText` in `lib/share-text.ts`, `app/admin/assets/*`, `app/api/admin/share-image/[slug]/route.tsx`, `lib/share-image.ts`, tests.

**R4 Monetisation tooling**
- Backend `87cf638`, frontend `b9bfccf`; notes `3200afa`, `docs/phase2/PROPOSALS.md`, `docs/phase2/ATTRIBUTION_AUDIT.md`.
- Backend: `app/services/phase3_monetisation.py`, `app/routers/api/v1/admin_monetisation.py`, `tests/test_phase3_monetisation.py`, router wiring in `app/main.py`.
- Frontend: `app/admin/monetisation/page.tsx`, `app/api/admin/monetisation/[...path]/route.ts`, `lib/api/admin.ts` (MonetisationRow + 3 functions), nav link.
- **DO NOT TOUCH** affiliate routing/tracking files. Confirm empty diff at the end.

**R5 Conversion/attribution tooling**
- Backend `04e0e81`, `a875723`, frontend `9ca2fdd`; frontend analytics panel `553e668`.
- Backend: `app/services/phase3_import.py`, `app/routers/api/v1/admin_conversion_import.py`, `tests/test_phase3_import.py`, attribution health endpoint in `app/routers/api/v1/admin_analytics.py` + schema `app/schemas/phase2_analytics.py`, `tests/test_admin_analytics.py`, Phase 2 fixture tests.
- Frontend: `app/admin/conversions/*`, `app/api/admin/conversions/[...path]/route.ts`, attribution health panel in `app/admin/analytics/page.tsx`, nav link.
- Keep pre-existing sync clients, Conversion/AffiliateRevenue models and registered sync job. `ATTRIBUTION_AUDIT.md` kept as historical doc.

**R6 Jobs view**
- Backend `7bfdd19`, `2a37eea`; frontend `553e668` / admin analytics page.
- `/admin/analytics/jobs` endpoint and frontend view + nav link + tests. Keep kill switch and SCHEDULER_RUNBOOK.md.

**R7 Campaign link builder**
- Frontend `fb919d7`; `app/admin/links/page.tsx`, `lib/campaign-links.ts`, `lib/__tests__/campaign-links.test.ts`, nav link.
- Keep `lib/api.ts` UTM capture, canonical stripping, sitemap cleanliness, share URLs with `utm_source=share`, scoreboard channel/campaign grouping.

**R8 Acquisition readiness panel**
- Backend `d135182`, frontend `bef efffb`→`beffffb`; `app/services/phase3_readiness.py`, `app/routers/api/v1/admin_readiness.py`, `tests/test_phase3_readiness.py`, `app/admin/go-no-go/page.tsx`, `app/api/admin/readiness/route.ts`, `lib/api/admin.ts` readiness types/functions, `app/core/phase3_config.py` (check each key).

### Cross-dependencies
- Evidence helpers are imported by `evidence_service`, `collection_service`, `phase2_scoreboard`, `phase3_readiness`, `lib/readiness.ts`, `lib/share-image.ts`, `lib/share-text.ts`, `lib/collections.ts` and public card components.
- Digest and readiness screens call `fetchEvidenceQueue`, so they cannot remain if the evidence endpoint is removed.
- Share images use `DISCLOSURE` from `lib/share-text.ts`; keep that when removing digest.
- Scoreboard channel/campaign grouping (`438f209`) must survive R1/R7.

## Historical notes (R4)
**[verified before removal]** Top-clicked offers were plain URLs with no affiliate attribution;
Amazon.in offers carried `tag=durza02-21`. The classifier labelled outbound paths by cited rule but
never changed routing. The tracked-URL editor wrote old/new URL, editor id and time into
`Coupon.restrictions._outbound_url_history`; no records were deleted. All references are retained
only here; the tooling is removed. Routing files (`store_router.py`, `affiliate_router.py`,
`affiliate_out`, `/go`, click recording, `admitad_only`) were not modified by this pass.

## Historical notes (R5)
Conversion reporting now lives in the Admitad/vCommission dashboards and email reports, not in Durza admin UI.
The pre-existing sync clients, `Conversion`/`AffiliateRevenue` models and registered sync job were left untouched.
`docs/phase2/ATTRIBUTION_AUDIT.md` is kept as a historical document; no frontend attribution-health panel existed
in the deployed UI to remove (only the backend endpoint).

## Historical notes (R5)
Conversion reporting now lives in the Admitad/vCommission dashboards and email reports, not in Durza admin UI.
The pre-existing sync clients, `Conversion`/`AffiliateRevenue` models and registered sync job were left untouched.
`docs/phase2/ATTRIBUTION_AUDIT.md` is kept as a historical document; no frontend attribution-health panel existed
in the deployed UI to remove (only the backend endpoint).

## Historical notes (R7)
The link-builder's `canonicalize()` helper was only exercised by its own test and was not wired into
metadata generation; canonical URLs are built from static paths, so tracking parameters never enter them.
UTM capture, `utm_source=share` on collection share URLs, sitemap generation and scoreboard channel/campaign
grouping remain untouched.

## R9 — Verification and judgment calls
- Removed frontend routes all return **404** locally (evidence, digest, jobs, monetisation,
  conversions, links, go-no-go, content readiness). No nav, sitemap or robots references remain.
- Smoke script against localhost: 12/14 pass; the two failures are the documented environmental
  ones (backend not running locally → no offer cards; `/sitemap.xml` 503 without last-good data).
- Claim sweep reworded promo strip, hero subhead, How Durza works, footer, deals/category pages,
  trust/about pages and removed the dead commented PILLARS block. Allowed claims only: offer type,
  last-checked when known, commission disclosure.
- Backend: 1157 passed, 3 skipped (baseline 1179/1); ruff/format/mypy clean. Frontend: 19 failed /
  747 passed (baseline unchanged), tsc clean, next build exit 0.
- `git diff phase3-distribution-readiness` on routing/tracking/schema/migration files: empty.
- **Judgment calls:** kept `classify_store_tier`, raw scoreboard placement/type/store/channel/campaign,
  UTM capture, share `utm_source=share`, collection live-integrity hiding, share assets, follow links,
  mobile fixes, kill switch and Shopify verifier fix. Config trimmed to `MIN_POSSIBLE_MATCH_SIMILARITY`
  only (all other phase3_config keys were used solely by removed tools). `ATTRIBUTION_AUDIT.md` and
  phase2/phase3 `NOTES.md` stay as historical records; EDITOR_RUNBOOK, DISTRIBUTION_RUNBOOK,
  RELEASE_CHECKLIST and SCHEDULER_RUNBOOK were rewritten for what remains.

---

# Removal Pass 2 — Shopify and conversion/revenue tooling

Branch `remove-shopify-and-conversions` from `simplify-remove-tooling`. No deploy, push or prod writes.

## S0 — Inventory and baselines

**Baselines:** backend pytest 1157 passed / 3 skipped; ruff/format/mypy clean. Frontend vitest
19 failed / 747 passed; tsc clean; `next build` exit 0.

**Already removed by the earlier pass:** CSV conversion importer, attribution-health endpoint/panel,
monetisation tooling, evidence tool, digest, jobs view, link builder, readiness panel. Only historical
docs mention them.

### Shopify inventory
- Backend: `app/verification/shopify_verifier.py` (only implementation), `app/services/code_verifier.py`
  (sole writer of `verification_status`), `app/services/shopify_product_sync.py`,
  `app/schemas/product.py` Shopify DTOs, Shopify endpoints in `app/routers/api/v1/products.py`,
  jobs `verify_live_codes` + `sync_shopify_products` in `app/services/scheduler.py`,
  config `shopify_product_store_slug`, `shopify_product_sync_interval_hours`, `code_verifier_interval_hours`,
  env `SHOPIFY_PRODUCT_STORE_SLUG`, `SHOPIFY_PRODUCT_SYNC_INTERVAL_HOURS`.
- Frontend: `/admin/ingestion` page + nav + analytics link, `/api/admin/products/sync/shopify`,
  admin API Shopify status/trigger functions; `/products/[slug]` detail page with Product JSON-LD and
  price-drop badges; `components/store/ProductCard.tsx`, `Storefront.tsx`, `components/product/PriceHistory.tsx`,
  store-page product wiring, search products, editorial `/products` links, product API client/types.
- **No product sitemap entries exist** and no Shopify `platform` field on Store. The only product
  redirect is backend `/api/v1/products/{id}/go`, which calls `click_service.record_click()` — a
  routing/tracking file, so leave it and list under Needs human decision if unused.

### Conversion/revenue inventory
- Backend: `app/services/conversion_sync.py` (Awin, Cuelinks, Admitad transaction clients — entire
  file is reporting), `sync_conversions` scheduler job, conversion-only config/env
  (`CONVERSION_SYNC_INTERVAL_HOURS`, `CONVERSION_SYNC_LOOKBACK_DAYS`), `GET /api/v1/earnings/epc`,
  affiliate/revenue totals in `/admin/analytics/overview` (+ CSV), schema `AffiliatePerformance`.
- Tests: `tests/test_conversion_sync.py`, conversion-specific parts of `tests/test_admitad.py`,
  `tests/test_revenue.py`, `test_earnings.py`, `test_epc.py`, `test_attribution.py`,
  `test_admin_analytics.py`; scheduler/config assertions.
- **Shared with ingestion — KEEP:** `app/integrations/admitad.py` `get_access_token()`/`page_results()`
  (used by `admitad_service.sync_campaigns` and `ingestion/sources/admitad.py`), `ingestion/retry.py`,
  vCommission campaign ingestion, `/admin/admitad` and `/admin/campaigns` pages/APIs.
- **Leave in place (no schema changes):** Conversion, AffiliateRevenue, RevenueEvent, Attribution and
  Product/PricePoint models/tables, plus migrations. No drops.

### Do-not-touch
Affiliate routing/tracking/click-reference files, `/go`, `/out`, `/affiliate/out`, `store_router`,
`affiliate_router`, `click_service`, `admitad_only`, kill switch, scoreboard, UTM/canonical,
collections, mobile fixes, SEO work, merchant tiers, "No code listed".

## Needs human decision (S3)
The backend route `GET /api/v1/products/{product_id}/go` in `app/routers/api/v1/products.py` records an
affiliate click via `click_service` and lives in a routing file. Per the do-not-touch rule it was left
in place. No frontend or admin caller remains after S3 (verified by grep); it can be removed in a
separate, explicitly approved routing change. Product/PricePoint DB models and tables also remain.

## S4/S5 notes
- Left in place with no schema change: `Conversion`, `AffiliateRevenue`, `RevenueEvent`, `Attribution`,
  `DailyProviderStats`, `Product`, `PricePoint` models/tables and their migrations. They are now unused
  by application code except `epc.py`/`quality.py`, which are ranking inputs for affiliate routing and
  were deliberately kept.
- Kept Awin/Admitad/Cuelinks credentials: they are used by coupon/program ingestion and affiliate
  routing. Only `CONVERSION_SYNC_*`, `SHOPIFY_*` and `CODE_VERIFIER_INTERVAL_HOURS` were removed.
- Housekeeping: during S3 a `git add -A` accidentally staged pre-existing unrelated user files
  (`app/layout.tsx`, `app/page.tsx`, topics/methodology pages, DecisionDesk, topic libs and tests,
  sitemap entries). They were unstaged before the S3 commit and remain uncommitted in the working tree.

## S6 — Verification notes
- Remaining intentional grep hits: DB models/migrations for left-in-place tables; `epc.py` and
  `quality.py` ranking inputs used by affiliate routing; currency-conversion wording on store pages;
  the admin analytics note that conversions/earnings are reported by the networks; historical notes.
- `app/routers/api/v1/products.py`: the only diff from the start branch is removal of the two
  Shopify-only admin sync endpoints; the `/products/{id}/go` click-recording body is byte-identical.
  All other affiliate routing/tracking files have an empty diff. Logged as a judgment call because
  the file also hosts the product redirect; no click-reference logic was touched.
- User work note: pre-existing uncommitted files (topics/methodology/DecisionDesk/editorial byline,
  `app/layout.tsx`, `app/page.tsx`, `lib/sitemap-entries.ts`) were repeatedly excluded from commits
  after an accidental `git add -A`; they remain uncommitted and untouched.
