import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import LavieWorldClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Lavie World Coupons, Handbags, Totes & Sling Deals";
const description = "Verified Lavie World promo codes, extra 10% off code LAVIE10, and up to 65% off on office totes, satchel bags, slings, and bridal clutches.";
const canonical = "/stores/lavie-world";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What does the 6-month manufacturer warranty cover?", answer: "Lavie covers manufacturing defects in zips, hardware and stitching for 6 months from delivery. Register your invoice on lavieworld.com to claim repairs or replacement." },
  { question: "How do I clean my faux leather handbag?", answer: "Wipe with a soft, dry or slightly damp microfibre cloth. Avoid harsh detergents and direct sunlight; use a mild soap solution for stubborn spots and air-dry naturally." },
  { question: "Can I stack LAVIE10 with the 5% UPI discount?", answer: "Yes. Apply LAVIE10 at checkout first, then pay via UPI or card for an extra 5% instant discount on the remaining balance." },
];

export const revalidate = 300;

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
