# Status — Durza web

**Repository:** `harshBansal47/durza-web` (`couponza-web/`)
**Branch state at the time of writing:** `main` = `713be64bf9d64c827e0c4e02c65881e0d88d06bf`

## What is merged

| Area | State |
|---|---|
| Lint cleanup (the six `any` errors) | merged, deployed |
| Brand copy — "Durza Coupons" in titles and the email sender | merged, deployed |
| Phase 1b-b analytics test backfill (consent gating, scroll, engaged time, sendBeacon) | merged |
| Phase 5c — geo helper and payment picker | merged, deployed |
| Phase 5d — personalized module, separate personalization consent, the personalization flag | merged, deployed |
| Phase 5e — experiments, account settings controls, export path, withdrawal deletion, privacy draft copy | merged, deployed |
| The sale-hub pages show the coupons their rules resolve to, the description and the dates | `durza-web#9` -> `4f6f48` | merged, deployed |
| The "For you" row is gated behind `NEXT_PUBLIC_PERSONALIZATION_ENABLED` and the personalization purpose, and says why it is there | `durza-web#10` -> `617a1d` | merged, deployed |
| The analytics choice is sent to the API on accept as well as on decline, so the server can issue the signed consent cookie | `durza-web#11` -> `713be6` | merged, deployed |

## What is scaffolding, with the flags off

Every flag below is **off**. `NEXT_PUBLIC_PERSONALIZATION_ENABLED` defaults to
false, so a build without it shows no personalization surface at all: the
settings panel, the consent controls and the module are not rendered, and the
API answers 404 for the personalization endpoints anyway.

| Feature | Flag | Default | Where it stops today |
|---|---|---|---|
| Personalization surface (settings panel, "Personalize my experience", export button, module) | `NEXT_PUBLIC_PERSONALIZATION_ENABLED` | `false` | nothing is rendered, no request is made |
| Experiment assignment and exposure | `NEXT_PUBLIC_PERSONALIZATION_EXPERIMENTS_ENABLED` | `false` | `getVariant` returns the control variant and nothing is logged |
| Sale hubs | `NEXT_PUBLIC_SALE_HUBS_ENABLED` | `false` | the sale pages answer 404 |

Still scaffolding: the geo helper (reads a CDN header, not wired, and it is
not state-level yet), the payment picker (local-only, not wired), and the
personalized module (unmounted).

The "For you" row on the home page was the last personalized surface with no
flag in front of it: it is driven by followed and recently viewed stores. It
is now behind `NEXT_PUBLIC_PERSONALIZATION_ENABLED` and the personalization
purpose, and it has a "Why am I seeing this?" control.

## Open TODOs (deferred)

1. **The analytics numbers will look different** — the server now records an
   event only for a visitor who accepted, so the analytics are opt-in from
   the server's side too. The counters will show a drop until visitors
   accept; that is the consent working, not a loss.
2. **Geo helper** — make it state-level, consent-gated and overridable before
   it is wired to anything.
3. **Real-browser E2E and CLS checks** — before any personalization flag is
   turned on.
4. **GSC credentials** — still blocked on `GSC_CREDENTIALS_FILE` and
   `GSC_SITE_URL`.
5. **Phases 6–8** — not started.
6. **Personalization wiring** — the module, the controls and the sync are
   built and hidden; turning them on is a separate, deliberate decision.
