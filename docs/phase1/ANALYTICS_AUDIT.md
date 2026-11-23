# Phase 1 — Analytics audit (T1)

Read-only investigation of the click → conversion → revenue path. No new pipeline was built.

## 1. What is measured today

| Signal | Where written | Definition / caveats |
|---|---|---|
| **Click** | `app/services/click_service.py::record_click()` → `click_events` | One row per unique `(visitor_hash, coupon/product/ad/store, network)` within a 10s dedupe window. Bots are flagged (`is_bot`, `fraud_score=1.0`) but still inserted and still increment `coupon.clicks_count`. Every `/go`, `/out` and `/affiliate/out` call records one. **Not consent-gated.** |
| **Impression** | `app/routers/api/v1/analytics.py::record_impression(s)` → `coupon_impressions` | Client fires at 50% card visibility, batched (≤25, 1.5s flush), **consent-gated** (`_has_consent`). Frontend dedupes one `(coupon_id, page_type)` per path. |
| **Session** | `get_or_create_session()` → `analytics_sessions` | Opaque `cz_vid/cz_sid`, created on analytics endpoints with consent. Not created for ordinary anonymous browsing. |
| **Event** | `POST /analytics/event` → `analytics_events` | Closed allowlist of 16 names; consent-gated 202; many names (`filter_change`, `scroll`, `engaged_time`, `content_view`, `follow_store`) have no frontend emitter. |
| **Conversion** | `app/services/conversion_sync.py` → `conversions` | Written only when a network transaction report is fetched and `clickref` matches. Requires credentials and a running job. |
| **Revenue** | `conversion_sync.py` → `affiliate_revenues` | Derived from matched conversions; zero rows in production. |
| **Daily rollups** | `daily_traffic_stats`, `daily_coupon_stats`, `daily_merchant_stats`, `daily_provider_stats`, `daily_content_stats` | **No writer exists anywhere in `app/` or `scripts/`.** Admin analytics reads them as `coalesce(sum(...), 0)`. |

Production counts (23 Nov 2026): clicks 4,041; impressions 660; events 2,423; sessions 336;
conversions 0; revenue 0; all rollup tables 0 rows.

## 2. Why clicks exceed impressions (4,041 vs 660)

Not a double-count bug; different populations and gates:

1. Impressions are **consent-gated** and only emitted by `ImpressionTracker` at 50% visibility on
   card listings. Clicks are server-side on every outbound redirect and not consent-gated.
2. Impressions are **deduped per coupon per path** in `lib/analytics.ts`; clicks are deduped only
   within a 10-second window per target/network.
3. Clicks also come from surfaces with no card impression: store "Visit store" CTAs, custom store
   pages, guide CTAs (`/affiliate/out`), Telegram posts and direct `/go` links.
4. Bot clicks are included in `click_events` (flagged) and in `coupon.clicks_count`; there is no
   bot filter in the impression pipeline comparison.

**Conclusion:** clicks and impressions must not be divided to make CTR. The CTR shown in admin
analytics is from empty rollups, so it is `0.00%` by construction, not a measurement.

## 3. Where the revenue path stops

`clickref` is generated in `click_service.record_click()` and attached to network URLs by
`affiliate.build_outbound_url()` (Admitad `subid`, vCommission `click_id`, etc.). The reverse path
exists in `conversion_sync.py` (network report → match `clickref` → `Conversion` →
`AffiliateRevenue`) but:

- `SCHEDULER_ENABLED=false` by default (`app/core/config.py:120`), so `sync_conversions` never runs;
- network transaction API credentials are not configured in this environment;
- `AffiliateDestination` and `RevenueEvent` are unwired models;
- `app/services/attribution.py` is only used by tests.

**Therefore:** 0 conversions/revenue mean "not connected", not "no sales". Phase 1 does not
attempt to fix this — it is an open item requiring credentials and a deliberate scheduler decision.

## 4. Minimal fix applied in T1

Admin analytics previously presented `coalesce(...,0)` from empty rollup tables as measured zeros.
Changes:

- `app/schemas/admin_analytics.py::AnalyticsMeta` gains `rollups_measured` and `measurement_note`.
- `app/routers/api/v1/admin_analytics.py::get_analytics_overview()` counts rollup rows in range
  and sets the flag/note. No aggregation pipeline, no new table, no schema migration.
- `app/admin/analytics/page.tsx` shows the note as a banner when rollups are unmeasured.
- `lib/api/admin.ts::AnalyticsOverview` type updated.

Raw-event-derived counts (sessions, events, verification attempts, `JobRun`, `IngestionRun`)
remain valid and unchanged.

## 5. Placement identifiers for before/after comparison (T7 usage)

No schema change needed: `ClickEvent.content_ref` accepts `^[a-z0-9:_-]{1,80}$` and
`AnalyticsEvent.props` accepts small scalar keys. Phase 1 uses these stable values in outbound
links from the new homepage sections:

| Placement (`content_ref`) | Section |
|---|---|
| `home_worth_a_look` | "Worth a look" rail |
| `home_categories` | Shop by intent |
| `home_collections` | Curated collections |
| `home_no_code_deals` | Deals without a code listed |
| `home_coupon_codes` | Current coupon codes |
| `store_codes`, `store_no_code_deals` | Generic store page blocks |

`src` remains the existing convention (e.g. `homepage`, `store_hub`) so network reporting is
unchanged. These values are presentation-only attribution and do not affect routing or dedupe.
