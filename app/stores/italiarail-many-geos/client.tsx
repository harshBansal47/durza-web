"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import type { StoreOfferCard } from "@/lib/store-offers";

const REL = "nofollow sponsored noopener noreferrer";

type RouteTab = "rome-florence" | "rome-venice" | "milan-florence";
const ROUTES: Record<RouteTab, { label: string; title: string; text: string; cta: string }> = {
  "rome-florence": {
    label: "Rome ↔ Florence",
    title: "Fast connections on popular Italy routes",
    text: "Compare Trenitalia and Italo high-speed options on ItaliaRail for Rome–Florence journeys with English-language booking and instant e-tickets on eligible fares.",
    cta: "/go/italiarail-many-geos?src=matcher-rome-florence",
  },
  "rome-venice": {
    label: "Rome ↔ Venice",
    title: "Plan longer intercity trips with e-tickets",
    text: "Use ItaliaRail to review schedules and fare types for Rome–Venice travel, then confirm seat selection and ticket conditions at checkout.",
    cta: "/go/italiarail-many-geos?src=matcher-rome-venice",
  },
  "milan-florence": {
    label: "Milan ↔ Florence",
    title: "Compare operators and fare classes",
    text: "Check available Trenitalia and Italo services for Milan–Florence on ItaliaRail, with multi-currency checkout options such as EUR, USD, or GBP where available.",
    cta: "/go/italiarail-many-geos?src=matcher-milan-florence",
  },
};

interface Props {
  offers: StoreOfferCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function ItaliaRailClient({ offers, faqs, stats, heroImageUrl, offerCount }: Props) {
  const [tab, setTab] = useState<RouteTab>("rome-florence");
  const active = ROUTES[tab];
  const topOffer = offers[0] ?? null;
  const storeHref = "/go/italiarail-many-geos?src=store-page";

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 pb-24 md:pb-8">
      <StoreHero
        name="ItaliaRail"
        subtitle="Authorized English-language booking partner for Trenitalia and Italo high-speed trains across Italy."
        domain="italiarail.com"
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={storeHref}
        ctaLabel="Book on ItaliaRail →"
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <section className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 className="text-xl font-bold text-ink">Book Italy trains in English with confidence</h2>
        <ul className="mt-3 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
          {[
            "Authorized English-language booking partner for Trenitalia and Italo high-speed trains.",
            "Plan routes across Rome, Florence, Venice, Milan and other Italian cities.",
            "Multi-currency checkout options (EUR/USD/GBP) may be available at checkout.",
            "Instant e-tickets are provided for eligible bookings; confirm fare rules before purchase.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-verified" strokeWidth={2} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="italiarail-matcher" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Route matcher</p>
        <h2 id="italiarail-matcher" className="mt-1 text-xl font-bold text-ink">Popular Italy rail routes on ItaliaRail</h2>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="ItaliaRail route matcher">
          {(Object.keys(ROUTES) as RouteTab[]).map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              aria-controls="italiarail-matcher-panel"
              onClick={() => setTab(id)}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${tab === id ? "border-ink bg-ink text-white" : "border-ledger-line bg-white text-ink-soft hover:border-inkblue hover:text-ink"}`}
            >
              {ROUTES[id].label}
            </button>
          ))}
        </div>
        <div id="italiarail-matcher-panel" role="tabpanel" className="mt-4 rounded-xl border border-ledger-line bg-paper-raised p-4 sm:p-5">
          <h3 className="text-lg font-bold text-ink">{active.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-soft">{active.text}</p>
          <a href={active.cta} target="_blank" rel={REL} className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
            Check {ROUTES[tab].label} on ItaliaRail <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      {offers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((o, idx) => (
            <OfferCard
              key={o.id || idx}
              bookmarkId={o.id}
              code={o.code}
              badge={o.badge}
              title={o.title}
              description={o.description}
              ctaHref={o.targetUrl.startsWith("/go/") ? `${o.targetUrl}${o.targetUrl.includes("?") ? "&" : "?"}src=offer-card` : `/go/italiarail-many-geos?src=offer-card`}
              expiresAt={o.expiresAt}
            />
          ))}
        </div>
      ) : (
        <ExploreStoreCta storeName="ItaliaRail" href={storeHref} />
      )}

      <section aria-labelledby="italiarail-related" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 id="italiarail-related" className="text-lg font-bold text-ink">Plan smarter for international travel</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a href="/categories/travel" className="rounded-2xl border border-ledger-line bg-paper-raised p-4 transition hover:border-inkblue/30 hover:shadow-sm">
            <p className="font-semibold text-ink">Travel category</p>
            <p className="mt-1 text-sm text-ink-soft">Browse travel stores, bookings, and trip-planning offers</p>
          </a>
          <a href="/bank-offers" className="rounded-2xl border border-ledger-line bg-paper-raised p-4 transition hover:border-inkblue/30 hover:shadow-sm">
            <p className="font-semibold text-ink">Bank offers</p>
            <p className="mt-1 text-sm text-ink-soft">Check card discounts and payment offers before international checkout</p>
          </a>
        </div>
      </section>

      <FaqSection eyebrow="ItaliaRail FAQs" items={faqs} />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={topOffer ? (topOffer.targetUrl.startsWith("/go/") ? topOffer.targetUrl : storeHref) : storeHref} target="_blank" rel={REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">{topOffer?.code ? `Code ${topOffer.code}` : "Official store"}</span>
            <span className="block truncate text-xs font-semibold">{topOffer ? topOffer.title : "Check ItaliaRail routes & fares"}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Open <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </div>
  );
}
