import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import ZeroHarmClient from "./client";

const title = "ZeroHarm Coupons, Plant Vitamin B12 & Narie PCOS Deals";
const description = "Verified ZeroHarm promo codes, ZERO15 15% off and best deals on nano-formulated Plant Vitamin B12, Vegan D3+K2, Liver Detox and Narie PCOS care.";
const canonical = "/stores/zeroharm";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How does ZeroHarm extract Vitamin B12 purely from plants?", answer: "ZeroHarm derives methylcobalamin from Spirulina and Chlorella through gentle water extraction, then nano-encapsulates it for direct intestinal absorption — no animal derivatives, no synthetic B12." },
  { question: "Why do smaller nano dosages work faster than bulky 1000mg pills?", answer: "Bioavailability, not milligram weight, drives results. Nano lipid spheres carry plant actives past stomach acid into the small intestine, so your body absorbs far more per tablet than from an unabsorbed bulk dose." },
  { question: "Can I stack NANO25 with prepaid UPI discounts?", answer: "Yes. Apply NANO25 for flat 25% off 90-day combo courses, then pay via UPI or card for an extra 5% instant deduction on the discounted balance." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "ZeroHarm Sciences", path: "/stores/zeroharm" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <ZeroHarmClient />
    </>
  );
}
