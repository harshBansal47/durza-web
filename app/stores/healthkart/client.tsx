"use client";

import { useState } from "react";
import { ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import StackingExample from "@/components/store/StackingExample";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ProductDealRouter from "@/components/store/ProductDealRouter";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";

const link = (url: string, sub: string): string => getAffiliateLink("healthkart", url, sub);

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

/**
 * HealthKart — reference store page for Durza.
 * Every section answers a real question an Indian shopper asks, in ₹.
 */
export default function HealthKartPage({
  offers,
  products,
  faqs,
  stats,
  heroImageUrl,
  offerCount,
  storeUrl,
}: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [goal, setGoal] = useState(tabs[0] ?? "");
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";
  const topOffer = offers[0] ?? null;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 pb-24 md:pb-8">
      {/* 1 · Brand intro + trust strip */}
      <StoreHero
        name="HealthKart"
        heading="HealthKart Coupons & Offers"
        subtitle="Protein, creatine, vitamins and sports nutrition — check today's codes and save on every order."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        ctaLabel="Go to HealthKart"
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      {/* 2 · Best coupons — first thing after the hero */}
      {offers.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((o) => (
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
      )}

      {/* 3 · How to save more — ₹ walk-through */}
      <StackingExample
        title="How people stack savings on HealthKart"
        lead="A tub of MuscleBlaze Biozyme 2 kg is listed at ₹4,499. Here is what one cart could look like when offers combine:"
        lines={[
          { label: "Price on site", value: "₹4,499" },
          { label: "Apply code WHEY300", value: "− ₹300" },
          { label: "UPI instant discount (5%)", value: "− ₹210*" },
          { label: "HK Cash (eligible carts, redeemed)", value: "extra back" },
        ]}
        total={{ label: "You pay", value: "≈ ₹3,989" }}
        saving="You could save ₹500+ on this one order"
        note="*Example to show how discounts work. UPI percentage and HK Cash eligibility are shown at HealthKart checkout — Durza does not set or guarantee them. Product prices change; check the site for the current price."
      />

      {/* 4 · How to use the codes — the exact steps */}

      {/* 5 · Flash deal router — use-case collections from live catalogue */}
      {products.length > 0 && (
        <ProductDealRouter
          title="Popular supplements at HealthKart"
          offers={offers}
          products={products}
          tabs={tabs}
          concern={goal}
          onConcern={setGoal}
          storeName="HealthKart"
          columns={4}
        />
      )}

      {/* 6 · Buy safely — HealthKart-specific guidance */}
      <section aria-labelledby="buy-safely" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 className="scroll-mt-24 text-lg font-bold text-ink" id="buy-safely">How to buy supplements safely in India</h2>
        <ul className="mt-3 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
          {[
            "Check the FSSAI licence number on the pack — every legal supplement in India carries one.",
            "Scratch and verify the authenticity code on the brand's site or app before first use.",
            "Compare price per scoop/kg, not per jar — bigger tubs are usually cheaper per serving.",
            "Prefer third-party tested products where you can — useful if anti-doping matters for your sport.",
            "Buy only from official sellers (HealthKart.com or the app) — marketplace third-party packs are riskier.",
            "Check the manufacturing and expiry on the sealed tub before you accept delivery.",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] text-ink-soft">
          Shopping guidance only — Durza is not a medical advisor. For health decisions, talk to a qualified professional.
        </p>
      </section>

      {/* 7 · Trust & verification — what checked means */}
      <section aria-labelledby="trust-checked" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 className="scroll-mt-24 text-lg font-bold text-ink" id="trust-checked">What “checked” means on this page</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-soft">
          <li className="flex items-start gap-2"><ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} /><span><span className="font-semibold text-ink">Checked</span> — the code resolved correctly during our most recent feed check.</span></li>
          <li className="flex items-start gap-2"><ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" strokeWidth={2} /><span><span className="font-semibold text-ink">Pending / new</span> — newly added code, waiting to be checked. It may still work, just not confirmed yet.</span></li>
          <li className="flex items-start gap-2"><ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" strokeWidth={2} /><span><span className="font-semibold text-ink">Expired</span> — never shown as active. If a code fails, the card will tell you the newest option we checked.</span></li>
        </ul>
        <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] text-ink-soft">
          Durza re-checks offers regularly — when a code has been tested recently, the verification strip appears above the coupons. Report a code that fails and we&apos;ll re-check it.
        </p>
      </section>

      {/* 8 · FAQs — same source feeds the JSON-LD */}
      <FaqSection eyebrow="HealthKart FAQs" items={faqs} />

      {/* 9 · Sticky mobile CTA (social-first visitors reach the shop in one tap) */}
      {topOffer && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
          <a
            href={link(topOffer.targetUrl, topOffer.subId)}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white"
          >
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Code {topOffer.code}
              </span>
              <span className="block truncate text-xs font-semibold">{topOffer.title}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-xs font-bold">
              Shop
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
