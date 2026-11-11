import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import MoglixClient from "./client";

const title = "Moglix Coupons, Power Tools & Pressure Washer Deals";
const description = "Verified Moglix promo codes, ₹250 off code TOOLS250, and best deals on Bosch drill kits, high-pressure car washers, safety shoes and GST-invoice supplies.";
const canonical = "/stores/moglix";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How do I download a GST tax invoice on Moglix?", answer: "Enter your GSTIN at checkout or save it in your Moglix business profile — every order then ships with a compliant GST tax invoice, downloadable from My Orders." },
  { question: "What warranty covers Bosch and Stanley power tools?", answer: "Genuine Bosch and Stanley tools carry the manufacturer warranty (typically 1 year), serviceable at authorised centres. Keep your Moglix invoice as proof of purchase." },
  { question: "How does bulk quote pricing work?", answer: "Add items to your cart, choose the bulk/quote option, and the Moglix B2B team sends volume-based pricing with delivery timelines — ideal for workshops, contractors and facility managers." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Moglix", path: "/stores/moglix" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <MoglixClient />
    </>
  );
}
