import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Store, Flame } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Hero from "@/components/home/Hero";
import ActivityTicker, { type ActivityItem } from "@/components/home/ActivityTicker";
import CategoryGrid from "@/components/home/CategoryGrid";
import CategoryTileGrid from "@/components/home/CategoryTileGrid";
import StatBand from "@/components/home/StatBand";
import StoreTrackGrid from "@/components/home/StoreTrackGrid";
import VerifiedDealsExplorer from "@/components/home/VerifiedDealsExplorer";
import HowItWorks from "@/components/home/HowItWorks";
import { api } from "@/lib/api";
import { formatRelativeTime } from "@/lib/format";
import { absoluteUrl } from "@/lib/seo";
import { REDESIGN_ENABLED } from "@/lib/flags";
import { isHomepageIndiaRelevant } from "@/lib/homepage-curation";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";
import { BRAND } from "@/lib/brand";
import { EditorialCard, EditorialSection } from "@/components/editorial/EditorialComponents";
import { staticFeaturedGuides } from "@/lib/static-editorial";
import type { EditorialContent, EditorialHomepage, Paginated, CouponPublic } from "@/lib/types";

export const revalidate = 300;

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
    stores.items.map((s) => [s.id, { name: s.name, slug: s.slug, logo_url: s.logo_url, website_url: s.website_url }]),
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

  const lastCheckedAt = REDESIGN_ENABLED
    ? (coupons.items.map((c) => c.last_checked_at).filter(Boolean).sort().pop() ?? null)
    : null;

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

  const spotlight = take(coupons.items.filter(isHomepageRelevant), 1);
  const recentlyVerifiedItems = take(recentlyVerified.items.filter(isHomepageRelevant), 8);
  // Tab pools for the unified Verified Deals Explorer. The shared `shown` set
  // keeps every offer unique across the page: nothing that landed in the hero
  // or an earlier tab reappears in a later one.
  const fill = (pool: CouponPublic[], limit = 6): CouponPublic[] => {
    const picked: CouponPublic[] = [];
    for (const item of pool) {
      if (shown.has(item.id)) continue;
      shown.add(item.id);
      picked.push(item);
      if (picked.length >= limit) break;
    }
    return picked;
  };
  const backfill = (picked: CouponPublic[]): CouponPublic[] => {
    const extra: CouponPublic[] = [];
    for (const item of coupons.items.filter(isHomepageRelevant)) {
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

  const hasEditorial = Object.values(editorial).some((items) => items.length > 0)
    || latestComparisons.items.length > 0
    || recentReviews.items.length > 0;
  const isEmpty = coupons.total === 0 && stores.total === 0 && categories.total === 0 && !hasEditorial;

  return (
    <div className="page-shell">

      <Hero
        stats={[
          { label: "Active coupons", value: coupons.total },
          { label: "Stores", value: stores.total },
          { label: "Categories", value: categories.total },
        ]}
        popularStores={stores.items.map((st) => ({
          id: st.id,
          name: st.name,
          slug: st.slug,
          logo_url: st.logo_url,
          website_url: st.website_url,
        }))}
        spotlight={spotlight}
        verifiedToday={verifiedToday.total}
        endingSoon={endingSoon.total}
        showStats={!REDESIGN_ENABLED}
      />

      {REDESIGN_ENABLED && (
        <section className="mt-6" aria-label="Site stats">
          <StatBand
            coupons={coupons.total}
            stores={stores.total}
            categories={categories.total}
            lastCheckedAt={lastCheckedAt}
          />
        </section>
      )}

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
          <ActivityTicker items={activityItems} />

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


          <section className="mt-12 rounded-2xl border border-orange-200/80 bg-gradient-to-r from-orange-50/90 via-amber-50/50 to-white p-6 md:p-8" aria-labelledby="black-friday-heading">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-orange-700">Black Friday in India · 27 Nov 2026</p>
            <h2 id="black-friday-heading" className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Black Friday 2026 — where to actually save</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft sm:text-base">
              What is historically on sale, which stores run real discounts, and how to stack bank offers on top — nothing on this page requires a countdown timer.
            </p>
            <Link href="/black-friday" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
              Open the Black Friday hub
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </section>

          <section className="mt-12" aria-labelledby="deals-explorer-heading">
            <SectionTitle hint="every card read from the store's own page" icon={Flame} action={{ href: "/deals", label: "Browse all deals" }}>
              <span id="deals-explorer-heading">Checked Deals Explorer</span>
            </SectionTitle>
            <VerifiedDealsExplorer tabs={explorerTabs} storesById={storesById} />
          </section>

          <section className="mt-12 rounded-2xl border border-orange-200/80 bg-gradient-to-r from-orange-50/90 via-amber-50/50 to-white p-6 md:p-8" aria-labelledby="smart-stacking-heading">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-orange-700">Smart Stacking</p>
            <h2 id="smart-stacking-heading" className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Don&apos;t just copy codes — stack them.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft sm:text-base">
              Use Durza&apos;s interactive store matchers to combine base store discounts, verified promo codes, and extra 5% UPI prepaid savings.
            </p>
            <Link href="/stores" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
              Explore Smart Store Guides
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </section>

          <EditorialSection
            title="Featured buying guides"
            items={[...staticFeaturedGuides(1), ...editorial.guides.slice(0, 2), ...staticFeaturedGuides(3).slice(1)].slice(0, 3)}
            href="/guides"
            label="All guides"
            wideFirst={REDESIGN_ENABLED}
          />

          <EditorialSection
            title="Latest comparisons"
            items={latestComparisons.items}
            href="/compare"
            label="All comparisons"
          />

          <section className="mt-8 rounded-2xl border border-verified/15 bg-verified-soft/50 px-5 py-5 sm:px-7" aria-label="Our deal standards">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-bold text-ink">Real offers. Clear proof.</p>
                <p className="mt-1 text-sm text-ink-soft">Every deal has a source and a check date. No fake countdowns or manufactured urgency.</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-verified-ink">
                {["Clear dates", "No fake urgency", "Sourced from stores"].map((label) => <span key={label} className="rounded-full bg-white px-3 py-2">✓ {label}</span>)}
              </div>
            </div>
          </section>

          <EditorialSection
            title="Recent reviews"
            items={recentReviews.items}
            href="/reviews"
            label="All reviews"
          />

          {editorial.collections.length > 0 && (
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
                {editorial.collections.slice(0, 3).map((item) => <EditorialCard key={item.id} content={item} />)}
              </div>
            </section>
          )}

          <section className="mt-16">
            <SectionTitle icon={Compass}>How it works</SectionTitle>
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
