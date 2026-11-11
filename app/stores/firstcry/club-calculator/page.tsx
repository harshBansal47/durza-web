import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";

const title = "FirstCry Club Break-Even Calculator";
const description = "Check if a FirstCry Club membership pays for itself — compare monthly spend vs the ₹499 or ₹999 fee and see your net annual savings.";
const canonical = "/stores/firstcry/club-calculator";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What does the FirstCry Club break-even assume?", answer: "It compares your monthly spend against the membership fee using a 7% member discount plus ₹100 per month in perks — actual savings vary by category." },
  { question: "Is the 12-month FirstCry Club worth it?", answer: "If your monthly FirstCry spend stays above roughly ₹2,500, the 12-month plan pays for itself quickly; the tool above shows your exact break-even." },
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
