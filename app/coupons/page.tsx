import type { Metadata } from "next";
import { resilient } from "@/lib/api";
import ViewMoreCoupons from "@/components/pagination/ViewMoreCoupons";
import EmptyState from "@/components/EmptyState";
import PopularChips from "@/components/PopularChips";
import CouponFilterPanel from "@/components/filters/CouponFilterPanel";
import FilterChips from "@/components/filters/FilterChips";
import FilterLayout from "@/components/filters/FilterLayout";
import KeywordForm from "@/components/filters/KeywordForm";
import SortControl from "@/components/filters/SortControl";
import { filterCount, parseFilters, resolveIds, toCouponQuery } from "@/lib/filters";
import { allowedStoreIds } from "@/lib/homepage-curation";
import PageTitle from "@/components/ui/PageTitle";
import { absoluteUrl, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const revalidate = 900;

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
      ? `Browse ${total} live coupon codes and promo offers for Indian stores — each one shows the store page it came from and when it was last checked.`
      : "Browse coupon codes and promo offers for Indian online stores — each one shows the store page it came from and when it was last checked.";
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
  if (!filters.store) query.store_ids = indiaRelevantIds;

  // A slug the catalogue doesn't know is not "no filter" — it is an empty page,
  // otherwise a typo silently shows every coupon under a chip that claims a store.
  const coupons = resolved.unresolved
    ? { items: [], total: 0, skip, limit: PAGE_SIZE }
    : await resilient.listCoupons(query);

  const storeName = stores.find((s) => s.slug === filters.store)?.name;
  const categoryName = categories.find((c) => c.slug === filters.category)?.name;

  const total = coupons.total;
  const heading = filters.q
    ? `Results for "${filters.q}"`
    : categoryName
      ? `${categoryName} coupons`
      : "All coupons";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <JsonLd data={breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Coupons", path: "/coupons" },
            ])} />
      <JsonLd data={itemListJsonLd(
              coupons.items.map((coupon) => ({ name: coupon.title, path: `/coupons/${coupon.slug}` })),
            )} />
      <PageTitle className="mb-2">{heading}</PageTitle>
      <p className="mb-5 max-w-xl text-sm text-ink-soft">
        Codes from the store&apos;s own pages — checked date shown on every card.
      </p>

      <FilterLayout
        panel={
          <CouponFilterPanel
            stores={stores.map((s) => ({ id: s.id, name: s.name, slug: s.slug }))}
            categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
          />
        }
      >
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-ledger-line pb-4">
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
                : "Loosen a filter above, or check back soon — new codes land daily."
            }
            cta={{ href: "/coupons", label: "Browse all coupons" }}
          >
            <PopularChips stores={stores} categories={categoriesPage.items} />
          </EmptyState>
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

      </FilterLayout>
    </div>
  );
}
