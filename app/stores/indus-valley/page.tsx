import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";

const title = "Indus Valley Coupons, Hair Colour & Herbal Dye Deals";
const description = "Verified Indus Valley promo codes, FIRST10 offers and best deals on ammonia-free herbal hair colour with free delivery above ₹299.";
const canonical = "/stores/indus-valley";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How is Indus Valley Gel Hair Colour different from regular dyes?", answer: "It contains zero ammonia, hydrogen peroxide, and synthetic PPD, coloring hair through certified organic herbs and aloe vera base, eliminating chemical damage and burning." },
  { question: "How do I get free shipping on Indus Valley orders?", answer: "Orders with a cart total of ₹299 or higher qualify for free standard doorstep delivery across India automatically at checkout." },
  { question: "Can the FIRST10 coupon code be used on bundles and kits?", answer: "Yes, FIRST10 stacks on already-discounted combos and individual items for first-time shoppers." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Indus Valley", path: "/stores/indus-valley" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient />
    </>
  );
}
