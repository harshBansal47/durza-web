import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";

const title = "FirstCry Coupons, Baby Products & Diaper Deals";
const description = "Verified FirstCry coupons and live deals on baby gear, diapers, clothing and feeding — plus Club break-even and diaper cost tools.";
const canonical = "/stores/firstcry";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Are FirstCry coupons on Durza verified?", answer: "Deals listed here are refreshed from firstcry.com campaign pages; codes apply at checkout on the official site." },
  { question: "How does the FirstCry Club calculator estimate savings?", answer: "It models member pricing plus coupon stacking against the ₹499 or ₹999 fee using your monthly spend — actual savings vary by category." },
  { question: "What is the return policy on baby gear?", answer: "Most baby gear is returnable within 7 days of delivery in original condition; check the individual product page for eligibility." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "FirstCry", path: "/stores/firstcry" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient />
      <RelatedGuides slug="firstcry" />
    </>
  );
}
