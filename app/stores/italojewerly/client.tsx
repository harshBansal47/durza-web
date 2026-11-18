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

type Tab = "engagement" | "wedding" | "everyday";
const TABS: Record<Tab, { label: string; title: string; points: string[]; cta: string }> = {
  engagement: {
    label: "Engagement Sets",
    title: "Lab-created stones for engagement styles",
    points: [
      "Explore lab-created sapphire and moissanite engagement ring designs.",
      "Review 925 sterling silver settings and stone specifications on the product page.",
      "Confirm ring sizing, shipping timelines, and international checkout terms before ordering.",
    ],
    cta: "/go/italojewerly?src=matcher-engagement",
  },
  wedding: {
    label: "Wedding Sets",
    title: "Coordinated wedding and bridal sets",
    points: [
      "Look for matching engagement/wedding sets with lab-created stones.",
      "Check metal purity, finish, and care instructions listed by Italo Jewelry.",
      "International USD pricing and duties may affect the final landed cost in India.",
    ],
    cta: "/go/italojewerly?src=matcher-wedding",
  },
  everyday: {
    label: "Everyday Silver",
    title: "Sterling silver pieces for daily wear",
    points: [
      "Browse 925 sterling silver jewellery options for everyday styling.",
      "Verify dimensions, plating/finish details, and return policies on Italo Jewelry.",
      "Use tracked links to check current availability and live pricing at checkout.",
    ],
    cta: "/go/italojewerly?src=matcher-everyday",
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

export default function ItaloJewelryClient({ offers, faqs, stats, heroImageUrl, offerCount }: Props) {
  const [tab, setTab] = useState<Tab>("engagement");
  const active = TABS[tab];
  const topOffer = offers[0] ?? null;
  const storeHref = "/go/italojewerly?src=store-page";

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 pb-24 md:pb-8">
      <StoreHero
        name="Italo Jewelry"
        subtitle="Lab-created sapphire, moissanite, and 925 sterling silver engagement and wedding sets."
        domain="italojewelry.com"
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={storeHref}
        ctaLabel="Shop Italo Jewelry →"
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <section className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 className="text-xl font-bold text-ink">International checkout notes for Indian buyers</h2>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Italo Jewelry orders ship internationally in USD. Indian buyers should check the live total at checkout, prefer a zero-foreign-exchange-markup credit card where available, and account for standard Indian import duties/taxes and courier charges that may apply to the final landed cost.
        </p>
      </section>

      <section aria-labelledby="italojewerly-matcher" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Jewellery matcher</p>
        <h2 id="italojewerly-matcher" className="mt-1 text-xl font-bold text-ink">Find the right Italo Jewelry style</h2>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Italo Jewelry style matcher">
          {(Object.keys(TABS) as Tab[]).map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              aria-controls="italojewerly-matcher-panel"
              onClick={() => setTab(id)}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${tab === id ? "border-ink bg-ink text-white" : "border-ledger-line bg-white text-ink-soft hover:border-inkblue hover:text-ink"}`}
            >
              {TABS[id].label}
            </button>
          ))}
        </div>
        <div id="italojewerly-matcher-panel" role="tabpanel" className="mt-4 rounded-xl border border-ledger-line bg-paper-raised p-4 sm:p-5">
          <h3 className="text-lg font-bold text-ink">{active.title}</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {active.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-verified" strokeWidth={2} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <a href={active.cta} target="_blank" rel={REL} className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
            Explore {TABS[tab].label} on Italo Jewelry <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
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
              ctaHref={o.targetUrl.startsWith("/go/") ? `${o.targetUrl}${o.targetUrl.includes("?") ? "&" : "?"}src=offer-card` : `/go/italojewerly?src=offer-card`}
              expiresAt={o.expiresAt}
            />
          ))}
        </div>
      ) : (
        <ExploreStoreCta storeName="Italo Jewelry" href={storeHref} />
      )}

      <section aria-labelledby="italojewerly-related" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 id="italojewerly-related" className="text-lg font-bold text-ink">Related jewellery & gifting picks</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a href="/stores/palmonas" className="rounded-2xl border border-ledger-line bg-paper-raised p-4 transition hover:border-inkblue/30 hover:shadow-sm">
            <p className="font-semibold text-ink">Palmonas</p>
            <p className="mt-1 text-sm text-ink-soft">Demi-fine jewellery and everyday accessories in India</p>
          </a>
          <a href="/collections/wedding-and-festive-luxury-gifting-edit-india" className="rounded-2xl border border-ledger-line bg-paper-raised p-4 transition hover:border-inkblue/30 hover:shadow-sm">
            <p className="font-semibold text-ink">Wedding & Festive Luxury Gifting Edit</p>
            <p className="mt-1 text-sm text-ink-soft">Curated gifting ideas for weddings and celebrations</p>
          </a>
        </div>
      </section>

      <FaqSection eyebrow="Italo Jewelry FAQs" items={faqs} />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={topOffer ? (topOffer.targetUrl.startsWith("/go/") ? topOffer.targetUrl : storeHref) : storeHref} target="_blank" rel={REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">{topOffer?.code ? `Code ${topOffer.code}` : "Official store"}</span>
            <span className="block truncate text-xs font-semibold">{topOffer ? topOffer.title : "Check current Italo Jewelry range"}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Open <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </div>
  );
}
