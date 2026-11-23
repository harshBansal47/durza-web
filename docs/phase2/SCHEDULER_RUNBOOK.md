# Phase 2 — Scheduler runbook (T7)

**[fact] Global kill switch:** `SCHEDULER_ENABLED=false` by default (`app/core/config.py`). Without
it, `start_scheduler()` never registers interval jobs.
**[fact] Per-job allowlist:** `SCHEDULER_JOBS` (comma-separated job names); empty means all registered jobs.
**[fact] New Phase 2 kill switch:** `OUTBOUND_COMMUNICATIONS_ENABLED=false` by default. With it off,
`send_deal_alerts` is **not registered at all** (tests assert this). `post_telegram` has no interval
trigger in any case — it is run-now only. No job logic was changed.

## Job inventory (code verified)

| Job | Writes | External calls | User-visible side effects | Failure modes |
|---|---|---|---|---|
| `expire_coupons` | `coupons.is_active/status` | none | offers disappear | none significant |
| `refresh_prices` | `coupons`, `coupon_sources`, `ingestion_runs`, source health | Admitad coupon API (configured provider) | new offers appear; Telegram post attempted after successful run | API failure → failed run + backoff; credentials missing → failed run |
| `send_deal_alerts` | `job_runs` | SMTP (email digest) | **emails saved-item subscribers** | SMTP unconfigured → failed job; kill switch off by default |
| `verify_coupons` | verification attempts | none (checker list empty by default) | none | inert until checkers registered |
| `verify_live_codes` | `coupons.verification_status`, `code_verification_logs` | Shopify storefronts (4 opt-in stores) | verified badges / auto-suppression | rate limits → backoff |
| `scrub_clicks`, `scrub_verifications`, `scrub_logs` | retention cleanup | none | old rows removed | none |
| `sync_conversions` | `conversions`, `affiliate_revenues` | Admitad/Awin/Cuelinks reports | admin analytics revenue | no credentials/scheduler → 0 rows; vCommission client missing (PROPOSALS.md) |
| `sync_vcommission_campaigns` | `affiliate_campaigns`, lifecycle/health/audit | vCommission campaigns URL | admin managers update | feed failure → no abandonment (2 clean syncs required) |
| `sync_admitad_campaigns` | `affiliate_campaigns`, `affiliate_creatives` | Admitad programs/banners/deeplinks | admin manager + store banners | credentials missing → error; empty feed preserves rows |
| `sync_shopify_products` | `products`, `price_points` | one Shopify storefront | price-drop UI (hidden while empty) | domain/credential guards |
| `post_telegram` | `telegram_posts` | Telegram API | **channel messages** | no interval trigger; `TELEGRAM_CHANNEL_ENABLED` default false |

## Recommended staged enablement (go/no-go)

1. **Stage 0 (now):** leave `SCHEDULER_ENABLED=false`. Keep outbound switch off. No production change.
2. **Stage 1 — local only:** `expire_coupons`, `scrub_*` via `SCHEDULER_JOBS`. Go if `JobRun` shows success and no public 500s.
3. **Stage 2 — feeds with credentials:** `sync_vcommission_campaigns`, `sync_admitad_campaigns`, `refresh_prices`. Go if credentials configured, `ALLOW_PROD_MIGRATION` not needed, and no false abandonment in two runs.
4. **Stage 3 — verification:** `verify_live_codes` only after the code-match fix is deployed. Go if no auto-suppression spike.
5. **Stage 4 — conversions:** `sync_conversions` only after Admitad credentials and a vCommission client exist (PROPOSALS.md).
6. **Stage 5 — outbound (last):** `OUTBOUND_COMMUNICATIONS_ENABLED=true` + `send_deal_alerts`/`post_telegram` explicitly in `SCHEDULER_JOBS`. Go only after editorial sign-off on message content and consent rules.

**Admin visibility:** `/admin/jobs` reads `JobRun` and the live scheduler; this page never starts a job.
