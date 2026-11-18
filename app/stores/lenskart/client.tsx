"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import StackingExample from "@/components/store/StackingExample";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import { api } from "@/lib/api";
import { GO_REL, storeGoHref } from "@/lib/go";
import { formatDiscountHeading } from "@/lib/format";
import type { CouponPublic } from "@/lib/types";

const FALLBACK_URL = "https://www.lenskart.com";
interface Props {
  offers: CouponPublic[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function StorePage({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const topOffer = offers[0] ?? null;
  const baseUrl = storeUrl ?? FALLBACK_URL;
  const domain = new URL(baseUrl).hostname.replace(/^www\./, "");
  const ctaHref = storeGoHref("lenskart", "store-page");
  const topCoded = offers.find((o) => o.code) ?? null;
  const sticky = topCoded
    ? { label: `Code ${topCoded.code}`, title: topCoded.title, href: api.goUrl(topCoded.id, "store-page") }
    : topOffer
      ? { label: "Shop", title: topOffer.title, href: api.goUrl(topOffer.id, "store-page") }
      : { label: "Shop", title: "Shop the latest deals", href: ctaHref };

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 pb-24 md:pb-8">
      <StoreHero
        name="Lenskart"
        heading="Lenskart Coupons & Offers"
        subtitle="Eyewear, lenses and sunglasses — DEAL70 frames at ₹600 and Home Try-on, refreshed regularly."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        ctaLabel="Shop Lenskart →"
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      {offers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((o) => (
            <OfferCard
              key={o.id}
              bookmarkId={o.id}
              code={o.code}
              badge={formatDiscountHeading(o, "INR")}
              title={o.title}
              description={o.description}
              ctaHref={api.goUrl(o.id, "store-page")}
              verified={o.verification_status === "verified"}
              expiresAt={o.expires_at}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-ledger-line bg-white p-5 text-sm text-ink-soft">
          Offers refresh weekly. Tap{" "}
          <a className="font-semibold text-inkblue underline" href={ctaHref}>
            Go to {domain}
          </a>{" "}
          to see the latest deals directly on checkout — commissions disclosed on all outbound links.
        </p>
      )}

      <StackingExample
        title="How people save on a Lenskart cart"
        lead="First-time wearer, full-order maths — how the savings could land:"
        lines={[
          { label: "Frame from ₹600 offer (free lenses)", value: "₹600" },
          { label: "Blue-light/AR coating (recommended for screen work)", value: "+ ₹200*" },
          { label: "Prepaid/UPI instant (Lenskart runs payment offers)", value: "− ₹60*" },
          { label: "Free home-fitting by optician (eligible orders)", value: "₹0*" }
        ]}
        total={{ label: "You pay", value: "≈ ₹740" }}
        saving="≈ ₹300+ vs full-price purchase of a branded spec frame"
        note="*Illustrative — offer eligibility varies by frame, city and lens choice; check the PDP before paying."
      />

      <section aria-labelledby="brand-guidance" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 className="scroll-mt-24 text-lg font-bold text-ink" id="brand-guidance">How to buy Lenskart eyewear without overpaying</h2>
        <ul className="mt-3 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
          <li key="g0" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Desk workers: get the blue-light/AR coating — it&apos;s the single best ~₹150–₹200 upgrade for digital eye strain.</span>
          </li>
          <li key="g1" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Photochromic lenses are brilliant in Indian sun — they&apos;ll darken at UV triggers; pricier than AR but worth it for outdoor commuters.</span>
          </li>
          <li key="g2" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Home eye-test = free in many cities with a frame purchase — book it when you enter your pin-code at checkout.</span>
          </li>
          <li key="g3" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Do the Home Try-on (5 frames → choose 1) — Lenskart sends frames to pick your fit from the couch.</span>
          </li>
          <li key="g4" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Buy 1 Get 1 and 'single from ₹800' run as flash offers — check the offers strip on the homepage every week.</span>
          </li>
          <li key="g5" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Sunglasses with powered lenses: ask the store for fused-edge finish — the line where lens meets frame should be smooth, no bubbles.</span>
          </li>
        </ul>
        <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] text-ink-soft">
          Shopping guidance only — prices, eligibility and exclusions change; the checkout always wins.
        </p>
      </section>

      <section aria-labelledby="related-store-guides" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 id="related-store-guides" className="text-lg font-bold text-ink">Related Smart Store Guides</h2>
        <p className="mt-1 text-sm text-ink-soft">Explore more lifestyle and accessories store guides on Durza.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { href: "/stores/palmonas", name: "Palmonas", note: "Demi-fine jewellery and everyday accessories" },
            { href: "/stores/charles-and-keith", name: "Charles & Keith", note: "Bags, footwear and polished accessories" },
            { href: "/stores/aldo-shoes", name: "ALDO", note: "Footwear and fashion accessories" },
          ].map((s) => (
            <a key={s.href} href={s.href} className="rounded-2xl border border-ledger-line bg-paper-raised p-4 transition hover:border-inkblue/30 hover:shadow-sm">
              <p className="font-semibold text-ink">{s.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{s.note}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-inkblue">Open guide →</span>
            </a>
          ))}
        </div>
      </section>

      <FaqSection eyebrow="Lenskart.com FAQs" items={faqs} />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a
          href={sticky.href}
          target="_blank"
          rel={GO_REL}
          className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white"
        >
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              {sticky.label}
            </span>
            <span className="block truncate text-xs font-semibold">{sticky.title}</span>
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
