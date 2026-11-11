import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";

const title = "Iba Cosmetics Coupons, Halal Makeup & Wudhu Nail Deals";
const description = "Verified Iba Cosmetics codes, IBA15 extra 15% off and best deals on Halal lipsticks, Wudhu-friendly nail polish and vegan skincare.";
const canonical = "/stores/iba-cosmetics";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What does Halal Certified mean in Iba Cosmetics?", answer: "Halal certification ensures all ingredients are free from animal fat, alcohol, and prohibited byproducts like carmine, with strict hygiene standards." },
  { question: "How do I activate the Buy 2 Get 1 Free deal on Breathable Nail Colors?", answer: "Add any 3 shades of Iba Breathable Nail Enamel to your basket and apply code B2G1 at checkout; the third bottle is deducted automatically." },
  { question: "What is the minimum order threshold for free delivery?", answer: "Free doorstep delivery across all PIN codes in India for orders totaling ₹499 or more." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Iba Cosmetics", path: "/stores/iba-cosmetics" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient />
      <RelatedGuides slug="iba-cosmetics" />
    </>
  );
}
