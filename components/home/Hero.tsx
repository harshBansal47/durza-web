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

export default function Hero({
  stats,
  popularStores,
  spotlight = [],
  verifiedToday = 0,
  endingSoon = 0,
}: HeroProps) {
  const topCoupon = spotlight[0];
  const additionalCoupons = spotlight.slice(1, 3);

  const visibleStats = stats
    .filter((stat) => stat.value > 0)
    .slice(0, 3);

  const hasActivity = verifiedToday > 0 || endingSoon > 0;

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-[#1b1836] text-white shadow-[var(--shadow-overlay)]">
      {/* Subtle background structure */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/[0.05]" />
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/[0.05]" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-white/[0.05] lg:block" />
      </div>

      <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left */}
        <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-11 lg:py-12">
          {/* Dynamic activity information */}
          {hasActivity && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {verifiedToday > 0 && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/85">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-[#ffc933]"
                  />
                  {verifiedToday.toLocaleString("en-IN")} verified today
                </span>
              )}

              {endingSoon > 0 && (
                <span className="text-xs text-white/50">
                  {endingSoon.toLocaleString("en-IN")} ending soon
                </span>
              )}
            </div>
          )}

          {/* Main heading */}
          <h1
            className={[
              "max-w-2xl font-serif font-extrabold tracking-tight",
              "text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]",
              hasActivity ? "mt-6" : "mt-0",
            ].join(" ")}
          >
            Find better deals
            <br />
            <span className="text-[#ffc933]">before you pay.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
            Search for coupon codes, offers and deals from the stores you shop
            at.
          </p>

          {/* Search */}
          <div
            className="mt-7 max-w-xl"
            role="search"
            aria-label="Search coupons"
          >
            <HeaderSearch
              popular={popularStores.map((store) => store.name)}
            />

            <p className="mt-2 text-xs text-white/45">
              Search by store, brand or category
            </p>
          </div>

          {/* Popular stores */}
          {popularStores.length > 0 && (
            <div className="mt-7">
              <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                Popular stores
              </p>

              <div className="flex flex-wrap gap-2">
                {popularStores.slice(0, 5).map((store) => (
                  <Link
                    key={store.id}
                    href={`/stores/${store.slug}`}
                    className="
                      rounded-lg
                      border border-white/15
                      bg-white/[0.04]
                      px-3 py-1.5
                      text-xs font-medium text-white/75
                      transition-all duration-150
                      hover:border-white/30
                      hover:bg-white/[0.09]
                      hover:text-white
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
            <dl className="mt-9 flex max-w-xl border-t border-white/10 pt-5">
              {visibleStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={[
                    "min-w-0 flex-1",
                    index > 0
                      ? "border-l border-white/10 pl-4 sm:pl-6"
                      : "",
                    index < visibleStats.length - 1
                      ? "pr-4 sm:pr-6"
                      : "",
                  ].join(" ")}
                >
                  <dd className="font-mono text-xl font-semibold tracking-tight sm:text-2xl">
                    {stat.value.toLocaleString("en-IN")}
                  </dd>

                  <dt className="mt-1 truncate text-[11px] text-white/45 sm:text-xs">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Right / Spotlight. Hidden on phones: it repeats the first deal of the rows below, and on a
            small screen the shopper should reach real deals without scrolling past it. */}
        <div className="hidden border-t border-white/10 md:block bg-white/[0.025] p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-9">
          {topCoupon ? (
            <div className="flex h-full flex-col justify-center">
              {/* Coupon card */}
              <div className="overflow-hidden rounded-[22px] bg-white text-ink shadow-2xl shadow-black/20">
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                        {topCoupon.title}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-brand/[0.08] px-2.5 py-1 text-[10px] font-semibold text-brand">
                      {formatDiscount(topCoupon)}
                    </span>
                  </div>

                  <div className="mt-6">
                    <span className="marker font-serif text-4xl font-extrabold tracking-tight sm:text-5xl">
                      {formatDiscount(topCoupon)}
                    </span>
                  </div>

                  <Link
                    href={`/coupons/${topCoupon.slug}`}
                    className="
                      mt-6 flex min-h-11 w-full
                      items-center justify-center
                      gap-2 rounded-xl
                      bg-brand px-4 py-3
                      text-sm font-semibold text-white
                      transition-all duration-150
                      hover:brightness-110
                      hover:shadow-[var(--shadow-glow)]
                    "
                  >
                    View coupon
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                {/* Additional spotlight coupons */}
                {additionalCoupons.length > 0 && (
                  <div className="border-t border-ledger-line bg-[#faf9fc] px-5 py-4 sm:px-6">
                    <ul className="divide-y divide-ledger-line">
                      {additionalCoupons.map((coupon) => (
                        <li key={coupon.id}>
                          <Link
                            href={`/coupons/${coupon.slug}`}
                            className="
                              group flex items-center
                              justify-between gap-4
                              py-3
                            "
                          >
                            <span className="min-w-0 truncate text-sm font-medium text-ink-soft transition-colors group-hover:text-ink">
                              {coupon.title}
                            </span>

                            <span className="shrink-0 font-mono text-xs font-semibold text-ink">
                              {formatDiscount(coupon)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Empty state */
            <div className="flex h-full min-h-[260px] items-center justify-center">
              <div className="w-full rounded-[22px] border border-dashed border-white/15 bg-white/[0.025] p-6">
                <div
                  aria-hidden="true"
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="text-white/50"
                  >
                    <path
                      d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 7h16v5H4z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 7V5a4 4 0 0 1 8 0v2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <p className="text-sm font-semibold text-white">
                  No spotlight coupons
                </p>

                <p className="mt-1.5 text-sm leading-6 text-white/45">
                  Browse the available coupons and deals.
                </p>

                <Link
                  href="/coupons"
                  className="
                    mt-5 inline-flex items-center gap-2
                    text-sm font-semibold text-[#ffc933]
                    transition-colors hover:text-white
                  "
                >
                  Browse coupons
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}