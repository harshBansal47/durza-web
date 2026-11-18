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

type Tab = "diapers" | "gear" | "apparel" | "feeding";

const MATCHES: Record<Tab, { label: string; name: string; detail: string; cta: string; src: string }> = {
  diapers: {
    label: "Monthly Diapers & Wipes",
    name: "Pant-Style & Taped Diapers, Water Wipes & Rash Creams",
    detail: "Compare absorption hours and per-piece pack sizes across Pampers, Huggies, and MamyPoko.",
    cta: "Shop Diapers & Wipes",
    src: "matcher-diapers-wipes",
  },
  gear: {
    label: "Strollers, Car Seats & Cribs",
    name: "Reversible Strollers, ISOFIX Car Seats & Wooden Cots",
    detail: "Safety-harnessed travel gear with PIN-code doorstep delivery.",
    cta: "Shop Baby Gear",
    src: "matcher-baby-gear",
  },
  apparel: {
    label: "Kids' Everyday Apparel & Footwear",
    name: "Babyhug, Carter's & Pine Kids Cotton Sets",
    detail: "Soft, tagless 100% cotton outfits from newborn sizes up to 12+ years.",
    cta: "Shop Kids' Apparel",
    src: "matcher-kids-apparel",
  },
  feeding: {
    label: "Feeding, Bath & Maternity",
    name: "BPA-Free Bottles, Electric Sterilizers & Nursing Wear",
    detail: "Hospital-bag and new-parent essentials in one cart.",
    cta: "Shop Feeding & Maternity",
    src: "matcher-feeding-maternity",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((id) => ({ id, label: MATCHES[id].label }));

function BabyIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="32" cy="18" r="8" />
      <path d="M18 50v-8a10 10 0 0 1 10-10h8a10 10 0 0 1 10 10v8" />
      <path d="M22 50h20M26 36h12" />
      <path d="M32 24v8M14 30h8M42 30h8" />
    </svg>
  );
}

export default function FirstCryClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("diapers");
  const match = useMemo(() => MATCHES[active], [active]);
  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.firstcry.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "firstcry.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="FirstCry"
        subtitle="India's largest baby and kids' storefront—stock up on taped and pant-style diapers, BIS-certified strollers, feeding gear, and toddler clothing."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/firstcry.png"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("firstcry", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />
      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="fc-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="fc-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          FirstCry — Diapers, Strollers, Kids&apos; Fashion &amp; Maternity Essentials
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          India&apos;s largest baby and kids&apos; storefront—stock up on taped and pant-style diapers, BIS-certified strollers, feeding gear, and toddler clothing.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-pink-100 bg-pink-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Calculating diaper cost per piece across jumbo monthly boxes versus small packs reveals where bulk subscribe-and-save restocks actually cut monthly nursery spend.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="fc-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Nursery Matcher</p>
        <h2 id="fc-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">Choose your FirstCry essentials</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">Select a tab to find the right baby and kids&apos; essentials. Every CTA opens the official store via a tracked link.</p>
        <div role="tablist" aria-label="FirstCry matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button key={tab.id} id={`fc-tab-${tab.id}`} role="tab" type="button" aria-selected={selected} aria-controls={`fc-panel-${tab.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActive(tab.id)} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${selected ? "border-pink-700 bg-pink-700 text-white" : "border-ledger-line bg-white text-ink hover:border-pink-700"}`}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div id={`fc-panel-${active}`} role="tabpanel" aria-labelledby={`fc-tab-${active}`} className="mt-6 rounded-xl border border-ledger-line bg-pink-50/40 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-pink-200 bg-white text-pink-700">
              <BabyIcon />
              <span className="sr-only">Newborn to 12y · Nursery Restocks · FirstCry Club</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Newborn to 12y · Nursery Restocks · FirstCry Club</p>
              <a href={storeGoHref("firstcry", match.src)} rel={GO_REL} target="_blank" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-pink-700 px-5 text-sm font-semibold text-white transition hover:bg-pink-800">
                {match.cta}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Curated Links</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Related tools, guides, and stores</h2>
        <div className="mt-4"><StoreGuideLink slug="firstcry" /></div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/stores/firstcry/club-calculator" className="font-medium text-durza-deep hover:underline">FirstCry Club calculator</Link></li>
          <li><Link href="/stores/firstcry/diaper-cost-tracker" className="font-medium text-durza-deep hover:underline">FirstCry diaper cost tracker</Link></li>
          <li><Link href="/stores/gritzo" className="font-medium text-durza-deep hover:underline">Gritzo store guide</Link></li>
          <li><Link href="/categories/baby-kids" className="font-medium text-durza-deep hover:underline">Baby &amp; Kids category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing, eligibility, and terms on firstcry.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard bookmarkId={offer.id} code={offer.code} badge={offer.badge} title={offer.title} description={offer.description} ctaHref={offer.targetUrl || storeGoHref("firstcry", "offer-card")} expiresAt={offer.expiresAt} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta storeName="FirstCry" href={storeGoHref("firstcry", "store-page-bottom")} description="Browse the full FirstCry range and check live availability, Club perks, and terms directly on the official store." />
      <FaqSection eyebrow="FirstCry FAQs" items={faqs} />
      <p className="mt-8 text-xs leading-6 text-ink-faint">Durza may earn a commission from purchases made via our affiliate links to FirstCry (firstcry.com). Availability and terms are subject to change on the official store.</p>
      <AffiliateDisclosure />
    </div>
  );
}
