"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import OfferCard from "@/components/OfferCard";
import StoreHero from "@/components/StoreHero";
import { hostnameOf } from "@/lib/url";
import { formatDiscount, formatDiscountHeading } from "@/lib/format";
import CouponGroupCard from "@/components/CouponGroupCard";
import { ClientTabs } from "@/components/ui/Tabs";
import SaveDealBanner from "@/components/SaveDealBanner";
import { RecordView } from "@/components/Analytics";
import { api } from "@/lib/api";
import { GO_REL, storeGoHref } from "@/lib/go";
import { groupSimilar } from "@/lib/grouping";
import type { CouponPublic, Store } from "@/lib/types";
import Storefront, { type StoreProductCollection } from "@/components/store/Storefront";

interface StorePageClientProps {
  store: Store;
  tabs: Record<string, { label: string; items: CouponPublic[] }>;
  stats: {
    total: number;
    verified: number;
    avgRate: number;
    /** Total worked/didn't-work votes across this store's offers. */
    totalReports: number;
    /** Most recent source check across this store's offers (ISO). */
    latestCheck: string | null;
  };
  relatedStores: Store[];
  /** ISO 4217 code; falls back to INR when the store has no currency set. */
  currency: string | null;
  pagination: {
    page: number;
    totalPages: number;
    rangeStart?: number;
    rangeEnd?: number;
  };
  productCollections?: StoreProductCollection[];
  productCategoriesLoadFailed?: boolean;
}

export default function StorePageClient({
  store,
  tabs,
  stats,
  relatedStores,
  currency,
  pagination,
  productCollections = [],
  productCategoriesLoadFailed = false,
}: StorePageClientProps) {
  const code = currency ?? "INR";
  const websiteHost = hostnameOf(store.website_url);
  const website = Boolean(websiteHost);
  const hasVotes = stats.totalReports > 0;
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState("all");
  const filteredTabs = useMemo(() => {
    const match = (item: (typeof tabs.best.items)[number]) => {
      if (filter === "all") return true;
      if (filter === "under500") { const price = item.restrictions?.deal_price; return typeof price === "string" ? parseInt(price.replace(/[^\d]/g, ""), 10) < 500 : false; }
      return true;
    };
    return {
      best: tabs.best ? { ...tabs.best, items: tabs.best.items.filter(match) } : tabs.best,
      latest: tabs.latest ? { ...tabs.latest, items: tabs.latest.items.filter(match) } : tabs.latest,
      expiring: tabs.expiring ? { ...tabs.expiring, items: tabs.expiring.items.filter(match) } : tabs.expiring,
    };
  }, [tabs, filter]);
  const pageNumbers = [...new Set([1, pagination.page - 1, pagination.page, pagination.page + 1, pagination.totalPages])]
    .filter((page) => page >= 1 && page <= pagination.totalPages)
    .sort((a, b) => a - b);

  // A tab with nothing in it is noise — only offer tabs that have coupons.
  const visibleTabs = useMemo(
    () =>
      Object.entries(filteredTabs)
        .filter(([, tab]) => tab && tab.items && tab.items.length > 0)
        .map(([id, tab]) => ({
          id,
          label: tab.label,
          content: (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groupSimilar(tab.items)
                .slice(0, expanded ? 100 : 6)
                .map((entry) =>
                  entry.kind === "group" ? (
                    <CouponGroupCard
                      key={`group-${entry.key}`}
                      label={entry.label}
                      coupons={entry.coupons}
                      currency={code}
                    />
                  ) : (
                    <OfferCard
                      key={entry.coupon.id}
                      bookmarkId={entry.coupon.id}
                      code={entry.coupon.code}
                      badge={formatDiscountHeading(entry.coupon, code)}
                      title={entry.coupon.title}
                      description={entry.coupon.description}
                      ctaHref={api.goUrl(entry.coupon.id, "store-page")}
                      verified={entry.coupon.verification_status === "verified"}
                      expiresAt={entry.coupon.expires_at}
                    />
                  ),
                )}
            </div>
          ),
        })),
    [tabs, store, code],
  );

  return (
    <div className="space-y-10 sm:space-y-14">
      <RecordView storeSlug={store.slug} />
      <StoreHero
        name={store.name}
        subtitle={store.description ?? `${stats.total} live ${store.name} coupon codes and deals — each linked to its source page with the date it was last checked.`}
        domain={websiteHost}
        heroImageUrl={store.hero_image_url ?? null}
        offerCount={stats.total}
        ctaHref={websiteHost ? storeGoHref(store.slug, "store-page") : undefined}
        perks={[
          { label: "Live Offers", value: `${stats.total} verified` },
          { label: "Sourced From", value: "Official pages" },
          { label: "Affiliation", value: "Commission disclosed" },
        ]}
      />


      <Storefront
        store={store}
        collections={productCollections}
        categoriesLoadFailed={productCategoriesLoadFailed}
      />

      <section aria-labelledby="store-coupons-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-inkblue">Save on your order</p>
            <h2 id="store-coupons-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">
              Coupons &amp; promotional offers
            </h2>
          </div>
          <p className="text-sm text-ink-soft">
            {stats.total} {stats.total === 1 ? "offer" : "offers"}
          </p>
        </div>
        {stats.total > 0 && (
          <p className="mb-3 text-xs text-ink-soft" aria-live="polite">
            Showing {pagination.rangeStart ?? (pagination.page - 1) * 20 + 1}–
            {pagination.rangeEnd ?? Math.min(pagination.page * 20, stats.total)} of {stats.total} offers
          </p>
        )}
        <div className="mb-4 flex flex-wrap gap-2">
          {["all", "under500"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${filter === f ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}
            >
              {f === "all" ? "All" : "Under ₹500"}
            </button>
          ))}
        </div>
        {visibleTabs.length > 0 ? (
          <>
            {/* Keeps the h1 → h2 → h3 order intact for every code card below. */}
            <h2 className="sr-only">Offers from {store.name}</h2>
            {tabs.best && tabs.best.items.length > 0 && (
              <Link
                href={`/coupons/${tabs.best.items[0].slug}`}
                className="lift mb-6 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-ledger-line bg-white px-5 py-4 shadow-sm"
                aria-label={`Best current offer: ${tabs.best.items[0].title}`}
              >
                <span className="rounded-full bg-orange-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-orange-800">
                  {hasVotes ? "Best right now" : "Top offer"}
                </span>
                <span className="savings-figure text-2xl font-extrabold text-orange-700">{formatDiscount(tabs.best.items[0], code)}</span>
                <span className="min-w-0 flex-1 text-sm font-semibold text-ink sm:truncate">
                  {tabs.best.items[0].title}
                </span>
                <span className="btn btn-cta shrink-0">View offer <span aria-hidden="true">→</span></span>
              </Link>
            )}
            <ClientTabs tabs={visibleTabs} />
          </>
        ) : (
          <section
            aria-labelledby="no-offers"
            className="rounded-[22px] border-2 border-dashed border-ledger-line bg-white px-5 py-10 text-center"
          >
            <h2 id="no-offers" className="font-serif text-xl font-extrabold text-ink">
              No active offers for {store.name} right now
            </h2>
            <p className="mx-auto mt-2 max-w-prose text-ink-soft">
              We only list what we can source from the store&apos;s own pages, so this page stays
              empty rather than showing dead offers. If a code appears, it will show up here with the
              date we last checked it.
            </p>
            {website && (
              <>
                <p className="mx-auto mt-3 max-w-prose text-ink-soft">
                  You can still go to {store.name} through Durza. We have no discount to promise, so
                  compare the price before you buy.
                </p>
                <a
                  href={storeGoHref(store.slug, "store-page")}
                  target="_blank"
                  rel={GO_REL}
                  className="btn btn-cta mt-4 inline-block"
                >
                  Shop {store.name} via Durza
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </>
            )}
          </section>
        )}
      </section>

      {pagination.totalPages > 1 && (
        <nav
          className="flex flex-wrap items-center justify-center gap-1.5"
          aria-label="Pagination"
        >
          {pagination.page > 1 && (
            <Link
              href={`/stores/${store.slug}?page=${pagination.page - 1}`}
              className="flex min-h-11 items-center rounded-full border border-ledger-line px-4 text-sm font-medium text-ink-soft hover:border-inkblue hover:text-inkblue"
            >
              Previous
            </Link>
          )}
          {pageNumbers.map((page, index) => {
            const previous = pageNumbers[index - 1];
            return (
              <span key={page} className="contents">
                {previous !== undefined && page - previous > 1 && (
                  <span aria-hidden="true" className="px-1 text-ink-soft">…</span>
                )}
                <Link
                  href={`/stores/${store.slug}?page=${page}`}
                  aria-label={`Page ${page}`}
                  aria-current={page === pagination.page ? "page" : undefined}
                  className={`flex min-h-11 min-w-11 items-center justify-center rounded-full border px-3 text-sm font-medium ${
                    page === pagination.page
                      ? "border-ink bg-ink text-white"
                      : "border-ledger-line text-ink-soft hover:border-inkblue hover:text-inkblue"
                  }`}
                >
                  {page}
                </Link>
              </span>
            );
          })}
          {pagination.page < pagination.totalPages && (
            <Link
              href={`/stores/${store.slug}?page=${pagination.page + 1}`}
              className="flex min-h-11 items-center rounded-full border border-ledger-line px-4 text-sm font-medium text-ink-soft hover:border-inkblue hover:text-inkblue"
            >
              Next
            </Link>
          )}
          <span className="sr-only">
            Page {pagination.page} of {pagination.totalPages}
          </span>
        </nav>
      )}

      {website && (
        <p className="text-xs text-ink-soft">
          We may earn a commission from some links.{" "}
          <Link href="/affiliate-disclosure" className="text-inkblue underline-offset-2 hover:underline">
            Here is how we make money
          </Link>
          . It never changes the price you pay.
        </p>
      )}

      <SaveDealBanner target={{ kind: "store", id: store.id, slug: store.slug, name: store.name }} />


      {!expanded && Object.values(tabs).reduce((n, t) => n + t.items.length, 0) > 6 && (
        <button type="button" onClick={() => setExpanded(true)} className="rounded-full border border-ledger-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-inkblue hover:text-inkblue">
          Show all {Object.values(tabs).reduce((n, t) => n + t.items.length, 0)} offers
        </button>
      )}

      {relatedStores.length > 0 && (
        <section aria-labelledby="related">
          <h2 id="related" className="font-serif text-2xl font-extrabold text-ink">
            Alternatives and related stores
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {relatedStores.map((related) => (
              <li key={related.id}>
                <Link
                  href={`/stores/${related.slug}`}
                  className="lift flex items-center gap-3 rounded-2xl border border-ledger-line bg-white p-3"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ledger-line bg-paper font-serif text-xs font-semibold text-ink-soft"
                  >
                    {(related.name ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-ink">{related.name}</span>
                    {typeof related.offer_count === "number" && (
                      <span
                        className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                          related.offer_count > 0 ? "bg-accent-faint text-accent" : "bg-paper text-ink-soft"
                        }`}
                      >
                        {related.offer_count > 0
                          ? `${related.offer_count} live ${related.offer_count === 1 ? "offer" : "offers"}`
                          : "No live offers right now"}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-sm text-ink-soft">
        Looking for a specific product instead?{" "}
        <Link href="/search" className="text-inkblue underline-offset-2 hover:underline">
          Search all deals
        </Link>{" "}
        and save the offers you want to revisit.
      </p>
    </div>
  );
}
