# Durza.in — requirements & operate guide (single source)

This file consolidates what Durza.in is and the operating rules that matter. Everything that used to live in `HANDOFF-2026-11.md`, `RUNBOOK.md`, `STATUS.md`, `clarity-*`, `persuasion-*`, and `ARCHITECTURE.md` is intentionally represented as the rules below — no prose beyond them.

Sub-doc: [`seo/README.md`](seo/README.md) — keyword research, index policy, opportunities.

---

## 1. Product

- Indian coupon & deals site. Trustworthy shopping-assistant, calm authority — Bloomberg/Trustpilot, never hypey.
- Frontend: `/` reads only "durza" as brand. Backend: FastAPI + Neon Postgres; operated on Oracle VM.
- Deploys: push `main` → Vercel for `couponza-web`; `podman restart durza_app_1` on the VM for backend.
- Production serving: **Vercel** (`durza.in`) + **Oracle VM** (`api.durza.in`).
- Local build must be `npx next build --webpack` (Turbopack panics locally on older Node); Vercel unaffected.

## 2. Non-negotiable truths

- **Every outbound affiliate link** goes through `/go/{slug}`; `rel="nofollow sponsored noopener"` on every external affiliate CTA.
- **No invented prices, discounts, MRPs, “up to” claims, or “verified” labels** unless the catalogue proves them. Verified comes only from real shopper votes above `verification_status` — not from text, ever. Branded codes are shown as `Feed: codes come from the merchant's own program, not hand-tested.`
- **No fake urgency** (countdown timers, “only 2 left”). Expired offers are gone from listings.
- **Real ops:** `is_active` only genuinely; `is_indexable=false` kills a page from the sitemap.
- **No coupon clutter for prestige/luxury Tier 1 stores.** Show commercial CTA, no promo cards, no discount badges.
- **Payment = our gate.** `/go/{slug}` = affiliate tracking. Web never writes to DB.
- **AdSense kill-switch stays off** (`NEXT_PUBLIC_ADS_ENABLED` unset) — flip only after owner approval.

## 3. Editing constraints

- No backend code changes without confirming intent with the owner.
- Never rename token variables; theme tokens are stable API.
- UI: code masked (`BIG•••••`) everywhere; reveal happens only on the offer page.
- Verification: shopper votes only. `last_checked_at` ≠ `last_verified_at`; both shown honestly or not at all.
- ISR window `revalidate=300` — pages are static by design. Do not push a layout-heavy change that forces SSR without checking.
- Slow/dead endpoints fail empty, not blank.
- Cost cap: page-size from backend is **100**; anything bigger 422s.
- Layout changes that delete `loading.tsx` files (404-before-streaming) were validated live — do not re-add them.
- 216 total pages audited for perf — keep `Tier 1 → 2 → 3`, never block first paint on tier 2/3 logic.
- `rel="nofollow sponsored noopener"` is contract — any new component is non-compliant otherwise.

## 4. Operations snapshot (as of Nov 2026)

- **46 custom store pages** live, grouped in 3 tiers.
- **~411 indexable URLs** in sitemap (pruned ~1,020 soft-dead coupons).
- **13 passing vitest failures** are baseline — leave untouched unless that's the job.
- **AdSense**: apply for re-review only after 2 weeks of recrawl of pruned sitemap; owner signs off.
- **26 Admitad programs** live; banner slots render only with valid program + affiliate route.
- **Priority system** (1–10) live on stores/coupons/editorials; India own-SKU set to 10 (e.g., Alpino, HealthKart, Fuel One, MuscleBlaze); India-reach 8; off-target 2.
- **Google Trends** research landed; opportunities (Croma Apple, FNP, Superbottoms, JioMart) are documented but **recruitment blocked** — no program is joined; no pages built.

## 5. Where things live

- `app/page.tsx` — homepage
- `app/stores/{slug}/page.tsx` — store hubs (custom) & generic `StorePageClient`
- `app/guides/...` — static buying guides (`data/store-guides.ts` + `staticGuideBySlug`)
- `app/sitemap/[...path]/route.ts` — batched sitemap shards (`BACKEND_MAX_LIMIT=100`)
- `components/store/*` — store card templates
- `components/editorial/*` — editorial strip + guides
- `lib/` — `storeLogos.ts`, `static-editorial.ts`, `api.ts`, `types.ts`
- `docs/seo/README.md` — decision index for all keyword & index work

## 6. Deploy & rollback

```bash
# Frontend — push main → Vercel auto-builds
npm run build --webpack        # must use webpack, not turbo
npm run test -- --run

# Backend — pull + restart container
ssh ubuntu@144.24.124.148
cd ~/durza && git pull && podman restart durza_app_1

# Rollback frontend — git revert or Vercel dashboard
# Rollback backend — earlier commit id + restart
```

## 7. GSC / AdSense

- GSC request indexing 5 known URLs (sec 7 seo/README.md).
- Monitor **Pages report → Not indexed** and **Crwal stats** for 2 weeks, then owner reapplies to AdSense; flip switch only after approval.
- Do not propose flipping the switch when asked to "add ads" — approval is the gate.

## 8. What the user still owes GSC

- Request indexing for: `/guides/amazon-flipkart-sale-dates-2026`, `/guides/best-credit-card-online-shopping-india-2026`, `/guides/icici-bank-offers-india-2026`, `/guides/rbl-bank-offers-india-2026`, `/stores/healthkart`, `/stores/nykaa`, `/stores/fuelone`, plus up to 100 slashing individual coupon URLs as Google expertise budget allows.
- Re-apply to AdSense after ~2 weeks of recrawl.
- Decide if 4 opportunities (Croma, FNP, Superbottoms, Grocery/Q-commerce) should be recruited — none of them are runnable until you green-light.

## 9. Do NOT

- Do not call `priority` column up/down — one owner changes only.
- Do not let homepage layout drift from the Bloomberg profile — no poster art, no meme, no sound.
- Do not plant brand names in headings that are not real catalogue entries.
- Do not paste coupon code into a metadata title — title must be theme-text only.
- Do not let me perform Vercel/GSC actions — owner must; I can only prepare lists.

## 10. Running checks (used on every commit)

```bash
npx tsc --noEmit
npx vitest run            # expect the 13 baseline failures
npx next build --webpack
```

Backend:

```bash
./.venv/bin/python -m pytest tests/ -q
```
