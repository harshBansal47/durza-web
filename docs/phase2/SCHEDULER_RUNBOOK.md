# Scheduler runbook

**[fact] Global kill switch:** `SCHEDULER_ENABLED=false` by default. Without it, `start_scheduler()`
never registers interval jobs.
**[fact] Per-job allowlist:** `SCHEDULER_JOBS` (comma-separated job names); empty means all registered jobs.
**[fact] Outbound kill switch:** `OUTBOUND_COMMUNICATIONS_ENABLED=false` by default. With it off,
`send_deal_alerts` is not registered at all. `post_telegram` has no interval trigger; it is run-now only.

## Job inventory (code verified)

| Job | Writes | External calls | User-visible side effects | Failure modes |
|---|---|---|---|---|
| `expire_coupons` | `coupons.is_active/status` | none | offers disappear | none significant |
| `refresh_prices` | `coupons`, `coupon_sources`, `ingestion_runs`, source health | configured provider APIs | new offers appear; Telegram post attempted after a successful run | API failure → failed run + backoff; credentials missing → failed run |
| `send_deal_alerts` | `job_runs` | SMTP (email digest) | emails saved-item subscribers | SMTP unconfigured → failed job; kill switch off by default |
| `verify_coupons` | verification attempts | none (checker list empty by default) | none | inert until checkers registered |
| `scrub_clicks`, `scrub_verifications`, `scrub_logs` | retention cleanup | none | old rows removed | none |
| `sync_vcommission_campaigns` | `affiliate_campaigns`, lifecycle/health/audit | vCommission campaigns URL | admin managers update | feed failure → no abandonment (two clean syncs required) |
| `sync_admitad_campaigns` | `affiliate_campaigns`, `affiliate_creatives` | Admitad programs/banners/deeplinks | admin manager + store banners | credentials missing → error; empty feed preserves rows |
| `post_telegram` | `telegram_posts` | Telegram API | channel messages | no interval trigger; `TELEGRAM_CHANNEL_ENABLED` default false |

Shopify product sync, live-checkout verification and conversion sync are no longer registered.

## Recommended staged enablement (go/no-go)

1. **Stage 0 (now):** leave `SCHEDULER_ENABLED=false`. Keep the outbound switch off. No production change.
2. **Stage 1 — local only:** `expire_coupons`, `scrub_*` via `SCHEDULER_JOBS`. Go if `JobRun` shows success.
3. **Stage 2 — feeds with credentials:** `sync_vcommission_campaigns`, `sync_admitad_campaigns`,
   `refresh_prices`. Go if credentials are configured and no false abandonment occurs in two runs.
4. **Stage 3 — outbound (last):** `OUTBOUND_COMMUNICATIONS_ENABLED=true` plus explicit
   `send_deal_alerts`/`post_telegram` in `SCHEDULER_JOBS`. Go only after editorial sign-off on
   message content and consent rules.

Conversion and earnings reporting now lives in the Admitad and vCommission dashboards/email reports.
