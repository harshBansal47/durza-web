# Operator runbook — Durza web

This is the runbook for the storefront as it is deployed today.

## How a deploy happens

The web app is deployed by **Vercel from the git integration**: every push to
`main` builds the app and promotes it. There is no deploy step in the GitHub
Actions workflow — that workflow only runs lint, type-check and the tests.

```bash
# in the repository
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

Two things about the build:

- **The build needs the API to be reachable.** The sitemap index and its
  shards are generated at build time from the real catalogue, so a build
  against an unreachable API fails with
  `Export encountered an error on /sitemap.xml/route`. This is not new — it
  is why the build is not part of the CI workflow, and why a local build
  needs the API running. A Vercel build reaches the live API and succeeds.
- The build degrades rather than failing on individual API errors: a missing
  endpoint returns "not found" and the corresponding sitemap is simply left
  out.

## Flags

All three are off unless somebody deliberately sets them at build time.

| Flag | Default | Effect |
|---|---|---|
| `NEXT_PUBLIC_PERSONALIZATION_ENABLED` | `false` | no personalization control, no module, no request, no "For you" row |
| `NEXT_PUBLIC_PERSONALIZATION_EXPERIMENTS_ENABLED` | `false` | experiment assignment returns the control variant |
| `NEXT_PUBLIC_SALE_HUBS_ENABLED` | `false` | the sale-hub pages answer 404 |

Because they are `NEXT_PUBLIC_` variables, they are baked into the bundle at
build time: turning one on means a new build, not a restart.

## Rolling back

A web rollback is a Vercel rollback or a revert of the merge commit:

```bash
# revert the merge on main, then let Vercel rebuild
git revert -m 1 <merge-sha>
git push origin main
```

Vercel keeps the previous deployment, so a rollback to a known-good
deployment is also possible from the Vercel dashboard without a commit.

Nothing on the web side writes to the database directly: the storefront only
talks to the public API, so a web rollback cannot leave data behind.

## Verifying a deploy

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://api.durza.in/health
curl -s https://durza.in/ | grep -o '<title>[^<]*</title>'
```

The second one is the brand check: the home page title must not read
"Durza - Durza Coupons" and a store page must read
"<Store> Coupons & Promo Codes — Durza Coupons". As deployed, the home page
reads "Durza Coupons – Coupons, Promo Codes & Best Online Deals in India" and
a store page reads "AJIO Coupons & Promo Codes — Durza Coupons".

## Cookies and consent

The storefront sets `cz_vid` and `cz_sid` for the API domain. Analytics
events are only sent when the visitor has allowed analytics; declining clears
both cookies. The full analytics runbook is in the backend repository
(`couponza/docs/ANALYTICS_VERIFY.md`), and the verification script is
`couponza/scripts/post_deploy_verify.sh`.

Personalization is separate from analytics and is currently switched off
entirely, so there is nothing to withdraw and nothing to export.

**Merged.** The API issues a signed, HttpOnly consent cookie scoped to the
parent domain when the visitor accepts, and it records an analytics event
only when it can verify that cookie. A request without one is still answered
202 — the event is simply not kept. Expect analytics row counts to drop until
visitors accept.

**Merged.** The home page's "For you" row is behind
`NEXT_PUBLIC_PERSONALIZATION_ENABLED` and the visitor's personalization
purpose. With either missing the row does not exist and nothing is fetched
for it.
