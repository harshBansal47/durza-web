import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Dot & Key Coupons, Skincare & Sunscreen Deals";
const description = "Verified Dot & Key promo codes, DOTB2G2 buy 2 get 2 free and best deals on sunscreens, serums and skincare from dotandkey.com.";
const canonical = "/stores/dot-and-key";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How does the Dot & Key Buy 2 Get 2 Free (B2G2) code work?", answer: "Add any 4 eligible skincare items to your cart on dotandkey.com and apply code DOTB2G2. The system automatically discounts the two lowest-priced items to ₹0." },
  { question: "Which Dot & Key sunscreen is best for oily and acne-prone skin?", answer: "The Watermelon Hyaluronic Cooling Sunscreen SPF 50+ is oil-free, lightweight, and leaves zero white cast, making it the preferred choice for humid climates and oily skin types." },
  { question: "What is the minimum order threshold for free shipping on Dot & Key?", answer: "Shipping is free on all orders of ₹499 or more. Adding an impulse essential like the Gloss Boss Lip Balm (₹225) is an easy way to reach the threshold." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("dot-and-key", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Dot & Key", path: "/stores/dot-and-key" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} />
      <RelatedGuides slug="dot-and-key" />
    </>
  );
}
