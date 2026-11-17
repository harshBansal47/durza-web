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

const ADVANTAGES = [{"title": "Official warranty & support", "desc": "Boult products include manufacturer warranty as per brand terms; buying direct helps with invoice-based support and warranty processes."}, {"title": "Latest launches & variants", "desc": "Access current models, colourways and feature variants listed on the official Boult store."}, {"title": "Genuine sealed products", "desc": "Order directly from the brand\u2019s official store for genuine, sealed units as sold by Boult."}, {"title": "Checkout offers as available", "desc": "Prepaid, bank or cart offers may be available from time to time \u2014 check live terms at checkout."}] as const;
const MATCHERS = [{"id": "commute", "label": "Commute & Calls", "headline": "TWS for daily travel and clearer calls", "bullets": ["Look for call clarity features (e.g. ENC mics) and a comfortable fit", "Consider ANC and battery life based on your commute", "Check Bluetooth version, case charging and warranty on the listing"], "cta": "Explore TWS earbuds \u2192", "src": "matcher-commute"}, {"id": "gaming", "label": "Gaming & Entertainment", "headline": "Low-latency audio for games and videos", "bullets": ["Prioritize low-latency/gaming modes where available", "Check driver, fit and total battery/playtime", "Review controls and compatibility with your devices"], "cta": "Explore gaming audio \u2192", "src": "matcher-gaming"}, {"id": "watch", "label": "Smartwatches & Fitness", "headline": "Wearables for calls, tracking and daily use", "bullets": ["Compare display type/brightness and battery life", "Check Bluetooth calling, health features and water resistance rating", "Confirm strap fit and supported app/features on the listing"], "cta": "Explore smartwatches \u2192", "src": "matcher-watch"}, {"id": "all-day", "label": "All-Day Battery", "headline": "Neckbands and audio for long listening", "bullets": ["Prioritize battery life, fast charging and comfort for long wear", "Check sweat/water resistance rating for workouts", "Compare connectivity options and controls"], "cta": "Explore neckbands & audio \u2192", "src": "matcher-all-day"}] as const;
const LINEUP = [{"title": "TWS Earbuds", "badge": "Everyday", "copy": "True wireless earbuds for music and calls \u2014 compare ANC/ENC, fit and battery.", "src": "lineup-tws"}, {"title": "Gaming Earbuds", "badge": "Low latency", "copy": "Gaming-focused audio modes \u2014 check latency features and controls.", "src": "lineup-gaming-tws"}, {"title": "Smartwatches", "badge": "Wearables", "copy": "Bluetooth calling and fitness watches \u2014 compare display, battery and ratings.", "src": "lineup-smartwatches"}, {"title": "Neckbands", "badge": "All-day", "copy": "Long-battery neckbands \u2014 review playback time, comfort and resistance.", "src": "lineup-neckbands"}, {"title": "Headphones & Speakers", "badge": "Home audio", "copy": "Over-ear and speaker options \u2014 check drivers, connectivity and features.", "src": "lineup-audio-home"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  const [active, setActive] = useState<string>(MATCHERS[0]?.id ?? "");
  const current = useMemo(() => MATCHERS.find((m) => m.id === active) ?? MATCHERS[0], [active]);
  const heroHref = storeGoHref("boult", "store-page");
  const mobileHref = storeGoHref("boult", "mobile-sticky");

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-ledger-line bg-gradient-to-br from-white via-slate-50 to-amber-50/40 p-6 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">Official store guide</p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight text-ink sm:text-5xl">Boult Official Store — TWS Earbuds, Smartwatches & Audio</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">Pick Boult audio or wearables by how you use them, compare key features, and check live models, pricing and warranty details on the official store.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={heroHref} target="_blank" rel={GO_REL} className="btn btn-cta inline-flex items-center gap-2">Shop Boult official store → <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="#boult-matcher" className="inline-flex items-center rounded-full border border-ledger-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-slate-50">Find what fits</a>
          </div>
          <p className="mt-4 text-xs text-ink-soft">We link you to the official store to check live price, availability and current terms.</p>
        </div>
      </section>

      <TrustStats {...stats} />

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Why shop Boult direct</h2>
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

      <section id="boult-matcher" className="mt-12 scroll-mt-24">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Find the right Boult for you</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Choose your use case to see what features to prioritize, then explore matching products on the official store.</p>
        <div role="tablist" aria-label="Boult matcher" className="mt-5 flex flex-wrap gap-2">
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
              <p className="text-sm text-ink-soft">Browse the matching range on the official Boult store to compare live options, pricing and availability.</p>
              <a href={storeGoHref("boult", current.src)} target="_blank" rel={GO_REL} className="btn btn-cta mt-4 inline-flex items-center justify-center gap-2">{current.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </section>

      <section className="mt-12">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Audio & wearables</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">Shop Boult by category</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Browse Boult categories and confirm features, battery claims as listed, and live pricing on the official store.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINEUP.map((item) => (
            <a key={item.title} href={storeGoHref("boult", item.src)} target="_blank" rel={GO_REL} className="group rounded-2xl border border-ledger-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
        <p className="mb-2 max-w-3xl text-sm text-ink-soft">Features (ANC/ENC, latency, IP ratings, battery) vary by model — always confirm the exact specifications on the official product listing.</p>
        <FaqSection eyebrow="Boult FAQs" items={faqs} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={mobileHref} target="_blank" rel={GO_REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">Official store</span>
            <span className="block truncate text-xs font-semibold">Check live range & offers on Boult</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Shop <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </main>
  );
}
