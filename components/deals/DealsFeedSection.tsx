import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resilient } from "@/lib/api";
import type { DealCardStore } from "@/components/DealCard";
import EmptyState from "@/components/EmptyState";
import PopularChips from "@/components/PopularChips";
import DiscoveryStrip from "@/components/DiscoveryStrip";
import { isShowcaseStore } from "@/lib/showcase-stores";
import { formatStoreDisplayName } from "@/lib/store-display";
import SectionTitle from "@/components/SectionTitle";
import DealsFilterPanel from "@/components/filters/DealsFilterPanel";
import DealsSortControl from "@/components/filters/DealsSortControl";
import FilterLayout from "@/components/filters/FilterLayout";
import DealFeed from "@/components/deals/DealFeed";
import DealsCategoryPills from "@/components/deals/DealsCategoryPills";
import DealsMobileToolbar from "@/components/deals/DealsMobileToolbar";
import LoadMoreDeals from "@/components/deals/LoadMoreDeals";
import SpotlightDeal from "@/components/deals/SpotlightDeal";
import { parseDealFilters, resolveDealFacets, toDealQuery } from "@/lib/deal-discovery";
import { allowedStoreIds } from "@/lib/homepage-curation";
import { pickSpotlightDeal } from "@/lib/deal-feed";
import { dedupeCoupons, sanitizeCouponForDisplay } from "@/lib/feed-sanitize";
import { absoluteUrl } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const PAGE_SIZE = 20;

export default async function DealsFeedSection({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const filters = parseDealFilters(sp);
  const keywordValue = sp.q ?? sp.search;
  const keyword = (Array.isArray(keywordValue) ? keywordValue[0] : keywordValue)?.trim() ?? "";
  const skipValue = sp.skip;
  const skip = Math.max(Number(Array.isArray(skipValue) ? skipValue[0] : skipValue) || 0, 0);

  const [storesPage, categoriesPage] = await Promise.all([
    resilient.listStores({ limit: 100 }),
    resilient.listCategories({ limit: 100 }),
  ]);
  const stores = storesPage.items;
  const categories = categoriesPage.items;
  const resolved = resolveDealFacets(filters, stores, categories);
  const query = toDealQuery(filters, resolved, { skip, limit: PAGE_SIZE });
  if (keyword) query.search = keyword;
  // Focus: an Indian shopper. India-relevant stores only, unless the visitor
  // chose a store filter themselves.
  const indiaRelevantIds = resolved.store_ids.length === 0 ? allowedStoreIds(stores) : [];
  if (indiaRelevantIds.length) query.store_ids = indiaRelevantIds;

  const rawCoupons = resolved.unresolved
    ? { items: [], total: 0, skip, limit: PAGE_SIZE }
    : await resilient.listCoupons(query);
  const coupons = {
    ...rawCoupons,
    items: dedupeCoupons(rawCoupons.items.map((c) => sanitizeCouponForDisplay(c))),
  };

  const total = coupons.total;
  const page = Math.floor(skip / PAGE_SIZE) + 1;
  const pages = Math.max(Math.ceil(total / PAGE_SIZE), 1);

  const activeFilterCount =
    filters.stores.length +
    filters.categories.length +
    Number(filters.verifiedWithinHours !== undefined) +
    Number(filters.expiresWithinDays !== undefined);
  const filterPanel = (
    <DealsFilterPanel
      stores={stores.map((s) => ({ id: s.id, name: s.name, slug: s.slug }))}
      categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
      filters={filters}
    />
  );
  const pillCategories = categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }));
  const dealStores: DealCardStore[] = stores.map((store) => ({
    id: store.id,
    name: store.name,
    slug: store.slug,
    logo_url: store.logo_url,
    website_url: store.website_url,
    currency: store.currency,
  }));
  const categoryNames: Record<string, string> = Object.fromEntries(
    categories.map((category) => [category.id, category.name]),
  );
  // The mobile spotlight is an editorial pick, not a re-order: the list keeps
  // the backend's order, and the spotlight names a discount that same rendered
  // list can back — the steepest percentage, then the biggest fixed amount.
  const spotlight = pickSpotlightDeal(coupons.items);
  const paginationParams: Record<string, string | undefined> = {
    q: keyword || undefined,
    stores: filters.stores.length ? filters.stores.join(",") : undefined,
    categories: filters.categories.length ? filters.categories.join(",") : undefined,
    verified_within_hours: filters.verifiedWithinHours?.toString(),
    expires_within_days: filters.expiresWithinDays?.toString(),
    sort: filters.sort === "recommended" ? undefined : filters.sort,
  };
  const nextPageParams = new URLSearchParams();
  for (const [key, value] of Object.entries(paginationParams)) {
    if (value) nextPageParams.set(key, value);
  }
  nextPageParams.set("skip", String(skip + PAGE_SIZE));
  const nextPageHref = `/deals?${nextPageParams.toString()}`;
  const showcaseFallbackStores = (() => {
    if (coupons.items.length > 0) return [];
    const q = (keyword || filters.stores.join(" ") || "").trim().toLowerCase();
    if (!q) return [];
    const matched = stores.filter((s) => {
      if (!isShowcaseStore(s.slug)) return false;
      const display = formatStoreDisplayName(s).toLowerCase();
      return display.includes(q) || s.name.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q);
    });
    const seen = new Set<string>();
    return matched.filter((s) => (seen.has(s.slug) ? false : (seen.add(s.slug), true))).slice(0, 3);
  })();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Today's deals",
    itemListElement: coupons.items.slice(0, 10).map((coupon, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: coupon.title,
      url: absoluteUrl(`/coupons/${coupon.slug}`),
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Deals", item: absoluteUrl("/deals") },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <DealsMobileToolbar panel={filterPanel} activeFilterCount={activeFilterCount} />
      <DealsCategoryPills
        categories={pillCategories}
        active={filters.categories}
        params={paginationParams}
      />

      <FilterLayout mobileDrawer mobileTrigger="none" panel={filterPanel}>
        <div className="lx-results-head mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-ledger-line pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
              {total} deal{total === 1 ? "" : "s"}
              {total > 0 ? (
                <span className="hidden md:inline">{` · page ${page} of ${pages}`}</span>
              ) : null}
            </p>
            <p className="mt-1 hidden text-xs text-ink-soft md:block">
              {activeFilterCount > 0 ? "Filtered — only matching deals are shown." : "Every active deal, best match first."}
            </p>
          </div>
          <DealsSortControl sort={filters.sort} />
        </div>

        {(filters.stores.length > 0 || filters.categories.length > 0) && (
          <p className="mb-5 text-xs text-ink-soft">
            Selected: {[...filters.stores, ...filters.categories].join(" · ")}
          </p>
        )}

        {coupons.items.length === 0 ? (
          <>
            {showcaseFallbackStores.length > 0 && (
              <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {showcaseFallbackStores.map((s) => (
                  <Link key={s.id} href={`/stores/${s.slug}`} className="rounded-2xl border border-ledger-line bg-white p-4 shadow-sm transition hover:border-inkblue/30 hover:shadow-md">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Official Store Guide</p>
                    <p className="mt-2 font-serif text-lg font-extrabold text-ink">{formatStoreDisplayName(s)} Buying Guide &amp; Perks</p>
                    <p className="mt-1 text-sm text-ink-soft">This brand uses an editorial store page instead of coupon-feed rows. Browse its live perks, buying advice, and tracked store links.</p>
                    <span className="mt-3 inline-block text-sm font-semibold text-inkblue">Open store guide →</span>
                  </Link>
                ))}
              </div>
            )}
            <EmptyState
              title={keyword || activeFilterCount > 0 ? "No deals match those filters." : "No deals right now."}
              body={showcaseFallbackStores.length > 0 ? "No deal-feed rows matched, but you can explore the official store guide above." : "New codes land through the day — loosen a filter, or check back soon."}
              cta={{ href: "/deals", label: "All deals" }}
            >
              <PopularChips stores={stores} categories={categoriesPage.items} />
            </EmptyState>
          </>
        ) : (
          <>
            {spotlight ? (
              <SpotlightDeal
                coupon={spotlight}
                store={dealStores.find((store) => store.id === spotlight.store_id)}
                position={coupons.items.indexOf(spotlight) + 1}
              />
            ) : null}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <DealFeed
                coupons={coupons.items}
                startIndex={skip}
                stores={dealStores}
                categoryNames={categoryNames}
                hideOnMobileIds={spotlight ? [spotlight.id] : []}
              />
              <LoadMoreDeals
                key={nextPageHref}
                filters={filters}
                facets={resolved}
                keyword={keyword}
                baseSkip={skip}
                serverCount={coupons.items.length}
                serverIds={coupons.items.map((coupon) => coupon.id)}
                total={total}
                limit={PAGE_SIZE}
                stores={dealStores}
                categoryNames={categoryNames}
                nextHref={nextPageHref}
                storeIds={indiaRelevantIds}
              />
            </div>
          </>
        )}

        <p className="mt-4 text-right text-sm">
          <Link href="/coupons" className="text-inkblue hover:underline">
            All coupons
            <ArrowRight aria-hidden="true" className="inline h-3.5 w-3.5 align-[-2px]" strokeWidth={2} />
          </Link>
        </p>
        <DiscoveryStrip />
      </FilterLayout>
    </>
  );
}
