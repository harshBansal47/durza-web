# Durza release checklist (Phase 3 T1)

**Status:** Phases 1+2 merged to `main` and deployed before Phase 3 began. Phase 3 is **not deployed**.

## Merge / dependency order
Backend `couponza` main now contains Phase 1 (`c86f5cf`, `c32e1b9`, `7afbea9`) then Phase 2
(`9c898b5`, `04e0e81`, `91f69d6`, `fa91a51`, `5e0251f`, `7bfdd19`). Frontend `couponza-web` main
contains Phase 1 then Phase 2 (`5ed59a5` … `b36d0fa`). Phase 2 frontend evidence/scoreboard pages
depend on the corresponding backend endpoints; merge backend first.
If a partial revert is needed, follow the Phase 2 rollback notes (frontend `f242c4d` → backend
`91f69d6`, `9b01d15` → `fa91a51`+`5e0251f`, `553e668` → `9c898b5`).

## Migrations
**None.** `alembic current` on the deployed DB was `q2r3s4t5u6v7`; all Phase 1/2 storage uses
existing columns (`restrictions`, `content_blocks`, `analytics_*`, `job_runs`). No migration is needed.

## Required env vars (safe values)
- `ENVIRONMENT=production`, `SITE_URL=https://durza.in`, `NEXT_PUBLIC_SITE_URL=https://durza.in`
- `DATABASE_URL` or `NEON_DATABASE_URL`, `REDIS_URL` or `UPSTASH_REDIS_URL`, `SECRET_KEY`
- `SCHEDULER_ENABLED=false`, `OUTBOUND_COMMUNICATIONS_ENABLED=false`, `TELEGRAM_CHANNEL_ENABLED=false`
- Network credentials only where used: `ADMITAD_*`, `VCOMMISSIONS_*`, `AWIN_*`, `CUELINKS_*`
- `AMAZON_ASSOCIATES_TAG`, `AMAZON_USA_ID`
- `ALLOW_PROD_MIGRATION` only for an approved prod migration (currently not needed).

## Pre-deploy
1. Backend: `pytest`, `ruff check`, `ruff format --check`, `mypy app` all green.
2. Frontend: `vitest run` (only the documented baseline failures), `tsc --noEmit`, `next build`.
3. `git status` clean on both repos; `origin/main` contains the commits listed above.
4. Confirm no schema/migration/routing/tracking diff in the release (Phase 3 constraint).
5. Confirm kill switches remain false and no messages are configured for auto-send.

## Post-deploy smoke
1. `python scripts/smoke_check.py --base http://localhost:3000` locally (GET only). For a deployed URL,
   pass `--i-am-running-this-against` explicitly and only with approval.
2. `/health` 200; `/admin/analytics/scoreboard` 200 with admin auth; `/admin/analytics` 200.
3. Check the scoreboard notes say CTR unavailable (not zero) and bot clicks are excluded.
4. Verify `/sitemap.xml`, `robots.txt`, canonical tags and one H1 on Tier A store pages.
5. No scheduler job started; `JobRun` ledger unchanged by the deploy.

## Rollback
Revert the relevant commit(s) in the dependency order above, redeploy backend first, then frontend.
No data rollback is needed because Phase 1/2 wrote only through reversible flags/JSON fields.
