import type { Metadata } from "next";
import Link from "next/link";
import { resilient } from "@/lib/api";
import { CouponCard } from "@/components/CouponCard";
import SectionTitle from "@/components/SectionTitle";
import PageTitle from "@/components/ui/PageTitle";
import EmptyState from "@/components/EmptyState";
import { TrackEvent } from "@/components/Analytics";
import CouponFilterPanel from "@/components/filters/CouponFilterPanel";
import FilterChips from "@/components/filters/FilterChips";
import FilterLayout from "@/components/filters/FilterLayout";
import KeywordForm from "@/components/filters/KeywordForm";
import SortControl from "@/components/filters/SortControl";
import Pagination from "@/components/Pagination";
import { formatMoney } from "@/lib/format";
import {
  carriedParams,
  filterCount,
  parseFilters,
  resolveIds,
  toCouponQuery,
  type CouponFilters,
} from "@/lib/filters";
import StoreCard from "@/components/stores/StoreCard";
import type { Product, Store } from "@/lib/types";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every store, code, price drop and category Durza tracks.",
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

interface Props {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const filters = parseFilters(sp);

  const [storesPage, categoriesPage] = await Promise.all([
    resilient.listStores({ limit: 100 }),
    resilient.listCategories({ limit: 100 }),
  ]);
  const stores = storesPage.items;
  const categories = categoriesPage.items;

  if (!filters.q) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <PageTitle>What are you shopping for?</PageTitle>
        <p className="mt-2 max-w-prose text-ink-soft">
          Search a store, a brand, a product or a category. Everything listed here has a verification
          trail — use the filters on the results page to see only codes somebody has actually tried.
        </p>
        <div className="mt-6">
          <KeywordForm
            size="lg"
            autoFocus
            label="Search Durza"
            placeholder="Search stores, brands, products…"
          />
        </div>
        <SuggestedSearches categories={categories} stores={stores} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <TrackEvent event="search" payload={{ query: filters.q }} />
      <div className="mb-8">
        <KeywordForm
          size="lg"
          label="Search Durza"
          placeholder="Search stores, brands, products…"
        />
      </div>
      <Results sp={sp} filters={filters} stores={stores} categories={categories} />
    </div>
  );
}

function SuggestedSearches({
  stores,
  categories,
}: {
  stores: Store[];
  categories: { slug: string; name: string }[];
}) {
  const storeSuggestions = stores.slice(0, 5).map((s) => ({ label: s.name, href: `/stores/${s.slug}` }));
  const categorySuggestions = categories.slice(0, 6).map((c) => ({ label: c.name, href: `/categories/${c.slug}` }));

  if (storeSuggestions.length === 0 && categorySuggestions.length === 0) return null;

  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-2">
      {storeSuggestions.length > 0 && (
        <section aria-label="Popular stores">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Popular stores</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {storeSuggestions.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="btn-outline text-sm">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {categorySuggestions.length > 0 && (
        <section aria-label="Popular categories">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Popular categories</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {categorySuggestions.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="btn-outline text-sm">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

interface ResultsProps {
  sp: Record<string, string | undefined>;
  filters: CouponFilters;
  stores: Store[];
  categories: { id: string; name: string; slug: string; icon: string | null }[];
}

/**
 * Stores, products and categories only appear while the search is exploratory.
 * The moment a visitor narrows by store, category or offer shape, the coupon
 * list is the answer and an unfiltered entity list beside it would contradict it.
 */
function isExploratory(filters: CouponFilters): boolean {
  return (
    !filters.store &&
    !filters.category &&
    !filters.type &&
    !filters.code &&
    !filters.confirmed &&
    !filters.rate &&
    !filters.expires
  );
}

async function Results({ sp, filters, stores, categories }: ResultsProps) {
  const query = filters.q;
  const skip = Math.max(Number(sp.skip) || 0, 0);
  const resolved = resolveIds(filters, stores, categories);
  const exploratory = isExploratory(filters) && !resolved.unresolved;

  const [coupons, products, matchingStores, allCategories] = await Promise.all([
    resolved.unresolved
      ? Promise.resolve({ items: [], total: 0, skip, limit: PAGE_SIZE })
      : resilient.listCoupons(toCouponQuery(filters, resolved, { skip, limit: PAGE_SIZE })),
    exploratory
      ? resilient.listProducts({ search: query, limit: 20 })
      : Promise.resolve({ items: [], total: 0, skip: 0, limit: 20 }),
    exploratory ? resilient.listStores({ search: query, limit: 10 }) : Promise.resolve({ items: [], total: 0, skip: 0, limit: 10 }),
    exploratory
      ? resilient.listCategories({ limit: 200 })
      : Promise.resolve({ items: [], total: 0, skip: 0, limit: 200 }),
  ]);

  const storeById = new Map(stores.map((s) => [s.id, s]));
  const storeHits = matchingStores.items;
  const productHits = products.items;
  const needle = query.toLowerCase();
  const matchedCategories = exploratory
    ? allCategories.items.filter((c) => c.name.toLowerCase().includes(needle)).slice(0, 8)
    : [];

  const couponTotal = coupons.total;
  const total =
    couponTotal + storeHits.length + productHits.length + matchedCategories.length;

  if (total === 0) {
    return (
      <div>
        <EmptyState
          title={
            resolved.unresolved === "store"
              ? `We don't know the store "${filters.store}".`
              : resolved.unresolved === "category"
                ? `We don't know the category "${filters.category}".`
                : `Nothing matches “${query}”.`
          }
          body={
            resolved.unresolved
              ? "It may have been renamed or removed. Clear the filter to see everything again."
              : "We only list codes someone has confirmed, so a thin result is normal for new stores. Try a broader term, or start from one of these."
          }
          cta={{ href: "/categories", label: "Browse categories" }}
        />
        <div className="mt-6 text-center">
          <Link href="/search" className="btn btn-ghost">
            Clear the search
          </Link>
        </div>
      </div>
    );
  }

  const refinements = [
    { label: `${query} promo codes`, href: refine(sp, { code: "codes" }) },
    { label: `${query} deals`, href: refine(sp, { code: "deals" }) },
    { label: `${query} confirmed`, href: refine(sp, { confirmed: "once" }) },
    { label: `${query} free shipping`, href: refine(sp, { q: `${query} shipping` }) },
  ];

  const storeName = stores.find((s) => s.slug === filters.store)?.name;
  const categoryName = categories.find((c) => c.slug === filters.category)?.name;
  const page = Math.floor(skip / PAGE_SIZE) + 1;
  const pages = Math.max(Math.ceil(couponTotal / PAGE_SIZE), 1);

  return (
    <FilterLayout
      panel={
        <CouponFilterPanel
          stores={stores.map((s) => ({ id: s.id, name: s.name, slug: s.slug }))}
          categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
        />
      }
      summaryLabel={`Filters${filterCount(filters) > 0 ? ` (${filterCount(filters)})` : ""}`}
    >
      <div className="border-b border-ledger-line pb-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-serif text-2xl text-ink">
            {total} result{total === 1 ? "" : "s"} for “{query}”
          </h1>
          <SortControl />
        </div>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Refine this search">
          {refinements.map((r) => (
            <li key={r.label}>
              <Link
                href={r.href}
                className="rounded-full border border-ledger-line bg-white px-3 py-1 text-xs font-semibold text-ink-soft transition-colors hover:border-rust hover:text-rust"
              >
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <FilterChips storeLabel={storeName} categoryLabel={categoryName} />
      </div>

      {storeHits.length > 0 && (
        <section className="mt-8">
          <SectionTitle hint={String(matchingStores.total)}>Stores</SectionTitle>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {storeHits.map((s) => (
              <li key={s.id}>
                <StoreCard store={s} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {coupons.items.length > 0 && (
        <section className="mt-8">
          <SectionTitle hint={`${couponTotal} total`}>Coupons</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            {coupons.items.map((coupon) => {
              const store = storeById.get(coupon.store_id);
              return (
                <CouponCard
                  key={coupon.id}
                  coupon={coupon}
                  store={
                    store
                      ? {
                          id: store.id,
                          name: store.name,
                          slug: store.slug,
                          logo_url: store.logo_url,
                          currency: store.currency,
                        }
                      : undefined
                  }
                />
              );
            })}
          </div>
          <Pagination
            basePath="/search"
            searchParams={carriedParams(sp)}
            skip={skip}
            limit={PAGE_SIZE}
            total={couponTotal}
          />
        </section>
      )}

      {productHits.length > 0 && (
        <section className="mt-8">
          <SectionTitle hint={String(products.total)}>Products</SectionTitle>
          <ul className="divide-y divide-ledger-line border border-ledger-line">
            {productHits.map((product) => (
              <li key={product.id}>
                <ProductRow product={product} store={storeById.get(product.store_id)} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {matchedCategories.length > 0 && (
        <section className="mt-8">
          <SectionTitle>Categories</SectionTitle>
          <ul className="divide-y divide-ledger-line border border-ledger-line">
            {matchedCategories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="flex items-center gap-3 px-4 py-3 text-ink transition-colors hover:bg-paper-raised"
                >
                  {c.icon && (
                    <span className="text-lg" aria-hidden="true">
                      {c.icon}
                    </span>
                  )}
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className="mt-6 text-xs text-ink-soft">
        Showing page {page} of {pages} for coupons. Stores, products and categories are the closest
        matches we hold.
      </p>
    </FilterLayout>
  );
}

/** A refinement chip: same search, one param swapped, paging reset. */
function refine(
  sp: Record<string, string | undefined>,
  patch: Record<string, string | undefined>,
): string {
  const merged: Record<string, string | undefined> = { ...sp, ...patch, skip: undefined };
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) {
    if (value) qs.set(key, value);
  }
  const s = qs.toString();
  return s ? `/search?${s}` : "/search";
}

function ProductRow({ product, store }: { product: Product; store?: Store }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-paper-raised">
      <div className="min-w-0">
        <p className="truncate text-ink">{product.name}</p>
        <p className="text-xs text-ink-soft">
          {store ? (
            <Link href={`/stores/${store.slug}`} className="hover:text-ink">
              {store.name}
            </Link>
          ) : (
            "Unknown store"
          )}
        </p>
      </div>
      <p className="shrink-0 text-right">
        {product.current_price != null ? (
          <span className="font-mono text-sm text-ink">
            {formatMoney(product.current_price, store?.currency ?? product.currency)}
          </span>
        ) : (
          <span className="text-sm text-ink-soft">No price yet</span>
        )}
        {product.last_price_drop_pct != null && (
          <span className="block font-mono text-xs text-rust">−{product.last_price_drop_pct}%</span>
        )}
      </p>
    </div>
  );
}
