# Durza distribution runbook (Phase 3)

For a non-developer. This phase prepares distribution; **it never posts, messages, emails or enables
anything**. The scheduler and the outbound kill switch stay off until a human explicitly approves them.

## 1. Read the go/no-go panel
Open `/admin/go-no-go`. Each gate is red or green with a value, a plain-language reason and the next
action. Red is normal while attribution is unconnected and evidence is thin. Nothing on this page
starts a job, sends a link or changes a setting. Missing data is shown as a gap, never as a measured zero.

## 2. Fix the monetisation gap
Open `/admin/monetisation`. Offers are ranked by clicks and labelled with a cited rule:
`network_tracked`, `amazon_tagged`, `plain_url` or `accepted_unmonetised`.
- For a `plain_url` offer, paste a **real tracked URL** from your own network dashboard, type a reason,
  and save. The URL must be https and on the store domain or the configured tracking allowlist.
- You can **Restore** the previous URL at any time; nothing is deleted.
- If you consciously choose not to monetise an offer, mark it **Accept as unmonetised** so the readiness
  panel treats it as a decision, not an oversight.
- The site-wide disclosure says we may earn a commission; for unmonetised links that is incomplete.
  This is a human review item — do not change disclosure wording yourself.

## 3. Import real conversions offline
Open `/admin/conversions`. Export a CSV from your own network dashboard and paste it. Map its columns
from your export (click reference, transaction id, amounts, status, date, currency). Use **Dry run**
first: it shows matched, unmatched and duplicate rows and writes nothing. Only click **Confirm import**
after checking the preview. Each batch gets an id and `source=manual_import`; imports are idempotent by
(network, transaction id). **Void batch** reverses rows by status — it never deletes them.

## 4. Speed through evidence
Open `/admin/evidence`. The queue is ranked by store tier, missing source date, expiry and clicks.
- Tick **“I saw this on the page”** for each offer you personally checked (1–20 at a time), type the
  source URL, source kind and date, and apply. Nothing is inferred or prefilled.
- Evidence is typed into `restrictions`; the tool never sets a verification status.
- `/admin/readiness` shows per-collection gate status and publishable-offer counts by store and tier.

## 5. Build tagged links
Open `/admin/links`. Choose a target path, a channel and a lowercase campaign slug. The tool builds a
URL with `utm_source`, `utm_medium`, `utm_campaign` and a `content_ref` for measurement. Copy it. Do
not shorten links or hand-edit the parameters into a different convention.

## 6. Generate share assets
Open `/admin/assets`. Only published collections that pass the gate and have source-seen evidence offer
downloadable 1080×1350 and 1080×1080 PNGs. Images are text-only and always include the affiliate
disclosure. Nothing is uploaded or posted.

## 7. Optional follow links
Footer and collection follow links appear only when an owner sets `NEXT_PUBLIC_INSTAGRAM_FOLLOW_URL`,
`NEXT_PUBLIC_FACEBOOK_FOLLOW_URL` or `NEXT_PUBLIC_WHATSAPP_FOLLOW_URL` to an https URL on an allowlisted
host. Invalid values are rejected; unset values render nothing. Clicks are recorded with a placement so
the scoreboard can compare interest by channel. No forms, sign-ups or personal data.

## 8. What you must never claim in a post
- Never call an affiliate link a coupon code, a discount, a price or an expiry.
- Never say “verified”, “confirmed”, “100% working”, “limited time” or “today” unless the evidence tier
  and date on the page actually support it. Checkout-tested is the only “checked out with this code”.
- Never show a merchant logo or trademark in a generated asset; assets are text-only.
- Every shared post must carry the affiliate disclosure line used by the tools.
- Do not post on behalf of Durza without owner approval; this phase only prepares assets and links.
