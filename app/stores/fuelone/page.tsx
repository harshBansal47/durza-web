import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Fuel One Coupons, Whey Protein & Creatine Deals";
const description = "Verified Fuel One deals on whey isolate, creatine and pre-workout with live prices vs MRP and free delivery across India.";
const canonical = "/stores/fuelone";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How are Fuel One prices on Durza verified?", answer: "Prices and MRP reflect the official fuelone.in listing at the time of page update — supplement and creatine prices shift with promotions." },
  { question: "Are Fuel One supplements FSSAI certified?", answer: "Yes. Fuel One sells FSSAI-licensed sports nutrition directly from its official warehouse with batch and best-before details on every pack." },
  { question: "Does Fuel One offer free delivery?", answer: "Free delivery is available on eligible orders on the official site; the cart page at checkout shows the current threshold." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("fuelone", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Fuel One", path: "/stores/fuelone" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} />
      <RelatedGuides slug="fuelone" />
    </>
  );
}
