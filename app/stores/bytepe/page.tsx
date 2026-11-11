import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";

const title = "BytePe Coupons, Bill Payment Cashback Deals";
const description = "Verified BytePe cashback codes, FIRSTBILL offers and best deals on BBPS bill payments, recharges and instant digital gift vouchers.";
const canonical = "/stores/bytepe";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Does BytePe charge convenience fees on mobile and electricity bill payments?", answer: "Unlike many major wallet and UPI apps that levy a ₹2 to ₹5 platform or convenience fee, BytePe processes standard BBPS utility bill payments and mobile recharges with zero platform fee." },
  { question: "How does the FIRSTBILL cashback code work?", answer: "Create your BytePe account, choose your state electricity or piped gas provider under the BBPS section, enter a bill amount of ₹500 or more, and apply code FIRSTBILL. Your cashback is credited to your BytePe wallet immediately upon bank settlement." },
  { question: "How fast do brand digital gift vouchers get delivered?", answer: "Gift vouchers purchased on BytePe are delivered instantly via SMS and email within seconds of transaction confirmation, ready to redeem on Amazon, Flipkart, or food delivery apps." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "BytePe", path: "/stores/bytepe" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient />
    </>
  );
}
