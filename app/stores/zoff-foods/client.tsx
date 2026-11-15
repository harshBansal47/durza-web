"use client";

import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import StackingExample from "@/components/store/StackingExample";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
import { ArrowUpRight } from "lucide-react";
import ProductDealRouter from "@/components/store/ProductDealRouter";
const link = (url: string, sub: string): string => getAffiliateLink("zoff-foods", url, sub);
const RESTOCK_ITEMS = [
  { id: "masala", label: "Essential Masala Combo (₹499)", amount: 499 },
  { id: "almonds", label: "Almonds & Cardamom Combo (₹599)", amount: 599 },
];
const GRINDING = [
  { id: "traditional", label: "Traditional Chakki / Hammer Mills", points: ["Generates up to 95°C heat during grinding", "Volatile essential oils burn off — dull, bitter spices", "Preservative-free powders go stale within months", "Color fades; curcumin and capsaicin degrade"] },
  { id: "coolgrind", label: "ZOFF Cool-Grinding Tech", points: ["Spices ground at sub-zero temperatures", "Locks in up to 95% of natural essential oils", "Vibrant natural color without artificial dyes", "Medicinal curcumin and capsaicin stay potent"] },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function ZoffFoodsClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [tech, setTech] = useState(GRINDING[1]);
  const [restock, setRestock] = useState<string[]>(["masala", "almonds"]);
  const subtotal = RESTOCK_ITEMS.filter((r) => restock.includes(r.id)).reduce((s, r) => s + r.amount, 0);
  const pantry20 = Math.round(subtotal * 0.2);
  const upi = Math.round((subtotal - pantry20) * 0.05);
  const net = subtotal - pantry20 - upi;
  const freeShip = subtotal >= 499;
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="ZOFF Foods"
        subtitle="Zone Of Fresh Food • Cool-Grinding Technology for 100% Natural Aroma & Purity"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Why Cool-Grinding Matters</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {GRINDING.map((t) => (
            <button key={t.id} type="button" onClick={() => setTech(t)} className={`rounded-full px-4 py-2 text-sm font-medium ${tech.id === t.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{t.label}</button>
          ))}
        </div>
        <ul className="mt-4 list-disc pl-5 text-sm text-ink-soft">
          {tech.points.map((pt) => <li key={pt}>{pt}</li>)}
        </ul>
      </div>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Smart Restock Hack — Full Monthly Pantry</h2>
        <p className="mt-1 text-sm text-ink-soft">Tap items to build your combo; PANTRY20 + 5% UPI apply at checkout.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {RESTOCK_ITEMS.map((r) => (
            <button key={r.id} type="button" onClick={() => setRestock((cur) => cur.includes(r.id) ? cur.filter((x) => x !== r.id) : [...cur, r.id])} className={`rounded-full px-4 py-2 text-sm font-medium ${restock.includes(r.id) ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{r.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-ledger-line p-4 text-sm">
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">Subtotal</span><span className="font-semibold text-ink">₹{subtotal.toLocaleString("en-IN")}</span></div>
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">PANTRY20 (20% off)</span><span className="font-semibold text-ink">− ₹{pantry20}</span></div>
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">5% UPI instant deduction</span><span className="font-semibold text-ink">− ₹{upi}</span></div>
          <div className="flex items-center justify-between py-2"><span className="font-semibold text-ink">Net you pay (free ship ₹499+)</span><span className="text-lg font-bold text-ink">₹{net.toLocaleString("en-IN")}</span></div>
        </div>
        <a href={link("https://zofffoods.com/collections/combos", "restock_hack")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Pantry Combos on ZOFF</a>
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
        title="How people stack savings on ZOFF Foods"
        lead="A monthly kitchen masala box, 3 months upfront:"
        lines={[
          { label: "Monthly Kitchen Masala Box × 3", value: "₹3,897" },
          { label: "Apply PANTRY20 (20% off)", value: "− ₹780*" },
          { label: "Free shipping above ₹499", value: "included" }
        ]}
        total={{ label: "You pay", value: "≈ ₹3,117" }}
        saving="You could save ₹780+ over 3 months"
        note="*Illustrative — PANTRY20 applies to monthly masala boxes; PREPAID5 (UPI) may combine."
      />

            <ProductDealRouter
        title="Cool-Ground Spice &amp; Pantry Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="zoff-foods"
        columns={2}
      />

            <FaqSection eyebrow="ZOFF Foods FAQs" items={faqs} />


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
