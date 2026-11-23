# Simplification pass — running notes

Branch: `simplify-remove-tooling` from `phase3-distribution-readiness` in both repos.
**No deploy, no push, no VM/Vercel access. No schema change, no production writes, no data deletion.**

## R0 — Baseline and inventory

**Baseline (recorded before any code change):**
- backend pytest: 1179 passed, 1 skipped; ruff/format/mypy clean
- frontend vitest: 19 failed / 757 passed (known baseline); `tsc --noEmit` clean; `next build` exit 0

### Feature inventories and originating commits

**R1 Evidence system**
- Backend Phase 2 `91f69d6`; Phase 3 bulk `4d89180`; frontend `aabc6e7` (helper), `f242c4d` (admin tool), `6b4329c` (public presentation), `94ff62c` (share/digest), `827ae1c` (content readiness).
- Backend files: `app/services/evidence_service.py`, `app/routers/api/v1/admin_evidence.py`, `app/schemas/evidence.py`, `tests/test_phase2_evidence.py`; router wiring in `app/main.py`; `tests/test_phase3_security.py` endpoint list.
- Frontend files: `app/admin/evidence/page.tsx`, `app/api/admin/evidence/[...path]/route.ts`, `lib/api/admin.ts` (EvidenceRow + 4 functions), `app/admin/readiness/*`, `lib/readiness.ts`, nav links in `app/admin/layout.tsx` and `app/admin/page.tsx`, `docs/phase2/EDITOR_RUNBOOK.md`.
- Shared display (not tool-only): `lib/offer-presentation.ts` (`evidenceTier`, `evidenceLine`), `components/OfferEvidence.tsx`, card/rail components, `lib/collections.ts`, `lib/share-text.ts`, `lib/collection-integrity.ts`, `app/admin/analytics/page.tsx` evidence bucket, `lib/api/admin.ts` scoreboard type.
- Data note: `restrictions.source_url/checked_on` are also written by `app/ingestion/normalize.py` and seed scripts, so removing the admin writer does **not** remove provenance data. Existing JSONB and audit rows stay untouched.

**R2 Collection publish gate**
- Backend `fa91a51`, `5e0251f`; frontend `9b01d15`, `6b4329c`; CLI `scripts/check-collections.sh`.
- Backend: `app/services/collection_service.py`; frontend: `lib/collection-integrity.ts`, `lib/collections.ts`, `lib/__tests__/collection-integrity.test.ts`, `lib/__tests__/collections-merge.test.ts`.

**R3 Digest draft / share**
- Frontend `94ff62c`, share images `9d95045`.
- `app/admin/digest/*`, `buildDigestText` in `lib/share-text.ts`, `app/admin/assets/*`, `app/api/admin/share-image/[slug]/route.tsx`, `lib/share-image.ts`, tests.

**R4 Monetisation tooling**
- Backend `87cf638`, frontend `b9bfccf`; notes `3200afa`, `docs/phase2/PROPOSALS.md`, `docs/phase2/ATTRIBUTION_AUDIT.md`.
- Backend: `app/services/phase3_monetisation.py`, `app/routers/api/v1/admin_monetisation.py`, `tests/test_phase3_monetisation.py`, router wiring in `app/main.py`.
- Frontend: `app/admin/monetisation/page.tsx`, `app/api/admin/monetisation/[...path]/route.ts`, `lib/api/admin.ts` (MonetisationRow + 3 functions), nav link.
- **DO NOT TOUCH** affiliate routing/tracking files. Confirm empty diff at the end.

**R5 Conversion/attribution tooling**
- Backend `04e0e81`, `a875723`, frontend `9ca2fdd`; frontend analytics panel `553e668`.
- Backend: `app/services/phase3_import.py`, `app/routers/api/v1/admin_conversion_import.py`, `tests/test_phase3_import.py`, attribution health endpoint in `app/routers/api/v1/admin_analytics.py` + schema `app/schemas/phase2_analytics.py`, `tests/test_admin_analytics.py`, Phase 2 fixture tests.
- Frontend: `app/admin/conversions/*`, `app/api/admin/conversions/[...path]/route.ts`, attribution health panel in `app/admin/analytics/page.tsx`, nav link.
- Keep pre-existing sync clients, Conversion/AffiliateRevenue models and registered sync job. `ATTRIBUTION_AUDIT.md` kept as historical doc.

**R6 Jobs view**
- Backend `7bfdd19`, `2a37eea`; frontend `553e668` / admin analytics page.
- `/admin/analytics/jobs` endpoint and frontend view + nav link + tests. Keep kill switch and SCHEDULER_RUNBOOK.md.

**R7 Campaign link builder**
- Frontend `fb919d7`; `app/admin/links/page.tsx`, `lib/campaign-links.ts`, `lib/__tests__/campaign-links.test.ts`, nav link.
- Keep `lib/api.ts` UTM capture, canonical stripping, sitemap cleanliness, share URLs with `utm_source=share`, scoreboard channel/campaign grouping.

**R8 Acquisition readiness panel**
- Backend `d135182`, frontend `bef efffb`→`beffffb`; `app/services/phase3_readiness.py`, `app/routers/api/v1/admin_readiness.py`, `tests/test_phase3_readiness.py`, `app/admin/go-no-go/page.tsx`, `app/api/admin/readiness/route.ts`, `lib/api/admin.ts` readiness types/functions, `app/core/phase3_config.py` (check each key).

### Cross-dependencies
- Evidence helpers are imported by `evidence_service`, `collection_service`, `phase2_scoreboard`, `phase3_readiness`, `lib/readiness.ts`, `lib/share-image.ts`, `lib/share-text.ts`, `lib/collections.ts` and public card components.
- Digest and readiness screens call `fetchEvidenceQueue`, so they cannot remain if the evidence endpoint is removed.
- Share images use `DISCLOSURE` from `lib/share-text.ts`; keep that when removing digest.
- Scoreboard channel/campaign grouping (`438f209`) must survive R1/R7.

## Historical notes (R4)
**[verified before removal]** Top-clicked offers were plain URLs with no affiliate attribution;
Amazon.in offers carried `tag=durza02-21`. The classifier labelled outbound paths by cited rule but
never changed routing. The tracked-URL editor wrote old/new URL, editor id and time into
`Coupon.restrictions._outbound_url_history`; no records were deleted. All references are retained
only here; the tooling is removed. Routing files (`store_router.py`, `affiliate_router.py`,
`affiliate_out`, `/go`, click recording, `admitad_only`) were not modified by this pass.

## Historical notes (R5)
Conversion reporting now lives in the Admitad/vCommission dashboards and email reports, not in Durza admin UI.
The pre-existing sync clients, `Conversion`/`AffiliateRevenue` models and registered sync job were left untouched.
`docs/phase2/ATTRIBUTION_AUDIT.md` is kept as a historical document; no frontend attribution-health panel existed
in the deployed UI to remove (only the backend endpoint).

## Historical notes (R5)
Conversion reporting now lives in the Admitad/vCommission dashboards and email reports, not in Durza admin UI.
The pre-existing sync clients, `Conversion`/`AffiliateRevenue` models and registered sync job were left untouched.
`docs/phase2/ATTRIBUTION_AUDIT.md` is kept as a historical document; no frontend attribution-health panel existed
in the deployed UI to remove (only the backend endpoint).
