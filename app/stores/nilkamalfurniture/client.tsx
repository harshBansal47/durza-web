"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, BadgeCheck, Truck, Shield, Wrench, CreditCard, Zap, Home, Sparkles } from "lucide-react";
import FaqSection from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import { GO_REL, storeGoHref } from "@/lib/go";

interface Props {
  faqs: { question: string; answer: string }[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}


const ADVANTAGES = [{"title": "Delivery & assembly on eligible items", "desc": "Doorstep delivery and technician assembly are available on eligible furniture orders, subject to PIN-code serviceability shown on the product page."}, {"title": "Manufacturer warranty", "desc": "Nilkamal furniture includes manufacturer warranty against defects as per category/product terms \u2014 review coverage on the listing."}, {"title": "EMI & flexible payments", "desc": "EMI and other payment options may be available on eligible orders \u2014 see live options at checkout."}, {"title": "Coordinated ranges & finishes", "desc": "Shop matching finishes and configurations across bedroom, living, office and utility ranges directly from Nilkamal."}] as const;
const MATCHERS = [{"id": "wfh", "label": "WFH & Study", "headline": "Ergonomic seating and desks for daily work", "bullets": ["Measure desk width, depth and legroom for your space", "Prioritize adjustable seating and back support for long hours", "Check materials, load capacity and assembly requirements"], "cta": "Explore WFH & study \u2192", "src": "matcher-wfh"}, {"id": "bedroom", "label": "Bedroom & Storage", "headline": "Beds and wardrobes that fit your room", "bullets": ["Confirm mattress size and room/doorway clearance before buying", "Choose storage type (box/hydraulic/shelves) based on access needs", "Verify wardrobe dimensions and door swing or sliding space"], "cta": "Explore bedroom furniture \u2192", "src": "matcher-bedroom"}, {"id": "living", "label": "Living & Dining", "headline": "Comfortable seating and dining for everyday use", "bullets": ["Measure entryways and layout for sofas and dining sets", "Pick upholstery/material suited to maintenance, kids or pets", "Check seating capacity and finish consistency across pieces"], "cta": "Explore living & dining \u2192", "src": "matcher-living"}, {"id": "outdoor", "label": "Outdoor & Utility", "headline": "Durable, easy-care seating and utility pieces", "bullets": ["Choose weather-resistant, sturdy materials for balconies or outdoors", "Consider stackable or space-saving designs where needed", "Review weight-bearing and care instructions on the listing"], "cta": "Explore utility furniture \u2192", "src": "matcher-outdoor"}] as const;
const LINEUP = [{"title": "Office & Study Chairs", "badge": "WFH", "copy": "Ergonomic chairs \u2014 compare adjustability, support and materials.", "src": "lineup-office-chairs"}, {"title": "Study & Computer Desks", "badge": "Study", "copy": "Desks for home and students \u2014 check size, storage and build.", "src": "lineup-study-tables"}, {"title": "Beds with Storage", "badge": "Bedroom", "copy": "Beds in multiple sizes and storage options \u2014 confirm dimensions and finish.", "src": "lineup-beds"}, {"title": "Sofas & Recliners", "badge": "Living", "copy": "Seating configurations for your living room \u2014 review upholstery and measurements.", "src": "lineup-sofas"}, {"title": "Wardrobes & Cabinets", "badge": "Storage", "copy": "Organize with wardrobes and cabinets \u2014 check layout and door type.", "src": "lineup-storage"}, {"title": "Moulded & Outdoor Chairs", "badge": "Utility", "copy": "Durable multipurpose seating \u2014 see material and load details.", "src": "lineup-outdoor"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  const [active, setActive] = useState<string>(MATCHERS[0]?.id ?? "");
  const current = useMemo(() => MATCHERS.find((m) => m.id === active) ?? MATCHERS[0], [active]);
  const heroHref = storeGoHref("nilkamalfurniture", "store-page");
  const mobileHref = storeGoHref("nilkamalfurniture", "mobile-sticky");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-ledger-line bg-gradient-to-br from-white via-slate-50 to-amber-50/40 p-6 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">Official store guide</p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight text-ink sm:text-5xl">Nilkamal Furniture Official Store — Chairs, Beds & Home Storage</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">Find Nilkamal furniture for your space, compare dimensions and materials, then check live price, PIN-code delivery and eligible assembly on the official store.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={heroHref} target="_blank" rel={GO_REL} className="btn btn-cta inline-flex items-center gap-2">Shop Nilkamal Furniture → <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="#nilkamalfurniture-matcher" className="inline-flex items-center rounded-full border border-ledger-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-slate-50">Find what fits</a>
          </div>
          <p className="mt-4 text-xs text-ink-soft">We link you to the official store to check live price, availability and current terms.</p>
        </div>
      </section>

      <TrustStats {...stats} />

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Why shop Nilkamal direct</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((a, i) => {
            const Icon = [Shield, Truck, Wrench, CreditCard, Zap, Home, BadgeCheck, Sparkles][i % 8];
            return (
              <div key={a.title} className="rounded-2xl border border-ledger-line bg-white p-5 shadow-sm">
                <Icon className="h-5 w-5 text-amber-700" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-ink">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{a.desc}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-ink-soft">Benefits, availability and terms are determined by the official store and may vary by product, location or time.</p>
      </section>

      <section id="nilkamalfurniture-matcher" className="mt-12 scroll-mt-24">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Match furniture to your space</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Choose your room or need to get a quick checklist, then explore the right range on the official store.</p>
        <div role="tablist" aria-label="Nilkamal Furniture matcher" className="mt-5 flex flex-wrap gap-2">
          {MATCHERS.map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={active === m.id} onClick={() => setActive(m.id)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active === m.id ? "bg-ink text-white" : "border border-ledger-line bg-white text-ink hover:bg-slate-50"}`}>
              {m.label}
            </button>
          ))}
        </div>
        {current && (
          <div className="mt-5 grid gap-5 rounded-2xl border border-ledger-line bg-white p-5 shadow-sm lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h3 className="text-xl font-bold text-ink">{current.headline}</h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                {current.bullets.map((b) => (<li key={b} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />{b}</li>))}
              </ul>
            </div>
            <div className="flex flex-col justify-between rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-ink-soft">Browse the matching range on the official Nilkamal Furniture store to compare live options, pricing and availability.</p>
              <a href={storeGoHref("nilkamalfurniture", current.src)} target="_blank" rel={GO_REL} className="btn btn-cta mt-4 inline-flex items-center justify-center gap-2">{current.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </section>

      <section className="mt-12">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official range</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">Shop Nilkamal by room</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Browse popular Nilkamal categories and confirm dimensions, delivery and live pricing on the official store.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINEUP.map((item) => (
            <a key={item.title} href={storeGoHref("nilkamalfurniture", item.src)} target="_blank" rel={GO_REL} className="group rounded-2xl border border-ledger-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">{item.badge}</p>
              <h3 className="mt-2 text-lg font-bold text-ink group-hover:text-inkblue">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.copy}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink">View on official store <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-10"><AffiliateDisclosure /></div>

      <section className="mt-10">
        <p className="mb-2 max-w-3xl text-sm text-ink-soft">Delivery, assembly and return terms can vary by product and PIN code — confirm on the official Nilkamal listing before ordering.</p>
        <FaqSection eyebrow="Nilkamal Furniture FAQs" items={faqs} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={mobileHref} target="_blank" rel={GO_REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">Official store</span>
            <span className="block truncate text-xs font-semibold">Check live range & offers on Nilkamal Furniture</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Shop <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </div>
  );
}
