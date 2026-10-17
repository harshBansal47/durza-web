import type { Metadata } from "next";
import { resilient } from "@/lib/api";
import CouponRow from "@/components/CouponRow";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";
import CouponFilterPanel from "@/components/filters/CouponFilterPanel";
import FilterChips from "@/components/filters/FilterChips";
import FilterLayout from "@/components/filters/FilterLayout";
import KeywordForm from "@/components/filters/KeywordForm";
import SortControl from "@/components/filters/SortControl";
import { carriedParams, filterCount, parseFilters, resolveIds, toCouponQuery } from "@/lib/filters";
import { absoluteUrl, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

export const revalidate = 300;

const PAGE_SIZE = 20;

export async function generateMetadata(): Promise<Metadata> {
  // The count is the backend's exact total for the same live list the page
  // shows, so the snippet can state it without qualifying it.
  const offers = await resilient.listCoupons({ active_only: true, limit: 1 });
  const total = offers.total;
  const title = total > 0 ? `Coupons & Promo Codes: ${total} Live Offers` : "Coupons & Promo Codes";
  const description =
    total > 0
      ? `Browse ${total} live coupon codes and deals on Durza — each offer shows the store page it came from and when it was last checked.`
      : "Coupon codes and deals, each sourced from the store's own page with the date it was last checked.";
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

  // A slug the catalogue doesn't know is not "no filter" — it is an empty page,
  // otherwise a typo silently shows every coupon under a chip that claims a store.
  const coupons = resolved.unresolved
    ? { items: [], total: 0, skip, limit: PAGE_SIZE }
    : await resilient.listCoupons(
        toCouponQuery(filters, resolved, { skip, limit: PAGE_SIZE }),
      );

  const storeById = new Map(stores.map((s) => [s.id, s]));
  const storeName = stores.find((s) => s.slug === filters.store)?.name;
  const categoryName = categories.find((c) => c.slug === filters.category)?.name;

  const total = coupons.total;
  const page = Math.floor(skip / PAGE_SIZE) + 1;
  const pages = Math.max(Math.ceil(total / PAGE_SIZE), 1);
  const heading = filters.q
    ? `Results for "${filters.q}"`
    : categoryName
      ? `${categoryName} coupons`
      : "All coupons";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Coupons", path: "/coupons" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              coupons.items.map((coupon) => ({ name: coupon.title, path: `/coupons/${coupon.slug}` })),
            ),
          ),
        }}
      />
      <h1 className="mb-4 font-serif text-4xl font-extrabold text-ink sm:text-5xl">{heading}</h1>
      <div className="mb-8">
        <KeywordForm placeholder="Search coupons, brands or stores…" label="Search coupons" />
      </div>

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
              {total > 0 ? ` · page ${page} of ${pages}` : ""}
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
          />
        ) : (
          <div>
            {coupons.items.map((coupon) => {
              const store = storeById.get(coupon.store_id);
              return (
                <CouponRow
                  key={coupon.id}
                  coupon={coupon}
                  store={store ? { name: store.name, slug: store.slug, logoUrl: store.logo_url } : undefined}
                />
              );
            })}
          </div>
        )}

        <Pagination
          basePath="/coupons"
          searchParams={carriedParams(sp)}
          skip={skip}
          limit={PAGE_SIZE}
          total={total}
        />
      </FilterLayout>
    </div>
  );
}
