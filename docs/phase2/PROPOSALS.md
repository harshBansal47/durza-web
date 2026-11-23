# Phase 2 — proposed changes requiring human decision

No schema changes, migrations or production writes were made.

## 1. Capture `ref=` acquisition parameter (T1)
**[gap]** `get_or_create_session()` captures UTM parameters and referrer but ignores a bare
`ref=` query parameter. `AnalyticsSession` has no generic metadata JSON column; `AnalyticsEvent.props`
does, but only for events, and repurposing `utm_content` would mislabel acquisition data.
**Proposal:** add a nullable `ref` column to `analytics_sessions` (or a JSON metadata field), capture it
at session start, and include it in the raw-event scoreboard. Needs approval + migration.

## 2. vCommission conversion-report client (T2)
**[gap]** `conversion_sync.py` has Awin, Cuelinks and Admitad clients but none for vCommission, so
vCommission transactions cannot become `Conversion`/`AffiliateRevenue` rows even with credentials.
**Proposal:** implement a client for the vCommission transaction-report API, normalising `click_id`
back to `clickref`, and register it in `build_clients_from_settings()`. Needs API/credential details
and approval.

## 3. Typed evidence fields on Coupon (T3 future)
**[decision taken]** Phase 2 stores evidence schema-free in `restrictions` (`source_url`,
`source_kind`, `checked_on`, `checked_by`, `expiry_claim`). This is sufficient but not indexed.
**Proposal:** promote these to first-class columns with indexes and server-side constraints once the
editor workflow has real usage. Needs approval + migration.

## 4. DB-backed collection items with `why`/`skipIf` (T4)
**[decision taken]** Phase 2 validates the same publish rules for static `data/collections.ts` via a
typed schema, a CLI check and a test — no schema change.
**Proposal:** add a `collection_items` table (collection_id, item_type, item_id, why, skip_if,
position, added_by, checked_at) if editors need DB-backed item editing.
