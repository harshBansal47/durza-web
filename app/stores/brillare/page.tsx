import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Brillare Coupons, Oil Shots & Hair Care Deals";
const description = "Verified Brillare promo codes, FLAT20 offers and best deals on oil shots and hair care with free delivery on orders above ₹499.";
const canonical = "/stores/brillare";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How do I apply the Brillare FLAT20 promo code?", answer: "Add any 2 items to your basket on the official Brillare site and apply FLAT20 during checkout. If paying online, an extra 5% discount stacks automatically." },
  { question: "How long does one box of Brillare Oil Shots last?", answer: "Each box contains 8 single-dose vials of 6ml each, designed for a 24-day intensive regimen applying every 3 days." },
  { question: "What is the minimum order for free shipping on Brillare?", answer: "Standard doorstep delivery is free on all orders of ₹499 or more." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("brillare", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? undefined;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Brillare", path: "/stores/brillare" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} />
      <RelatedGuides slug="brillare" />
    </>
  );
}
