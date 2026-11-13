import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Nykaa Coupons & Offers – Beauty Sale Bank Deals";
const description = "Live Nykaa offers and bank-card discounts on beauty, skincare and Nykaa Fashion — refreshed from official campaign pages.";
const canonical = "/stores/nykaa";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Are Nykaa products authentic?", answer: "Nykaa sells through its own fulfilment — the brand-direct products you see on nykaa.com carry Nykaa's satisfaction guarantee. Marketplace listings (3rd-party sellers) exist on Nykaa Fashion — check the ‘Sold by’ line on the PDP before you order." },
  { question: "What is Nykaa Prive?", answer: "Nykaa's loyalty tier — earn Nykaa Prive points per spend; the tiers unlock better redemptions and birthday-month benefits. Joining is free." },
  { question: "Does Nykaa offer COD?", answer: "COD is available on most pin-codes and most carts — modest handling fees may apply. Prepaid/UPI usually gets a small instant saving instead." },
  { question: "Do Nykaa coupon codes exist?", answer: "Nykaa runs more auto-applied bank and sale deals than blanket public codes — most savings land through bank partners and Prive coins; any public code we can source is listed above." },
  { question: "Can I return beauty products?", answer: "Yes — unopened/sealed beauty products have a standard return window; skincare and makeup restrictions vary by brand. The PDP and shipping promise at checkout govern eligibility." },
  { question: "How do the bank offers work?", answer: "Nykaa runs instant-discount deals with bank partners (often 10% cards). The ‘offers’ tab at PDP/cart shows what applies to you; the discount lands after you choose the partner card at checkout." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("nykaa", { skip: 0, limit: 50 });
  const offers: CouponPublic[] = destination ? destination.coupons : [];
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
