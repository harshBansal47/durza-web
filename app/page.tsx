import type { Metadata } from "next";
import Link from "next/link";
import { CouponCardGrid } from "@/components/CouponCard";
import SectionTitle from "@/components/SectionTitle";
import Hero from "@/components/home/Hero";
import BannerCarousel from "@/components/home/BannerCarousel";
import CategoryRow from "@/components/home/CategoryRow";
import StoreMarquee from "@/components/home/StoreMarquee";
import HowItWorks from "@/components/home/HowItWorks";
import DealsCarousel from "@/components/home/DealsCarousel";
import { getSponsored } from "@/lib/ads";
import { api } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";
import { NewDealsRow, RecentlyVerifiedRow } from "@/components/discovery/Discovery";
import { RecommendedRow } from "@/components/discovery/Recommended";
import { Reveal } from "@/components/Reveal";
import { EditorialCard, EditorialSection } from "@/components/editorial/EditorialComponents";
import type { EditorialContent, EditorialHomepage, Paginated, CouponPublic } from "@/lib/types";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: { canonical: absoluteUrl("/") } };
}

async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  return promise.catch(() => fallback);
}

const PILLARS = [
  {
    title: "Sourced, not scraped",
    body: "Every offer links to the store page it was read from, with the date we last checked it — not a marketing claim.",
    points: [
      "Source page on every offer",
      "Check date on every card",
      "Codes only where the store published them",
    ],
  },
  {
    title: "Commission disclosed",
    body: "We publish what we earn on every store and coupon page. Expected earnings are one weighted input in ranking — and we say so.",
    points: ["Per-store commission note", "Sponsored placements are labelled", "Ranking inputs explained"],
  },
  {
    title: "Evidence over urgency",
    body: "Expiry dates come from the store's own terms, not countdown theatre. Expired offers are hidden and archived.",
    points: ["Expiry from store terms", "Expired offers removed", "Price history per product"],
  },
];

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
    topRated,
    endingSoon,
    recentlyVerified,
    verifiedToday,
    newest,
    biggest,
    editorial,
    latestComparisons,
    recentReviews,
    latestDeals,
    bestCoupons,
    headerAd,
  ] = await Promise.all([
    safe(api.listCoupons({ active_only: true, sort: "recommended", limit: 24 }), emptyPage as Paginated<CouponPublic>),
    safe(api.listStores({ limit: 100 }), emptyPage as Paginated<never>),
    safe(api.listCategories({ limit: 24 }), emptyPage as Paginated<never>),
    safe(api.listCoupons({ active_only: true, sort: "top_rated", limit: 8 }), emptyPage as Paginated<CouponPublic>),
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
    safe(
      api.listCoupons({ active_only: true, sort: "biggest_discount", limit: 4 }),
      emptyPage as Paginated<CouponPublic>,
    ),
    safe(api.getEditorialHomepage(), emptyEditorial),
    safe(api.listEditorial({ content_type: "comparison", limit: 3 }), emptyEditorialPage),
    safe(api.listEditorial({ content_type: "review", limit: 3 }), emptyEditorialPage),
    safe(
      api.listCoupons({ active_only: true, discount_type: "deal", has_code: false, sort: "newest", limit: 8 }),
      emptyPage as Paginated<CouponPublic>,
    ),
    safe(
      api.listCoupons({ active_only: true, has_code: true, sort: "recommended", limit: 8 }),
      emptyPage as Paginated<CouponPublic>,
    ),
    getSponsored("header"),
  ]);

  // The store list is a lookup table for card badges (every card needs its store); the
  // marquee only shows the first dozen.
  const cardStores = stores.items.map((s) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    logo_url: s.logo_url,
    currency: s.currency,
  }));

  const confirmed = topRated.items;

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

  const spotlight = take(coupons.items, 3);
  const latestDealsItems = take(latestDeals.items, 8);
  const endingSoonItems = take(endingSoon.items, 8);
  const confirmedItems = take(confirmed, 8);
  const recentlyVerifiedItems = take(recentlyVerified.items, 8);
  const biggestItems = take(biggest.items, 4);
  const bestCouponsItems = take(bestCoupons.items, 8);
  // A presentation filter over the backend's recommended order (not a re-ranking).
  const evergreen = take(
    coupons.items.filter((c) => c.expires_at === null && c.code !== null),
    4,
  );
  const newestItems = take(newest.items, 8);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Durza",
    alternateName: "Durza: Coupon & Deals",
    url: absoluteUrl("/"),
    description:
      "Find trusted deals, compare products, and use practical buying guides and reviews to save before you buy.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/search")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const hasEditorial = Object.values(editorial).some((items) => items.length > 0)
    || latestComparisons.items.length > 0
    || recentReviews.items.length > 0;
  const isEmpty = coupons.total === 0 && stores.total === 0 && categories.total === 0 && !hasEditorial;

  return (
    <div className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <Hero
        stats={[
          { label: "Active coupons", value: coupons.total },
          { label: "Stores", value: stores.total },
          { label: "Categories", value: categories.total },
        ]}
        popularStores={stores.items.map((st) => ({ id: st.id, name: st.name, slug: st.slug }))}
        spotlight={spotlight}
        verifiedToday={verifiedToday.total}
        endingSoon={endingSoon.total}
      />

      {isEmpty ? (
       <section className="section-panel mt-12 px-6 py-14 text-center">
          <h2 className="font-serif text-2xl font-extrabold text-ink">No deals listed yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
            The catalogue is empty. That is the honest state — we would rather show nothing than
            pad the page with offers we cannot source.
          </p>
        </section>
      ) : (
        <>
          {categories.items.length > 0 && (
            <section className="mt-10" id="categories" aria-label="Shop by category">
              <CategoryRow categories={categories.items} />
            </section>
          )}

          <EditorialSection
            title="Featured buying guides"
            items={editorial.guides}
            href="/guides"
            label="All guides"
          />

          <EditorialSection
            title="Latest comparisons"
            items={latestComparisons.items}
            href="/compare"
            label="All comparisons"
          />

          {latestDealsItems.length > 0 && (
            <section className="section-panel-muted mt-12 p-5 sm:p-6" aria-labelledby="latest-deals-heading">
              <SectionTitle hint="tracked offers">
                <span id="latest-deals-heading">Latest deals</span>
              </SectionTitle>
              <DealsCarousel coupons={latestDealsItems} stores={cardStores} label="Latest deals" pageType="homepage" />
              <p className="mt-2 text-right text-sm">
                <Link href="/deals" className="font-semibold text-rust hover:underline">Browse all deals →</Link>
              </p>
            </section>
          )}

          {endingSoonItems.length > 0 && (
            <section className="section-panel-muted mt-12 p-5 sm:p-6" aria-labelledby="ending-heading">
              <SectionTitle hint="real expiry dates only">
                <span id="ending-heading">Ending soon</span>
              </SectionTitle>
              <DealsCarousel coupons={endingSoonItems} stores={cardStores} label="Deals ending soon" pageType="homepage" />
              <p className="mt-2 text-right text-sm">
                <Link href="/coupons" className="font-semibold text-rust hover:underline">
                  All coupons →
                </Link>
              </p>
            </section>
          )}

          {confirmedItems.length > 0 && (
            <section className="mt-12" aria-labelledby="confirmed-heading">
              <SectionTitle hint={`${confirmedItems.length} with shopper votes`}>
                <span id="confirmed-heading">Top rated by shoppers</span>
              </SectionTitle>
              <DealsCarousel coupons={confirmedItems} stores={cardStores} label="Deals rated by shoppers" pageType="homepage" />
            </section>
          )}

          <div className="mt-12">
            <RecommendedRow />
          </div>

          <div className="mt-12">
            <RecentlyVerifiedRow coupons={recentlyVerifiedItems} stores={cardStores} />
          </div>

          <section className="mt-8">
            <BannerCarousel sponsored={headerAd} />
          </section>

          {biggestItems.length > 0 && (
            <section className="mt-12" aria-labelledby="biggest-heading">
              <SectionTitle hint="percentage offers only">
                <span id="biggest-heading">Biggest % off</span>
              </SectionTitle>
              <CouponCardGrid
                coupons={biggestItems}
                stores={cardStores}
                variant="featured"
                className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              />
            </section>
          )}

          {stores.items.length > 0 && (
            <section className="section-panel mt-12 p-5 sm:p-6" aria-labelledby="stores-heading">
              <SectionTitle hint={`${stores.total} tracked`}>
                <span id="stores-heading">Stores we track</span>
              </SectionTitle>
              <StoreMarquee stores={stores.items.slice(0, 12)} />
              <p className="mt-4 text-right text-sm">
                <Link href="/stores" className="font-semibold text-inkblue hover:underline">
                  All stores →
                </Link>
              </p>
            </section>
          )}

          {bestCouponsItems.length > 0 && (
            <section className="mt-12" aria-labelledby="best-coupons-heading">
              <SectionTitle hint="codes only">
                <span id="best-coupons-heading">Best coupons</span>
              </SectionTitle>
              <CouponCardGrid
                coupons={bestCouponsItems}
                stores={cardStores}
                variant="featured"
                className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              />
              <p className="mt-3 text-right text-sm">
                <Link href="/coupons" className="font-semibold text-inkblue hover:underline">Browse all coupons →</Link>
              </p>
            </section>
          )}

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
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Built around your goals</p>
                  <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink sm:text-3xl">Curated collections</h2>
                </div>
                <Link href="/collections" className="min-h-11 inline-flex items-center text-sm font-bold text-inkblue hover:underline">All collections →</Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {editorial.collections.slice(0, 3).map((item) => <EditorialCard key={item.id} content={item} />)}
              </div>
            </section>
          )}

          {evergreen.length > 0 && (
            <section className="mt-12">
              <SectionTitle hint="no expiry date">Codes with no expiry</SectionTitle>
              <CouponCardGrid
                coupons={evergreen}
                stores={cardStores}
                variant="featured"
                className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              />
            </section>
          )}

          <div className="mt-12">
            <NewDealsRow coupons={newestItems} stores={cardStores} />
          </div>

          <section className="mt-16">
            <SectionTitle>How it works</SectionTitle>
            <HowItWorks />
          </section>

          <Reveal>
          <section className="mt-16">
            <h2 className="text-center font-serif text-2xl font-extrabold text-ink sm:text-3xl">
              Why this is not a red-badge countdown site
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {PILLARS.map((pillar, i) => (
                <li
                  key={pillar.title}
                  className="info-card lift p-6"
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl text-white ${
                      i === 0 ? "bg-verified" : i === 1 ? "bg-rust" : "bg-[#1b1836]"
                    }`}
                  >
                    {i === 0 ? "✓" : i === 1 ? "%" : "↗"}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-bold text-ink">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{pillar.body}</p>
                  <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-verified-soft text-[10px] font-bold text-verified"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
          </Reveal>
        </>
      )}
    </div>
  );
}
