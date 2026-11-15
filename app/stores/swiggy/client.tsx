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

const FALLBACK_URL = "https://www.swiggy.com";
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
  const ctaHref = storeGoHref("swiggy", "store-page");
  const topCoded = offers.find((o) => o.code) ?? null;
  const sticky = topCoded
    ? { label: `Code ${topCoded.code}`, title: topCoded.title, href: api.goUrl(topCoded.id, "store-page") }
    : topOffer
      ? { label: "Shop", title: topOffer.title, href: api.goUrl(topOffer.id, "store-page") }
      : { label: "Shop", title: "Shop the latest deals", href: ctaHref };

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 pb-24 md:pb-8">
      <StoreHero
        name="Swiggy"
        heading="Swiggy Coupons & Offers"
        subtitle="Food, Instamart and Swiggy One — deep-link deals refreshed from Swiggy app offers."
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
        title="How people save on a Swiggy order"
        lead="A ₹999 family dinner — how the maths can work in Swiggy:"
        lines={[
          { label: "Family dinner cart", value: "₹999" },
          { label: "UPI instant (where offered)", value: "− ₹100*" },
          { label: "Swiggy One free delivery (members)", value: "₹0*" },
          { label: "First-order coupon (from the app)", value: "− one-time*" }
        ]}
        total={{ label: "You pay", value: "≈ ₹899" }}
        saving="≈ ₹100–₹200 saved per meal, plus delivery fee waived for members"
        note="*Illustrative — Swiggy's offers are personalised per account; what shows on your app is what applies."
      />

      <section aria-labelledby="brand-guidance" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 className="scroll-mt-24 text-lg font-bold text-ink" id="brand-guidance">How to actually save on Swiggy — tips people actually use</h2>
        <ul className="mt-3 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
          <li key="g0" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Swiggy One pays off if you&apos;re eating 8+ deliveries/month — order more, pay less per order; Instamart is included.</span>
          </li>
          <li key="g1" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>App-exclusive deep-links only appear inside the app sometimes — if a promo code from social didn&apos;t apply, check your app for the partner version.</span>
          </li>
          <li key="g2" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>UPI payments sometimes carry better partner instants than card — try both.</span>
          </li>
          <li key="g3" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Dineout/Swiggy Table — deep discounts at dine-in restaurants; book and pay in app for the biggest food savings of the month.</span>
          </li>
          <li key="g4" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Late-night/dinner slots sometimes drop steep partner deals — check after 7pm if it&apos;s your feeding window.</span>
          </li>
          <li key="g5" className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>Instamart grocery delivery under ₹99 often needs a Swiggy One membership or minimum cart — consolidate snack orders, don&apos;t order single-rolls.</span>
          </li>
        </ul>
        <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] text-ink-soft">
          Shopping guidance only — prices, eligibility and exclusions change; the checkout always wins.
        </p>
      </section>

      <FaqSection eyebrow="Swiggy.com FAQs" items={faqs} />

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
