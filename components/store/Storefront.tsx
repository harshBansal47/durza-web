"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { api } from "@/lib/api";
import type { Product, ProductCategory, Store } from "@/lib/types";
import ProductCard from "@/components/store/ProductCard";

const INITIAL_PRODUCTS_PER_CATEGORY = 8;

export interface StoreProductCollection {
  category: ProductCategory;
  products: Product[];
  initialLoadFailed?: boolean;
}

interface StorefrontProps {
  store: Store;
  collections: StoreProductCollection[];
  categoriesLoadFailed?: boolean;
}

function CategoryTile({ collection }: { collection: StoreProductCollection }) {
  const [imageFailed, setImageFailed] = useState(false);
  const image = collection.products.find((product) => product.image_url)?.image_url;

  return (
    <a
      href={`#collection-${collection.category.slug}`}
      aria-label={`${collection.category.name}, ${collection.category.product_count} ${
        collection.category.product_count === 1 ? "product" : "products"
      }`}
      className="group relative flex min-h-32 items-end overflow-hidden rounded-2xl border border-ledger-line bg-paper-alt p-4 shadow-[var(--shadow-hairline)] transition-shadow hover:shadow-[var(--shadow-raised)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inkblue sm:min-h-40"
    >
      {image && !imageFailed ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 639px) 50vw, 25vw"
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="object-contain object-right-bottom p-2 opacity-70 transition-transform duration-200 group-hover:scale-[1.04]"
        />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-white to-paper-alt" />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/10" />
      <span className="relative z-10">
        <span className="block font-semibold text-ink">{collection.category.name}</span>
        <span className="mt-1 block text-xs text-ink-soft">
          {collection.category.product_count}{" "}
          {collection.category.product_count === 1 ? "product" : "products"}
        </span>
      </span>
    </a>
  );
}

export default function Storefront({
  store,
  collections: initialCollections,
  categoriesLoadFailed = false,
}: StorefrontProps) {
  const [collections, setCollections] = useState(initialCollections);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [loadErrors, setLoadErrors] = useState<Record<string, boolean>>({});

  const featured = useMemo(() => {
    const seen = new Set<string>();
    return collections
      .flatMap((collection) =>
        collection.products.map((product) => ({ product, categoryName: collection.category.name })),
      )
      .filter(({ product }) => {
        if (
          !product.last_price_drop_at ||
          product.last_price_drop_pct === null ||
          product.last_price_drop_pct <= 0 ||
          seen.has(product.id)
        ) {
          return false;
        }
        seen.add(product.id);
        return true;
      })
      .sort((a, b) => (b.product.last_price_drop_pct ?? 0) - (a.product.last_price_drop_pct ?? 0))
      .slice(0, 4);
  }, [collections]);
  const categoryTiles = showAllCategories ? collections : collections.slice(0, 8);

  async function loadMore(collection: StoreProductCollection) {
    const { category } = collection;
    setLoading((current) => ({ ...current, [category.id]: true }));
    setLoadErrors((current) => ({ ...current, [category.id]: false }));
    try {
      const result = await api.listProducts({
        store_id: store.id,
        category_id: category.id,
        skip: collection.products.length,
        limit: INITIAL_PRODUCTS_PER_CATEGORY,
      });
      setCollections((current) =>
        current.map((item) =>
          item.category.id === category.id
            ? {
                ...item,
                category: { ...item.category, product_count: result.total },
                products: [
                  ...item.products,
                  ...result.items.filter(
                    (product) => !item.products.some((existing) => existing.id === product.id),
                  ),
                ],
                initialLoadFailed: false,
              }
            : item,
        ),
      );
    } catch {
      setLoadErrors((current) => ({ ...current, [category.id]: true }));
    } finally {
      setLoading((current) => ({ ...current, [category.id]: false }));
    }
  }

  return (
    <section id="products" className="scroll-mt-24 space-y-10 sm:space-y-14" aria-labelledby="products-heading">
      <header className="border-b border-ledger-line pb-5">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-inkblue">
          Discover the collection
        </p>
        <h2 id="products-heading" className="mt-2 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Shop {store.name}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft sm:text-base">
          Explore products and current prices across the store&apos;s categories.
        </p>
      </header>

      {!categoriesLoadFailed && collections.length > 0 && (
        <nav
          aria-label={`${store.name} product categories`}
          className="sticky top-[var(--header-height,68px)] z-30 -mx-4 flex gap-2 overflow-x-auto border-y border-ledger-line bg-white/95 px-4 py-2.5 backdrop-blur-md sm:mx-0 sm:rounded-xl sm:border"
        >
          <a
            href="#all-collections"
            className="shrink-0 rounded-full border border-ink px-4 py-2 text-sm font-semibold text-ink"
          >
            All products
          </a>
          {collections.map(({ category }) => (
            <a
              key={category.id}
              href={`#collection-${category.slug}`}
              className="shrink-0 rounded-full border border-ledger-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-inkblue hover:text-inkblue"
            >
              {category.name}
            </a>
          ))}
        </nav>
      )}

      {categoriesLoadFailed ? (
        <p role="status" className="rounded-2xl border border-ledger-line bg-paper-alt p-5 text-sm text-ink-soft">
          Product categories couldn&apos;t be loaded right now. Please refresh the page to try again.
        </p>
      ) : collections.length === 0 ? (
        <p role="status" className="rounded-2xl border border-ledger-line bg-paper-alt p-5 text-sm text-ink-soft">
          No products are listed for {store.name} yet. The store&apos;s offers are available below.
        </p>
      ) : (
        <>
          <section aria-labelledby="shop-categories-heading">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Find your fit</p>
                <h3 id="shop-categories-heading" className="mt-1 font-serif text-2xl font-bold text-ink">
                  Shop by category
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {categoryTiles.map((collection) => (
                <CategoryTile key={collection.category.id} collection={collection} />
              ))}
            </div>
            {collections.length > 8 && (
              <button
                type="button"
                aria-expanded={showAllCategories}
                onClick={() => setShowAllCategories((shown) => !shown)}
                className="mt-4 min-h-11 rounded-full px-3 text-sm font-semibold text-inkblue underline-offset-4 hover:underline"
              >
                {showAllCategories ? "Show fewer categories" : `View all ${collections.length} categories`}
              </button>
            )}
          </section>

          {featured.length > 0 && (
            <section aria-labelledby="featured-products-heading">
              <div className="mb-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-inkblue">Recent price drops</p>
                <h3 id="featured-products-heading" className="mt-1 font-serif text-2xl font-bold text-ink">
                  Trending deals
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4">
                {featured.map(({ product, categoryName }) => (
                  <ProductCard key={product.id} product={product} categoryName={categoryName} />
                ))}
              </div>
            </section>
          )}

          <div id="all-collections" className="scroll-mt-40 space-y-10 sm:space-y-14">
            {collections.map((collection) => {
              const { category, products } = collection;
              const isExpanded = expanded[category.id] ?? false;
              const needsMore = products.length < category.product_count;
              const hasError = loadErrors[category.id] || collection.initialLoadFailed;

              return (
                <section
                  key={category.id}
                  id={`collection-${category.slug}`}
                  className="scroll-mt-40"
                  aria-labelledby={`heading-${category.slug}`}
                >
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                        {category.product_count} {category.product_count === 1 ? "product" : "products"}
                      </p>
                      <h3 id={`heading-${category.slug}`} className="mt-1 font-serif text-2xl font-bold text-ink">
                        {category.name}
                      </h3>
                    </div>
                    {category.product_count > INITIAL_PRODUCTS_PER_CATEGORY && (
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpanded((current) => ({ ...current, [category.id]: !isExpanded }))
                        }
                        className="min-h-11 rounded-full px-3 text-sm font-semibold text-inkblue underline-offset-4 hover:underline"
                      >
                        {isExpanded ? "Show less" : `View all ${category.product_count}`}
                      </button>
                    )}
                  </div>

                  {products.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4">
                      {(isExpanded ? products : products.slice(0, INITIAL_PRODUCTS_PER_CATEGORY)).map(
                        (product) => (
                          <ProductCard key={product.id} product={product} categoryName={category.name} />
                        ),
                      )}
                    </div>
                  ) : (
                    <p className="rounded-xl border border-dashed border-ledger-line p-5 text-sm text-ink-soft">
                      No products are available in this category right now.
                    </p>
                  )}

                  {hasError && (
                    <p role="status" className="mt-3 text-sm text-rust">
                      Products couldn&apos;t be loaded. Try again.
                    </p>
                  )}
                  {needsMore && (isExpanded || products.length === 0 || hasError) && (
                    <button
                      type="button"
                      disabled={loading[category.id]}
                      onClick={() => void loadMore(collection)}
                      className="btn btn-secondary mt-4 min-h-11"
                    >
                      {loading[category.id] ? "Loading products…" : hasError ? "Try again" : "Load more"}
                    </button>
                  )}
                </section>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
