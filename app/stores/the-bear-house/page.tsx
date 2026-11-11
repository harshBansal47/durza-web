import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import TheBearHouseClient from "./client";

const title = "The Bear House Coupons, Linen Shirts & Chinos Deals";
const description = "Verified The Bear House promo codes, ₹500 off code BUNDLE500, and best deals on 100% pure linen shirts, textured oxfords and chinos.";
const canonical = "/stores/the-bear-house";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How do I choose between regular fit and slim fit?", answer: "Slim fit tapers at the chest and waist for a sculpted, modern silhouette. Regular fit keeps a straighter cut with more room through the torso — pick slim for office smart-casual and regular for all-day comfort." },
  { question: "How should I wash linen shirts to prevent shrinkage?", answer: "Gentle machine wash cold (or hand wash) with mild detergent, iron on medium while slightly damp, and avoid tumble drying on high heat. Natural linen relaxes and softens with each wash." },
  { question: "How does the 7-day exchange process work?", answer: "Initiate a size exchange within 7 days of delivery from your account or support. The reverse pickup is free, and the replacement ships after the courier collects the original pair." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "The Bear House", path: "/stores/the-bear-house" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <TheBearHouseClient />
    </>
  );
}
