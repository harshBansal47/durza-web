import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Nykaa Coupons & Offers – Beauty Sale Bank Deals";
const description = "Live Nykaa coupon codes for today — bank-card discounts on beauty, skincare and Nykaa Fashion, refreshed from official campaign pages.";
const canonical = "/stores/nykaa";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("nykaa", baseMetadata);
}

const FAQS = [
  { question: "Are Nykaa products authentic?", answer: "Nykaa sells through its own fulfilment — the brand-direct products you see on nykaa.com carry Nykaa's satisfaction guarantee. Marketplace listings (3rd-party sellers) exist on Nykaa Fashion — check the ‘Sold by’ line on the PDP before you order." },
  { question: "What is Nykaa Prive?", answer: "Nykaa's loyalty program — earn Nykaa Prive points on purchases; higher tiers offer better redemptions and birthday-month benefits. Joining is free." },
  { question: "Does Nykaa offer COD?", answer: "COD is available on most pin-codes and most carts — modest handling fees may apply. Prepaid/UPI usually gets a small instant saving instead." },
  { question: "Do Nykaa coupon codes exist?", answer: "Nykaa runs more auto-applied bank and sale deals than blanket public codes — most savings land through bank partners and Prive coins; any public code we can source is listed above." },
  { question: "Can I return beauty products?", answer: "Yes — unopened/sealed beauty products have a standard return window; skincare and makeup restrictions vary by brand. The PDP and shipping promise at checkout govern eligibility." },
  { question: "How do the bank offers work?", answer: "Nykaa runs instant-discount deals with bank partners (often 10% cards). The ‘offers’ tab at PDP/cart shows what applies to you; the discount lands after you choose the partner card at checkout." },
  { question: "Is there a Nykaa coupon code for today (2026)?", answer: "Nykaa leans on bank-card and Prive coins over blanket codes. When a public code is sourced and live, it appears in the offers panel above this answer and stays until its expiry date — some weeks have one, others none. There is no standing daily-code guarantee; the panel is always the current truth." },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("nykaa", { skip: 0, limit: 50 });
  const all = [...(destination?.coupons ?? []), ...(destination?.deals ?? [])];
  const seen = new Set<string>();
  const offers: CouponPublic[] = [];
  for (const c of all) {
    if (seen.has(c.id)) continue;
    seen.add(c.id);
    offers.push(c);
  }
  offers.sort((a, b) => (a.code ? 0 : 1) - (b.code ? 0 : 1));
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? undefined;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Nykaa.com", path: canonical },
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
      <RelatedGuides slug="nykaa" />
    </>
  );
}
