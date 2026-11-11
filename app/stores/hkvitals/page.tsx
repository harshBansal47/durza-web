import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "HK Vitals Coupons, Fish Oil & Vitamin Deals";
const description = "Verified HK Vitals promo codes, HKV10 offers and best deals on omega-3 fish oil, multivitamins and calcium. Free delivery ₹499+.";
const canonical = "/stores/hkvitals";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Can I stack HKV10 with UPI discount?", answer: "Yes, apply HKV10 first, then an extra 5% instant discount applies on UPI/card checkout." },
  { question: "Is HK Vitals fish oil heavy-metal safe?", answer: "Yes, it is molecularly distilled and heavy metal tested." },
  { question: "What is the free shipping threshold?", answer: "Free delivery on orders above ₹499." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("hkvitals", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "HK Vitals", path: "/stores/hkvitals" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} />
      <RelatedGuides slug="hkvitals" />
    </>
  );
}
