import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";

const title = "Diaper Cost-Per-Pant Tracker";
const description = "Compare Pampers, MamyPoko and Huggies cost-per-pant across pack sizes to find the cheapest bulk diaper pack for your baby.";
const canonical = "/stores/firstcry/diaper-cost-tracker";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How is cost-per-pant calculated?", answer: "Pack price divided by pant count — larger packs almost always win per pant despite the higher upfront cost." },
  { question: "Which diaper size fits my baby?", answer: "S suits under 7kg, M fits 6–11kg, L fits 9–14kg and XL fits 12–17kg; always confirm the weight table on the pack before bulk buying." },
  { question: "Why do XL packs show better value?", answer: "Fixed manufacturing cost spreads over more pants, and FirstCry bulk-pack discounts compound the saving." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "FirstCry", path: "/stores/firstcry" },
    { name: "Diaper Cost-Per-Pant Tracker", path: "/stores/firstcry/diaper-cost-tracker" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient />
      <RelatedGuides slug="firstcry/diaper-cost-tracker" />
    </>
  );
}
