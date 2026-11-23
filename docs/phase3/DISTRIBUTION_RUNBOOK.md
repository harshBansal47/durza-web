# Durza distribution runbook

For a non-developer. This phase prepares distribution; it never posts, messages or emails anyone.

## Offer labels and claims
Every offer shows one type label. "Last checked <date>" appears only when a real date exists; no
placeholder is shown otherwise. "Checked out with this code" appears only when verification status is
`verified`. Never call an affiliate link a coupon code, and never claim a discount, price, expiry,
"verified", "confirmed" or "today" unless the data supports it.

## Share a collection
Open a published collection page and use **Copy link** or **Copy text for WhatsApp / Instagram**.
Shared URLs carry `utm_source=share`. The text uses only the collection title, summary and
editor-written "why" lines, and always includes the affiliate disclosure. Nothing is posted
automatically.

## Share images
Admin → **Assets** offers downloadable text-only PNGs (1080×1350 and 1080×1080) for published,
gate-passing collections with at least 3 items. The disclosure is always printed. No logos, discount
figures, urgency or countdowns.

## Optional follow links
Instagram, Facebook and WhatsApp links appear in the footer and on collection pages only when an owner
sets the corresponding `NEXT_PUBLIC_*_FOLLOW_URL` environment variable to an https URL on an
allowlisted host. Unset variables render nothing. Clicks are recorded with a placement.

## Conversion reporting
Conversion and revenue data is not shown in Durza admin. Read it in the Admitad and vCommission
dashboards and email reports. The pre-existing sync job and models are untouched.

## What you must never claim in a post
- Never call an affiliate link a coupon code or a discount.
- Never say "verified", "confirmed", "100% working", "limited time" or "today" without supporting data.
- Never show a merchant logo or trademark in a generated asset.
- Every shared post must carry the affiliate disclosure line used by the tools.
- Do not post on behalf of Durza without owner approval.
