import type { Metadata } from "next";
import { storeLogoUrl } from "@/lib/storeLogos";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Lenskart Coupons, Offers & Eyewear Guide";
const description = "Browse live Lenskart coupon codes and offers for frames, lenses, and sunglasses, plus practical tips on coatings, home eye tests, and checkout terms.";
const canonical = "/stores/lenskart";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("lenskart", baseMetadata);
}

const FAQS = [
  { question: "How do Lenskart coupon codes and offers work?", answer: "Check the offer details on the card and the final price on Lenskart at checkout. Some promotions apply only to selected frames, lenses, or categories, and terms can vary by product." },
  { question: "Does Lenskart offer home eye tests?", answer: "In many cities, Lenskart offers home eye tests or in-store eye exams. Availability, fees, and eligibility can vary by pin code, so confirm the option shown during booking or checkout." },
  { question: "Can I return or exchange Lenskart eyewear?", answer: "Lenskart provides return and exchange options on many eyewear orders, but the window and conditions depend on the product type and order details. Check the product page and your order terms before buying." },
  { question: "What does coupon code SINGLE cover?", answer: "Coupon eligibility can change over time. If a code like SINGLE is listed, use it only on eligible products shown in the offer details and confirm the discount in your cart before payment." },
  { question: "Which lens upgrades are worth considering?", answer: "Lens add-ons such as anti-reflective, blue-light, photochromic, or thinner lens options can improve comfort and usability, but suitability depends on your prescription and usage. Review the options on the product page." },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("lenskart", { skip: 0, limit: 50 });
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
  const heroImageUrl = storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? undefined;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Lenskart.com", path: canonical },
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
      <RelatedGuides slug="lenskart" />
    </>
  );
}