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

const title = "Shop Tupperware India — Airtight Storage & Kitchen Containers";
const description =
  "Shop Tupperware India — airtight dry storage, lunch boxes, modular kitchen containers. Use-case matcher; buy direct from the official Tupperware India storefront.";
const canonical = "/stores/shop-tupperware";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("shop-tupperware", baseMetadata);
}

const FAQS = [
  { question: "What is the advantage of Tupperware over generic plastic containers?", answer: "Tupperware uses food-safe, BPA-free polyethylene — machined seals that stay airtight for years. Generic containers leak and cloud; Tupperware holds up through thousands of wash cycles." },
  { question: "Does Tupperware India offer a lifetime warranty like the US one?", answer: "Yes — Tupperware India offers a lifetime warranty on most storage products, covering material and workmanship defects. Damage from misuse (microwave overheating, dishwasher heat) is not covered." },
  { question: "Are Tupperware India products modular for stacking?", answer: "Yes — Tupperware was designed to nest and stack. Their dry-storage range, lunch box range and modular kitchen range are all engineered to occupy minimum shelf volume." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("shoptupperware-in-ecommerce-cps-india", { skip: 0, limit: 10 });
  const offers: CouponPublic[] = destination?.deals ?? [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const storeUrl = destination?.store.website_url ?? "https://www.shoptupperware.in/";
  const heroImageUrl = storeLogoUrl({ slug: "shop-tupperware", logo_url: destination?.store.hero_image_url ?? null, website_url: storeUrl }) ?? null;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Shop Tupperware", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} faqs={FAQS} stats={stats} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} />
      <RelatedGuides slug="shoptupperware-in-ecommerce-cps-india" />
    </>
  );
}
