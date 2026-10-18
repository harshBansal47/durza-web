"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { HeaderSearch } from "@/components/HeaderSearch";
import { formatDiscount } from "@/lib/format";
import { storeInitials } from "@/lib/catalog";
import type { CouponPublic } from "@/lib/types";

interface HeroProps {
  stats: { label: string; value: number }[];
  popularStores: { id: string; name: string; slug: string }[];
  spotlight?: CouponPublic[];
  verifiedToday?: number;
  endingSoon?: number;
}

export default function Hero({
  stats,
  popularStores,
  spotlight = [],
  verifiedToday = 0,
  endingSoon = 0,
}: HeroProps) {
  const topCoupon = spotlight[0];
  const additionalCoupons = spotlight.slice(1, 3);

  const visibleStats = stats.filter((stat) => stat.value > 0).slice(0, 3);

  const hasActivity = verifiedToday > 0 || endingSoon > 0;

  return (
    <section className="relative overflow-hidden rounded-[20px] bg-paper-raised border border-ledger-line shadow-[var(--shadow-hairline)] lg:rounded-none lg:border-0 lg:shadow-none lg:bg-gradient-to-b lg:from-orange-50/30 lg:to-white">
      {/* Soft champagne glow behind headline */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-accent-soft/20 blur-3xl" />
        <div className="absolute -bottom-16 right-1/4 h-56 w-56 rounded-full bg-accent-faint/30 blur-3xl" />
      </div>

      <div className="relative px-5 py-8 sm:px-8 sm:py-10 lg:mx-auto lg:max-w-7xl lg:px-6 lg:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:gap-16 lg:items-center">
          {/* Left — text, search, pills, stats (unchanged on mobile) */}
          <div>
            {/* Dynamic activity information */}
            {hasActivity && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {verifiedToday > 0 && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-ledger-line bg-accent-faint px-3 py-1.5 text-xs font-medium text-accent">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    {verifiedToday.toLocaleString("en-IN")} verified today
                  </span>
                )}

                {endingSoon > 0 && (
                  <span className="text-xs text-ink-soft">
                    {endingSoon.toLocaleString("en-IN")} ending soon
                  </span>
                )}
              </div>
            )}

            {/* Main heading — massive and bold on desktop */}
            <h1
              className={[
                "max-w-2xl font-sans font-medium tracking-tight",
                "text-4xl leading-[0.98] sm:text-5xl lg:text-6xl lg:font-extrabold lg:leading-[1.1]",
                hasActivity ? "mt-6" : "mt-0",
              ].join(" ")}
            >
              Save money
              <br />
              <span className="text-accent">before you buy.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-ink-soft lg:mt-6 lg:max-w-lg lg:text-lg lg:leading-relaxed">
              Find trusted deals, compare your options, and choose what&apos;s worth
              it.
            </p>

            {/* Mega search bar — prominent on desktop */}
            <div
              className="mt-7 max-w-xl lg:mt-8"
              role="search"
              aria-label="Search deals, stores, products and guides"
            >
              <div className="lg:flex lg:items-center lg:rounded-2xl lg:border lg:border-gray-200 lg:bg-white lg:p-2 lg:shadow-lg lg:shadow-gray-200/50 lg:transition-all lg:focus-within:border-orange-500 lg:focus-within:ring-2 lg:focus-within:ring-orange-500/20">
                <HeaderSearch popular={popularStores.map((store) => store.name)} />
              </div>
            </div>

            {/* Quick category pills — subtle tags on desktop, popular stores on mobile */}
            {popularStores.length > 0 && (
              <div className="mt-7 lg:mt-4">
                <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.24em] text-ink-soft lg:hidden">
                  Popular stores
                </p>
                <p className="mb-2.5 hidden text-[10px] font-medium uppercase tracking-[0.24em] text-ink-soft lg:block">
                  Quick categories
                </p>

                <div className="flex flex-wrap gap-2">
                  {popularStores.slice(0, 5).map((store) => (
                    <Link
                      key={store.id}
                      href={`/stores/${store.slug}`}
                      className="
                        rounded-full
                        border border-ledger-line
                        bg-white
                        px-3.5 py-1.5
                        text-xs font-medium text-ink-soft
                        transition-all duration-150
                        hover:border-accent-soft
                        hover:text-ink
                        lg:border-0 lg:bg-gray-100 lg:px-3 lg:py-1.5 lg:text-sm lg:text-gray-600 lg:hover:bg-gray-200 lg:hover:text-gray-900
                      "
                    >
                      {store.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic statistics */}
            {visibleStats.length > 0 && (
              <dl className="mt-9 flex max-w-xl border-t border-ledger-line pt-5">
                {visibleStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={[
                      "min-w-0 flex-1",
                      index > 0 ? "border-l border-ledger-line pl-4 sm:pl-6" : "",
                      index < visibleStats.length - 1 ? "pr-4 sm:pr-6" : "",
                    ].join(" ")}
                  >
                    <dd className="font-mono text-xl font-medium tracking-tight text-ink sm:text-2xl">
                      {stat.value.toLocaleString("en-IN")}
                    </dd>

                    <dt className="mt-1 truncate text-[11px] text-ink-soft sm:text-xs">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            )}

            {/* Additional spotlight coupons — desktop only, below stats */}
            {additionalCoupons.length > 0 && (
              <div className="mt-8 hidden lg:block">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-ink-soft">
                  More featured deals
                </p>
                <ul className="divide-y divide-ledger-line rounded-2xl border border-ledger-line bg-paper-raised shadow-[var(--shadow-hairline)]">
                  {additionalCoupons.map((coupon) => (
                    <li key={coupon.id}>
                      <Link
                        href={`/coupons/${coupon.slug}`}
                        className="group flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-paper-alt/50"
                      >
                        <span className="min-w-0 truncate text-sm font-medium text-ink-soft transition-colors group-hover:text-ink">
                          {coupon.title}
                        </span>
                        <span className="shrink-0 font-mono text-xs font-medium text-accent">
                          {formatDiscount(coupon)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right / Visual Anchor (desktop only) */}
          <div className="relative hidden h-[400px] lg:block">
            {/* Background blob */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200/40 blur-3xl"
            />

            {/* Floating Deal Card */}
            <div className="absolute right-10 top-10 w-72 rotate-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl transition-transform duration-500 hover:rotate-0">
              {topCoupon ? (
                <>
                  {/* Store logo + name */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 font-serif text-sm font-bold text-white">
                      {storeInitials(topCoupon.title)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">{topCoupon.title}</p>
                      <p className="text-xs text-gray-500">Featured Deal</p>
                    </div>
                  </div>

                  {/* Big discount */}
                  <p className="text-4xl font-extrabold tracking-tight text-orange-600">
                    {formatDiscount(topCoupon)}
                  </p>

                  {/* Masked code box */}
                  <div className="mt-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-sm tracking-widest text-gray-400">
                        {topCoupon.code
                          ? `${topCoupon.code.slice(0, 3)}${"•".repeat(Math.max(0, topCoupon.code.length - 3))}`
                          : "DUR••••••"}
                      </span>
                      <Link
                        href={`/coupons/${topCoupon.slug}`}
                        className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-black active:scale-95"
                      >
                        Get Code
                      </Link>
                    </div>
                  </div>

                  {/* Expiry note */}
                  <p className="mt-3 text-xs text-gray-400">Verified today • Ends soon</p>
                </>
              ) : (
                /* Empty state */
                <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">No featured deal right now</p>
                  <p className="mt-1 text-xs text-gray-500">Check back soon for fresh offers</p>
                </div>
              )}
            </div>

            {/* Secondary floating element */}
            <div className="absolute bottom-20 left-10 flex -rotate-2 items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-xl">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {verifiedToday > 0
                    ? `${verifiedToday.toLocaleString("en-IN")} verified today`
                    : "Verified 2 mins ago"}
                </p>
                <p className="text-xs text-gray-500">Trusted by 10k+ shoppers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
