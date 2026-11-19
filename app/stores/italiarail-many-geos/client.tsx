"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import OfferCard from "@/components/OfferCard";
import StoreGuideLink from "@/components/stores/StoreGuideLink";
import type { StoreOfferCard } from "@/lib/store-offers";
import { GO_REL, storeGoHref } from "@/lib/go";

interface Props {
  offers: StoreOfferCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
  forcedStoreHref?: string | null;
}

type Tab = "highspeed" | "multicity" | "daytrips" | "family";

const MATCHES: Record<Tab, { label: string; name: string; detail: string; cta: string; src: string }> = {
  highspeed: {
    label: "Rome ↔ Florence ↔ Venice ↔ Milan",
    name: "Frecciarossa High-Speed Point-to-Point Tickets",
    detail: "City-center-to-city-center rail travel at up to 300 km/h with reserved seating.",
    cta: "Book High-Speed Tickets",
    src: "matcher-highspeed",
  },
  multicity: {
    label: "Multi-City Italy Itinerary",
    name: "Trenitalia Pass & Multi-Leg Trip Planner",
    detail: "Compare flexible multi-day rail passes against individual point-to-point tickets.",
    cta: "Plan Multi-City Trip",
    src: "matcher-multicity",
  },
  daytrips: {
    label: "Day Trips (Cinque Terre / Pisa / Como)",
    name: "Regionale & Intercity Connections",
    detail: "Direct regional connections to coastal and lake towns.",
    cta: "Find Day Trip Routes",
    src: "matcher-daytrips",
  },
  family: {
    label: "Group & Family Seating",
    name: "Reserved Coach & Seat-Selection Booking",
    detail: "Keep family seats together in Standard, Premium, Business, or Executive coaches.",
    cta: "Book Family Seats",
    src: "matcher-family-seating",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((id) => ({ id, label: MATCHES[id].label }));

function TrainIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 38h36l-4-16a6 6 0 0 0-6-4H24a6 6 0 0 0-6 4l-4 16Z" />
      <path d="M18 38v8M46 38v8M22 46h20" />
      <circle cx="24" cy="46" r="3" />
      <circle cx="40" cy="46" r="3" />
      <path d="M26 24h12M10 54h44" />
      <rect x="46" y="12" width="10" height="10" rx="1.5" />
      <path d="M49 15h4M49 18h4" />
    </svg>
  );
}

export default function ItaliaRailClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl, forcedStoreHref }: Props) {
  const [active, setActive] = useState<Tab>("highspeed");
  const match = useMemo(() => MATCHES[active], [active]);
  const outHref = (src: string, fallback?: string) => forcedStoreHref ?? fallback ?? storeGoHref("italiarail-many-geos", src);
  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.italiarail.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "italiarail.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="ItaliaRail"
        subtitle="Reserve seat-assigned Frecciarossa high-speed tickets between Rome, Florence, Venice, and Milan with multi-currency checkout and instant mobile e-tickets."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/italiarail.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={outHref("store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />
      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="ir-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="ir-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          ItaliaRail — English-Language Booking for High-Speed Italian Trains
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Reserve seat-assigned Frecciarossa high-speed tickets between Rome, Florence, Venice, and Milan with multi-currency checkout and instant mobile e-tickets.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-sky-100 bg-sky-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Italian high-speed Frecciarossa tickets include mandatory reserved seats and spike in price closer to departure—booking point-to-point tickets early locks in Base, Economy, or Super Economy fare tiers.
        </p>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Global multi-currency checkout: ItaliaRail supports currencies such as EUR, USD, and GBP (availability may vary). No local UPI assumptions apply.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="ir-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Route Matcher</p>
        <h2 id="ir-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">Choose your Italy rail journey</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">Select a tab to find the right route or pass option. Every CTA opens the official store via a tracked link.</p>
        <div role="tablist" aria-label="ItaliaRail matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button key={tab.id} id={`ir-tab-${tab.id}`} role="tab" type="button" aria-selected={selected} aria-controls={`ir-panel-${tab.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActive(tab.id)} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${selected ? "border-sky-700 bg-sky-700 text-white" : "border-ledger-line bg-white text-ink hover:border-sky-700"}`}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div id={`ir-panel-${active}`} role="tabpanel" aria-labelledby={`ir-tab-${active}`} className="mt-6 rounded-xl border border-ledger-line bg-sky-50/40 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-sky-200 bg-white text-sky-700">
              <TrainIcon />
              <span className="sr-only">Official Trenitalia Partner · Multi-Currency · E-Tickets</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Official Trenitalia Partner · Multi-Currency · E-Tickets</p>
              <a href={outHref(match.src)} rel={GO_REL} target="_blank" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-sky-700 px-5 text-sm font-semibold text-white transition hover:bg-sky-800">
                {match.cta}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Curated Links</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Related guides and pages</h2>
        <div className="mt-4"><StoreGuideLink slug="italiarail-many-geos" /></div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/bank-offers" className="font-medium text-durza-deep hover:underline">Bank offers</Link></li>
          <li><Link href="/categories/travel" className="font-medium text-durza-deep hover:underline">Travel category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final fares, currency, and ticket terms on italiarail.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard bookmarkId={offer.id} code={offer.code} badge={offer.badge} title={offer.title} description={offer.description} ctaHref={outHref("offer-card", offer.targetUrl || storeGoHref("italiarail-many-geos", "offer-card"))} expiresAt={offer.expiresAt} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta storeName="ItaliaRail" href={outHref("store-page-bottom")} description="Browse Italy rail routes and check live fares, multi-currency checkout, and ticket terms directly on the official store." />
      <FaqSection eyebrow="ItaliaRail FAQs" items={faqs} />
      <AffiliateDisclosure />
    </div>
  );
}
