"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, PackageCheck, Sparkles } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import OfferCard from "@/components/OfferCard";
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

type Tab = "lips" | "base" | "eyes" | "combos";

const MATCHES: Record<Tab, { label: string; name: string; detail: string; cta: string; src: string }> = {
  lips: {
    label: "Cult Lip Stains & Gloss",
    name: "Milani Color Fetish, Revolution Pout Gloss & Focallure Transferproof Lips",
    detail: "High-pigment lip stains, peptide gloss sticks, and multi-shade lip trios.",
    cta: "Shop Lip Stains & Gloss",
    src: "matcher-lips",
  },
  base: {
    label: "Humidity-Proof Base",
    name: "Milani Make It Last Setting Spray, L.A. Girl Pro Conceal & Skin Silk Foundations",
    detail: "Humidity-resistant base essentials formulated to lock makeup through Indian weather.",
    cta: "Shop Complexion & Setting",
    src: "matcher-base",
  },
  eyes: {
    label: "Eyeshadows & Liners",
    name: "Makeup Revolution Reloaded Palettes, Lamel & Pinkflash Eye Kits",
    detail: "Buildable matte-and-shimmer palettes and waterproof liquid liners.",
    cta: "Shop Eyeshadow & Liners",
    src: "matcher-eyes",
  },
  combos: {
    label: "Kits & Brush Sets",
    name: "HOK Curated Combos & Jessup Duo-End Brush Collections",
    detail: "Bundled lip-and-cheek duos and vegan synthetic brush sets on hokmakeup.com.",
    cta: "Shop Kits & Brush Sets",
    src: "matcher-combos",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((id) => ({ id, label: MATCHES[id].label }));

function CosmeticSealIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="14" y="24" width="14" height="26" rx="4" />
      <rect x="17" y="14" width="8" height="10" rx="2" />
      <path d="M34 44c0-8 4-14 12-14s12 6 12 14" />
      <path d="M38 44h16" />
      <circle cx="46" cy="22" r="8" />
      <path d="M43 22l2 2 4-4" />
    </svg>
  );
}

export default function HokMakeupClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl, forcedStoreHref }: Props) {
  const [active, setActive] = useState<Tab>("lips");
  const match = useMemo(() => MATCHES[active], [active]);
  const href = (src: string, fallback?: string) => storeGoHref("hokmakeup", src, forcedStoreHref ?? undefined) || fallback || storeGoHref("hokmakeup", src);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://hokmakeup.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "hokmakeup.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="HOK Makeup"
        subtitle="India's official multi-brand destination for 35+ cult international makeup labels—skip counterfeit marketplace resellers and shop direct-sourced batches."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/hokmakeup/hero-cosmetics.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={href("store-page")}
        ctaLabel="Shop Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="hok-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="hok-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          HOK Makeup — Authentic Milani, Makeup Revolution &amp; Global Beauty in India
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          India&apos;s official multi-brand destination for 35+ cult international makeup labels—skip counterfeit marketplace resellers and shop direct-sourced batches.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-rose-100 bg-rose-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Imported color cosmetics lose pigment payoff and oxidize faster when stored in unconditioned reseller warehouses—buying from an authorized Indian distributor keeps batch codes fresh and factory-sealed.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="why-direct">
        <h2 id="why-direct" className="font-serif text-2xl font-extrabold text-ink">Why buy direct from HOK Makeup</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-ledger-line bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700"><BadgeCheck className="h-5 w-5" aria-hidden="true" /></div>
            <h3 className="mt-3 text-base font-semibold text-ink">Authorized 35+ Brand Sourcing</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">Official Indian retail partner sourcing directly from brand principals with valid Indian import labels and batch dates.</p>
          </div>
          <div className="rounded-2xl border border-ledger-line bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700"><PackageCheck className="h-5 w-5" aria-hidden="true" /></div>
            <h3 className="mt-3 text-base font-semibold text-ink">Curated Kits &amp; Combos</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">Shop multi-piece lip, eye, and brush sets plus a dedicated official offers hub on hokmakeup.com.</p>
          </div>
          <div className="rounded-2xl border border-ledger-line bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700"><Sparkles className="h-5 w-5" aria-hidden="true" /></div>
            <h3 className="mt-3 text-base font-semibold text-ink">Filters for Your Routine</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">Browse cruelty-free and vegan filter tags and review product details on the official store before checkout.</p>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="lineup-heading">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Visual Category Lineup</p>
        <h2 id="lineup-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">Shop by category on HOK Makeup</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { id: "lineup-lips", src: "lineup-lips", img: "/stores/hokmakeup/lip-stains-gloss.webp", alt: "Flatlay of global lip gloss sticks and lip stains available on HOK Makeup India", title: "Cult Lip Stains & Gloss", benefit: "High-pigment lip stains, peptide gloss sticks, and multi-shade lip trios." },
            { id: "lineup-base", src: "lineup-base", img: "/stores/hokmakeup/complexion-setting.webp", alt: "Foundation, concealer, and setting spray bottles for humidity-resistant makeup base on HOK Makeup", title: "Complexion & Setting", benefit: "Humidity-resistant base essentials to lock makeup through Indian weather." },
            { id: "lineup-eyes", src: "lineup-eyes", img: "/stores/hokmakeup/eye-palettes.webp", alt: "Warm neutral and shimmer eyeshadow palette with brushes available on HOK Makeup India", title: "Eyeshadow Palettes & Liners", benefit: "Buildable matte-and-shimmer palettes and waterproof liquid liners." },
            { id: "lineup-combos", src: "lineup-combos", img: "/stores/hokmakeup/hero-cosmetics.webp", alt: "Flatlay of global lip gloss sticks, eyeshadow palettes, and makeup brushes available on HOK Makeup India", title: "Kits & Brush Sets", benefit: "Curated lip-and-cheek combos and vegan synthetic brush sets." },
          ].map((card) => (
            <a key={card.id} id={card.id} href={href(card.src)} rel={GO_REL} target="_blank" className="group overflow-hidden rounded-2xl border border-ledger-line bg-white transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image src={card.img} alt={card.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-ink group-hover:text-rose-700">{card.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{card.benefit}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-rose-700">Shop on HOK Makeup <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="hok-matcher">
        <div className="flex flex-wrap items-start gap-4">
          <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-700">
            <CosmeticSealIcon />
            <span className="sr-only">35+ Global Brands · Authorized India Importer · Factory-Sealed</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Use-Case Matcher</p>
            <h2 id="hok-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">Find your HOK Makeup pick</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">Select a tab to explore categories and shop via tracked links to the official store.</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">35+ Global Brands · Authorized India Importer · Factory-Sealed</p>
          </div>
        </div>
        <div role="tablist" aria-label="HOK Makeup matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button key={tab.id} id={`hok-tab-${tab.id}`} role="tab" type="button" aria-selected={selected} aria-controls={`hok-panel-${tab.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActive(tab.id)} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${selected ? "border-rose-700 bg-rose-700 text-white" : "border-ledger-line bg-white text-ink hover:border-rose-700"}`}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div id={`hok-panel-${active}`} role="tabpanel" aria-labelledby={`hok-tab-${active}`} className="mt-6 rounded-xl border border-ledger-line bg-rose-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">{match.label}</p>
          <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
          <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
          <a href={href(match.src)} rel={GO_REL} target="_blank" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-rose-700 px-5 text-sm font-semibold text-white transition hover:bg-rose-800">
            {match.cta}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on hokmakeup.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard bookmarkId={offer.id} code={offer.code} badge={offer.badge} title={offer.title} description={offer.description} ctaHref={href("offer-card", offer.targetUrl || storeGoHref("hokmakeup", "offer-card", forcedStoreHref ?? undefined))} expiresAt={offer.expiresAt} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <h2 className="font-serif text-2xl font-extrabold text-ink">Buyer FAQs &amp; related links</h2>
        <div className="mt-4">
          <FaqSection eyebrow="HOK Makeup FAQs" items={faqs} />
        </div>
        <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">Curated internal links</h3>
        <ul className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/guides/indian-skincare-actives-haircare-guide" className="font-medium text-durza-deep hover:underline">Indian skincare actives &amp; haircare guide</Link></li>
          <li><Link href="/stores/nykaa" className="font-medium text-durza-deep hover:underline">Nykaa store guide</Link></li>
          <li><Link href="/stores/dot-and-key" className="font-medium text-durza-deep hover:underline">Dot &amp; Key store guide</Link></li>
          <li><Link href="/categories/beauty" className="font-medium text-durza-deep hover:underline">Beauty category</Link></li>
        </ul>
      </section>

      <ExploreStoreCta storeName="HOK Makeup" href={href("store-page-bottom")} description="Browse authentic global beauty brands, combos, and kits directly on HOK Makeup and confirm batch details and checkout terms on the official store." />
      <AffiliateDisclosure />
    </div>
  );
}
