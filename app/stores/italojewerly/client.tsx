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

type Tab = "bridal" | "everyday" | "gemstone" | "gifts";

const MATCHES: Record<Tab, { label: string; name: string; detail: string; cta: string; src: string }> = {
  bridal: {
    label: "Bridal & Engagement Sets",
    name: "Two-Piece & Three-Piece Halo & Solitaire Ring Sets",
    detail: "Matching engagement rings and contoured wedding bands in 925 sterling silver.",
    cta: "Shop Bridal Sets",
    src: "matcher-bridal-sets",
  },
  everyday: {
    label: "Everyday Promise & Eternity Bands",
    name: "Stackable Eternity Bands & Minimalist Solitaires",
    detail: "Low-profile settings built for comfortable daily wear.",
    cta: "Shop Everyday Bands",
    src: "matcher-everyday-bands",
  },
  gemstone: {
    label: "Colored Gemstone Statements",
    name: "Lab-Created Sapphire, Emerald & Morganite Cuts",
    detail: "Oval, pear, and cushion-cut centerpieces with pavé side stones.",
    cta: "Shop Gemstone Jewelry",
    src: "matcher-gemstones",
  },
  gifts: {
    label: "Earrings, Necklaces & Gift Boxes",
    name: "Drop Earrings, Pendants & Velvet Presentation Packaging",
    detail: "Coordinated jewelry sets ready for milestone gifting.",
    cta: "Shop Gifts & Sets",
    src: "matcher-gifts",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((id) => ({ id, label: MATCHES[id].label }));

function GemIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 18h24l10 10-22 24L10 28l10-10Z" />
      <path d="M10 28h44M20 18l12 10 12-10M32 28v24M20 18l6 10M44 18l-6 10" />
      <circle cx="18" cy="50" r="6" />
      <circle cx="46" cy="50" r="6" />
    </svg>
  );
}

export default function ItaloJewelryClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("bridal");
  const match = useMemo(() => MATCHES[active], [active]);
  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.italojewelry.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "italojewelry.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Italo Jewelry"
        subtitle="Hand-set lab-created white sapphire, emerald, and moissanite bridal sets crafted in rhodium-plated 925 sterling silver with international delivery."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/italojewerly.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("italojewerly", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />
      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="ij-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="ij-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Italo Jewelry — Lab-Created Gemstones &amp; 925 Sterling Silver Ring Sets
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Hand-set lab-created white sapphire, emerald, and moissanite bridal sets crafted in rhodium-plated 925 sterling silver with international delivery.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-rose-100 bg-rose-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Rhodium electroplating over 925 sterling silver gives rings the bright, mirror-white luster of platinum while slowing down natural silver tarnishing.
        </p>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Global checkout: orders are typically billed in USD with international courier shipping. Review live totals, shipping timelines, and applicable customs duties before ordering—no local UPI assumptions apply.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="ij-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Jewelry Matcher</p>
        <h2 id="ij-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">Choose your Italo Jewelry style</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">Select a tab to explore styles and sets. Every CTA opens the official store via a tracked link.</p>
        <div role="tablist" aria-label="Italo Jewelry matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button key={tab.id} id={`ij-tab-${tab.id}`} role="tab" type="button" aria-selected={selected} aria-controls={`ij-panel-${tab.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActive(tab.id)} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${selected ? "border-rose-700 bg-rose-700 text-white" : "border-ledger-line bg-white text-ink hover:border-rose-700"}`}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div id={`ij-panel-${active}`} role="tabpanel" aria-labelledby={`ij-tab-${active}`} className="mt-6 rounded-xl border border-ledger-line bg-rose-50/40 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-rose-200 bg-white text-rose-700">
              <GemIcon />
              <span className="sr-only">925 Sterling Silver · Rhodium Finish · Global Shipping</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">925 Sterling Silver · Rhodium Finish · Global Shipping</p>
              <a href={storeGoHref("italojewerly", match.src)} rel={GO_REL} target="_blank" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-rose-700 px-5 text-sm font-semibold text-white transition hover:bg-rose-800">
                {match.cta}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Curated Links</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Related guides and collections</h2>
        <div className="mt-4"><StoreGuideLink slug="italojewerly" /></div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/stores/palmonas" className="font-medium text-durza-deep hover:underline">Palmonas store guide</Link></li>
          <li><Link href="/collections/wedding-and-festive-luxury-gifting-edit-india" className="font-medium text-durza-deep hover:underline">Wedding &amp; festive luxury gifting edit (India)</Link></li>
          <li><Link href="/categories/gifts" className="font-medium text-durza-deep hover:underline">Gifts category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing, currency, shipping, and duties on italojewelry.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard bookmarkId={offer.id} code={offer.code} badge={offer.badge} title={offer.title} description={offer.description} ctaHref={offer.targetUrl || storeGoHref("italojewerly", "offer-card")} expiresAt={offer.expiresAt} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta storeName="Italo Jewelry" href={storeGoHref("italojewerly", "store-page-bottom")} description="Browse the full Italo Jewelry range and check live USD pricing, international shipping, and terms directly on the official store." />
      <FaqSection eyebrow="Italo Jewelry FAQs" items={faqs} />
      <p className="mt-8 text-xs leading-6 text-ink-faint">Durza may earn a commission from purchases made via our affiliate links to Italo Jewelry (italojewelry.com). Pricing, currency, shipping, and terms are subject to change on the official store.</p>
      <AffiliateDisclosure />
    </div>
  );
}
