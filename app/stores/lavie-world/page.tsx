import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import LavieWorldClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Lavie World Coupons, Handbags, Totes & Sling Deals";
const description = "Explore Lavie World handbags, totes, slings, and clutches with current offers, buying guidance, and direct links to the official store.";
const canonical = "/stores/lavie-world";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("lavie-world", baseMetadata);
}

const FAQS = [
  { question: "What does the manufacturer warranty cover?", answer: "Warranty coverage depends on the product and Lavie's current policy. Check the product page and invoice details for coverage on defects, repairs, and claim steps." },
  { question: "How do I clean a faux leather handbag?", answer: "Wipe with a soft, dry or slightly damp microfibre cloth. Avoid harsh detergents and prolonged direct sunlight; use a mild soap solution for stubborn spots and air-dry naturally." },
  { question: "Can I use a promo code with payment offers?", answer: "If a promo code is eligible, apply it in the cart first and then review any payment offers shown at checkout. Final eligibility and savings depend on Lavie's checkout terms." },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("lavie-world", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
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
          { name: "Lavie World", path: "/stores/lavie-world" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <LavieWorldClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="lavie-world" />
    </>
  );
}
