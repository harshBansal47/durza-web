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
import type { Paginated, CouponPublic } from "@/lib/types";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: { canonical: absoluteUrl("/") } };
}

async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  return promise.catch(() => fallback);
}

const PILLARS = [
  {
    title: "Community-confirmed",
    body: "Every code carries a real success rate from real shopper reports — not a marketing claim.",
    points: ["Worked / didn't-work voting", "Success rate on every code", "Full verification timeline"],
  },
  {
    title: "Commission disclosed",
    body: "We publish what we earn on every store and coupon page. No hidden affiliate incentives.",
    points: ["Per-store commission note", "No pay-to-play placement", "Independent editorial order"],
  },
  {
    title: "Evidence over urgency",
    body: "Freshness is measured by verification activity, not countdown clocks. Expired codes are archived.",
    points: ["Freshness from verification", "Dead codes removed", "Price history per product"],
  },
];

export default async function HomePage() {
  const emptyPage: Paginated<never> = { items: [], total: 0, skip: 0, limit: 0 };

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

  // A presentation filter over the backend's recommended order (not a re-ranking).
  const evergreen = coupons.items.filter((c) => c.expires_at === null && c.code !== null).slice(0, 4);

  const spotlight = coupons.items.slice(0, 3);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Savevero",
    url: absoluteUrl("/"),
    description:
      "Community-confirmed coupon codes and price drops, with affiliate commission disclosed on every page.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/search")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const isEmpty = coupons.total === 0 && stores.total === 0 && categories.total === 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
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
        <section className="mt-12 rounded-[24px] border-2 border-dashed border-ledger-line bg-white px-6 py-14 text-center">
          <h2 className="font-serif text-2xl font-extrabold text-ink">No deals listed yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
            The catalogue is empty. That is the honest state — we would rather show nothing than
            pad the page with codes nobody has confirmed.
          </p>
        </section>
      ) : (
        <>
          {categories.items.length > 0 && (
            <section className="mt-10" id="categories" aria-label="Shop by category">
              <CategoryRow categories={categories.items} />
            </section>
          )}

          {endingSoon.items.length > 0 && (
            <section className="mt-12 rounded-[24px] border border-rust/25 bg-rust-soft/60 p-5 sm:p-6" aria-labelledby="ending-heading">
              <SectionTitle hint="real expiry dates only">
                <span id="ending-heading">Ending soon</span>
              </SectionTitle>
              <DealsCarousel coupons={endingSoon.items} stores={cardStores} label="Deals ending soon" pageType="homepage" />
              <p className="mt-2 text-right text-sm">
                <Link href="/coupons" className="font-semibold text-rust hover:underline">
                  All coupons →
                </Link>
              </p>
            </section>
          )}

          {confirmed.length > 0 && (
            <section className="mt-12" aria-labelledby="confirmed-heading">
              <SectionTitle hint={`${confirmed.length} confirmed`}>
                <span id="confirmed-heading">Confirmed by shoppers</span>
              </SectionTitle>
              <DealsCarousel coupons={confirmed} stores={cardStores} label="Deals confirmed by shoppers" pageType="homepage" />
            </section>
          )}

          <div className="mt-12">
            <RecommendedRow />
          </div>

          <div className="mt-12">
            <RecentlyVerifiedRow coupons={recentlyVerified.items} stores={cardStores} />
          </div>

          <section className="mt-8">
            <BannerCarousel sponsored={headerAd} />
          </section>

          {biggest.items.length > 0 && (
            <section className="mt-12" aria-labelledby="biggest-heading">
              <SectionTitle hint="percentage offers only">
                <span id="biggest-heading">Biggest % off</span>
              </SectionTitle>
              <CouponCardGrid
                coupons={biggest.items}
                stores={cardStores}
                variant="featured"
                className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              />
            </section>
          )}

          {stores.items.length > 0 && (
            <section className="mt-12" aria-labelledby="stores-heading">
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
            <NewDealsRow coupons={newest.items} stores={cardStores} />
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
                  className="lift rounded-[22px] border border-ledger-line bg-white p-6 shadow-[var(--shadow-hairline)]"
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
