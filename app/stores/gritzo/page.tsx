import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";

const title = "Gritzo Coupons, SuperMilk & Kids Nutrition Deals";
const description = "Verified Gritzo promo codes, SUPER10 extra 10% off and best deals on SuperMilk protein drinks and growth nutrition for kids.";
const canonical = "/stores/gritzo";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How is Gritzo SuperMilk different from traditional malt drinks?", answer: "Traditional malt drinks contain up to 50%–70% refined sugar and minimal protein. Gritzo SuperMilk contains zero refined sugar, zero preservatives, and provides 6g to 13g of clean, natural milk/whey protein per serving calibrated for specific age groups." },
  { question: "How do I get free shipping on Gritzo orders?", answer: "Gritzo provides free doorstep shipping on all orders totaling ₹499 or more across India. A single 400g tub or 1kg jar easily meets this threshold." },
  { question: "Can coupon code SUPER10 be applied to 1kg and 2kg value packs?", answer: "Yes. Code SUPER10 provides an additional 10% discount on top of already-discounted 1kg and 2kg bulk economy jars." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Gritzo", path: "/stores/gritzo" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient />
    </>
  );
}
