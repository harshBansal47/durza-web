import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resilient } from "@/lib/api";
import type { DealCardStore } from "@/components/DealCard";
import EmptyState from "@/components/EmptyState";
import PopularChips from "@/components/PopularChips";
import Pagination from "@/components/Pagination";
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
import { pickSpotlightDeal } from "@/lib/deal-feed";
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

  const [coupons, priceDrops] = await Promise.all([
    resolved.unresolved
      ? Promise.resolve({ items: [], total: 0, skip, limit: PAGE_SIZE })
      : resilient.listCoupons(query),
    // Price drops are a different list with their own (much smaller) shape, so
    // they carry the keyword only — the coupon filters cannot apply to them.
    keyword
      ? Promise.resolve({ items: [], total: 0, skip: 0, limit: 50 })
      : resilient.listProducts({ limit: 20 }),
  ]);

  const total = coupons.total;
  const page = Math.floor(skip / PAGE_SIZE) + 1;
  const pages = Math.max(Math.ceil(total / PAGE_SIZE), 1);

  const drops = priceDrops.items
    .filter((p) => p.last_price_drop_pct != null)
    .sort((a, b) => (b.last_price_drop_pct ?? 0) - (a.last_price_drop_pct ?? 0))
    .slice(0, 6);
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
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-ledger-line pb-4">
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
          <EmptyState
            title={keyword || activeFilterCount > 0 ? "No deals match those filters." : "No deals right now."}
            body="New codes land through the day — loosen a filter, or check back soon."
            cta={{ href: "/deals", label: "All deals" }}
          >
            <PopularChips stores={stores} categories={categoriesPage.items} />
          </EmptyState>
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
              />
            </div>
          </>
        )}

        {/* Phones advance with "Load more deals…" in place; the numbered footer stays for desktop. */}
        <div className="hidden md:block">
          <Pagination
            basePath="/deals"
            searchParams={paginationParams}
            skip={skip}
            limit={PAGE_SIZE}
            total={total}
          />
        </div>

        {!keyword && (
          <section className="mt-16">
            <SectionTitle hint="from recorded price history">Price drops</SectionTitle>
            {drops.length === 0 ? (
              <p className="py-6 text-sm text-ink-soft">
                Price drops will appear here as soon as observations come in.
              </p>
            ) : (
            <ul className="divide-y divide-ledger-line border-y border-ledger-line">
              {drops.map((p) => (
                <li key={p.id} className="flex items-baseline justify-between py-3">
                  <span className="text-ink">{p.name}</span>
                  <span className="font-mono text-sm">
                    <span className="text-verified">↓{p.last_price_drop_pct}%</span>
                    <span className="ml-3 text-ink">₹{p.current_price?.toLocaleString("en-IN")}</span>
                    {p.lowest_price_90d != null && (
                      <span className="ml-3 text-ink-soft">
                        90d low ₹{p.lowest_price_90d.toLocaleString("en-IN")}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
            </section>
        )}
        <p className="mt-4 text-right text-sm">
          <Link href="/coupons" className="text-inkblue hover:underline">
            All coupons
            <ArrowRight aria-hidden="true" className="inline h-3.5 w-3.5 align-[-2px]" strokeWidth={2} />
          </Link>
        </p>
      </FilterLayout>
    </>
  );
}
