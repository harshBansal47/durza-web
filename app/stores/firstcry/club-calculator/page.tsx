import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";

const title = "FirstCry Club Break-Even Calculator";
const description = "Check if a FirstCry Club membership pays for itself — compare your monthly spend with the current membership plan cost and estimate potential savings.";
const canonical = "/stores/firstcry/club-calculator";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What does the FirstCry Club break-even assume?", answer: "It estimates savings using sample assumptions; actual benefits, discounts, and membership pricing may vary." },
  { question: "Is the 12-month FirstCry Club worth it?", answer: "If your regular FirstCry spend is high enough, a membership plan may be worthwhile. Use the tool above as an estimate and verify current plan details on FirstCry." },
  { question: "Can I cancel FirstCry Club auto-renewal?", answer: "Yes — turn off auto-renew anytime from your FirstCry account settings before the next billing date." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "FirstCry", path: "/stores/firstcry" },
    { name: "Club Break-Even Calculator", path: "/stores/firstcry/club-calculator" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient />
      <RelatedGuides slug="firstcry/club-calculator" />
    </>
  );
}
