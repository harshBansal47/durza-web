# Durza editor runbook — Phase 2

For non-developers. Everything below operates through admin pages; nothing here deploys code,
sends messages, changes affiliate links or writes to production data from this workspace.

## What the evidence tiers mean

| Tier | What it proves | What you may claim |
|---|---|---|
| `source_seen` | You typed a real source URL and the date you checked it | "Source page seen <date>" |
| `feed_reported` | A provider feed reported the offer with a check timestamp | "Reported by source <date>" |
| `checkout_tested` | The live verifier applied that specific code at checkout | "Checked out with this code" |
| No source date yet | Nothing was recorded | Say only "No source date yet" — never "verified" or "confirmed" |

**Never claim:** a code works, a discount is guaranteed, a price is current, an expiry is confirmed,
or that an affiliate link is a coupon code.

## 1. Find high-value offers
Open `/admin/evidence`. The queue is already ranked: Tier A stores first, then offers with no source
date, then offers expiring soon, then by clicks. Use the store, tier and evidence filters to narrow it.

## 2. Record evidence (about one minute)
1. Choose an offer row; the form opens on the right.
2. Open the merchant's own page in another tab.
3. Type the exact page URL into **Source URL** (must start with https:// or http://).
4. Choose the honest **Source kind**: brand_site / offers_page / terms_page / bank_page /
   affiliate_feed / manual.
5. Set **Checked on** to when you actually looked. Future dates are rejected.
6. Optionally type an **Expiry claim** and its **Expiry source URL** — only if the page states one.
7. Click **Save evidence**. The row moves out of "No source date yet" within the next refresh.

Your user ID and the timestamp are stored automatically. The tool never sets a verification status.

## 3. Deactivate a dead offer
In the same form, type a short reason and click **Deactivate offer**. The offer stops showing; the
reason is recorded. This is reversible through the existing admin coupon API — nothing is deleted.

## 4. Create a collection
Collections are authored in `data/collections.ts` by a developer today; editors can manage DB-backed
collections through the SQLAdmin **Editorial content** view (`/admin` → Editorial content) and its
FAQ / link views. Set content type `collection` and status `draft` while writing. Each item block
must include: `type: collection_item`, `title`, a `why` you wrote yourself, a `skip_if` field
(which may be empty), and either a `coupon_id` or a `store_id`.

## 5. Pass the publish gate and publish
Change status to `in_review`, then `published`. The server rejects publication with a list of failing
items if any item has no `why`, lacks a `skip_if` field, or has no live offer/store reference.
Offer items must have evidence at least `source_seen` (a source URL and check date). When an item's
offer later becomes inactive, expired or suppressed it is hidden automatically; a collection with
fewer than 3 live items is marked "needs attention" in admin and dropped from homepage rails.

## 6. Share (copy only)
On a published collection page use **Copy link** or **Copy text for WhatsApp / Instagram**. Shared
URLs carry `utm_source=share`. The text includes only items with a source date, always includes the
commission disclosure, and never invents a discount. Nothing is posted automatically.

## 7. Weekly digest draft
Open `/admin/digest`, click **Generate draft**, then **Copy draft**. It assembles published
collections and source-seen offers into a DRAFT text block. No recipients, scheduling or sending
exist.

## 8. Check performance
`/admin/analytics` shows the raw-event scoreboard: non-bot clicks by placement, offer type, evidence
tier and store tier, unique and returning visitors, collection views and clicks. CTR is deliberately
shown as unavailable when impressions are not segmented by placement — a gap is never shown as zero.
`/admin/jobs` shows job status only; the scheduler stays off until a human enables it deliberately.
