import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";

const title = "Hira Fragrance Coupons, Extrait de Parfum & Attar Deals";
const description = "Verified Hira Fragrance promo codes and best deals on Extrait de Parfum, Oud and alcohol-free attars. Free shipping ₹599+.";
const canonical = "/stores/hirafragrance";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What is the difference between Eau de Parfum and Extrait de Parfum?", answer: "Extrait de Parfum has a much higher fragrance oil concentration, giving stronger projection and longer longevity (8–12 hours) than standard Eau de Parfum." },
  { question: "How long do non-alcoholic Attars last?", answer: "Pure Attars are highly concentrated and can last 8–12 hours on skin and even longer on fabric." },
  { question: "What are the shipping details?", answer: "Free insured shipping across India on prepaid orders above ₹599." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Hira Fragrance", path: "/stores/hirafragrance" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient />
      <RelatedGuides slug="hirafragrance" />
    </>
  );
}
