import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Store, Flame, Zap } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import HomeHero from "@/components/home/hero/HomeHero";
import type { ActivityItem } from "@/components/home/ActivityTicker";
import CategoryGrid from "@/components/home/CategoryGrid";
import CategoryTileGrid from "@/components/home/CategoryTileGrid";
import StoreTrackGrid from "@/components/home/StoreTrackGrid";
import OfferRail from "@/components/home/OfferRail";
import HowItWorks from "@/components/home/HowItWorks";
import { api } from "@/lib/api";
import { formatRelativeTime } from "@/lib/format";
import { dedupeCoupons, sanitizeCouponForDisplay } from "@/lib/feed-sanitize";
import { formatStoreDisplayName } from "@/lib/store-display";
import { categoryNameMap, popularStores as pickPopularStores, toHeroDeal, toHeroStore } from "@/lib/home-hero";
import { absoluteUrl } from "@/lib/seo";
import { REDESIGN_ENABLED } from "@/lib/flags";
import { isHomepageIndiaRelevant } from "@/lib/homepage-curation";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";
import { BRAND } from "@/lib/brand";
import { EditorialCard, EditorialSection } from "@/components/editorial/EditorialComponents";
import { staticFeaturedGuides } from "@/lib/static-editorial";
import { COLLECTIONS } from "@/data/collections";
import { collectionFromEditorial } from "@/lib/collections";
import type { EditorialContent, EditorialHomepage, Paginated, CouponPublic } from "@/lib/types";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  const canonical = absoluteUrl("/");
  // The homepage title is the one place the `%s — Durza` template would
  // double the brand, so it is declared absolute.
  return {
    title: { absolute: SITE_TITLE },
    description: SITE_DESCRIPTION,
    alternates: { canonical },
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: canonical,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
    other: {
      "google-adsense-account": BRAND.adsensePublisherId,
      "mitgo-verification": process.env.MITGO_VERIFICATION ?? "36557085-458b-4657-ac1f-8b23e530c956",
    },
  };
}

async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  return promise.catch(() => fallback);
}

// const PILLARS = [
//   {
//     title: "Sourced, not scraped",
//     body: "Every offer links to the store page it was read from, with the date we last checked it — not a marketing claim.",
//     points: [
//       "Source page on every offer",
//       "Check date on every card",
//       "Codes only where the store published them",
//     ],
//   },
//   {
//     title: "Commission disclosed",
//     body: "We publish what we earn on every store and coupon page. Expected earnings are one weighted input in ranking — and we say so.",
//     points: ["Per-store commission note", "Sponsored placements are labelled", "Ranking inputs explained"],
//   },
//   {
//     title: "Evidence over urgency",
//     body: "Expiry dates come from the store's own terms, not countdown theatre. Expired offers are hidden and archived.",
//     points: ["Expiry from store terms", "Expired offers removed", "Price history per product"],
//   },
// ];

export default async function HomePage() {
  const emptyPage: Paginated<never> = { items: [], total: 0, skip: 0, limit: 0 };
  const emptyEditorialPage: Paginated<EditorialContent> = { items: [], total: 0, skip: 0, limit: 0 };
  const emptyEditorial: EditorialHomepage = { guides: [], comparisons: [], reviews: [], collections: [] };

  // Every ordering and count below is the backend's answer to a real query. This page
  // never ranks, filters a sample, or estimates: a number on screen is a `total`.
  const [
    coupons,
    stores,
    categories,
    endingSoon,
    recentlyVerified,
    verifiedToday,
    newest,
    editorial,
    latestComparisons,
    recentReviews,
    latestDeals,
    bestCoupons,
  ] = await Promise.all([
    safe(api.listCoupons({ active_only: true, sort: "recommended", limit: 24 }), emptyPage as Paginated<CouponPublic>),
    safe(api.listStores({ limit: 100 }), emptyPage as Paginated<never>),
    safe(api.listCategories({ limit: 24, live_only: true }), emptyPage as Paginated<never>),
    safe(
      api.listCoupons({ active_only: true, sort: "ending_soon", expires_within_days: 7, limit: 8 }),
      emptyPage as Paginated<CouponPublic>,
    ),
    safe(
      api.listCoupons({ active_only: true, sort: "recently_verified", limit: 8 }),
      emptyPage as Paginated<CouponPublic>,
    ),
    // Only the exact count is used from this one.
    safe(
      api.listCoupons({ active_only: true, sort: "recently_verified", verified_within_hours: 24, limit: 1 }),
      emptyPage as Paginated<CouponPublic>,
    ),
    safe(api.listCoupons({ active_only: true, sort: "newest", limit: 8 }), emptyPage as Paginated<CouponPublic>),
    safe(api.getEditorialHomepage(), emptyEditorial),
    safe(api.listEditorial({ content_type: "comparison", limit: 3 }), emptyEditorialPage),
    safe(api.listEditorial({ content_type: "review", limit: 3 }), emptyEditorialPage),
    safe(
      api.listCoupons({ active_only: true, discount_type: "deal", has_code: false, sort: "newest", limit: 8 }),
      emptyPage as Paginated<CouponPublic>,
    ),
    safe(
      api.listCoupons({
        active_only: true,
        has_code: true,
        sort: "newest",
        limit: 30,
      }),
      emptyPage as Paginated<CouponPublic>,
    ),
  ]);

  // Indian shoppers today — deals that make sense for that audience only.
  // The excluded set lives in lib/homepage-curation.ts; this section filters every
  // offer pool the homepage will render.
  // Plain id → identity lookup for the explorer cards (serialisable across the
  // client boundary): logo + name + slug + website, keyed by store_id.
  const storesById = Object.fromEntries(
    stores.items.map((s) => [
      s.id,
      {
        name: formatStoreDisplayName({ slug: s.slug, name: s.name }),
        slug: s.slug,
        logo_url: s.logo_url,
        website_url: s.website_url,
      },
    ]),
  );

  const relevantStoreIds = new Set(
    stores.items.filter((s) => isHomepageIndiaRelevant(s.slug)).map((s) => s.id),
  );
  const isHomepageRelevant = (coupon: CouponPublic) => relevantStoreIds.has(coupon.store_id);

  // The store list is a lookup table for card badges (every card needs its store); the
  // stores rail only shows the first dozen.
  // Real per-category offer counts for the redesign's category tiles. Only
  // fetched when the redesign is on, since the legacy grid doesn't show them.
  const categoryCounts: Record<string, number> = {};
  if (REDESIGN_ENABLED && categories.items.length > 0) {
    const totals = await Promise.all(
      categories.items.slice(0, 7).map((c) =>
        safe(api.listCoupons({ category_id: c.id, active_only: true, limit: 1 }), emptyPage as Paginated<CouponPublic>),
      ),
    );
    categories.items.slice(0, 7).forEach((c, i) => {
      categoryCounts[c.id] = totals[i].total;
    });
  }

  const cardStores = stores.items.map((s) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    logo_url: s.logo_url,
    website_url: s.website_url,
    currency: s.currency,
  }));

  // One offer should appear once on this page. Sections fill in the order they
  // are shown, and an offer already placed in an earlier row is skipped — a
  // presentation filter over the backend's orders, not a re-ranking.
  const shown = new Set<string>();
  const take = <T extends { id: string }>(items: T[], limit: number): T[] => {
    const picked: T[] = [];
    for (const item of items) {
      if (shown.has(item.id)) continue;
      shown.add(item.id);
      picked.push(item);
      if (picked.length >= limit) break;
    }
    return picked;
  };

  // The hero's "Featured right now" panel: single spotlight card (deduped).
  const featuredCoupons = take(
    dedupeCoupons(coupons.items.filter(isHomepageRelevant).map((c) => sanitizeCouponForDisplay(c))),
    1,
  );
  const recentlyVerifiedItems = take(recentlyVerified.items.filter(isHomepageRelevant), 8);
  // Tab pools for the unified Verified Deals Explorer. Sanitize/dedupe for clean display.
  const fill = (pool: CouponPublic[], limit = 6): CouponPublic[] => {
    const picked: CouponPublic[] = [];
    for (const item of dedupeCoupons(pool.map((c) => sanitizeCouponForDisplay(c)))) {
      if (shown.has(item.id)) continue;
      shown.add(item.id);
      picked.push(item);
      if (picked.length >= limit) break;
    }
    return picked;
  };
  const backfill = (picked: CouponPublic[]): CouponPublic[] => {
    const extra: CouponPublic[] = [];
    for (const item of dedupeCoupons(coupons.items.filter(isHomepageRelevant).map((c) => sanitizeCouponForDisplay(c)))) {
      if (picked.length + extra.length >= 6) break;
      if (shown.has(item.id)) continue;
      shown.add(item.id);
      extra.push(item);
    }
    return [...picked, ...extra];
  };
  const explorerTabs = {
    top: backfill(fill(coupons.items.filter(isHomepageRelevant))),
    codes: backfill(fill(bestCoupons.items.filter(isHomepageRelevant))),
    deals: backfill(fill(latestDeals.items.filter(isHomepageRelevant))),
    newest: backfill(fill(newest.items.filter(isHomepageRelevant))),
  };
  // Rail: prefer offers with a real recent check or a source page, then fill
  // from curated priority. Never claim "today" unless a 24h check exists.
  const worthLooking = [...coupons.items, ...bestCoupons.items, ...latestDeals.items]
    .filter((coupon) => coupon.is_active && !coupon.auto_suppressed)
    .filter((coupon) => isHomepageRelevant(coupon))
    .filter((coupon, index, all) => all.findIndex((other) => other.store_id === coupon.store_id) === index)
    .sort((a, b) => {
      const freshness = (c: (typeof a)) =>
        (c.last_checked_at && Date.now() - new Date(c.last_checked_at).getTime() < 86_400_000 ? 2 : 0) +
        (c.restrictions && typeof c.restrictions === "object" && "source_url" in c.restrictions ? 1 : 0);
      return freshness(b) - freshness(a) || b.clicks_count - a.clicks_count;
    })
    .slice(0, 6);

  const collectionsForRail = [
    ...editorial.collections.map((item) => collectionFromEditorial(item)).filter((entry) => entry !== null),
    ...COLLECTIONS,
  ];

  const activityDeals = explorerTabs.deals; // already relevant

  // The activity tape under the hero is built only from rows already on this
  // page (confirmations, the steepest percentages, the newest deals) — a line
  // exists only when the data behind it does. Kinds interleave so the tape
  // reads as a mix rather than three stacked lists.
  const storeNameById = new Map(cardStores.map((s) => [s.id, s.name]));
  const storeNameFor = (coupon: CouponPublic) => storeNameById.get(coupon.store_id) ?? "a tracked store";
  const clip = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);
  const verifiedTape: ActivityItem[] = recentlyVerifiedItems
    .filter((c) => c.last_verified_at !== null)
    .slice(0, 4)
    .map((c) => ({
      kind: "verified",
      text: c.code
        ? `Code ${c.code} confirmed ${formatRelativeTime(c.last_verified_at)}`
        : `${storeNameFor(c)} offer confirmed ${formatRelativeTime(c.last_verified_at)}`,
    }));
  const dealTape: ActivityItem[] = activityDeals
    .slice(0, 4)
    .map((c) => ({ kind: "deal", text: clip(c.title, 64) }));
  const activityItems: ActivityItem[] = [];
  for (let i = 0; activityItems.length < 12; i += 1) {
    const wave = [verifiedTape[i], dealTape[i]].filter(
      (item): item is ActivityItem => item !== undefined,
    );
    if (wave.length === 0) break;
    activityItems.push(...wave.slice(0, 12 - activityItems.length));
  }

  // Hero view-model. Search pool = every relevant offer already fetched for this page (deduped,
  // capped to keep the client payload small); stores are the full list so any store is findable.
  const REDIRECTED_HERO_STORE_SLUGS = new Set([
    "aldo-new",
    "bath-body-works",
    "bliss-club",
    "charles-keith",
    "lenovo-india",
    "milton-in",
    "pepperfry-com-cps-india",
    "perforacare-com-ecommerce-cps-india",
    "purevpn-com-utility-cpa-worldwide",
    "rforrabbit-com-ecommerce-cps-india",
    "salty-co-in-ecommerce-cps-india",
    "sanskrutihomes-in-ecommerce-cps-india",
    "shoptupperware-in-ecommerce-cps-india",
    "tata-cliq",
    "veromoda",
  ]);
  const heroStores = stores.items
    .filter((s) => isHomepageIndiaRelevant(s.slug) && !REDIRECTED_HERO_STORE_SLUGS.has(s.slug))
    .map(toHeroStore);
  const heroStoreById = new Map(stores.items.map((s) => [s.id, toHeroStore(s)]));
  const heroCategoryNames = categoryNameMap(categories.items);
  const heroPool = new Map<string, CouponPublic>();
  for (const list of [coupons.items, bestCoupons.items, latestDeals.items, newest.items, recentlyVerified.items, endingSoon.items]) {
    for (const coupon of list) {
      if (heroPool.size >= 40) break;
      if (isHomepageRelevant(coupon) && !heroPool.has(coupon.id)) heroPool.set(coupon.id, sanitizeCouponForDisplay(coupon));
    }
  }
  const heroDeals = [...heroPool.values()].flatMap((coupon) => {
    const store = heroStoreById.get(coupon.store_id);
    return store ? [toHeroDeal(coupon, store, heroCategoryNames)] : [];
  });
  const heroFeatured = featuredCoupons.flatMap((coupon) => {
    const store = heroStoreById.get(coupon.store_id);
    return store ? [toHeroDeal(coupon, store, heroCategoryNames)] : [];
  });
  const heroPopularStores = pickPopularStores(heroStores, 5);

  const hasEditorial = Object.values(editorial).some((items) => items.length > 0)
    || latestComparisons.items.length > 0
    || recentReviews.items.length > 0;
  const isEmpty = coupons.total === 0 && stores.total === 0 && categories.total === 0 && !hasEditorial;

  return (
    <div className="page-shell">

      <HomeHero
        deals={heroDeals}
        featured={heroFeatured}
        stores={heroStores}
        popularStores={heroPopularStores}
        tickerItems={isEmpty ? [] : activityItems}
        stats={{ coupons: coupons.total, stores: stores.total, categories: categories.total }}
        checkedToday={verifiedToday.total}
      />

      {isEmpty ? (
       <section className="section-panel mt-12 px-6 py-14 text-center">
          <h2 className="font-serif text-title font-medium text-ink">No deals listed yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
            The catalogue is empty. That is the honest state — we would rather show nothing than
            pad the page with offers we cannot source.
          </p>
        </section>
      ) : (
        <>
          {worthLooking.length > 0 && (
            <section className="mt-10" aria-labelledby="worth-looking-heading">
              <SectionTitle hint="from offers we tracked" icon={Flame}>
                <span id="worth-looking-heading">Worth a look</span>
              </SectionTitle>
              <OfferRail
                offers={worthLooking}
                storesById={storesById}
                placement="home_worth_a_look"
              />
            </section>
          )}

          {categories.items.length > 0 && (
            <section className="mt-4" id="categories" aria-label="Shop by category">
              {REDESIGN_ENABLED ? (
                <CategoryTileGrid categories={categories.items} counts={categoryCounts} />
              ) : (
                <CategoryGrid categories={categories.items} />
              )}
            </section>
          )}

          {stores.items.length > 0 && (
            <section className="mt-10" aria-labelledby="stores-heading">
              <SectionTitle hint={`${stores.total} tracked`} icon={Store}>
                <span id="stores-heading">Stores we track</span>
              </SectionTitle>
              <StoreTrackGrid stores={stores.items} />
            </section>
          )}

          {explorerTabs.deals.length > 0 && (
            <section className="mt-12" aria-labelledby="no-code-heading">
              <SectionTitle hint="no code listed" icon={Zap}>
                <span id="no-code-heading">Deals without a code listed</span>
              </SectionTitle>
              <OfferRail
                offers={explorerTabs.deals.slice(0, 6)}
                storesById={storesById}
                placement="home_no_code_deals"
              />
            </section>
          )}

          {explorerTabs.codes.length > 0 && (
            <section className="mt-12" aria-labelledby="codes-heading">
              <SectionTitle hint="codes shown on the offer page" icon={Flame}>
                <span id="codes-heading">Current coupon codes</span>
              </SectionTitle>
              <OfferRail
                offers={explorerTabs.codes.slice(0, 6)}
                storesById={storesById}
                placement="home_coupon_codes"
              />
            </section>
          )}

          <EditorialSection
            title="Reviews & comparisons worth reading"
            items={[
              ...latestComparisons.items.slice(0, 2),
              ...recentReviews.items.slice(0, 2),
            ]}
            href="/compare"
            label="All comparisons"
            eyebrow="Researched and side-by-side"
          />

          {collectionsForRail.length > 0 && (
            <section className="mt-12" aria-label="Curated savings collections">
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-caption font-semibold uppercase tracking-widest text-durza-deep">Built around your goals</p>
                  <h2 className="mt-1 font-serif text-title font-medium text-ink">Curated collections</h2>
                </div>
                <Link href="/collections" className="min-h-11 inline-flex items-center text-sm font-medium text-durza-deep hover:underline">
                  All collections
                  <ArrowRight aria-hidden="true" className="inline h-3.5 w-3.5 align-[-2px]" strokeWidth={2} />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {collectionsForRail.slice(0, 3).map((item) => <EditorialCard key={item.slug} content={{
                  id: item.slug,
                  content_type: "collection" as const,
                  status: "published" as const,
                  title: item.title,
                  slug: item.slug,
                  summary: item.summary,
                  content_blocks: [],
                  structured_data: {},
                  hero_image_url: item.heroImage,
                  author_name: null,
                  market: "IN",
                  seo_title: item.seoTitle,
                  meta_description: item.metaDescription,
                  canonical_url: null,
                  is_indexable: true,
                  is_featured: false,
                  published_at: null,
                  created_at: "",
                  updated_at: "",
                  relations: [],
                  entity_links: [],
                  faqs: [],
                  adsense_eligible: false,
                }} />)}
              </div>
            </section>
          )}

          <p className="mt-12 border-t border-ledger-line pt-4 text-xs text-ink-soft">
            Durza may earn a commission on tracked links. We never charge shoppers, and we do not
            claim a code works unless checkout testing confirmed it.
          </p>

          <section className="mt-10">
            <SectionTitle icon={Compass}>How Durza works</SectionTitle>
            <HowItWorks />
          </section>
{/* 
          <Reveal> */}
          {/* <section className="mt-16">
            <h2 className="text-center font-serif text-title font-medium text-ink">
              Why this is not a red-badge countdown site
            </h2>
             <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {PILLARS.map((pillar, i) => {
                const Glyph = [Check, Percent, TrendingUp][i];
                return (
                <li
                  key={pillar.title}
                  className="info-card lift p-6"
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white ${
                      i === 0 ? "bg-verified" : i === 1 ? "bg-rust" : "bg-navy"
                    }`}
                  >
                    <Glyph className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-serif text-heading font-medium text-ink">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{pillar.body}</p>
                  <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-verified-soft text-verified"
                          aria-hidden="true"
                        >
                          <Check className="h-3 w-3" strokeWidth={2.5} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
                );
              })}
            </ul> 
          </section>      */}
               {/* </Reveal> */}
        </>
      )}
    </div>
  );
}
