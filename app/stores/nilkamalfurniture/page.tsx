import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import NilkamalFurnitureClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Nilkamal Furniture Coupons, Office Chair & Wardrobe Deals";
const description = "Verified Nilkamal Furniture promo codes, ₹1,000 off code BEDROOM1000, and best deals on ergonomic chairs, wardrobes and beds.";
const canonical = "/stores/nilkamalfurniture";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How does Nilkamal carpenter assembly work?", answer: "Eligible large furniture — wardrobes, beds and tables — is delivered and assembled by a Nilkamal-trained carpenter at no extra cost in covered cities. The slot is scheduled after delivery confirmation; keep the invoice handy for the team." },
  { question: "What are the return and warranty terms on plastic and wood furniture?", answer: "Structural frames carry 1–5 year manufacturer warranties against defects. Returns are accepted within the standard return window with the original invoice and packaging, subject to Nilkamal's terms." },
  { question: "Can NILKAMAL500 stack with the 5% UPI discount?", answer: "Yes. Apply NILKAMAL500 at checkout for flat ₹500 off above ₹4,999, then pay via UPI or card for an extra 5% instant deduction on the remaining balance. BEDROOM1000 works the same above ₹9,999." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("nilkamalfurniture", { skip: 0, limit: 50 });
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
          { name: "Nilkamal Furniture", path: "/stores/nilkamalfurniture" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <NilkamalFurnitureClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} />
      <RelatedGuides slug="nilkamalfurniture" />
    </>
  );
}
