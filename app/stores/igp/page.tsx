import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";

const title = "IGP Coupons, Cake & Personalized Gift Delivery Deals";
const description = "Verified IGP.com coupon codes, IGP10 10% off and best deals on same-day cakes, personalized photo gifts and floral bouquets.";
const canonical = "/stores/igp";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How does Midnight Delivery work on IGP.com?", answer: "Select the Midnight Delivery slot during checkout; the surprise arrives between 11:00 PM and 11:59 PM across 400+ cities." },
  { question: "Can coupon code IGP10 be applied to personalized gifts?", answer: "Yes, IGP10 provides an additional 10% discount on custom photo frames, LED lamps, and hampers with no minimum." },
  { question: "What happens if the recipient is not available?", answer: "For perishables, delivery agents coordinate via phone; standard products ship with courier partners and SMS tracking." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "IGP.com", path: "/stores/igp" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient />
      <RelatedGuides slug="igp" />
    </>
  );
}
