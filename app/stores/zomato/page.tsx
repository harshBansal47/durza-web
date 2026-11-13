import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Zomato Coupons & Offers – Food & Dineout Deals";
const description = "Live Zomato offers on delivery, dineout and Hyperpure. See what's running now on your account.";
const canonical = "/stores/zomato";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What's Zomato Gold?", answer: "Zomato's membership for heavier users — delivery savings and dineout benefits at partner restaurants. Check the menu inside the Zomato app for the current fee and terms." },
  { question: "Does Zomato accept COD?", answer: "Yes — COD works on most restaurants. Not all outlets allow COD, and some add a handling charge at checkout." },
  { question: "How do Zomato Dineout deals work?", answer: "Dineout gives you table-time discounts at partner restaurants — flat percentages off the food bill for paying via Zomato. The list of eligible restaurants updates weekly." },
  { question: "Do Zomato offers stack with bank cards?", answer: "Restaurant and bank-card offers are usually mutually exclusive; the app applies the best single offer at checkout. UPI partners often have the best ongoing deals." },
  { question: "What is Hyperpure?", answer: "Zomato's B2B supply for restaurants — not a consumer-facing offer, but it explains why some restaurants have fresher stock than others." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("zomato", { skip: 0, limit: 50 });
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
          { name: "Zomato.com", path: canonical },
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
      <RelatedGuides slug="zomato" />
    </>
  );
}
