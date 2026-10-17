"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

const PALETTE = {
  dark: "var(--color-ink-warm)",
  gold: "var(--color-gold)",
  goldLight: "var(--color-gold-light)",
  goldTint: "var(--color-gold-tint)",
  goldText: "var(--color-gold-text)",
  white: "var(--color-paper-raised)",
  muted: "var(--color-ink-soft)",
  border: "var(--color-ledger-line)",
};

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
    <section className="relative overflow-hidden rounded-[20px] bg-paper-raised border border-ledger-line shadow-[var(--shadow-hairline)]">
      {/* Soft champagne glow behind headline */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-accent-soft/20 blur-3xl" />
        <div className="absolute -bottom-16 right-1/4 h-56 w-56 rounded-full bg-accent-faint/30 blur-3xl" />
      </div>

      <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left */}
        <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-11 lg:py-12">
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

          {/* Main heading */}
          <h1
            className={[
              "max-w-2xl font-sans font-medium tracking-tight",
              "text-4xl leading-[0.98] sm:text-5xl lg:text-[3.5rem]",
              hasActivity ? "mt-6" : "mt-0",
            ].join(" ")}
          >
            Save money
            <br />
            <span className="text-accent">before you buy.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-ink-soft">
            Find trusted deals, compare your options, and choose what&apos;s worth
            it.
          </p>

          {/* Search */}
          <div
            className="mt-7 max-w-xl"
            role="search"
            aria-label="Search deals, stores, products and guides"
          >
            <HeaderSearch popular={popularStores.map((store) => store.name)} />

            <p className="mt-2 text-xs text-ink-soft">
              Search deals, stores, products and guides
            </p>
          </div>

          {/* Popular stores */}
          {popularStores.length > 0 && (
            <div className="mt-7">
              <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.24em] text-ink-soft">
                Popular stores
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
        </div>

        {/* Right / Spotlight */}
        <div className="hidden border-t border-ledger-line md:block bg-paper-alt/50 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-9">
          {topCoupon ? (
            <div className="flex h-full flex-col justify-center">
              {/* Coupon card */}

              <div
                className="overflow-hidden rounded-[20px]"
                style={{
                  backgroundColor: PALETTE.white,
                  border: `1px solid ${PALETTE.border}`,
                  boxShadow:
                    "0 1px 2px rgba(20,17,10,0.06), 0 6px 18px rgba(20,17,10,0.06)",
                }}
              >
                {/* gold accent strip */}
                <div
                  aria-hidden="true"
                  className="h-1.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${PALETTE.gold}, ${PALETTE.goldLight})`,
                  }}
                />

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p
                        className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                        style={{ color: PALETTE.muted }}
                      >
                        {topCoupon.title}
                      </p>
                    </div>

                    <span
                      className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                      style={{
                        backgroundColor: PALETTE.goldTint,
                        color: PALETTE.goldText,
                        boxShadow: `inset 0 0 0 1px ${PALETTE.gold}`,
                      }}
                    >
                      {formatDiscount(topCoupon)}
                    </span>
                  </div>

                  <div className="mt-6">
                    <span
                      className="inline font-sans text-4xl font-semibold tracking-tight sm:text-5xl"
                      style={{
                        color: PALETTE.dark,
                        // highlighter effect, drawn inline instead of the `marker` class
                        backgroundImage: `linear-gradient(transparent 62%, ${PALETTE.goldLight} 62%)`,
                        padding: "0 4px",
                      }}
                    >
                      {formatDiscount(topCoupon)}
                    </span>
                  </div>

                  <Link
                    href={`/coupons/${topCoupon.slug}`}
                    className="mt-6 flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold outline-none transition duration-150 hover:-translate-y-px hover:brightness-125 focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{
                      backgroundColor: PALETTE.dark,
                      color: PALETTE.white,
                    }}
                  >
                    View coupon
                    <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                  </Link>
                </div>
              </div>

              {/* Additional spotlight coupons */}
              {additionalCoupons.length > 0 && (
                <div className="border-t border-ledger-line bg-paper-alt/50 px-5 py-4 sm:px-6">
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

                          <span className="shrink-0 font-mono text-xs font-medium text-ink">
                            {formatDiscount(coupon)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            /* Empty state */
            <div className="flex h-full min-h-[260px] items-center justify-center">
              <div className="w-full rounded-[20px] border border-dashed border-ledger-line bg-paper-alt/50 p-6">
                <div
                  aria-hidden="true"
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-ledger-line bg-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="text-ink-soft"
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
                    <path d="M8 7V5a4 4 0 0 1 8 0v2" strokeLinecap="round" />
                  </svg>
                </div>

                <p className="text-sm font-medium text-ink">
                  No spotlight coupons
                </p>

                <p className="mt-1.5 text-sm leading-6 text-ink-soft">
                  Browse the available coupons and deals.
                </p>

                <Link
                  href="/coupons"
                  className="
                    mt-5 inline-flex items-center gap-2
                    text-sm font-medium text-accent
                    transition-colors hover:text-ink
                  "
                >
                  Browse coupons
                  <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
  