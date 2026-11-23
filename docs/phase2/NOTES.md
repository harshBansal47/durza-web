# Phase 2 — Curated Discovery Engine: running notes

Branches: `phase2-curated-discovery` from `phase1-truth-and-framing` (backend and frontend).
Development only: no schema, data, config, scheduler, messaging or deployment changes.

Labels: **[fact]** verified in code/DB, **[assumption]** not proven, **[decision]** made here.

## T0 — Baseline and Phase 1 re-verification

**[fact] Test baseline:** backend pytest 1141 passed / 1 skipped; frontend vitest 22 failed /
727 passed (95 files); `tsc --noEmit` clean; ruff/mypy clean; `next build` exit 0.

**[fact] is_indexable origin:** the only writer is the one-off script
`couponza/scripts/dedupe_coupon_index.py`, which marks coupons with a repeated normalized
title as `is_indexable=False` to stop duplicate coupon pages competing in search. No ingestion
or runtime rule sets it. Today all 258 no-code deals carry the flag (and all 68 coded offers
are true). This is an SEO de-duplication outcome, not a user-visibility rule — Phase 1 correctly
does not use it to hide offers. **[decision]** Do not change it; report as a data-quality concern.

**[fact] Evidence coverage (326 offers):** source_url 5, checked_on 5, last_checked_at 44
(39 coded + 5 no-code), checkout_tested 0. By code presence: coded 68 → 39 last_checked,
0 source_url; no-code 258 → 5 source_url/checked_on, 5 last_checked.

**[fact] Top clicked offers (clicks_count):** lenskart BOGO 21, nykaa sheet masks 19,
ixigo OYO 17, nykaa festive gift 17, swiggy Instamart 17, then guvi/gritzo/dot-and-key/
fitspire/boult 8–9. Many high-click offers have no source date.

**[fact] Top clicked stores (sum of offer clicks):** ajio 138, amazon-in 105, tatacliq 87,
baccabucci 77, nykaa 36, guvi 33, fitspire/iba 28, hkvitals/bytepe/indus-valley 25.

**[fact] Click placements in `click_events.src`:** coupon-page 1427, deals 1034, sticky-bar 923,
store-page 444, spotlight 79, homepage 64, unknown 27. New Phase 1 placements
(`home_worth_a_look`, etc.) are not yet present in production data (nothing deployed).

**[fact] Commission/payout exposure:** public `CouponPublicRead` and `StoreDestinationRead` do not
expose payout/commission fields. `StoreRead` exposes only `commission_disclosure` (a disclosure
string, not a rate). `AffiliateCampaignRead` (admin-only) contains `affiliate_payouts`. No change.

**[fact] Phase 1 claim sweep re-run:** only honest code comments remain; no public "verified
coupon", "Updated Today", "re-checked", "copy a code that works" or "every deal has a source"
claims remain.

## T2 — Attribution readiness
**[fact]** Admitad report client + `_normalise` exist; vCommission has NO transaction client — a real gap.
**[fact]** Fixture tests prove Admitad payload → Conversion + AffiliateRevenue and a vCommission
NetworkTransaction → Conversion + AffiliateRevenue (write path only; no vCommission parser exists).
**[fact]** Admin `/admin/analytics/attribution-health` added (clicks with clickref, conversions,
unmatched, last sync job, plain status).
**[decision]** Monetisation gap: 5 highest-click offers are plain merchant URLs with no tracking.
Amazon.in offers carry `tag=durza02-21` in destination URLs; store /go also injects the tag.
No routing changed.
