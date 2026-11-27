import { Suspense } from "react";
import type { Metadata } from "next";
import { resilient } from "@/lib/api";
import ViewMoreCoupons from "@/components/pagination/ViewMoreCoupons";
import EmptyState from "@/components/EmptyState";
import PopularChips from "@/components/PopularChips";
import DiscoveryStrip from "@/components/DiscoveryStrip";
import { isShowcaseStore } from "@/lib/showcase-stores";
import { formatStoreDisplayName } from "@/lib/store-display";
import CouponFilterPanel from "@/components/filters/CouponFilterPanel";
import FilterChips from "@/components/filters/FilterChips";
import FilterLayout from "@/components/filters/FilterLayout";
import KeywordForm from "@/components/filters/KeywordForm";
import SortControl from "@/components/filters/SortControl";
import { filterCount, parseFilters, resolveIds, toCouponQuery } from "@/lib/filters";
import { allowedStoreIds } from "@/lib/homepage-curation";
import { dedupeCoupons, sanitizeCouponForDisplay } from "@/lib/feed-sanitize";
import ListingHero from "@/components/listing/ListingHero";
import { absoluteUrl, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";


export const dynamic = "force-dynamic";
const PAGE_SIZE = 20;

export async function generateMetadata(): Promise<Metadata> {
  // The count is the backend's exact total for the same live list the page
  // shows, so the snippet can state it without qualifying it.
  const allStores = await resilient.listStores({ limit: 100 }).catch(() => ({ items: [], total: 0, skip: 0, limit: 0 }));
  const offers = await resilient.listCoupons({ active_only: true, limit: 1, store_ids: allowedStoreIds(allStores.items) });
  const total = offers.total;
  const title = total > 0 ? `Coupon Codes & Deals — ${total} Live Offers` : "Coupon Codes & Deals";
  const description =
    total > 0
      ? `Browse ${total} live coupon codes and deals for Indian stores — offer types and check dates are shown when available.`
      : "Browse coupon codes and deals for Indian online stores — offer types and check dates are shown when available.";
  const canonical = absoluteUrl("/coupons");
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CouponsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const skip = Math.max(Number(sp.skip) || 0, 0);

  const [storesPage, categoriesPage] = await Promise.all([
    resilient.listStores({ limit: 100 }),
    resilient.listCategories({ limit: 100 }),
  ]);
  const stores = storesPage.items;
  const categories = categoriesPage.items;
  const resolved = resolveIds(filters, stores, categories);

  // Focus: an Indian shopper. Restrict the listing to Indian-relevant stores
  // unless the visitor explicitly chose one. India D2C with no currency still
  // ranks fine on its own merits.
  const indiaRelevantIds = allowedStoreIds(stores);
  const query = toCouponQuery(filters, resolved, { skip, limit: PAGE_SIZE });
  // Coupons page defaults to coded offers so it does not duplicate the
  // no-code deals already shown on /deals. Visitors can still pick "Deal, no
  // code" from the code filter to browse auto-applied offers here.
  if (filters.code === "" || filters.code === undefined) query.has_code = true;
  if (!filters.store) query.store_ids = indiaRelevantIds;

  // A slug the catalogue doesn't know is not "no filter" — it is an empty page,
  // otherwise a typo silently shows every coupon under a chip that claims a store.
  const rawCoupons = resolved.unresolved
    ? { items: [], total: 0, skip, limit: PAGE_SIZE }
    : await resilient.listCoupons(query);
  const coupons = {
    ...rawCoupons,
    items: dedupeCoupons(rawCoupons.items.map((c) => sanitizeCouponForDisplay(c))),
  };

  const storeName = stores.find((s) => s.slug === filters.store)?.name;
  const categoryName = categories.find((c) => c.slug === filters.category)?.name;

  const showcaseFallbackStores = (() => {
    if (coupons.items.length > 0) return [];
    const q = (filters.q || filters.store || "").trim().toLowerCase();
    if (!q) return [];
    const matched = stores.filter((s) => {
      if (!isShowcaseStore(s.slug)) return false;
      const display = formatStoreDisplayName(s).toLowerCase();
      return display.includes(q) || s.name.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q);
    });
    // unique by slug, prefer exact-ish matches first
    const seen = new Set<string>();
    return matched.filter((s) => (seen.has(s.slug) ? false : (seen.add(s.slug), true))).slice(0, 3);
  })();

  const total = coupons.total;
  const heading = filters.q
    ? `Results for "${filters.q}"`
    : categoryName
      ? `${categoryName} coupons`
      : "All coupons";

  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <JsonLd data={breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Coupons", path: "/coupons" },
            ])} />
      <JsonLd data={itemListJsonLd(
              coupons.items.map((coupon) => ({ name: coupon.title, path: `/coupons/${coupon.slug}` })),
            )} />
      <ListingHero
        eyebrow={`${total.toLocaleString("en-IN")} ${filters.q || filterCount(filters) > 0 ? "matching" : "live"} coupon${total === 1 ? "" : "s"}`}
        title={heading}
        lead="Coupon codes and deals from tracked sources — check dates shown when we have them."
        controls={
          <Suspense fallback={null}>
            <KeywordForm size="bar" placeholder="Search promo codes by store or category..." label="Search promo codes by store or category" />
          </Suspense>
        }
        chips={categories.slice(0, 7).map((c) => ({ href: `/coupons?category=${c.slug}`, label: c.name }))}
        stats={[
          { value: total.toLocaleString("en-IN"), label: filters.q || filterCount(filters) > 0 ? "Matching offers" : "Live coupons", live: !(filters.q || filterCount(filters) > 0) },
          ...(storesPage.total > 0 ? [{ value: storesPage.total.toLocaleString("en-IN"), label: "Stores tracked" }] : []),
          ...(categoriesPage.total > 0 ? [{ value: categoriesPage.total.toLocaleString("en-IN"), label: "Categories" }] : []),
        ]}
      />

      <FilterLayout
        panel={
          <CouponFilterPanel
            stores={stores.map((s) => ({ id: s.id, name: s.name, slug: s.slug }))}
            categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
          />
        }
      >
        <div className="lx-results-head mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-ledger-line pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
              {total} coupon{total === 1 ? "" : "s"}
            </p>
            <p className="mt-1 max-w-prose text-xs text-ink-soft">
              Sorted and filtered by the API, so the counts below are exact.
            </p>
          </div>
          <SortControl />
        </div>

        <div className="mb-5">
          <FilterChips storeLabel={storeName} categoryLabel={categoryName} />
        </div>

        {coupons.items.length === 0 ? (
          <>
            {showcaseFallbackStores.length > 0 && (
              <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {showcaseFallbackStores.map((s) => (
                  <a key={s.id} href={`/stores/${s.slug}`} className="rounded-2xl border border-ledger-line bg-white p-4 shadow-sm transition hover:border-inkblue/30 hover:shadow-md">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Official Store Guide</p>
                    <p className="mt-2 font-serif text-lg font-extrabold text-ink">{formatStoreDisplayName(s)} Buying Guide &amp; Perks</p>
                    <p className="mt-1 text-sm text-ink-soft">This brand uses an editorial store page instead of coupon-feed rows. Browse its live perks, buying advice, and tracked store links.</p>
                    <span className="mt-3 inline-block text-sm font-semibold text-inkblue">Open store guide →</span>
                  </a>
                ))}
              </div>
            )}
            <EmptyState
              title={
                resolved.unresolved === "store"
                  ? `We don't know the store "${filters.store}".`
                  : resolved.unresolved === "category"
                    ? `We don't know the category "${filters.category}".`
                    : filters.q || filterCount(filters) > 0
                      ? "Nothing matches those filters."
                      : "Nothing matches yet."
              }
              body={
                resolved.unresolved
                  ? "It may have been renamed or removed since you last visited."
                  : showcaseFallbackStores.length > 0
                    ? "No coupon-feed rows matched, but you can explore the official store guide above."
                    : "Loosen a filter above, or check back soon — new codes land daily."
              }
              cta={{ href: "/coupons", label: "Browse all coupons" }}
            >
              <PopularChips stores={stores} categories={categoriesPage.items} />
            </EmptyState>
          </>
        ) : (
          <ViewMoreCoupons
            initialCoupons={coupons.items}
            total={total}
            query={query}
            initialSkip={skip}
            stores={stores.map((s) => ({
              id: s.id,
              name: s.name,
              slug: s.slug,
              logo_url: s.logo_url,
              website_url: s.website_url,
              currency: s.currency,
            }))}
            limit={PAGE_SIZE}
            gridClassName="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          />
        )}

        <DiscoveryStrip />
      </FilterLayout>
    </div>
  );
}
