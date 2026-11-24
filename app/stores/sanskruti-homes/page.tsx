import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { storeLogoUrl } from "@/lib/storeLogos";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Sanskruti Homes — Handcrafted Cotton Bedsheets & Home Linen (India)";
const description =
  "Sanskruti Homes: handcrafted cotton bedsheets, dohars and home linen. Use-case matcher, honest care notes; shop official store directly.";
const canonical = "/stores/sanskruti-homes";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("sanskruti-homes", baseMetadata);
}

const FAQS = [
  { question: "What makes Sanskruti Homes' fabric different?", answer: "Handspun, handwoven and block-printed by artisans in Rajasthan. Fabrics are 100% natural cotton and linen — free from synthetic blends, and engineered for India's sub-tropical climate." },
  { question: "How do I care for handcrafted cotton bedsheets?", answer: "Wash cold on a gentle cycle, avoid bleach, line-dry in shade. First-time shrinkage is typically 3–5% — order a size up if your bed is at the upper measurement limit." },
  { question: "Does Durza earn anything from Sanskruti Homes?", answer: "Yes — Durza is an affiliate partner (~5–10% CPA on qualifying orders). You pay nothing extra, and the price on the Sanskruti Homes checkout is unchanged." },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("sanskrutihomes-in-ecommerce-cps-india", { skip: 0, limit: 10 });
  const offers: CouponPublic[] = destination?.deals ?? [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const storeUrl = destination?.store.website_url ?? "https://www.sanskrutihomes.in/";
  const heroImageUrl = storeLogoUrl({ slug: "sanskruti-homes", logo_url: destination?.store.hero_image_url ?? null, website_url: storeUrl }) ?? null;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Sanskruti Homes", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} faqs={FAQS} stats={stats} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} />
      <RelatedGuides slug="sanskrutihomes-in-ecommerce-cps-india" />
    </>
  );
}
