# Durza editor runbook

For non-developers. Nothing here deploys code, sends messages, changes affiliate links or writes
production data from this workspace.

## Offer labels
Every offer shows one type label (coupon code, deal with no code listed, bank/payment offer,
product offer or store promotion). A "Last checked <date>" line appears only when the data has a real
last-checked date. "Checked out with this code" appears only when verification status is `verified`.

Never claim a code works, a discount is guaranteed, a price is current or an expiry is confirmed
unless the underlying data supports it. An affiliate shopping link is never called a coupon code.

## Deactivate an offer
Use the existing SQLAdmin coupon view (`/admin` → Coupons) and its `is_active` toggle. No deletion.

## Create a collection
Collections may be authored in `data/collections.ts` by a developer or managed as DB-backed editorial
content through SQLAdmin (`/admin` → Editorial content). Each item block must include
`type: collection_item`, `title`, an editor-written `why`, a `skip_if` field (which may be empty), and
either a `coupon_id` or a `store_id`.

## Publish gate
Change status to `in_review`, then `published`. The server rejects publication when an item lacks
`why`, lacks `skip_if`, or has no live offer/store reference. A collection needs at least 3 items.
When an item's offer becomes inactive, expired or suppressed it is hidden automatically.

## Share (copy only)
On a published collection page use **Copy link** or **Copy text for WhatsApp / Instagram**. Shared
URLs carry `utm_source=share`. Text is assembled from the collection title, summary and editor-written
`why` lines, always includes the commission disclosure, and never invents a discount. Nothing is posted.

## Performance
`/admin/analytics` shows the raw-event scoreboard: non-bot clicks by placement, offer type, store tier,
channel and campaign, plus unique and returning visitors. CTR is deliberately marked unavailable when
impressions are not segmented by placement — a gap is never shown as zero. Conversion and revenue
reporting lives in the Admitad and vCommission dashboards/email reports.
