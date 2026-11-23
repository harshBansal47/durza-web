# Phase 1 — Truth & Framing: running notes

Branch: `phase1-truth-and-framing` (backend and frontend). Development only: no schema,
data, config, scheduler or deployment changes.

## T0 — Baseline (no code changes)

### Test / build baseline
| Check | Result |
|---|---|
| Backend `pytest -q` | 1132 passed, 1 skipped, 157 warnings |
| Frontend `vitest run` | 23 failed / 709 passed (15 failed files / 77 passed files) — pre-existing unrelated failures |
| `tsc --noEmit --skipLibCheck` | pass (verified earlier on main; re-run at T11) |
| `next build` | pass (verified earlier on main; re-run at T11) |

The 23 frontend failures are the known baseline and are NOT part of Phase 1.

### Read-only production DB facts (verified 23 Nov 2026)
- Stores: 97 (94 `is_active`). Campaigns: 80 (56 vCommission, 24 Admitad); 73 stores have an active campaign.
- Offers: 326 total; 68 with codes, 258 without. `discount_type='deal'` for all 258 no-code rows.
- `verification_status='verified'`: 0 offers.
- Freshness: 282 offers have no `last_checked_at`; 39 checked within 24h.
- Products: 0. Price points: 0. No product feed exists.
- Analytics evidence: click_events 4041, analytics_events 2423, analytics_sessions 336,
  coupon_impressions 660, conversions 0, affiliate_revenues 0, all daily rollup tables 0 rows.

### T0 impact table — visibility flags and proposed filters
| Count / condition | Offers |
|---|---:|
| Total | 326 |
| `is_indexable = false` | **258** (all no-code deals) |
| `auto_suppressed = true` | 0 |
| `status <> 'active'` | 0 |
| `is_active = false` | 0 |
| expired (`expires_at <= now()`) | 0 |
| Would be hidden by adding status/suppressed filters | 0 today (defensive only) |
| Would be hidden by adding `is_indexable` filter | **258** — unacceptable |

**Decision (carried into T2):** `is_indexable` is an SEO flag in this codebase, not a user
visibility flag. It is set to false on every no-code deal by the ingestion pipeline. Filtering it
in `list_coupons` would remove 258 of 326 live offers (79%). It will therefore NOT be used to
hide offers from users; it stays in the sitemap/metadata layer where it belongs.

### T0 tier data (corrected counts; first query had a LEFT JOIN aggregation artifact)
| Store | Offers | Codes | No-code | Networks |
|---|---:|---:|---:|---:|
| amazon-in | 35 | 0 | 35 | 0 |
| ajio-com-ecommerce-cps-india | 30 | 0 | 30 | 1 |
| tatacliq-com-ecommerce-cps-india | 23 | 13 | 10 | 1 |
| baccabucci-com-ecommerce-cps-india | 20 | 0 | 20 | 1 |
| salty | 18 | 18 | 0 | 2 |
| dot-and-key | 8 | 0 | 8 | 1 |
| nuawoman-com-ecommerce-cps-india | 7 | 7 | 0 | 1 |
| boldfit | 7 | 0 | 7 | 1 |
| indus-valley | 6 | 0 | 6 | 1 |
| igp | 5 | 0 | 5 | 1 |
| milton | 4 | 0 | 4 | 2 |
| acer | 3 | 3 | 0 | 1 |
| firstcry | 2 | 2 | 0 | 2 |
| bewakoof / bath-body-works / palmonas / asus / adidas / veromoda / victorias-secret | 0 | 0 | 0 | 1 |

**Discrepancy vs prompt:** the audit's Tier A list included zero-offer custom stores
(Palmonas, Asus, Adidas, Victoria's Secret, Veromoda, Bath & Body Works, Bewakoof). Per the
task rules ("a store with zero offers cannot be Tier A unless it has a documented reason"),
they are NOT Tier A in Phase 1; they remain Tier B with their custom pages intact.

**Discrepancy vs prompt:** Amazon.in has 35 offers but no active campaign row — offers still
carry their own affiliate URLs. It stays Tier A on offer depth; no routing change.

### Homepage copy / section order captured for before/after
H1: "Skip the hunt. Copy a code that works." Subhead: "India's verification-first coupon
desk — real codes, stated terms, check dates, read from official store pages. No sign-up,
no fake timers, ₹0 extra."
Order: HomeHero → (empty branch) → categories → Stores we track → Curated Amazon finds →
Black Friday banner → Checked Deals Explorer (4 tabs) → Smart Stacking banner → 3×
EditorialSection → Our deal standards pills → Recent reviews → Curated collections →
Tools & Curated Kits → How it works → commented-out PILLARS block.
