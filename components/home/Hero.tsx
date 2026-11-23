"use client";

import PendingLink from "@/components/ui/PendingLink";
import { CheckCircle2 } from "lucide-react";
import { HeaderSearch } from "@/components/HeaderSearch";
import Image from "next/image";
import { storeLogoUrl } from "@/lib/storeLogos";
import { REDESIGN_ENABLED } from "@/lib/flags";
import HeroIllustration from "@/components/home/HeroIllustration";
import HeroSpotlight from "@/components/home/HeroSpotlight";
import type { CouponPublic } from "@/lib/types";

interface HeroProps {
  stats: { label: string; value: number }[];
  popularStores: {
    id: string;
    name: string;
    slug: string;
    logo_url?: string | null;
    website_url?: string | null;
  }[];
  spotlight?: CouponPublic[];
  verifiedToday?: number;
  endingSoon?: number;
  showStats?: boolean;
}

export default function Hero({
  stats,
  popularStores,
  spotlight = [],
  verifiedToday = 0,
  endingSoon = 0,
  showStats = true,
}: HeroProps) {
  const topCoupon = spotlight[0];
  const topStore = topCoupon
    ? popularStores.find((store) => store.id === topCoupon.store_id)
    : undefined;

  const visibleStats = stats.filter((stat) => stat.value > 0).slice(0, 3);

  const hasActivity = verifiedToday > 0 || endingSoon > 0;

  return (
    <section className="relative overflow-hidden rounded-[20px] bg-paper-raised border border-ledger-line shadow-[var(--shadow-hairline)] lg:rounded-none lg:border-0 lg:shadow-none lg:bg-gradient-to-b lg:from-orange-50/30 lg:to-white">
      {/* Soft champagne glow behind headline */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-accent-soft/20 blur-3xl" />
        <div className="absolute -bottom-16 right-1/4 h-56 w-56 rounded-full bg-accent-faint/30 blur-3xl" />
      </div>

      {REDESIGN_ENABLED && (
        <>
          {/* Phase 2a background: radial accent tint + fading dot grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(234,88,12,0.08), transparent 60%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: "radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            }}
          />
        </>
      )}

      <div className="relative px-5 py-8 sm:px-8 sm:py-10 lg:mx-auto lg:max-w-7xl lg:px-6 lg:py-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14">
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
                  <span className="inline-flex items-center gap-2 rounded-full border border-ledger-line bg-paper-raised px-3 py-1.5 text-xs font-medium text-ink-soft">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {endingSoon.toLocaleString("en-IN")} ending soon
                  </span>
                )}
              </div>
            )}

            {/* Main heading — massive and bold on desktop */}
            <h1
              className={[
                "max-w-2xl font-sans font-extrabold tracking-tight",
                "text-4xl leading-[0.95] sm:text-5xl lg:text-6xl lg:leading-[1.05]",
                hasActivity ? "mt-6" : "mt-0",
              ].join(" ")}
            >
              Coupons, deals &amp; offers —
              <br />
              <span className="text-accent">₹0 extra, India-first.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-ink-soft lg:mt-6 lg:max-w-lg lg:text-lg lg:leading-relaxed">
              Offer types and stated terms — sourced from tracked store pages
              pages every day.
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

            {/* Quick-tool pills — jump straight to a store's interactive tool */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { emoji: "⚡", label: "BLDC Power Calculator", href: "/stores/havells/bldc-calculator" },
                { emoji: "🥤", label: "Protein Cost Decoder", href: "/stores/alpino#protein-decoder" },
                { emoji: "🩺", label: "Menstrual Cup Size Finder", href: "/stores/sirona#cup-size-finder" },
                { emoji: "🧾", label: "GST Tool Matcher", href: "/stores/moglix#gst-net-cost" },
              ].map((tool) => (
                <PendingLink
                  key={tool.href}
                  href={tool.href}
                  className="rounded-full border border-ledger-line bg-white px-3 py-1.5 text-xs font-medium text-ink transition-all hover:border-accent-soft hover:bg-orange-50/60 hover:text-accent"
                >
                  <span aria-hidden="true">{tool.emoji}</span>
                  {tool.label}
                </PendingLink>
              ))}
            </div>

            {/* Primary action — one verb, one place. */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <PendingLink
                href="/coupons?sort=recommended"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                Show today&apos;s coupons
                <span aria-hidden="true">→</span>
              </PendingLink>
              <PendingLink
                href="/deals"
                className="inline-flex items-center gap-2 rounded-xl border border-ledger-line bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-inkblue/40 hover:text-inkblue"
              >
                Today&apos;s deals
                <span aria-hidden="true" className="text-green-600">●</span>
              </PendingLink>
            </div>

            {/* Trust row under the search */}
            <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-soft">
              {[
                "Sourced from official pages",
                "Check date on every offer",
                "No fake timers",
              ].map((label) => (
                <li key={label} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-verified" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>

            {topCoupon && (
              <div className="mt-5 lg:hidden">
                <HeroSpotlight coupon={topCoupon} store={topStore} />
              </div>
            )}

            {/* Quick category pills — subtle tags on desktop, popular stores on mobile */}
            {popularStores.length > 0 && (
              <div className="mt-7 lg:mt-4">
                <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.24em] text-ink-soft">
                  Popular stores
                </p>

                <div className="flex flex-wrap gap-2">
                  {popularStores.slice(0, 5).map((store) => (
                    <PendingLink
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
                    </PendingLink>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic statistics */}
            {showStats && visibleStats.length > 0 && (
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

          {/* Right: illustration and one real deal (desktop only; mobile stays compact) */}
          <div className="relative mt-10 hidden lg:mt-0 lg:block">
            <HeroIllustration className="mx-auto h-auto w-full max-w-[520px]" />
            <div className="relative z-10 mx-auto -mt-4 max-w-[440px]">
              {topCoupon ? (
                <HeroSpotlight coupon={topCoupon} store={topStore} />
              ) : (
                <div className="rounded-2xl border border-ledger-line bg-paper-raised px-4 py-3 text-center shadow-[var(--shadow-hairline)]">
                  <p className="text-sm font-medium text-ink">No featured deal right now</p>
                  <p className="mt-0.5 text-xs text-ink-soft">Check back soon for fresh offers</p>
                </div>
              )}
            </div>
          </div>
        </div>

            {REDESIGN_ENABLED && popularStores.length > 0 && (
              <div className="mt-10 overflow-hidden border-t border-ledger-line pt-6">
                <ul className="flex w-max gap-6 motion-safe:animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
                  {[...popularStores, ...popularStores].map((store, i) => {
                    const logo = storeLogoUrl(store);
                    return (
                      <li
                        key={`${store.id}-${i}`}
                        aria-hidden={i >= popularStores.length}
                        inert={i >= popularStores.length}
                        className="shrink-0"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-paper-raised grayscale transition-all duration-200 hover:grayscale-0">
                          {logo ? (
                            <Image
                              src={logo}
                              alt=""
                              width={28}
                              height={28}
                              className="h-7 w-7 object-contain"
                            />
                          ) : (
                            <span className="text-xs font-medium text-ink-soft">
                              {store.name.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
      </div>
    </section>
  );
}
