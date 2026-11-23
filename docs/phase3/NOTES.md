# Phase 3 — Distribution Readiness: running notes

Branches: `phase3-distribution-readiness` from `phase2-curated-discovery` in both repos.
Phases 1+2 were merged to `main` and deployed before this branch was created (backend VM pulled to
`2a37eea`, `/health` 200; Vercel served `/admin/evidence` 200 after ~120s). No Phase 3 deploy.

Labels: **[fact]** verified in code/DB, **[assumption]** to be set by the owner, **[decision]** made here.

## T0 — Baseline and re-verification

**[fact] Baselines:** backend pytest 1154 passed / 1 skipped; frontend vitest 19 failed / 738 passed;
`tsc --noEmit` clean; ruff/mypy clean; `next build` exit 0 (from Phase 2 verification, re-run at T11).

**[fact] Static collection integrity CLI (`sh scripts/check-collections.sh`): PASSES** (2 tests).
This contradicts the Phase 3 prompt's expectation of failures: all 9 shipped collections already
include a `skipIf` field and a non-empty `why` for every pick. No content was edited.

**[fact] Acquisition capture:** `app/services/visitor_identity.py::get_or_create_session()` captures
`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` and `referrer` from the landing
request into `analytics_sessions` columns. A bare `ref=` parameter is **not** captured (Phase 2
`PROPOSALS.md`). `AnalyticsEvent.props` JSON allows small sanitized scalar extras.

**[fact] Outbound URL field:** `Coupon.destination_url` is the resolved fallback; the authority is
`CouponSource.affiliate_url` per provider. `affiliate_router.route_coupon()` picks eligible sources
(status active/expired, `affiliate_url` present, source enabled), orders by `Source.precedence`, and
falls back to `destination_url`. `store_router.route_store()` handles store-level CTAs. Read only.

**[fact] Conversion model capabilities:** `Conversion` has `status` pending/approved/declined/deleted,
so "deleted" can represent a void without deleting the row. `AffiliateRevenue` has `status`
(incl. `reversed`) and a `notes` Text column that can hold `batch_id=<uuid>;source=manual_import`
without a migration. There is no dedicated batch-id column — schema-free tagging is the fallback.

**[fact] Env/flags inventory (safe defaults):** `SCHEDULER_ENABLED=false`,
`OUTBOUND_COMMUNICATIONS_ENABLED=false`, `TELEGRAM_CHANNEL_ENABLED=false`, `ENVIRONMENT=development`,
`SITE_URL` required in prod, `NEXT_PUBLIC_SITE_URL` required in prod build, `DATABASE_URL`/`NEON_DATABASE_URL`,
`REDIS_URL`/`UPSTASH_REDIS_URL`, `SECRET_KEY`, network credentials (`ADMITAD_*`, `VCOMMISSIONS_*`,
`AWIN_*`, `CUELINKS_*`), `AMAZON_ASSOCIATES_TAG`, `AMAZON_USA_ID`, `SHOPIFY_PRODUCT_STORE_SLUG`,
scheduler intervals, `ALLOW_PROD_MIGRATION` (prod migrations only). Full list in `app/core/config.py`.

**[fact] Mobile baseline:** `.next/static/chunks` total 4.3 MB across all routes; homepage HTML previously
measured ~390 KB with ~1.1 MB of JS/CSS (Phase 1 audit). No Lighthouse dependency exists; record bundle
sizes only, no new tooling.

## T2 — Monetisation coverage
**[fact]** Classifier reads existing `coupon_sources`, `Source.kind`, `Coupon.destination_url` and
store domains; labels `network_tracked` / `amazon_tagged` / `plain_url` / `unknown` with a cited rule,
ranked by clicks. No routing file changed.
**[fact]** Editor tool validates https + allowlisted host (config `app/core/phase3_config.py`), records
old/new URL, editor id and time in `restrictions._outbound_url_history`, and is reversible. Accepting
an offer as unmonetised is a schema-free decision marker.
**[decision]** Site-wide disclosure ("we may earn a commission") is accurate as a general statement
but incomplete for `plain_url` offers that earn nothing. Item for human review — no disclosure wording
was changed.
