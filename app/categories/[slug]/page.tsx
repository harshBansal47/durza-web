import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resilient } from "@/lib/api";
import CategoryChips from "@/components/CategoryChips";
import CouponRow from "@/components/CouponRow";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import CouponFilterPanel from "@/components/filters/CouponFilterPanel";
import FilterChips from "@/components/filters/FilterChips";
import FilterLayout from "@/components/filters/FilterLayout";
import KeywordForm from "@/components/filters/KeywordForm";
import SortControl from "@/components/filters/SortControl";
import { carriedParams, parseFilters, resolveIds, toCouponQuery } from "@/lib/filters";
import { categoryLabel } from "@/lib/catalog";
import { absoluteUrl, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

export const revalidate = 300;

const PAGE_SIZE = 20;

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | undefined>>;

async function loadCategory(slug: string) {
  // resilient already degrades a failed lookup to null; the page turns that
  // into a 404 rather than an error boundary.
  return resilient.getCategoryBySlug(slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = await loadCategory(slug);
  if (!category) return {};

  const title = `${categoryLabel(category)} deals`;
  const canonical = absoluteUrl(`/categories/${category.slug}`);
  return {
    title,
    alternates: { canonical },
    openGraph: { title, url: canonical },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const skip = Math.max(Number(sp.skip) || 0, 0);

  const category = await loadCategory(slug);
  if (!category) notFound();
  const categoryName = categoryLabel(category);

  const [storesPage, categoriesPage] = await Promise.all([
    resilient.listStores({ limit: 100 }),
    resilient.listCategories({ limit: 100 }),
  ]);
  const stores = storesPage.items;
  const categories = categoriesPage.items;

  // The URL's category param cannot override the page's own slug — otherwise
  // /categories/fashion?category=electronics would show electronics under a
  // "fashion" heading. Every other filter still applies within this category.
  const resolved = resolveIds({ ...filters, category: "" }, stores, categories);
  const coupons = await resilient.listCoupons(
    toCouponQuery({ ...filters, category: "" }, { ...resolved, category_id: category.id }, {
      skip,
      limit: PAGE_SIZE,
    }),
  );

  const storeById = new Map(stores.map((s) => [s.id, s]));
  const storeName = stores.find((s) => s.slug === filters.store)?.name;
  // The category comes from the path, so a stray `?category=` must not ride
  // along in the pagination links and contradict the page it is on.
  const pageParams = carriedParams(sp);
  delete pageParams.category;
  const total = coupons.total;
  const page = Math.floor(skip / PAGE_SIZE) + 1;
  const pages = Math.max(Math.ceil(total / PAGE_SIZE), 1);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: categoryName, path: `/categories/${category.slug}` },
  ]);
  const itemList = itemListJsonLd(
    coupons.items.map((coupon) => ({ name: coupon.title, path: `/coupons/${coupon.slug}` })),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <h1 className="mb-6 font-serif text-4xl font-extrabold text-ink sm:text-5xl">{categoryName} coupons</h1>
      <div className="mb-6">
        <CategoryChips categories={categories} activeSlug={category.slug} />
      </div>
      <div className="mb-8">
        <KeywordForm
          placeholder={`Search ${categoryName.toLowerCase()} coupons…`}
          label={`Search ${categoryName} coupons`}
        />
      </div>

      <FilterLayout
        panel={
          <CouponFilterPanel
            hideCategory
            stores={stores.map((s) => ({ id: s.id, name: s.name, slug: s.slug }))}
            categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
            note={`Scoped to ${categoryName}.`}
          />
        }
      >
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-ledger-line pb-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            {total} coupon{total === 1 ? "" : "s"}
            {total > 0 ? ` · page ${page} of ${pages}` : ""}
          </p>
          <SortControl />
        </div>

        <div className="mb-5">
          <FilterChips hideCategory storeLabel={storeName} />
        </div>

        {coupons.items.length === 0 ? (
          <EmptyState
            title={`No matching coupons in ${categoryName}.`}
            body="Try removing a filter above, or check back soon."
            cta={{ href: `/categories/${category.slug}`, label: `All ${categoryName} coupons` }}
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
          basePath={`/categories/${category.slug}`}
          searchParams={pageParams}
          skip={skip}
          limit={PAGE_SIZE}
          total={total}
        />
      </FilterLayout>
    </div>
  );
}
