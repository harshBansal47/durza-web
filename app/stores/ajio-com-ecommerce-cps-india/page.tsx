import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { storeLogoUrl } from "@/lib/storeLogos";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "AJIO Offers & Best Deals (2026) — 180+ Live AJIO Coupons Listed Cleanly";
const description =
  "Live AJIO offers and best deals, organised by category — men, women, ethnic, denim, footwear, accessories, beauty, home, kids, sports, gadgets and more. Every live AJIO code and checkout-deal, daily-refreshed, no fakes.";
const canonical = "/stores/ajio-com-ecommerce-cps-india";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Why does Durza sort AJIO offers by category instead of date?", answer: "AJIO refreshes aggressively — sale windows change every day. A flat chronological list disappears in a week. Grouping by category keeps the page useful even after the top promo of the day has sold through." },
  { question: "Are these affiliate links?", answer: "Yes. Every link routes through AJIO's vCommission partner network for Durza. Durza earns a referral fee on qualifying AJIO orders at no cost to you; prices and delivery are AJIO's own." },
  { question: "Can I combine AJIO offers with bank card discounts?", answer: "Yes — AJIO typically runs instant discounts for ICICI, SBI, HDFC and other card partners alongside its own promo codes and Coupon-Code-of-the-Day campaigns. Check your bank side, not ours, for exact rules." },
  { question: "Does Durza know the actual price of AJIO products?", answer: "No. Durza knows merchants' promotional campaign messaging; the prices on the AJIO checkout are AJIO's canonical numbers. Durza displays offer titles unchanged, and does not rewrite, re-quote or re-verify discount percentages." },
  { question: "Why is there no 'verified' badge on AJIO deals?", answer: "Durza doesn't hand-test merchant campaigns. We sync from the AJIO campaigns feed nightly, parse what the feed actually returned, list it live. Only when Durza's checkout-verification layer reports a real success will a green tick appear — and none currently has." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("ajio-com-ecommerce-cps-india", { skip: 0, limit: 100 });
  const secondPage = await resilient.getStoreDestination("ajio-com-ecommerce-cps-india", { skip: 100, limit: 100 });
  const offers: CouponPublic[] = [...(destination?.deals ?? []), ...(secondPage?.deals ?? [])];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], offers);
  const storeUrl = destination?.store.website_url ?? undefined;
  const heroImageUrl = storeLogoUrl({ slug: "ajio-com-ecommerce-cps-india", logo_url: destination?.store.hero_image_url ?? null, website_url: storeUrl }) ?? null;
  const offerCount = destination?.offer_total ?? offers.length;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "AJIO", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient
        offers={offers}
        faqs={FAQS}
        stats={stats}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
      />
      <RelatedGuides slug="ajio-com-ecommerce-cps-india" />
    </>
  );
}
