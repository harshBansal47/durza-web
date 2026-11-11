import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";

const title = "Havells Coupons, Home Appliances & Electricals Deals";
const description = "Verified Havells promo codes, HAVELLS500 flat ₹500 off above ₹4,999 and best deals on fans, appliances and electricals.";
const canonical = "/stores/havells";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How does warranty registration work on the Havells official store?", answer: "Every Havells product includes a 100% genuine manufacturer warranty; you can register it on their website using your invoice and serial number." },
  { question: "Is doorstep installation available?", answer: "Yes, eligible products include doorstep installation as per Havells service terms." },
  { question: "How to apply HAVELLS500?", answer: "Add products worth ₹4,999 or more and enter HAVELLS500 at checkout to get flat ₹500 off." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Havells", path: "/stores/havells" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient />
      <RelatedGuides slug="havells" />
    </>
  );
}
