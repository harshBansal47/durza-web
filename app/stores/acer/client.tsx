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
}

type Tab = "value" | "flagship" | "ultrabook" | "college";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  value: {
    label: "Value RTX Gaming",
    name: "Acer Nitro V & Nitro 16 Series",
    detail: "Dual-fan cooling, 144Hz/165Hz IPS panels, and upgradable DDR5 RAM slots for 1080p gaming.",
    cta: "Shop Nitro Gaming",
    src: "matcher-value-gaming",
  },
  flagship: {
    label: "Flagship Esport & Creator Power",
    name: "Predator Helios Neo & Helios 16",
    detail: "Liquid-metal thermal grease, AeroBlade 3D metal fans, and high-TGP RTX graphics.",
    cta: "Shop Predator Series",
    src: "matcher-flagship",
  },
  ultrabook: {
    label: "Thin & Light OLED Ultrabook",
    name: "Acer Swift Go 14 / 16 OLED",
    detail: "Sub-1.3 kg aluminum chassis with 100% DCI-P3 OLED screens for travel and color work.",
    cta: "Shop Swift OLED",
    src: "matcher-ultrabook",
  },
  college: {
    label: "College, Coding & Office",
    name: "Aspire Lite & TravelMate Series",
    detail: "Full-size backlit keyboards, rich port selection (USB-C + HDMI + RJ45), and all-day battery life.",
    cta: "Shop Aspire & TravelMate",
    src: "matcher-college",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function MuxCoolingIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="10" y="14" width="18" height="14" rx="3" />
      <rect x="36" y="14" width="18" height="14" rx="3" />
      <path d="M19 28v8h26v-8" />
      <path d="M32 36v12" />
      <rect x="24" y="48" width="16" height="6" rx="2" />
      <path d="M14 21h10M40 21h10" />
      <path d="M16 18c2 2 2 4 0 6M22 18c2 2 2 4 0 6M42 18c2 2 2 4 0 6M48 18c2 2 2 4 0 6" />
    </svg>
  );
}

export default function AcerClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("value");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://store.acer.com/en-in/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "store.acer.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Acer India"
        subtitle="Compare high-refresh gaming rigs, featherlight OLED ultrabooks, and college workhorses direct from Acer India's official online store."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/acer.png"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("acer", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="acer-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="acer-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Acer India — Nitro RTX Gaming, Swift OLED &amp; Aspire Everyday Laptops
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Compare high-refresh gaming rigs, featherlight OLED ultrabooks, and college workhorses direct from Acer
          India&apos;s official online store.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> A MUX switch lets your gaming laptop route frames straight from
          the RTX GPU to the display—cutting latency in competitive shooters instead of bottlenecking through integrated
          graphics.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="acer-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Laptop Matcher</p>
        <h2 id="acer-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose the right Acer lineup
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to compare lineups. Every CTA opens the official Acer India store via a tracked link.
        </p>

        <div role="tablist" aria-label="Acer laptop matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`acer-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`acer-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-emerald-700 bg-emerald-700 text-white" : "border-ledger-line bg-white text-ink hover:border-emerald-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`acer-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`acer-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-emerald-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-700">
              <MuxCoolingIcon />
              <span className="sr-only">MUX Switch · Dual-Fan Cooling · Official Warranty</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">MUX Switch · Dual-Fan Cooling · Official Warranty</p>
              <a
                href={storeGoHref("acer", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                {match.cta}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Curated Links</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Related comparisons and guides</h2>
        <div className="mt-4">
          <StoreGuideLink slug="acer" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/compare/official-brand-store-vs-amazon-flipkart-laptops-india" className="font-medium text-durza-deep hover:underline">Official brand store vs Amazon/Flipkart (laptops)</Link></li>
          <li><Link href="/collections/indian-college-student-and-coder-backpack-essentials" className="font-medium text-durza-deep hover:underline">College student &amp; coder backpack essentials</Link></li>
          <li><Link href="/stores/lenovo" className="font-medium text-durza-deep hover:underline">Lenovo store guide</Link></li>
          <li><Link href="/stores/asus" className="font-medium text-durza-deep hover:underline">ASUS store guide</Link></li>
          <li><Link href="/categories/electronics" className="font-medium text-durza-deep hover:underline">Electronics category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on store.acer.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("acer", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="Acer India"
        href={storeGoHref("acer", "store-page-bottom")}
        description="Browse the full Acer India eStore range and check live configurations, warranty options, and terms directly on the official store."
      />

      <FaqSection eyebrow="Acer India FAQs" items={faqs} />

      <p className="mt-8 text-xs leading-6 text-ink-faint">
        Durza may earn a commission from purchases made via our affiliate links to Acer India (store.acer.com). Product availability, specifications, and terms are subject to change on the official store.
      </p>
      <AffiliateDisclosure />
    </div>
  );
}
