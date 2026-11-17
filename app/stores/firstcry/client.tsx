"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import StackingExample from "@/components/store/StackingExample";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard } from "@/lib/store-offers";

const link = (url: string, sub: string): string => getAffiliateLink("firstcry", url, sub);

interface Props {
  offers: StoreOfferCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function FirstCryStorePage({
  offers,
  faqs,
  stats,
  heroImageUrl,
  offerCount,
  storeUrl,
}: Props) {
  const [mode, setMode] = useState<"all" | "club">("all");
  const visibleOffers = mode === "club" ? offers.filter((o) => /club/i.test(o.title) || /club/i.test(o.description ?? "")) : offers;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "firstcry.com";
  const topOffer = offers[0] ?? null;

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 pb-24 md:pb-8">
      <StoreHero
        name="FirstCry"
        heading="FirstCry Coupons & Offers"
        subtitle="Deals on baby gear, diapers, feeding and FirstCry Club savings — in one place."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/firstcry.png"}
        offerCount={offerCount}
        ctaHref={link(storeUrl ?? "https://www.firstcry.com", "store_hub")}
        ctaLabel="Go to FirstCry"
        perks={[
          { label: "Club Savings", value: "Members-only deals" },
          { label: "Baby Gear", value: "Strollers & car seats" },
          { label: "Diapers", value: "DIAPLOVE & diaper offers" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      {/* Utility bar — FirstCry-exclusive tools */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/stores/firstcry/club-calculator" className="rounded-2xl border border-ledger-line bg-white p-4 transition-colors hover:border-inkblue">
          <h3 className="font-semibold text-ink">🧮 Club Break-Even Calculator</h3>
          <p className="mt-1 text-sm text-ink-soft">Check if FirstCry Club is worth it for your spend.</p>
        </Link>
        <Link href="/stores/firstcry/diaper-cost-tracker" className="rounded-2xl border border-ledger-line bg-white p-4 transition-colors hover:border-inkblue">
          <h3 className="font-semibold text-ink">👶 Diaper Cost Tracker</h3>
          <p className="mt-1 text-sm text-ink-soft">Compare cost-per-pant across brands.</p>
        </Link>
      </div>

      {/* Offers with Club filter */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-ink">Latest FirstCry offers</h2>
          <div className="flex gap-2">
            {(["all", "club"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition ${
                  mode === m ? "bg-ink text-white" : "bg-white text-ink-soft ring-1 ring-ledger-line hover:text-ink"
                }`}
              >
                {m === "all" ? "All Offers" : "Club Members Only"}
              </button>
            ))}
          </div>
        </div>
        {visibleOffers.length > 0 ? (
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleOffers.map((o) => (
              <OfferCard
                key={o.id}
                bookmarkId={o.id}
                code={o.code}
                badge={o.badge}
                title={o.title}
                description={o.description}
                ctaHref={link(o.targetUrl, o.subId)}
                expiresAt={o.expiresAt}
              />
            ))}
          </div>
        ) : (
          <ExploreStoreCta storeName="FirstCry" href={link(storeUrl ?? "https://www.firstcry.com", "store_hub")} />
        )}
      </div>

      <StackingExample
        title="How Club members stack savings on FirstCry"
        lead="A diaper-and-wipes stock-up for the month with Club benefits stacked:"
        lines={[
          { label: "Diaper + wipes stock-up", value: "₹1,299" },
          { label: "Apply SPARSH45 (skincare %)", value: "− ₹200*" },
          { label: "Club member price", value: "− extra*" },
          { label: "Free delivery on diapers", value: "₹0" },
        ]}
        total={{ label: "You pay", value: "≈ ₹1,099" }}
        saving="You could save ₹200+ on the monthly stock-up"
        note="*Illustrative — Club member price depends on your tier and category; check the FirstCry product page for your exact price."
      />

      <FaqSection eyebrow="FirstCry FAQs" items={faqs} />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a
          href={topOffer ? link(topOffer.targetUrl, topOffer.subId) : link(storeUrl ?? "https://www.firstcry.com", "store_hub")}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white"
        >
          <span className="min-w-0">
            {topOffer?.code ? (
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Code {topOffer.code}
              </span>
            ) : (
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Official store
              </span>
            )}
            <span className="block truncate text-xs font-semibold">
              {topOffer ? topOffer.title : `Check live range & offers on FirstCry`}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">
            Shop
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </span>
        </a>
      </div>
    </div>
  );
}
