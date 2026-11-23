# Phase 2 — Analytics definitions (T1)

**[fact] Sources read-only from code:** `app/services/click_service.py`,
`app/routers/api/v1/analytics.py`, `app/services/visitor_identity.py`, models `click.py`,
`analytics_event.py`, `analytics_session.py`, `coupon_impression.py`.

| Term | Precise definition | Written where |
|---|---|---|
| Click | One `click_events` row per `(visitor_hash, coupon/product/ad/store, network)` inside a **10-second** dedupe window. Bot rows are inserted but flagged `is_bot`; the scoreboard drops them. | `click_service.record_click()` on `/go`, `/out`, `/affiliate/out`, product/campaign redirects |
| Impression | One `coupon_impressions` row per rendered coupon card at **50% visibility**, consent-gated, deduped client-side to one `(coupon_id, page_type)` per path. | `POST /analytics/impression(s)` |
| Session | One `analytics_sessions` row with opaque `cz_vid`/`cz_sid`, UTM + referrer captured at session start. | `visitor_identity.get_or_create_session()` |
| Visitor | The opaque `visitor_id` cookie (`cz_vid`); in `click_events` the equivalent is the one-way `visitor_hash`. No email/IP identity is stored. | cookie + click rows |
| Returning visitor | Same visitor hash seen on **2+ distinct UTC days** in the selected window (scoreboard definition). | computed from raw clicks |
| Event | A `analytics_events` row with a name from a closed 16-value allowlist, consent-gated; many names have no frontend emitter. | `POST /analytics/event` |

## Why clicks (4,041) exceed impressions (660)

**[fact]** Different populations and gates, not double counting:
1. Clicks are server-side on every outbound redirect and are **not** consent-gated; impressions require analytics consent.
2. Impressions dedupe one coupon per page path; clicks dedupe only within 10 seconds per target/network.
3. Clicks come from surfaces without card impressions: store CTAs, sticky bars, custom pages, guides, Telegram.
4. Bot clicks are counted in click rows (flagged) and in `coupon.clicks_count`.

**[decision]** Do not compute CTR from clicks ÷ impressions. The scoreboard reports
`ctr_available=false` with an explanatory note; placement counts are shown without a CTR.

## Acquisition capture

**[fact]** `get_or_create_session()` already captures `utm_source`, `utm_medium`, `utm_campaign`,
`utm_content`, `utm_term` and referrer from the landing request into `analytics_sessions`.
**[gap]** A bare `ref=` parameter is not captured. No schema-free field is appropriate without
repurposing `utm_content`, so this is recorded as a proposal in `PROPOSALS.md` rather than guessed.
