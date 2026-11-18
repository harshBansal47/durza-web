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

type Tab = "straight" | "slim" | "taper" | "truckers";

const MATCHES: Record<Tab, { label: string; name: string; detail: string; cta: string; src: string }> = {
  straight: {
    label: "Timeless Straight Leg",
    name: "Levi's 501® Original Fit & 505™ Regular",
    detail: "Iconic button-fly straight leg in 100% cotton and comfort-stretch denim.",
    cta: "Shop 501® & 505™",
    src: "matcher-straight",
  },
  slim: {
    label: "Everyday Modern Slim",
    name: "Levi's 511™ Slim Fit Jeans",
    detail: "Sits below the waist with a clean, versatile slim leg from hip to ankle.",
    cta: "Shop 511™ Slim",
    src: "matcher-slim",
  },
  taper: {
    label: "Sharp Tapered Ankle",
    name: "Levi's 512™ Slim Taper Fit",
    detail: "Roomier thigh with a tailored taper below the knee for a sharp silhouette.",
    cta: "Shop 512™ Taper",
    src: "matcher-taper",
  },
  truckers: {
    label: "Trucker Jackets, Shirts & Women's",
    name: "Type III Denim Trucker Jackets, Ribcage & Wedgie Fits",
    detail: "Heritage outerwear and high-rise women's denim staples.",
    cta: "Shop Trucker & Women's",
    src: "matcher-trucker-womens",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((id) => ({ id, label: MATCHES[id].label }));

function DenimIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 12h24l2 10-6 30H24L18 22l2-10Z" />
      <path d="M20 12c4 4 8 6 12 6s8-2 12-6" />
      <path d="M24 22h16M26 30h12M28 38h8" />
      <path d="M46 24c4 2 6 6 6 10" />
      <path d="M48 46h8M52 42v8" />
    </svg>
  );
}

export default function LevisClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("straight");
  const match = useMemo(() => MATCHES[active], [active]);
  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.levi.in/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "levi.in";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Levi's India"
        subtitle="Find your exact waist-and-inseam fit across iconic straight, slim, and tapered selvedge denim—direct from Levi's official India store."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/levis.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("levis", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />
      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="levis-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="levis-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Levi&apos;s India — 501® Originals, 511™ Slim &amp; Denim Fit Decoder
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Find your exact waist-and-inseam fit across iconic straight, slim, and tapered selvedge denim—direct from Levi&apos;s official India store.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> 511™ Slim runs straight from knee to ankle to sit cleanly over sneakers, while 512™ Slim Taper narrows below the knee to spotlight Chelsea boots and low-top court shoes.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="levis-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Fit Matcher</p>
        <h2 id="levis-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">Choose your Levi&apos;s fit</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">Select a tab to find the right fit or style. Every CTA opens the official store via a tracked link.</p>
        <div role="tablist" aria-label="Levi's fit matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button key={tab.id} id={`levis-tab-${tab.id}`} role="tab" type="button" aria-selected={selected} aria-controls={`levis-panel-${tab.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActive(tab.id)} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${selected ? "border-indigo-700 bg-indigo-700 text-white" : "border-ledger-line bg-white text-ink hover:border-indigo-700"}`}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div id={`levis-panel-${active}`} role="tabpanel" aria-labelledby={`levis-tab-${active}`} className="mt-6 rounded-xl border border-ledger-line bg-indigo-50/40 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-indigo-200 bg-white text-indigo-700">
              <DenimIcon />
              <span className="sr-only">501® · 511™ · 512™ Fit Guide · Red Tab™</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">501® · 511™ · 512™ Fit Guide · Red Tab™</p>
              <a href={storeGoHref("levis", match.src)} rel={GO_REL} target="_blank" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-indigo-700 px-5 text-sm font-semibold text-white transition hover:bg-indigo-800">
                {match.cta}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Curated Links</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Related guides and stores</h2>
        <div className="mt-4"><StoreGuideLink slug="levis" /></div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/stores/the-bear-house" className="font-medium text-durza-deep hover:underline">The Bear House store guide</Link></li>
          <li><Link href="/stores/adidas" className="font-medium text-durza-deep hover:underline">Adidas store guide</Link></li>
          <li><Link href="/categories/fashion" className="font-medium text-durza-deep hover:underline">Fashion category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing, eligibility, and terms on levi.in.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard bookmarkId={offer.id} code={offer.code} badge={offer.badge} title={offer.title} description={offer.description} ctaHref={offer.targetUrl || storeGoHref("levis", "offer-card")} expiresAt={offer.expiresAt} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta storeName="Levi's India" href={storeGoHref("levis", "store-page-bottom")} description="Browse the full Levi's range and check live availability, fits, and terms directly on the official store." />
      <FaqSection eyebrow="Levi's India FAQs" items={faqs} />
      <p className="mt-8 text-xs leading-6 text-ink-faint">Durza may earn a commission from purchases made via our affiliate links to Levi&apos;s India (levi.in). Product availability and terms are subject to change on the official store.</p>
      <AffiliateDisclosure />
    </div>
  );
}
