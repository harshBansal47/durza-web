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

const ADV_ICONS = { shield: Shield, truck: Truck, wrench: Wrench, card: CreditCard, zap: Zap, home: Home, check: BadgeCheck, spark: Sparkles };

const ADVANTAGES = [{"title": "GST-compliant invoicing", "desc": "GST invoices can be generated for eligible orders (enter GSTIN at checkout where applicable) to support business purchases and input tax credit."}, {"title": "Bulk & business buying options", "desc": "Volume pricing and bulk quote/RFQ options are available for many industrial and business supplies, subject to product and quantity."}, {"title": "Wide MRO & industrial catalogue", "desc": "Access a broad range of power tools, safety, electricals and facility supplies with detailed specs on official listings."}, {"title": "Payment & delivery options", "desc": "Multiple payment modes (including prepaid/EMI where eligible) and PIN-code based delivery are available \u2014 check live terms at checkout."}] as const;
const MATCHERS = [{"id": "diy", "label": "Home DIY & Repairs", "headline": "Reliable tools for home maintenance and projects", "bullets": ["Choose tool power, chuck/size and accessories for your tasks", "Check voltage compatibility and included warranty/support", "Verify return eligibility and specs on the product page"], "cta": "Explore power tools \u2192", "src": "matcher-diy"}, {"id": "safety", "label": "Safety & PPE", "headline": "Compliant safety gear for sites and workplaces", "bullets": ["Check relevant safety standards/ratings (e.g. footwear/helmets) as listed", "Pick the right size, material and protection level for the job", "Order correct quantities and confirm return terms for consumables"], "cta": "Explore safety & PPE \u2192", "src": "matcher-safety"}, {"id": "electricals", "label": "Electricals & Renovation", "headline": "Wires, switchgear and electrical essentials", "bullets": ["Verify ratings, certifications and suitability (load/amp/pole) on listings", "Match cable/wire specs and lengths to your requirement", "Prefer authorized brands and check warranty/return eligibility"], "cta": "Explore electricals \u2192", "src": "matcher-electricals"}, {"id": "facility", "label": "Office & Facility", "headline": "Supplies for offices, warehouses and operations", "bullets": ["Compare specs and pack sizes for packaging or facility needs", "Use GST invoicing and bulk options where applicable", "Check delivery timelines and serviceability for your PIN code"], "cta": "Explore facility supplies \u2192", "src": "matcher-facility"}] as const;
const LINEUP = [{"title": "Power & Hand Tools", "badge": "Tools", "copy": "Drills, grinders and tool kits \u2014 compare power, size and included accessories.", "src": "lineup-power-tools"}, {"title": "Safety & PPE", "badge": "Safety", "copy": "Safety shoes, helmets and protective gear \u2014 check standards and ratings.", "src": "lineup-safety"}, {"title": "Electricals & Switchgear", "badge": "Electricals", "copy": "Wires, MCBs and electrical components \u2014 verify ratings and certifications.", "src": "lineup-electricals"}, {"title": "Pumps & Motors", "badge": "Utilities", "copy": "Pumps and motors for home or work \u2014 match capacity, head and power.", "src": "lineup-pumps"}, {"title": "Packaging & Warehouse", "badge": "Operations", "copy": "Boxes, tapes and supplies for dispatch and storage \u2014 compare sizes and packs.", "src": "lineup-packaging"}, {"title": "Office & Facility Supplies", "badge": "Facility", "copy": "Equipment and supplies for workplaces \u2014 review specs and availability.", "src": "lineup-office"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  const [active, setActive] = useState<string>(MATCHERS[0]?.id ?? "");
  const current = useMemo(() => MATCHERS.find((m) => m.id === active) ?? MATCHERS[0], [active]);
  const heroHref = storeGoHref("moglix", "store-page");
  const mobileHref = storeGoHref("moglix", "mobile-sticky");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-ledger-line bg-gradient-to-br from-white via-slate-50 to-amber-50/40 p-6 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">Official store guide</p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight text-ink sm:text-5xl">Moglix Official Store — Power Tools, Electricals & Industrial Supplies</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">Find the right tools and supplies by task or business need, then check live specs, pricing, GST invoicing and bulk options on the official Moglix store.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={heroHref} target="_blank" rel={GO_REL} className="btn btn-cta inline-flex items-center gap-2">Shop Moglix official store → <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="#moglix-matcher" className="inline-flex items-center rounded-full border border-ledger-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-slate-50">Find what fits</a>
          </div>
          <p className="mt-4 text-xs text-ink-soft">We link you to the official store to check live price, availability and current terms.</p>
        </div>
      </section>

      <TrustStats {...stats} />

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Why buy on Moglix direct</h2>
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

      <section id="moglix-matcher" className="mt-12 scroll-mt-24">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Find supplies for your job</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Select your use case to get a quick checklist, then browse matching categories on Moglix.</p>
        <div role="tablist" aria-label="Moglix matcher" className="mt-5 flex flex-wrap gap-2">
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
              <p className="text-sm text-ink-soft">Browse the matching range on the official Moglix store to compare live options, pricing and availability.</p>
              <a href={storeGoHref("moglix", current.src)} target="_blank" rel={GO_REL} className="btn btn-cta mt-4 inline-flex items-center justify-center gap-2">{current.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </section>

      <section className="mt-12">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official catalogue</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">Shop Moglix by category</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Browse high-intent categories and confirm specs, GST details and live pricing on the official Moglix store.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINEUP.map((item) => (
            <a key={item.title} href={storeGoHref("moglix", item.src)} target="_blank" rel={GO_REL} className="group rounded-2xl border border-ledger-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
        <p className="mb-2 max-w-3xl text-sm text-ink-soft">GST, bulk pricing, delivery and return eligibility vary by product and order — confirm on the official Moglix listing and checkout.</p>
        <FaqSection eyebrow="Moglix FAQs" items={faqs} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={mobileHref} target="_blank" rel={GO_REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">Official store</span>
            <span className="block truncate text-xs font-semibold">Check live range & offers on Moglix</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Shop <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </div>
  );
}
