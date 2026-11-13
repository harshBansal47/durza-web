"use client";

import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import HowToApply from "@/components/store/HowToApply";
import StackingExample from "@/components/store/StackingExample";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import ProductDealRouter from "@/components/store/ProductDealRouter";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
import { ArrowUpRight } from "lucide-react";
const link = (url: string, sub: string): string => getAffiliateLink("nordpass", url, sub);
const FAMILY_MEMBERS = [2, 3, 4, 5, 6];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function NordPassClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [members, setMembers] = useState(6);
  const perPerson = Math.round(249 / members);
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="NordPass"
        subtitle="Stress-Free Digital Life • Encrypted Passwords, Passkeys & Real-Time Breach Alerts"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Plan Cost &amp; Device Multiplier Tool</h2>
        <p className="mt-1 text-sm text-ink-soft">The Family Plan (₹249/mo for 6 vaults) drops per-person cost dramatically as you add members.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {FAMILY_MEMBERS.map((m) => (
            <button key={m} type="button" onClick={() => setMembers(m)} className={`rounded-full px-4 py-2 text-sm font-medium ${members === m ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{m} {m === 2 ? "vaults" : "vaults"}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 text-center">
          <div className="rounded-xl bg-paper p-4"><p className="text-xs text-ink-soft">Family plan total</p><p className="mt-1 text-2xl font-bold text-ink">₹249<span className="text-sm font-medium text-ink-soft">/mo</span></p></div>
          <div className="rounded-xl bg-paper p-4"><p className="text-xs text-ink-soft">Per person</p><p className="mt-1 text-2xl font-bold text-ink">~₹{perPerson}<span className="text-sm font-medium text-ink-soft">/mo</span></p></div>
          <div className="rounded-xl bg-paper p-4"><p className="text-xs text-ink-soft">Savings vs Individual</p><p className="mt-1 text-2xl font-bold text-ink">~{Math.round((1 - perPerson / 129) * 100)}%</p></div>
        </div>
        <p className="mt-3 text-xs text-ink-soft">Each member gets a private zero-knowledge vault, passkey sync across devices, breach scanner and encrypted file attachments.</p>
        <a href={link("https://nordpass.com/family-password-manager/", "plan_multiplier")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Get Family Plan on NordPass</a>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((o) => (
          <OfferCard
            key={o.code}
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

      <StackingExample
        title="How people pick the yearly NordPass plan"
        lead="Two-year Premium, paid annually, for the whole family:"
        lines={[
          { label: "NordPass Premium 2-year plan", value: "₹5,299*" },
          { label: "NORDPASS50 (50% + 3 months free)", value: "− ₹2,650*" },
          { label: "FAMILYPRO (6 vaults)", value: "− more*" }
        ]}
        total={{ label: "You pay", value: "≈ ₹2,649*" }}
        saving="You could save ₹2,600+ vs monthly billing"
        note="*Illustrative — NordPass prices vary by country, currency and billing period; the checkout in your region shows the exact rate."
      />
      <HowToApply storeName="NordPass" />

      {products.length > 0 && (
        <ProductDealRouter
          title="Security Tier &amp; Plan Decoder"
          offers={offers}
          products={products}
          tabs={tabs}
          concern={concern}
          onConcern={setConcern}
          storeName="NordPass"
          columns={2}
        />
      )}

            <FaqSection eyebrow="NordPass FAQs" items={faqs} />


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
