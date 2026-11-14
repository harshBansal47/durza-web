"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import StackingExample from "@/components/store/StackingExample";
import HowToApply from "@/components/store/HowToApply";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import { api } from "@/lib/api";
import { GO_REL, storeGoHref } from "@/lib/go";
import { formatDiscountHeading } from "@/lib/format";
import type { CouponPublic } from "@/lib/types";

const FALLBACK_URL = "https://www.zomato.com";
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
  const ctaHref = storeGoHref("zomato", "store-page");
  const topCoded = offers.find((o) => o.code) ?? null;
  const sticky = topCoded
    ? { label: `Code ${topCoded.code}`, title: topCoded.title, href: api.goUrl(topCoded.id, "store-page") }
    : topOffer
      ? { label: "Shop", title: topOffer.title, href: api.goUrl(topOffer.id, "store-page") }
      : { label: "Shop", title: "Shop the latest deals", href: ctaHref };

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 pb-24 md:pb-8">
      <StoreHero
        name="Zomato"
        heading="Zomato Coupons & Offers"
        subtitle="Food delivery, dineout deals and Gold — offers refreshed from Zomato campaigns."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        ctaLabel="Go"
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
        title="How people save on a Zomato order"
        lead="A ₹1,499 family meal — how the savings could fall out:"
        lines={[
          { label: "Family dinner cart", value: "₹1,499" },
          { label: "UPI / card partner instant", value: "− ₹150*" },
          { label: "Free delivery (Zomato Gold members)", value: "₹0*" },
          { label: "First-order offer (if applicable)", value: "− one-time*" }
        ]}
        total={{ label: "You pay", value: "≈ ₹1,349" }}
        saving="≈ ₹150+ saved per meal, plus Gold savings every month"
        note="*Illustrative — Zomato offers are personalised per account; what the app says, goes."
      />

      <HowToApply storeName={"Zomato"} />

      <section aria-labelledby="brand-guidance" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 className="scroll-mt-24 text-lg font-bold text-ink" id="brand-guidance">How to actually save on Zomato — practical habits</h2>
        <ul className="mt-3 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
          <li key="g0" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Zomato Gold is cheaper per meal if you hit ~6+ orders a month — check the in-app subscription price before the annual purchase.</span>
          </li>
          <li key="g1" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Dineout is how you save the MOST on big weekend meals — flat discounts at partner restaurants, booked through the app.</span>
          </li>
          <li key="g2" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>UPI carries most partner instants — keep your preferred UPI app ready at checkout.</span>
          </li>
          <li key="g3" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>App visibility &gt; web — sometimes partner deals and first-orders show only inside the app.</span>
          </li>
          <li key="g4" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Late-afternoon / lunch slots (before 4pm) historically drop the fattest partner offers — check the app if lunch is your meal.</span>
          </li>
          <li key="g5" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Pure-veg filter &amp; price bands — saves scanning decisions; the right restaurant thotp food has better group-order history anyway.</span>
          </li>
        </ul>
        <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] text-ink-soft">
          Shopping guidance only — prices, eligibility and exclusions change; the checkout always wins.
        </p>
      </section>

      <FaqSection eyebrow="Zomato.com FAQs" items={faqs} />

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
