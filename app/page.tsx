import type { Metadata } from "next";
import HomeHero from "@/components/home/hero/HomeHero";
import RedesignedSections from "@/components/home/RedesignedSections";
import JsonLd from "@/components/JsonLd";
import { api } from "@/lib/api";
import { dedupeCoupons, sanitizeCouponForDisplay } from "@/lib/feed-sanitize";
import { formatStoreDisplayName } from "@/lib/store-display";
import { categoryNameMap, popularStores as pickPopularStores, toHeroDeal, toHeroStore } from "@/lib/home-hero";
import { absoluteUrl, itemListJsonLd } from "@/lib/seo";
import { isHomepageIndiaRelevant } from "@/lib/homepage-curation";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";
import { BRAND } from "@/lib/brand";
import { discoverableContent } from "@/lib/topic-content";
import { COLLECTIONS } from "@/data/collections";
import { collectionFromEditorial } from "@/lib/collections";
import type { DiscoverableContent } from "@/lib/topics";
import type { EditorialHomepage, Paginated, CouponPublic } from "@/lib/types";

export const revalidate = 21600;

export async function generateMetadata(): Promise<Metadata> {
  const canonical = absoluteUrl("/");
  // Nested metadata is shallow-merged over the layout's, so repeat the shared
  // fields here instead of silently dropping og:site_name and fo-verify.
  // The homepage title is absolute: using the "%s | Durza" template here would
  // append the brand to a title that already contains it.
  const other: Record<string, string> = {
    "google-adsense-account": BRAND.adsensePublisherId,
    "fo-verify": BRAND.verification.foVerify,
  };
  if (process.env.MITGO_VERIFICATION) {
    other["mitgo-verification"] = process.env.MITGO_VERIFICATION;
  }
  return {
    title: { absolute: SITE_TITLE },
    description: SITE_DESCRIPTION,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "Durza Coupons India",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: canonical,
    },
    twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
    other,
  };
}

export default async function HomePage() {
  const emptyPage: Paginated<never> = { items: [], total: 0, skip: 0, limit: 0 };
  const emptyEditorial: EditorialHomepage = { guides: [], comparisons: [], reviews: [], collections: [] };
  const failedSources = new Set<string>();

  // A failed request still falls back so one slow rail cannot blank the page.
  // The failure is recorded: if it would produce the "no deals" state, the
  // regeneration must throw so ISR keeps the last good page instead of caching
  // an outage as an empty catalogue.
  const safe = async <T,>(promise: Promise<T>, fallback: T, source: string): Promise<T> =>
    promise.catch((error: unknown) => {
      failedSources.add(source);
      console.error(`[homepage] ${source} failed:`, error);
      return fallback;
    });

  // Every ordering and count below is the backend's answer to a real query. This page
  // never ranks, filters a sample, or estimates: a number on screen is a `total`.
  const [
    coupons,
    stores,
    categories,
    editorial,
    latestDeals,
    bestCoupons,
    allEditorial,
  ] = await Promise.all([
    safe(api.listCoupons({ active_only: true, sort: "recommended", limit: 24 }), emptyPage as Paginated<CouponPublic>, "recommended coupons"),
    safe(api.listStores({ limit: 100 }), emptyPage as Paginated<never>, "stores"),
    safe(api.listCategories({ limit: 24, live_only: true }), emptyPage as Paginated<never>, "categories"),
    safe(api.getEditorialHomepage(), emptyEditorial, "editorial homepage"),
    safe(
      api.listCoupons({ active_only: true, discount_type: "deal", has_code: false, sort: "newest", limit: 8 }),
      emptyPage as Paginated<CouponPublic>,
      "no-code deals",
    ),
    safe(
      api.listCoupons({
        active_only: true,
        has_code: true,
        sort: "newest",
        limit: 30,
      }),
      emptyPage as Paginated<CouponPublic>,
      "coupon codes",
    ),
    safe(discoverableContent(), [] as DiscoverableContent[], "topic content"),
  ]);

  // One ranked editorial pool feeds all three reading sections below the hero.
  const rankedEditorial = (contentType: DiscoverableContent["contentType"]) =>
    allEditorial
      .filter((item) => item.contentType === contentType)
      .sort((a, b) =>
        b.priority - a.priority
        || (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "")
        || a.title.localeCompare(b.title),
      );
  const homepageGuides = rankedEditorial("guide");
  const homepageComparisons = rankedEditorial("comparison").slice(0, 3);
  const homepageReviews = rankedEditorial("review").slice(0, 3);

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

  // One offer id appears once in the visible page. This is a presentation filter
  // over the backend's orders, not a re-ranking.
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

  // The hero's "Featured right now" panel: single spotlight card.
  const featuredCoupons = take(
    dedupeCoupons(coupons.items.filter(isHomepageRelevant).map((c) => sanitizeCouponForDisplay(c))),
    1,
  );

  // "Worth a look": prefer a real check date, then curated priority. One offer
  // per store is a separate presentation rule, not a second idea of "same".
  const seenStores = new Set<string>();
  const worthLooking = take(
    [...coupons.items, ...bestCoupons.items, ...latestDeals.items]
      .map((coupon) => sanitizeCouponForDisplay(coupon))
      .filter((coupon) => coupon.is_active && !coupon.auto_suppressed)
      .filter((coupon) => isHomepageRelevant(coupon))
      .filter((coupon) => {
        if (seenStores.has(coupon.store_id)) return false;
        seenStores.add(coupon.store_id);
        return true;
      })
      .sort((a, b) => {
        const checked = (c: (typeof a)) => (c.last_checked_at ? 1 : 0);
        return checked(b) - checked(a) || b.clicks_count - a.clicks_count || a.id.localeCompare(b.id);
      }),
    4,
  );

  const collectionsForRail = [
    ...editorial.collections.map((item) => collectionFromEditorial(item)).filter((entry) => entry !== null),
    ...COLLECTIONS,
  ];
  const toolkitCollection = collectionsForRail.find(
    (item) => item.slug === "complete-amazon-makeup-toolkit",
  );

  // Hero view-model. The search index is separate from the visible rails: it is
  // capped to keep the client payload small and keyed by coupon id, so the same
  // offer can be found even after a rail has claimed it.
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
  for (const list of [coupons.items, bestCoupons.items, latestDeals.items]) {
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
  const heroPopularStores = pickPopularStores(heroStores, 10);

  const hasEditorial = Object.values(editorial).some((items) => items.length > 0);
  const isEmpty = coupons.total === 0 && stores.total === 0 && categories.total === 0 && !hasEditorial;
  const criticalFailure = ["recommended coupons", "stores", "categories", "editorial homepage"].some(
    (source) => failedSources.has(source),
  );
  // During the first build there is no cached page to keep, so let the honest
  // empty state render. On a production revalidation, fail instead: Next keeps
  // the previously generated HTML rather than caching an outage for 6 hours.
  const isBuild = process.env.NEXT_PHASE === "phase-production-build";
  if (criticalFailure && isEmpty && process.env.NODE_ENV === "production" && !isBuild) {
    throw new Error(
      `Homepage data unavailable (${[...failedSources].join(", ")}); keeping the last good render.`,
    );
  }

  const homepageCollections = collectionsForRail.slice(0, 3).map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    heroImage: item.heroImage,
  }));

  // Structured data follows the offers actually rendered below.
  const visibleOffers = [...new Map(
    [...featuredCoupons, ...worthLooking].map((coupon) => [coupon.id, coupon]),
  ).values()];
  const offerItemListJsonLd = itemListJsonLd(
    visibleOffers.map((coupon) => ({ name: coupon.title, path: `/coupons/${coupon.slug}` })),
  );


  return (
    <div className="page-shell">
      <JsonLd data={offerItemListJsonLd} />
   

      <HomeHero
        deals={heroDeals}
        featured={heroFeatured}
        stores={heroStores}
        popularStores={heroPopularStores}
        stats={{ coupons: coupons.total, stores: stores.total, categories: categories.total }}
        toolkit={
          toolkitCollection
            ? {
                slug: toolkitCollection.slug,
                title: toolkitCollection.title,
                summary: toolkitCollection.summary,
                itemCountLabel: toolkitCollection.itemCountLabel,
                heroImage: toolkitCollection.heroImage,
              }
            : null
        }
      />

      <RedesignedSections
        offers={worthLooking}
        couponTotal={coupons.total}
        storesById={storesById}
        guides={homepageGuides}
        comparisons={homepageComparisons}
        reviews={homepageReviews}
        collections={homepageCollections}
      />
    </div>
  );
}
