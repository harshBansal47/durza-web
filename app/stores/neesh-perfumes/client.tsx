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

type Tab = "discovery" | "evening" | "daytime" | "gift";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  discovery: {
    label: "Try Before Committing",
    name: "Neesh Perfume Discovery & Sample Sets",
    detail: "Miniature spray vials to test how each fragrance reacts with your skin chemistry over a full day.",
    cta: "Shop Discovery Sets",
    src: "matcher-discovery",
  },
  evening: {
    label: "Evening, Oud & Wedding Wear",
    name: "Intense Woody, Leather & Spiced Extraits",
    detail: "Bold, warm projection crafted for receptions and night events.",
    cta: "Shop Evening Extraits",
    src: "matcher-evening-oud",
  },
  daytime: {
    label: "Daytime Fresh & Woody",
    name: "Citrus, Vetiver & Aromatic Extraits",
    detail: "Crisp, modern daytime signatures suited for warm Indian afternoons.",
    cta: "Shop Daytime Extraits",
    src: "matcher-daytime-fresh",
  },
  gift: {
    label: "Luxury Gift Boxes",
    name: "Signature Full-Bottle Presentation Sets",
    detail: "Heavy-glass flacons in rigid magnetic gift boxes.",
    cta: "Shop Gift Boxes",
    src: "matcher-gift-boxes",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function FlaconIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="20" y="22" width="24" height="30" rx="4" />
      <path d="M26 22v-6h12v6" />
      <rect x="28" y="12" width="8" height="4" rx="1" />
      <path d="M32 30v10" />
      <path d="M44 18c4 1 7 3 9 6M48 14c5 1 9 4 12 8" />
    </svg>
  );
}

export default function NeeshPerfumesClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("discovery");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://neeshperfumes.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "neeshperfumes.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Neesh Perfumes"
        subtitle="Crafted with fine French perfume oils at Extrait de Parfum concentration (20%+ perfume oil) so scents hold through humid Indian days and wedding nights."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/neesh-perfumes.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("neesh-perfumes", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="neesh-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="neesh-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Neesh Perfumes — High-Concentration Extrait de Parfum &amp; Discovery Sets
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Crafted with fine French perfume oils at Extrait de Parfum concentration (20%+ perfume oil) so scents hold through
          humid Indian days and wedding nights.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-amber-100 bg-amber-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Standard Eau de Toilette sprays carry 5–10% perfume oil and fade by
          lunch; Extrait de Parfum packs over 20% oil concentration so base notes linger on fabric and skin into the evening.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="neesh-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Fragrance Matcher</p>
        <h2 id="neesh-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your Neesh scent path
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to explore Extraits and sets. Every CTA opens the official Neesh Perfumes store via a tracked link.
        </p>

        <div role="tablist" aria-label="Neesh Perfumes matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`neesh-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`neesh-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-stone-900 bg-stone-900 text-white" : "border-ledger-line bg-white text-ink hover:border-stone-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`neesh-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`neesh-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-stone-50 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-800">
              <FlaconIcon />
              <span className="sr-only">Extrait de Parfum · High Oil Concentration</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Extrait de Parfum · High Oil Concentration</p>
              <a
                href={storeGoHref("neesh-perfumes", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-stone-800"
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
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Related collections and stores</h2>
        <div className="mt-4">
          <StoreGuideLink slug="neesh-perfumes" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/collections/wedding-and-festive-luxury-gifting-edit-india" className="font-medium text-durza-deep hover:underline">Wedding &amp; festive luxury gifting edit (India)</Link></li>
          <li><Link href="/stores/hirafragrance" className="font-medium text-durza-deep hover:underline">Hira Fragrance store guide</Link></li>
          <li><Link href="/stores/kama-ayurveda" className="font-medium text-durza-deep hover:underline">Kama Ayurveda store guide</Link></li>
          <li><Link href="/categories/beauty" className="font-medium text-durza-deep hover:underline">Beauty category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on neeshperfumes.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("neesh-perfumes", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="Neesh Perfumes"
        href={storeGoHref("neesh-perfumes", "store-page-bottom")}
        description="Browse the full Neesh Perfumes range and check live availability, scent details, and terms directly on the official store."
      />

      <FaqSection eyebrow="Neesh Perfumes FAQs" items={faqs} />

      <AffiliateDisclosure />
    </div>
  );
}
