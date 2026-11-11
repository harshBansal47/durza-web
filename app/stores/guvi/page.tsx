import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";

const title = "GUVI Coupons, Coding Courses & Certification Deals";
const description = "Verified GUVI promo codes, GUVI10 instant 10% off and best deals on Python, Full Stack and Data Science courses.";
const canonical = "/stores/guvi";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Are GUVI certifications recognized by tech companies and recruiters?", answer: "Yes. GUVI is an IIT Madras incubated company under the HCL Group. Their course certificates are recognized by top tech companies, and their Zen Class bootcamp has over 600 hiring partners including PayPal, Juspay, and Freshworks." },
  { question: "Can I learn complex programming in Hindi or Tamil on GUVI?", answer: "Yes. GUVI's primary innovation is vernacular teaching. You can learn Python, Java, Data Science, and Full Stack development in your native mother tongue without language barrier obstacles, while all coding syntax remains standard English." },
  { question: "How do I apply the GUVI10 promo code?", answer: "Select your desired self-paced course or bundle on guvi.in, proceed to the checkout payment page, and enter coupon code GUVI10 to receive an instant 10% deduction." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "GUVI", path: "/stores/guvi" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient />
    </>
  );
}
