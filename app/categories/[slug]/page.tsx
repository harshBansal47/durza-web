import { cache } from "react";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen, Wrench } from "lucide-react";
import { lookup, resilient } from "@/lib/api";
import ListingHero from "@/components/listing/ListingHero";
import CategoryChips from "@/components/CategoryChips";
import ViewMoreCoupons from "@/components/pagination/ViewMoreCoupons";
import EmptyState from "@/components/EmptyState";
import PopularChips from "@/components/PopularChips";
import CouponFilterPanel from "@/components/filters/CouponFilterPanel";
import FilterChips from "@/components/filters/FilterChips";
import FilterLayout from "@/components/filters/FilterLayout";
import KeywordForm from "@/components/filters/KeywordForm";
import SortControl from "@/components/filters/SortControl";
import StoreCard from "@/components/stores/StoreCard";
import { parseFilters, resolveIds, toCouponQuery } from "@/lib/filters";
import { categoryLabel } from "@/lib/catalog";
import { allowedStoreIds } from "@/lib/homepage-curation";
import { guidesForCategory, toolsForCategory } from "@/lib/category-content";
import { storeLogoUrl } from "@/lib/storeLogos";
import Breadcrumbs from "@/components/Breadcrumbs";
import { absoluteUrl, itemListJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import type { CouponPublic, Store } from "@/lib/types";


export const dynamic = "force-dynamic";
const PAGE_SIZE = 20;

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | undefined>>;

const loadCategory = cache((slug: string) => lookup.getCategoryBySlug(slug));

async function fetchAllCategoryCoupons(categoryId: string, storeIds?: string[]): Promise<CouponPublic[]> {
  const pageSize = 100;
  const first = await resilient.listCoupons({
    category_id: categoryId,
    active_only: true,
    limit: pageSize,
    skip: 0,
    ...(storeIds?.length ? { store_ids: storeIds } : {}),
  });
  const items = [...first.items];
  const total = first.total;
  if (total <= items.length) return items;
  const pages: Array<Promise<typeof first>> = [];
  for (let skip = pageSize; skip < total && skip < 500; skip += pageSize) {
    pages.push(
      resilient.listCoupons({
        category_id: categoryId,
        active_only: true,
        limit: pageSize,
        skip,
        ...(storeIds?.length ? { store_ids: storeIds } : {}),
      }),
    );
  }
  const rest = await Promise.all(pages);
  for (const r of rest) items.push(...r.items);
  const seen = new Set<string>();
  return items.filter((c) => (seen.has(c.id) ? false : (seen.add(c.id), true)));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = await loadCategory(slug).catch(() => null);
  if (!category) return {};

  const label = categoryLabel(category);
  const allStores = await resilient.listStores({ limit: 100 }).catch(() => ({ items: [], total: 0, skip: 0, limit: 0 }));
  const offers = await resilient.listCoupons({ category_id: category.id, active_only: true, limit: 1, store_ids: allowedStoreIds(allStores.items) });
  const total = offers.total;

  const title = `${label} Coupons & Deals${total > 0 ? `: ${total} Live Offers` : ""}`;
  const description =
    total > 0
      ? `Browse ${total} live ${label.toLowerCase()} coupons, promo codes and deals — with relevant stores, guides and tools, offer types and check dates shown when available.`
      : `Browse ${label.toLowerCase()} coupons, promo codes and deals on Durza — with relevant stores, guides and tools.`;
  const canonical = absoluteUrl(`/categories/${category.slug}`);
  return {
    title,
    description,
    alternates: { canonical },
    ...(total > 0 ? {} : { robots: { index: false, follow: true } }),
    openGraph: { title, description, url: canonical, type: "website" },
    twitter: { card: "summary_large_image", title, description },
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

  const resolved = resolveIds({ ...filters, category: "" }, stores, categories);
  const indiaRelevantIds = allowedStoreIds(stores);
  const scopeStoreIds = !filters.store ? indiaRelevantIds : undefined;
  const query: Parameters<typeof resilient.listCoupons>[0] = {
    ...toCouponQuery({ ...filters, category: "" }, { ...resolved, category_id: category.id }, {
      skip,
      limit: PAGE_SIZE,
    }),
  };
  if (scopeStoreIds) query.store_ids = scopeStoreIds;

  const [coupons, allCategoryCoupons] = await Promise.all([
    resilient.listCoupons(query),
    fetchAllCategoryCoupons(category.id, scopeStoreIds),
  ]);

  const storeName = stores.find((s) => s.slug === filters.store)?.name;
  const total = coupons.total;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: categoryName, path: `/categories/${category.slug}` },
  ];

  const storeById = new Map(stores.map((s) => [s.id, s]));
  const countsByStore = new Map<string, number>();
  for (const c of allCategoryCoupons) countsByStore.set(c.store_id, (countsByStore.get(c.store_id) ?? 0) + 1);
  const offerStores = [...countsByStore.entries()]
    .map(([id, count]) => {
      const s = storeById.get(id);
      return s ? { ...s, categoryOfferCount: count } : null;
    })
    .filter((s): s is Store & { categoryOfferCount: number } => s !== null)
    .sort((a, b) => b.categoryOfferCount - a.categoryOfferCount || a.name.localeCompare(b.name));

  const storeSlugSet = new Set(offerStores.map((s) => s.slug));
  const guides = guidesForCategory(category.slug, categoryName, storeSlugSet);
  const tools = toolsForCategory(category.slug, storeSlugSet);

  const subcategories = categories.filter((c) => c.parent_id === category.id);
  const parent = category.parent_id ? categories.find((c) => c.id === category.parent_id) : null;

  const itemList = itemListJsonLd(
    coupons.items.map((coupon) => ({ name: coupon.title, path: `/coupons/${coupon.slug}` })),
  );

  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={crumbs} />
      <JsonLd data={itemList} />

      <ListingHero
        eyebrow={`${total.toLocaleString("en-IN")} live offer${total === 1 ? "" : "s"} in ${categoryName}`}
        title={`${categoryName} Coupons & Offers`}
        lead={`Live ${categoryName.toLowerCase()} coupons, promo codes and deals — with relevant stores, guides and tools, offer types and check dates shown when available.`}
        controls={
          <Suspense fallback={null}>
            <KeywordForm
              size="bar"
              placeholder={`Search ${categoryName.toLowerCase()} coupons…`}
              label={`Search ${categoryName} coupons`}
            />
          </Suspense>
        }
        chips={[
          ...(parent ? [{ href: `/categories/${parent.slug}`, label: `↑ ${categoryLabel(parent)}` }] : []),
          ...subcategories.slice(0, 6).map((sc) => ({ href: `/categories/${sc.slug}`, label: categoryLabel(sc) })),
        ]}
        stats={[
          { value: total.toLocaleString("en-IN"), label: "Live offers", live: total > 0 },
          { value: offerStores.length.toLocaleString("en-IN"), label: "Stores" },
          ...(guides.length > 0 ? [{ value: guides.length.toLocaleString("en-IN"), label: "Guides" }] : []),
          ...(tools.length > 0 ? [{ value: tools.length.toLocaleString("en-IN"), label: "Tools" }] : []),
        ]}
      />

      <div className="mb-6">
        <CategoryChips categories={categories.filter((c) => !c.parent_id || c.parent_id === category.parent_id || c.id === category.id)} activeSlug={category.slug} />
      </div>

      <FilterLayout
        panel={
          <CouponFilterPanel
            hideCategory
            stores={stores.map((s) => ({ id: s.id, name: s.name, slug: s.slug }))}
            categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
            note={`Scoped to ${categoryName}. Coupons and deals share the same filters and offer cards.`}
          />
        }
      >
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-ledger-line pb-4">
          <div>
            <h2 className="font-serif text-xl text-ink">Latest {categoryName} offers</h2>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
              {total} live coupon{total === 1 ? "" : "s"} &amp; deal{total === 1 ? "" : "s"}
            </p>
          </div>
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
          >
            <PopularChips stores={stores} categories={categories} />
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

        {offerStores.length > 0 && (
          <section aria-labelledby="category-stores" className="mt-12 border-t border-ledger-line pt-8">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <h2 id="category-stores" className="font-serif text-xl text-ink">Stores in {categoryName}</h2>
                <p className="mt-1 text-sm text-ink-soft">{offerStores.length} store{offerStores.length === 1 ? "" : "s"} with live offers in this category.</p>
              </div>
              <Link href="/stores" className="text-sm font-medium text-inkblue hover:underline">All stores</Link>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {offerStores.map((s) => (
                <li key={s.id} className="relative">
                  <StoreCard store={s} />
                  {s.categoryOfferCount ? (
                    <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-inkblue/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-inkblue">
                      {s.categoryOfferCount} in {categoryName}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        )}

        {guides.length > 0 && (
          <section aria-labelledby="category-guides" className="mt-12 border-t border-ledger-line pt-8">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen aria-hidden="true" className="h-5 w-5 text-inkblue" strokeWidth={1.75} />
              <h2 id="category-guides" className="font-serif text-xl text-ink">Guides for {categoryName}</h2>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => {
                const logo = storeLogoUrl({ slug: g.storeSlug, logo_url: null, website_url: null });
                return (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="flex h-full gap-3 rounded-2xl border border-ledger-line bg-white p-4 shadow-[var(--shadow-hairline)] transition hover:-translate-y-0.5 hover:border-inkblue">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-ledger-line bg-paper">
                        {logo ? <Image src={logo} alt="" width={28} height={28} className="h-7 w-7 object-contain" /> : <BookOpen className="h-5 w-5 text-ink-soft" strokeWidth={1.5} />}
                      </div>
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-semibold text-ink">{g.seo?.title ?? g.slug}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-ink-soft">{g.summary}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {tools.length > 0 && (
          <section aria-labelledby="category-tools" className="mt-12 border-t border-ledger-line pt-8">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div className="flex items-center gap-2">
                <Wrench aria-hidden="true" className="h-5 w-5 text-inkblue" strokeWidth={1.75} />
                <h2 id="category-tools" className="font-serif text-xl text-ink">Tools for {categoryName}</h2>
              </div>
              <Link href="/tools" className="text-sm font-medium text-inkblue hover:underline">All tools</Link>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((t) => (
                <li key={t.id}>
                  <Link href={t.href} className="flex h-full flex-col rounded-2xl border border-ledger-line bg-white p-4 shadow-[var(--shadow-hairline)] transition hover:-translate-y-0.5 hover:border-inkblue">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">{t.storeName} · {t.time}</p>
                    <p className="mt-1 text-sm font-semibold text-ink">{t.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-ink-soft">{t.desc}</p>
                    <span className="mt-3 inline-flex items-center text-xs font-semibold text-inkblue">{t.hrefLabel} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </FilterLayout>
    </div>
  );
}
