import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import NourishMantraClient from "./client";

const title = "Nourish Mantra Coupons, Urban Rani & Clean Skincare Deals";
const description = "Verified Nourish Mantra promo codes, GLOW20 20% off, and best deals on 100% vegan Urban Rani Youth Serum, Cosmic Sutra Eye Gel, and Redensyl serums.";
const canonical = "/stores/nourish-mantra";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How does the Nourish Mantra Urban Rani Youth Serum work?", answer: "Urban Rani Youth Serum blends modern actives like Niacinamide with traditional botanical extracts like Fortunella fruit and Okra. It works as an intensive cellular hydrator and pollution shield, reducing fine lines and evening skin texture without clogging pores." },
  { question: "Can MANTRA15 or GLOW20 be combined with prepaid UPI discounts?", answer: "Yes. First enter coupon code MANTRA15 or GLOW20 on nourishmantra.in during checkout. When you proceed to the payment gateway and choose UPI or prepaid cards, an extra 5% instant discount is calculated on the remaining balance." },
  { question: "What is the minimum order threshold for free delivery on Nourish Mantra?", answer: "Nourish Mantra provides free doorstep delivery across India on all orders of ₹499 or more. A single under-eye gel or serum immediately unlocks free shipping." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Nourish Mantra", path: "/stores/nourish-mantra" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <NourishMantraClient />
    </>
  );
}
