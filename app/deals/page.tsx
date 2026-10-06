import type { Metadata } from "next";
import Link from "next/link";
import { resilient } from "@/lib/api";
import CouponRow from "@/components/CouponRow";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import SectionTitle from "@/components/SectionTitle";
import CouponFilterPanel from "@/components/filters/CouponFilterPanel";
import FilterChips from "@/components/filters/FilterChips";
import FilterLayout from "@/components/filters/FilterLayout";
import KeywordForm from "@/components/filters/KeywordForm";
import SortControl from "@/components/filters/SortControl";
import { carriedParams, filterCount, parseFilters, resolveIds, toCouponQuery } from "@/lib/filters";
import { absoluteUrl } from "@/lib/seo";

const PAGE_SIZE = 20;

export const metadata: Metadata = {
  title: "Today's deals",
  description: "Verified coupons and recorded price drops across stores.",
  alternates: { canonical: absoluteUrl("/deals") },
};

export default async function DealsPage({
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

  const [coupons, priceDrops] = await Promise.all([
    resolved.unresolved
      ? Promise.resolve({ items: [], total: 0, skip, limit: PAGE_SIZE })
      : resilient.listCoupons(toCouponQuery(filters, resolved, { skip, limit: PAGE_SIZE })),
    // Price drops are a different list with their own (much smaller) shape, so
    // they carry the keyword only — the coupon filters cannot apply to them.
    filters.q
      ? Promise.resolve({ items: [], total: 0, skip: 0, limit: 50 })
      : resilient.listProducts({ limit: 50 }),
  ]);

  const storeById = new Map(stores.map((s) => [s.id, s]));
  const storeName = stores.find((s) => s.slug === filters.store)?.name;
  const categoryName = categories.find((c) => c.slug === filters.category)?.name;
  const total = coupons.total;
  const page = Math.floor(skip / PAGE_SIZE) + 1;
  const pages = Math.max(Math.ceil(total / PAGE_SIZE), 1);

  const drops = priceDrops.items
    .filter((p) => p.last_price_drop_pct != null)
    .sort((a, b) => (b.last_price_drop_pct ?? 0) - (a.last_price_drop_pct ?? 0))
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-2 font-serif text-3xl text-ink">Today&apos;s deals</h1>
      <p className="mb-8 text-sm text-ink-soft">
        What shoppers most recently confirmed working, and where prices moved.
      </p>
      <div className="mb-8">
        <KeywordForm
          placeholder="Search today's deals…"
          label="Search today's deals"
        />
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
              {total} deal{total === 1 ? "" : "s"}
              {total > 0 ? ` · page ${page} of ${pages}` : ""}
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              {filterCount(filters) > 0 ? "Filtered — only matching deals are shown." : "Every active deal, best match first."}
            </p>
          </div>
          <SortControl />
        </div>

        <div className="mb-5">
          <FilterChips storeLabel={storeName} categoryLabel={categoryName} />
        </div>

        {coupons.items.length === 0 ? (
          <EmptyState
            title={filters.q || filterCount(filters) > 0 ? "No deals match those filters." : "No deals right now."}
            body="New codes land through the day — loosen a filter, or check back soon."
            cta={{ href: "/deals", label: "All deals" }}
          />
        ) : (
          <div>
            {coupons.items.map((coupon) => {
              const store = storeById.get(coupon.store_id);
              return (
                <CouponRow
                  key={coupon.id}
                  coupon={coupon}
                  store={store ? { name: store.name, logoUrl: store.logo_url } : undefined}
                />
              );
            })}
          </div>
        )}

        <Pagination
          basePath="/deals"
          searchParams={carriedParams(sp)}
          skip={skip}
          limit={PAGE_SIZE}
          total={total}
        />

        {!filters.q && (
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
            All coupons →
          </Link>
        </p>
      </FilterLayout>
    </div>
  );
}
