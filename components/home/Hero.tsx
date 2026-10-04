"use client";

import Link from "next/link";
import { HeaderSearch } from "@/components/HeaderSearch";
import { formatDiscount } from "@/lib/format";
import type { CouponPublic } from "@/lib/types";

interface HeroProps {
  stats: { label: string; value: number }[];
  popularStores: { id: string; name: string; slug: string }[];
  spotlight?: CouponPublic[];
  verifiedToday?: number;
  endingSoon?: number;
}

/**
 * Product hero, not a brochure: search-as-product left, one real
 * opportunity right. No floating emoji, no gradient blobs.
 */
export default function Hero({ stats, popularStores, spotlight = [], verifiedToday = 0, endingSoon = 0 }: HeroProps) {
  const top = spotlight.slice(0, 1)[0];
  const rest = spotlight.slice(1, 3);

  return (
    <section className="overflow-hidden rounded-[28px] bg-[#1b1836] text-white shadow-[var(--shadow-overlay)]">
      <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1 text-xs font-semibold text-white/90">
            <span className="h-2 w-2 rounded-full bg-[#ffc933]" aria-hidden="true" />
            {verifiedToday > 0 ? `${verifiedToday} codes confirmed recently` : "Codes confirmed by real shoppers"}
            {endingSoon > 0 && <span className="text-white/60">· {endingSoon} ending soon</span>}
          </p>
          <h1 className="mt-5 text-balance font-serif text-4xl font-extrabold leading-[1.05] sm:text-5xl">
            Before you pay, <span className="marker text-[#1b1836]">check Couponbase</span>.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base text-white/75 sm:text-lg">
            Real codes with real success rates. No countdown theater, no paid placement.
          </p>

          <div className="mt-6 max-w-xl [&_input]:!bg-white" role="search" aria-label="Site search">
            <HeaderSearch popular={popularStores.map((s) => s.name)} />
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-white/50">
              Try a store, a brand, or a category
            </p>
          </div>

          {popularStores.length > 0 && (
            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/75">
              <span className="font-medium text-white/60">Popular:</span>
              {popularStores.slice(0, 5).map((store) => (
                <Link
                  key={store.id}
                  href={`/stores/${store.slug}`}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold transition-colors hover:bg-white hover:text-black"
                >
                  {store.name}
                </Link>
              ))}
            </p>
          )}

          {stats.some((s) => s.value > 0) && (
            <dl className="mt-8 grid max-w-lg grid-cols-3 gap-3">
              {stats
                .filter((s) => s.value > 0)
                .map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/15 px-3 py-3">
                    <dt className="text-[11px] font-medium text-white/60">{s.label}</dt>
                    <dd className="font-mono text-2xl font-semibold">{s.value.toLocaleString("en-IN")}</dd>
                  </div>
                ))}
            </dl>
          )}
        </div>

        <div aria-label="Worth a look right now">
          {top ? (
            <div className="rounded-[20px] bg-white p-5 text-ink">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Worth a look right now</p>
              <p className="savings-figure mt-2 text-4xl">
                <span className="marker">{formatDiscount(top)}</span>
              </p>
              <p className="mt-2 truncate text-sm font-semibold">{top.title}</p>
              <Link href={`/coupons/${top.slug}`} className="btn btn-cta mt-4 w-full justify-center">
                Get this deal
              </Link>
              {rest.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-dashed border-ledger-line pt-4">
                  {rest.map((c) => (
                    <li key={c.id}>
                      <Link href={`/coupons/${c.slug}`} className="flex items-center justify-between gap-3 text-sm hover:underline">
                        <span className="min-w-0 truncate text-ink-soft">{c.title}</span>
                        <span className="shrink-0 font-mono text-xs font-semibold text-ink">{formatDiscount(c)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="rounded-[20px] border border-dashed border-white/25 p-6 text-sm text-white/70">
              No spotlight deal right now — we would rather show nothing than pad this slot.
              <Link href="/coupons" className="mt-3 block font-semibold text-white underline-offset-4 hover:underline">
                Browse all coupons →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
