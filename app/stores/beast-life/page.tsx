import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";

const title = "Beast Life Coupons, Whey Protein & Creatine Deals";
const description = "Verified Beast Life promo codes, BEAST10 offers and best deals on whey protein, creatine and pre-workout from beastlife.in. Free delivery ₹999+.";
const canonical = "/stores/beast-life";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How do I verify the authenticity of my Beast Life supplement?", answer: "Every Beast Life product comes with a scratch-off authentication QR code on the packaging seal. Scan the code to verify batch authenticity, lab testing reports, and manufacturing dates directly on beastlife.in." },
  { question: "Can coupon code BEAST10 be combined with prepaid UPI discounts?", answer: "Yes. First enter coupon code BEAST10 on beastlife.in during checkout. When you select UPI or debit/credit card payment, an additional 5% instant discount is calculated on the remaining balance." },
  { question: "What is the minimum spend for free shipping on Beast Life?", answer: "Beast Life offers free doorstep shipping on all orders totaling ₹999 or more across India. A single tub of Whey Protein or a Pre-Workout + Creatine combo automatically crosses this threshold." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Beast Life", path: "/stores/beast-life" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient />
      <RelatedGuides slug="beast-life" />
    </>
  );
}
