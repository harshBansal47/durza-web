# ISR optimisation (implemented)

## What changed

- **On-demand invalidation:** backend writes to coupons, stores and editorial content now POST tags to
  `POST /api/revalidate` when `VERCEL_REVALIDATE_URL` and `VERCEL_REVALIDATE_SECRET` are configured.
  The route validates a shared secret and an allowlist of tags, then calls `revalidateTag(tag, "max")`.
  Without the env vars, no network call is made. Failures never turn a write into a 500.
- **Cache tags** are derived from the API path in `lib/api.ts`: `catalogue`, `stores`, `editorial`,
  `editorial:<type>`, `store:<slug>`, `offer:<id>`, `sitemap`.
- **Longer windows:** static SEO routes moved from 3600 s to **21600 s (6 h)**; sitemap index/shards and
  banner images moved to **86400 s (24 h)**. The homepage moved from 1800 s to 21600 s.
- **Volatile listings** (`/coupons`, `/deals`, `/categories/[slug]`) are now `force-dynamic`, so filter
  and sort query strings no longer create unbounded ISR variants. Freshness comes from the short-lived
  backend Redis cache, not page regeneration.
- **Fetch windows:** `STATIC_REVALIDATE = 21600` is the default for catalogue/editorial fetches;
  `VOLATILE_REVALIDATE = 1800` remains available for `listCoupons`. `getCollectionLiveItems` moved from
  600 s to 1800 s.
- **Determinism:** removed `Date.now()` from homepage ranking, `new Date()` from coupon SEO titles, and
  per-regeneration `lastmod` from the sitemap index. Sitemap counts are cached for 24 h under the
  `sitemap` tag instead of rebuilding every shard on each index regeneration.
- **Backend cache:** `invalidate_prefix()` now pipelines deletes; coupon/stores/editorial writes add
  targeted invalidation where a slug is known.

## Decisions and assumptions

- **[assumption]** 6 h is acceptable for SEO pages now that tag invalidation exists; 24 h for sitemaps
  and generated banner images.
- **[decision]** Query-string filtering was moved to dynamic rendering rather than client-side fetching
  to avoid a large component rewrite. SEO canonical URLs are unchanged; backend cache headers keep
  response cost low.
- **[decision]** No coupon detail params are prebuilt (`generateStaticParams()` still returns `[]`);
  the 6 h window and `offer:<id>` tag reduce writes without inventing a top-offer list at build time.
- Two guide pages with pre-existing uncommitted user edits were deliberately left at 3600 s and excluded
  from the commit.

## Env

```
VERCEL_REVALIDATE_URL=https://durza.in/api/revalidate
VERCEL_REVALIDATE_SECRET=<shared secret>
```

Both are optional; when unset the backend never attempts a revalidation request.

## Top-N coupon prebuild (b)
`app/coupons/[slug]/page.tsx::generateStaticParams()` now fetches the top 100 offers by real all-time
clicks (`sort: "most_used"`) at build time and prebuilds those paths. If the API is unreachable during
a build, it returns `[]` and the previous on-demand behaviour applies. `dynamicParams` remains true,
so the long tail still renders on first visit. **Assumption:** 100 paths cover the high-traffic tail.
Local builds without API access fall back to `[]`; Vercel builds with the production API reach should
prebuild the list.
