import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Boldfit Coupons, Gym Equipment & Supplement Deals";
const description = "Verified Boldfit promo codes and best deals on home gym equipment, resistance bands and protein supplements. Free delivery above ₹800.";
const canonical = "/stores/boldfit";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How do I unlock free gym socks with my Boldfit order?", answer: "Add products totaling ₹1,899 or more to your cart and apply coupon SAVE100. Boldfit automatically adds a complimentary pair of performance socks to eligible shipments." },
  { question: "Does the Boldfit Doorway Pull-Up bar require drilling?", answer: "No, the TitanGrip Pull-Up Bar uses adjustable tension leverage with silicone buffer pads, securing between standard doorway frames without screws or wall drilling." },
  { question: "What is the minimum order threshold for free shipping on Boldfit?", answer: "Doorstep delivery is completely free on all orders of ₹800 or more across India." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("boldfit", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Boldfit", path: "/stores/boldfit" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} />
      <RelatedGuides slug="boldfit" />
    </>
  );
}
