"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CouponCard } from "@/components/CouponCard";
import CouponGroupCard from "@/components/CouponGroupCard";
import { ClientTabs } from "@/components/ui/Tabs";
import { StoreFollowButton } from "@/components/StoreFollowButton";
import TrackDealBanner from "@/components/TrackDealBanner";
import { RecordView } from "@/components/Analytics";
import PageTitle from "@/components/ui/PageTitle";
import { storeInitials } from "@/lib/catalog";
import { DEFAULT_DISCLOSURE } from "@/lib/disclosure";
import { formatDate, formatDiscount } from "@/lib/format";
import { groupSimilar } from "@/lib/grouping";
import { storeAccent, storeLogoUrl } from "@/lib/storeLogos";
import type { CouponPublic, Store } from "@/lib/types";

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
}

function StoreMark({ store, size = 64 }: { store: Store; size?: number }) {
  const logo = storeLogoUrl(store);
  if (logo) {
    return (
      <Image
        src={logo}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full border border-ledger-line bg-paper object-contain"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="light-surface flex shrink-0 items-center justify-center rounded-full border border-ledger-line bg-paper font-serif text-ink-soft"
      style={{ width: size, height: size, fontSize: size / 2.6 }}
    >
      {storeInitials(store.name)}
    </span>
  );
}

export default function StorePageClient({
  store,
  tabs,
  stats,
  relatedStores,
  currency,
}: StorePageClientProps) {
  const code = currency ?? "INR";
  const hasVotes = stats.totalReports > 0;
  const accent = storeAccent(store.slug);

  // A tab with nothing in it is noise — only offer tabs that have coupons.
  const visibleTabs = useMemo(
    () =>
      Object.entries(tabs)
        .filter(([, tab]) => tab.items.length > 0)
        .map(([id, tab]) => ({
          id,
          label: tab.label,
          count: tab.items.length,
          content: (
            <div className="grid gap-4 sm:grid-cols-2">
              {groupSimilar(tab.items)
                .slice(0, 12)
                .map((entry) =>
                  entry.kind === "group" ? (
                    <CouponGroupCard
                      key={`group-${entry.key}`}
                      label={entry.label}
                      coupons={entry.coupons}
                      currency={code}
                    />
                  ) : (
                    <CouponCard
                      key={entry.coupon.id}
                      coupon={entry.coupon}
                      store={{ id: store.id, name: store.name, slug: store.slug, logo_url: store.logo_url, currency: code }}
                      variant={id === "expiring" ? "expiring-soon" : "coupon"}
                    />
                  ),
                )}
            </div>
          ),
        })),
    [tabs, store, code],
  );

  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    const payload = { title: `${store.name} deals on Durza`, url };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // The visitor dismissed the share sheet, or clipboard access was denied.
    }
  }

  return (
    <div className="space-y-10 sm:space-y-14">
      <RecordView storeSlug={store.slug} />
      <header
        className="dark-surface relative overflow-hidden rounded-[26px] bg-[var(--color-navy)] text-white shadow-[var(--shadow-overlay)]"
        style={{ backgroundImage: "linear-gradient(120deg, var(--color-navy), var(--color-navy-deep))" }}
      >
        {/* The store's own accent colour, sampled from its icon — decorative only. */}
        {accent && (
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: accent }} />
        )}
        <div className="relative flex flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:px-9 sm:py-10">
          <div className="relative shrink-0 self-start">
            {accent && (
              <span
                aria-hidden="true"
                className="absolute -inset-3 rounded-full opacity-40 blur-xl"
                style={{ backgroundColor: accent }}
              />
            )}
            <div
              className="relative rounded-full bg-white p-1.5 shadow-[var(--shadow-overlay)]"
              style={accent ? { boxShadow: `0 0 0 3px ${accent}66, var(--shadow-overlay)` } : undefined}
            >
              <StoreMark store={store} size={76} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <PageTitle className="text-white">{store.name}</PageTitle>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">
                {stats.total} listed offers
              </span>
              {store.website_url && (
                <a
                  href={store.website_url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="rounded-full bg-white/20 px-3 py-1 text-white backdrop-blur transition-colors hover:bg-white hover:text-inkblue"
                >
                  {new URL(store.website_url).hostname.replace(/^www\./, "")}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
            {store.description && <p className="mt-3 max-w-prose text-sm text-white/90 sm:text-base">{store.description}</p>}
          </div>

          <button
            type="button"
            onClick={share}
            className="btn light-surface shrink-0 self-start bg-white text-ink hover:bg-white/90"
            aria-live="polite"
          >
            {copied ? "Link copied" : "Share"}
          </button>
          <StoreFollowButton slug={store.slug} name={store.name} />
        </div>
      </header>

      <section className="rounded-lg border border-ledger-line bg-paper-alt px-4 py-2.5 text-sm">
        <p className="text-ink-soft">
          <span className="font-mono text-[10px] uppercase tracking-widest text-inkblue">Commission</span>
          {" · "}
          {store.commission_disclosure ?? DEFAULT_DISCLOSURE}
        </p>
      </section>

      {visibleTabs.length > 0 ? (
        <>
          {/* Keeps the h1 → h2 → h3 order intact for every code card below. */}
          <h2 className="sr-only">Offers from {store.name}</h2>
          {tabs.best && tabs.best.items.length > 0 && (
            <Link
              href={`/coupons/${tabs.best.items[0].slug}`}
              className="lift mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border-2 border-sun bg-sun-soft px-5 py-4"
              aria-label={`Best current offer: ${tabs.best.items[0].title}`}
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                {hasVotes ? "Best right now" : "Top offer"}
              </span>
              <span className="savings-figure text-2xl">{formatDiscount(tabs.best.items[0], code)}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">
                {tabs.best.items[0].title}
              </span>
              <span className="btn btn-cta shrink-0">
              View offer
            </span>
            </Link>
          )}
          <ClientTabs tabs={visibleTabs} />
        </>
      ) : (
        <p className="rounded-[22px] border-2 border-dashed border-ledger-line bg-white px-4 py-10 text-center text-ink-soft">
          No active offers for {store.name} right now. We only list what we can source from the
          store&apos;s own pages, so this page stays empty rather than showing dead offers.
        </p>
      )}

      <TrackDealBanner
        currency={code}
        dealTitle={`${store.name} offers`}
      />

      <section aria-labelledby="proof">
        <h2 id="proof" className="font-serif text-2xl font-extrabold text-ink">
          What backs these offers
        </h2>
        <dl className={`mt-4 grid gap-4 ${hasVotes ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
          {hasVotes ? (
            <>
              <div className="lift rounded-2xl border border-ledger-line bg-white p-4 shadow-[var(--shadow-hairline)]">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                  Confirmed codes
                </dt>
                <dd className="mt-1 font-serif text-3xl font-extrabold text-ink">{stats.verified}</dd>
                <p className="mt-1 text-xs text-ink-soft">of {stats.total} listed</p>
              </div>
              <div className="lift rounded-2xl border border-ledger-line bg-white p-4 shadow-[var(--shadow-hairline)]">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                  Average success
                </dt>
                <dd className="mt-1 font-serif text-3xl font-extrabold text-ink">
                  {Math.round(stats.avgRate * 100)}%
                </dd>
                <p className="mt-1 text-xs text-ink-soft">
                  across {stats.totalReports} shopper {stats.totalReports === 1 ? "report" : "reports"}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="lift rounded-2xl border border-ledger-line bg-white p-4 shadow-[var(--shadow-hairline)]">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                  Offers listed
                </dt>
                <dd className="mt-1 font-serif text-3xl font-extrabold text-ink">{stats.total}</dd>
                <p className="mt-1 text-xs text-ink-soft">each with a source and check date</p>
              </div>
              <div className="lift rounded-2xl border border-ledger-line bg-white p-4 shadow-[var(--shadow-hairline)]">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                  Source checked
                </dt>
                <dd className="mt-1 font-serif text-2xl font-extrabold text-ink">
                  {stats.latestCheck ? formatDate(stats.latestCheck) : "—"}
                </dd>
                <p className="mt-1 text-xs text-ink-soft">on the store&apos;s own pages</p>
              </div>
              <div className="lift rounded-2xl border border-ledger-line bg-white p-4 shadow-[var(--shadow-hairline)]">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                  Shopper votes
                </dt>
                <dd className="mt-1 font-serif text-2xl font-extrabold text-ink">No votes yet</dd>
                <p className="mt-1 text-xs text-ink-soft">
                  be the first — vote on any offer below
                </p>
              </div>
            </>
          )}
        </dl>
        <p className="mt-3 text-sm text-ink-soft">
          {hasVotes
            ? "One person saying a code worked is not evidence. Every vote on Durza is timestamped and counted —"
            : "No code here has been reported tested yet. Offers are read from the store's own pages and timestamped with a source check date —"}{" "}
          <Link href="/trust" className="text-inkblue underline-offset-2 hover:underline">
            here is how the counting works
          </Link>
          .
        </p>
      </section>

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
                  <StoreMark store={related} size={36} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-ink">{related.name}</span>
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
        and track its price — we email you when it falls.
      </p>
    </div>
  );
}