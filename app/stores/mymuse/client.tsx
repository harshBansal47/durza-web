"use client";

import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("mymuse", url, sub);
const GUARANTEES = [
  { title: "Plain Brown Box", detail: "Neither the courier partner nor anyone at home can see the brand name or contents on the outer label." },
  { title: "Neutral Billing Name", detail: "Your UPI/card statement never displays explicit product details — the descriptor stays neutral." },
  { title: "Doctor-Approved Materials", detail: "100% phthalate-free medical silicone and pH-balanced water-based gels, paraben-free." },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function MyMuseClient({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="MyMuse India"
        subtitle="Modern Intimate Wellness • Doctor-Approved, Body-Safe & 100% Discreet"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">The 3-Point Privacy &amp; Safety Guarantee</h2>
        <ol className="mt-4 space-y-3">
          {GUARANTEES.map((g, i) => (
            <li key={g.title} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">{i + 1}</span>
              <span className="text-sm"><span className="font-semibold text-ink">{g.title}: </span><span className="text-ink-soft">{g.detail}</span></span>
            </li>
          ))}
        </ol>
        <a href={link("https://mymuse.in/collections/bestsellers", "privacy_guarantee")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Discreetly on MyMuse</a>
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

      <div>
        <h2 className="text-xl font-bold text-ink">Intimate Wellness &amp; Comfort Matcher</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((c) => (
            <button key={c} type="button" onClick={() => setConcern(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${concern === c ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <div key={p.name} className="rounded-2xl border border-ledger-line bg-white p-4">
              <h3 className="font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{p.specs}</p>
              <div className="mt-2 flex items-baseline gap-2"><span className="text-lg font-bold text-ink">{p.price}</span><span className="text-sm text-ink-soft line-through">{p.mrp}</span></div>
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">View on MyMuse</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How discreet is the packaging upon delivery?</summary><p className="mt-2 text-sm text-ink-soft">Every order ships in a plain brown or grey box with no brand name, logo, or product description anywhere on the parcel. The courier invoice shows a neutral descriptor, and billing appears under a generic company name.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Is water-based Glide safe with latex condoms and silicone products?</summary><p className="mt-2 text-sm text-ink-soft">Yes. MyMuse Glide is water-based, pH-balanced, glycerin-free and paraben-free, making it safe with latex condoms and most silicone products. It washes off easily and does not stain.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does the 1-year warranty replacement work?</summary><p className="mt-2 text-sm text-ink-soft">MyMuse offers a 1-year replacement warranty on massagers and electronic products. Reach out to support with your order ID and a short video/photo of the defect, and a replacement ships after verification.</p></details>
      </section>
    </div>
  );
}
