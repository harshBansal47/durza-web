"use client";

import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import StackingExample from "@/components/store/StackingExample";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import OfferCard from "@/components/OfferCard";
import { useMemo, useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
import { ArrowUpRight } from "lucide-react";
import ProductDealRouter from "@/components/store/ProductDealRouter";

const link = (url: string, sub: string): string => getAffiliateLink("lavie-world", url, sub);
const vcom = (url: string, slot: string) =>
  `https://track.vcommission.com/click?campaign_id=13524&pub_id=133499&url=${encodeURIComponent(url)}&p1=${encodeURIComponent(slot)}`;

const CARRY = [
  {
    id: "laptop",
    label: "14\" Laptop & Charger",
    result: "Office & Laptop Totes",
    detail: "Pick a structured work tote that fits a 14\" laptop, charger and documents for office commutes on Lavie World.",
    math: "Check the live Lavie World cart for current markdowns, eligible codes, and payment offers before checkout.",
    url: "https://www.lavieworld.com/collections/tote-bags",
    sub: "capacity_laptop",
    cta: "Shop Office & Laptop Totes on Lavie ↗",
  },
  {
    id: "everyday",
    label: "Everyday Essentials",
    result: "Everyday Satchels",
    detail: "A medium satchel fits phone, makeup pouch, keys and a cardholder for daily errands on Lavie World.",
    math: "Check the live Lavie World cart for current markdowns, eligible codes, and payment offers before checkout.",
    url: "https://www.lavieworld.com/collections/satchel-bags",
    sub: "capacity_everyday",
    cta: "Shop Everyday Satchels on Lavie ↗",
  },
  {
    id: "minimal",
    label: "Phone & Keys Only",
    result: "Crossbody Slings",
    detail: "A compact sling keeps phone, keys and cards hands-free for quick outings on Lavie World.",
    math: "Check the live Lavie World cart for current markdowns, eligible codes, and payment offers before checkout.",
    url: "https://www.lavieworld.com/collections/sling-bags",
    sub: "capacity_minimal",
    cta: "Shop Crossbody Slings on Lavie ↗",
  },
  {
    id: "festive",
    label: "Wedding / Festive Clutch",
    result: "Festive Clutches",
    detail: "A compact clutch or potli-style pick suits wedding and festive occasions while carrying essentials on Lavie World.",
    math: "Check the live Lavie World cart for current markdowns, eligible codes, and payment offers before checkout.",
    url: "https://www.lavieworld.com/collections/clutch-bags",
    sub: "capacity_festive",
    cta: "Shop Festive Clutches on Lavie ↗",
  },
] as const;

const DEFAULT_MATCHER = [
  { tab: "Office & Laptop Totes", name: "Office & Laptop Totes", specs: "Structured tote space for a 14\" laptop, charger and work essentials.", url: "https://www.lavieworld.com/collections/tote-bags", slot: "matcher_office_laptop_totes", cta: "Shop Office & Laptop Totes on Lavie ↗" },
  { tab: "Everyday Satchels", name: "Everyday Satchels", specs: "Medium satchels for phone, wallet, makeup and daily carry.", url: "https://www.lavieworld.com/collections/satchel-bags", slot: "matcher_everyday_satchels", cta: "Shop Everyday Satchels on Lavie ↗" },
  { tab: "Crossbody Slings", name: "Crossbody Slings", specs: "Hands-free slings for phone, keys and cards.", url: "https://www.lavieworld.com/collections/sling-bags", slot: "matcher_crossbody_slings", cta: "Shop Crossbody Slings on Lavie ↗" },
  { tab: "RFID Wallets", name: "RFID Wallets", specs: "Compact wallets and card holders with RFID-friendly designs on Lavie World.", url: "https://www.lavieworld.com/collections/wallets", slot: "matcher_rfid_wallets", cta: "Shop RFID Wallets on Lavie ↗" },
  { tab: "Festive Clutches", name: "Festive Clutches", specs: "Clutches and occasion bags for weddings and festive events.", url: "https://www.lavieworld.com/collections/clutch-bags", slot: "matcher_festive_clutches", cta: "Shop Festive Clutches on Lavie ↗" },
] as const;

function enrichOfferCode(o: StoreOfferCard, idx: number): StoreOfferCard {
  if (o.code && o.code.trim()) return o;
  const hay = `${o.title} ${o.description ?? ""} ${o.badge}`.toLowerCase();
  let code = "";
  if (/lavie10|10%|extra 10/.test(hay)) code = "LAVIE10";
  else if (/style200|200/.test(hay)) code = "STYLE200";
  else if (/extra5|extra 5|5%/.test(hay)) code = "EXTRA5";
  else if (/free\s*ship|shipping/.test(hay)) code = "FREESHIP";
  else {
    const fallback = ["LAVIE10", "STYLE200", "EXTRA5", "FREESHIP"];
    code = fallback[idx] ?? "";
  }
  return code ? { ...o, code } : o;
}

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function LavieWorldClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const enrichedOffers = useMemo(() => offers.map((o, i) => enrichOfferCode(o, i)), [offers]);
  const [carry, setCarry] = useState<(typeof CARRY)[number]>(CARRY[0]);

  const matcherProducts = useMemo(() => {
    if (products.length >= 5) {
      return products.slice(0, 5).map((p, i) => ({
        ...p,
        targetUrl: vcom(p.targetUrl, `matcher_${(p.subId || p.tab || i).toString().toLowerCase().replace(/[^a-z0-9]+/g, "_")}`),
      }));
    }
    // Ensure 5 configured matcher options with tracked links
    return DEFAULT_MATCHER.map((d) => ({
      tab: d.tab,
      name: d.name,
      specs: d.specs,
      price: "",
      mrp: null,
      discount: null,
      variant: null,
      image: null,
      languages: null,
      targetUrl: vcom(d.url, d.slot),
      subId: d.slot,
      sort: 0,
    } as StoreProductCard));
  }, [products]);

  const matcherTabs = useMemo(() => DEFAULT_MATCHER.map((d) => d.tab), []);
  const [concern, setConcern] = useState<string>(matcherTabs[0] ?? "Office & Laptop Totes");

  const topOffer = enrichedOffers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  const carryLink = (c: (typeof CARRY)[number]) => vcom(c.url, c.sub);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="Lavie World"
        subtitle="Fickle Is Fun • Designer Handbags, Work Totes & Festive Clutches"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={enrichedOffers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">What Fits Inside? — Capacity Guide</h2>
        <p className="mt-1 text-sm text-ink-soft">Select your daily carry and we will surface the right Lavie World bag category for it.</p>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="What Fits Inside? — Capacity Guide">
          {CARRY.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={carry.id === c.id}
              onClick={() => setCarry(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${carry.id === c.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft hover:text-ink"}`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-paper p-4">
          <p className="text-sm font-semibold text-ink">Recommended: {carry.result}</p>
          <p className="mt-1 text-sm text-ink-soft">{carry.detail}</p>
          <p className="mt-2 text-xs font-medium text-ink">Stacking math: {carry.math}</p>
        </div>
        <a href={carryLink(carry)} target="_blank" rel="nofollow sponsored noopener noreferrer" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">{carry.cta}</a>
      </div>

      {enrichedOffers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {enrichedOffers.map((o, idx) => (
            <OfferCard
              key={o.id || o.code || idx}
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
        <ExploreStoreCta storeName="Lavie World" href={ctaHref} />
      )}

      <StackingExample
        title="How people stack savings on Lavie World"
        lead="A handbag and sling duo for everyday work on Lavie World:"
        lines={[
          { label: "Handbag + sling duo", value: "Check live Lavie World cart" },
          { label: "Eligible promo code (if applicable)", value: "Applied at checkout" },
          { label: "Payment/bank offer (if available)", value: "Shown at checkout" },
          { label: "Shipping/returns", value: "Per Lavie World policy" }
        ]}
        total={{ label: "You pay", value: "Final amount shown at checkout" }}
        saving="Use eligible codes and payment offers on Lavie World when available"
        note="Live pricing and eligibility on Lavie World apply at checkout."
      />

      <ProductDealRouter
        title="Capacity & Occasion Handbag Matcher"
        offers={enrichedOffers}
        products={matcherProducts}
        tabs={matcherTabs}
        concern={concern}
        onConcern={setConcern}
        storeName="lavie-world"
        storeDisplayName="Lavie World"
        columns={2}
        getHref={(p) => p.targetUrl}
        getCtaLabel={(p) => {
          const byTab: Record<string, string> = {
            "Office & Laptop Totes": "Shop Office & Laptop Totes on Lavie ↗",
            "Everyday Satchels": "Shop Everyday Satchels on Lavie ↗",
            "Crossbody Slings": "Shop Crossbody Slings on Lavie ↗",
            "RFID Wallets": "Shop RFID Wallets on Lavie ↗",
            "Festive Clutches": "Shop Festive Clutches on Lavie ↗",
          };
          return byTab[p.tab] ?? `Shop ${p.tab} on Lavie ↗`;
        }}
      />

      <FaqSection eyebrow="Lavie World FAQs" items={faqs} />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a
          href={topOffer ? link(topOffer.targetUrl, topOffer.subId) : ctaHref}
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
              {topOffer ? topOffer.title : `Check live range & offers on Lavie World`}
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
