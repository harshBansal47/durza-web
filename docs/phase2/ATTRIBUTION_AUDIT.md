# Phase 2 — Attribution audit (T2)

**[fact] Hop-by-hop path** (code read-only; no live calls made):

| Hop | Code | What it needs | Current state |
|---|---|---|---|
| 1. Click produces `clickref` | `app/services/click_service.py::record_click()` — 32-hex `new_clickref()`, 10s dedupe, frozen `network`, `visitor_hash`, `src`, `content_ref` | nothing external | **Works** |
| 2. clickref reaches the network URL | `app/services/affiliate.py::build_outbound_url()` — Admitad `subid`, vCommission `click_id`, others per `CLICKREF_PARAM`; `/go`, `/out`, `/affiliate/out` call it | correct network field on the store/coupon | **Works** (unchanged in Phase 1/2) |
| 3a. Admitad report → `NetworkTransaction` | `AdmitadTransactionsClient.fetch()` + `_normalise()` reads `subid*` back into `clickref` | Admitad API credentials, reachable API, `sync_conversions` job | **Code exists; not run in prod** |
| 3b. vCommission report → `NetworkTransaction` | **No vCommission transaction client exists** in `conversion_sync.py` (only Awin, Cuelinks, Admitad). `build_clients_from_settings()` has no vCommission entry. | a network report client | **Gap — conversions from vCommission cannot be imported** |
| 4. Transaction → `Conversion` | `upsert_transaction()` matches `clickref` to `ClickEvent`, sets `click_id`, `store_id`, frozen `network`, amounts, status | a `NetworkTransaction` row | **Works** (fixture-proven offline) |
| 5. Conversion → `AffiliateRevenue` | `upsert_transaction()` writes one revenue row per conversion with gross/net commission and status | same as above | **Works** (fixture-proven offline) |
| 6. Orchestration | `sync_conversions()` calls `build_clients_from_settings()` per provider, advisory lock, `JobRun` ledger | credentials + scheduler + reachable network APIs | **Scheduler disabled; 0 conversions/revenue in prod** |

**[fact] Why 0 conversions:** hop 6 is not running (default `SCHEDULER_ENABLED=false`) and there are no
network credentials in dev; additionally hop 3b is unimplemented. This is "not connected", not "no sales".

**[fact] Admin diagnostics** (`GET /api/v1/admin/admitad/...` and the new `/admin/analytics/attribution-health`):
counts clicks with a network click reference, conversion jobs last run (never/ok/failed via `JobRun`),
unmatched conversions (`Conversion.click_id IS NULL` while `clickref IS NOT NULL`), and a plain status.

**[decision]** No routing or tracking change. No live calls. vCommission client is a proposal
(see `PROPOSALS.md`), not implemented here.

## Read-only monetisation audit (T2)

**[fact] Top 5 clicked offers** (21, 19, 17, 17, 17 clicks) all come from the `researched-official-pages`
source (`kind=static`) and their `affiliate_url`/`destination_url` are plain merchant URLs
(Lenskart, Nykaa, Swiggy, ixigo) — **no network tracking parameter and no associate tag**.
`network_for_source_kind("static")` returns `none`, so `affiliate_router` sends them untracked via
`Coupon.destination_url`. Clicks are recorded but cannot be attributed to a paying network.

**[fact] Next clicked offers** (`guvi`, `gritzo`, `dot-and-key`, `boult`, `tatacliq`, `muscleblaze`)
have no `CouponSource` rows; their `destination_url` is a `track.vcommission.com/click?...&pub_id=133499`
link, so the fallback carries affiliate attribution even without a source row.

**[fact] Amazon.in** has 35 offers, no active affiliate campaign row and `affiliate_network=none`,
but every checked offer URL contains `tag=durza02-21` (Amazon Associates). Store-level `/go/amazon-in`
also gets the tag injected by `store_router` (`amazon.in` branch). Attribution present at URL level.

**[decision]** No routing or tracking changes made. The plain-URL static offers are the monetisation
gap requiring a human decision: attach a tracked network URL where one exists, or accept them as
unmonetised trust-building content. Listed first under "Needs human decision" in the final report.
