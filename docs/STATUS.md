# Status — Durza web

**Repository:** `harshBansal47/durza-web` (`couponza-web/`)
**Branch state at the time of writing:** `main` = `f8ffac1d0f5cf416fa4fd4f4e42b65ecf540d9ba`

## What is merged

| Area | State |
|---|---|
| Lint cleanup (the six `any` errors) | merged, deployed |
| Brand copy — "Durza Coupons" in titles and the email sender | merged, deployed |
| Phase 1b-b analytics test backfill (consent gating, scroll, engaged time, sendBeacon) | merged |
| Phase 5c — geo helper and payment picker | merged, deployed |
| Phase 5d — personalized module, separate personalization consent, the personalization flag | merged, deployed |
| Phase 5e — experiments, account settings controls, export path, withdrawal deletion, privacy draft copy | merged, deployed |

## What is scaffolding, with the flags off

Every flag below is **off**. `NEXT_PUBLIC_PERSONALIZATION_ENABLED` defaults to
false, so a build without it shows no personalization surface at all: the
settings panel, the consent controls and the module are not rendered, and the
API answers 404 for the personalization endpoints anyway.

| Feature | Flag | Default | Where it stops today |
|---|---|---|---|
| Personalization surface (settings panel, "Personalize my experience", export button, module) | `NEXT_PUBLIC_PERSONALIZATION_ENABLED` | `false` | nothing is rendered, no request is made |
| Experiment assignment and exposure | `NEXT_PUBLIC_PERSONALIZATION_EXPERIMENTS_ENABLED` | `false` | `getVariant` returns the control variant and nothing is logged |
| Sale hubs | `NEXT_PUBLIC_SALE_HUBS_ENABLED` | `false` | the sale pages are not routed |

Still scaffolding: the geo helper (reads a CDN header, not wired, and it is
not state-level yet), the payment picker (local-only, not wired), the
personalized module (unmounted), and the "For you" row on the home page, which
predates Phase 5 and is driven by followed stores rather than by the
personalization consent — it is not behind the flag and is listed as an open
question below.

## Open TODOs (deferred)

1. **Follow-up PR** — a server-side consent requirement for
   `POST /api/v1/analytics/event`: the API currently stores whatever it is
   sent, and the gate is only client-side.
2. **The "For you" row** (`components/discovery/Recommended.tsx`) shows a
   taste-signal-driven row with no flag. It is pre-existing rather than new,
   so it was left alone; decide whether it belongs behind
   `NEXT_PUBLIC_PERSONALIZATION_ENABLED`.
3. **Geo helper** — make it state-level, consent-gated and overridable before
   it is wired to anything.
4. **Real-browser E2E and CLS checks** — before any personalization flag is
   turned on.
5. **GSC credentials** — still blocked on `GSC_CREDENTIALS_FILE` and
   `GSC_SITE_URL`.
6. **Phases 6–8** — not started.
7. **Personalization wiring** — the module, the controls and the sync are
   built and hidden; turning them on is a separate, deliberate decision.
