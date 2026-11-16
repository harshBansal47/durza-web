import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Myntra Coupons & Offers – BFF500 New User Deals";
const description = "Live Myntra coupons and sale offers on fashion, footwear and beauty. Save on your first order with BFF500.";
const canonical = "/stores/myntra";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What is BFF500?", answer: "Myntra's headline code for new customers — up to ₹500 off your first full-price order (not valid on all catalogues, commonly on fashion above a minimum cart). Enter it at checkout on your first purchase." },
  { question: "Does Myntra offer free delivery?", answer: "Yes — free delivery on most pin-codes for orders above the app's threshold (it varies). Frequent free-shipping days around festivals too." },
  { question: "What's Myntra's return/exchange policy?", answer: "Generous compared with most — most fashion carries an extended return/exchange window. Eligibility and window length are listed on the PDP — final say stays with the product page." },
  { question: "Myntra bank offers — do they stack?", answer: "Bank 10%-style offers usually replace coupon codes rather than stack with them. Either code or bank deal — the cart shows the best applicable saving." },
  { question: "Are cosmetics on Myntra authentic?", answer: "Beauty sold by Myntra (Nykaa-owned) is sourced directly from brands. ‘Sold by’ shows Myntra Fashion as seller for beauty — a consistent authenticity marker." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("myntra", { skip: 0, limit: 50 });
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
          { name: "Myntra.com", path: canonical },
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
      <RelatedGuides slug="myntra" />
    </>
  );
}
