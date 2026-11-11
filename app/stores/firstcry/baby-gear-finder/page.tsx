import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";

const title = "Baby Gear Fit & Safety Matrix";
const description = "Compare stroller and car seat weights, fold mechanisms and safety ratings to pick the right baby gear on FirstCry.";
const canonical = "/stores/firstcry/baby-gear-finder";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What matters most in a stroller for Indian roads?", answer: "Ground clearance over 4 inches, lockable 360° swivel wheels, a one-hand fold and weight under 7kg, plus a 5-point harness." },
  { question: "Is the Chicco KeyFit 30 compatible with Indian car seat belts?", answer: "Yes — it installs with standard 3-point seat belts found in most Indian cars; verify belt-path routing in your car handbook first." },
  { question: "Should I buy a car seat or stroller first?", answer: "Buy the car seat before the first trip home from the hospital; a stroller can wait until the baby outgrows the carrier around 6 months." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "FirstCry", path: "/stores/firstcry" },
    { name: "Baby Gear Fit & Safety Matrix", path: "/stores/firstcry/baby-gear-finder" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient />
      <RelatedGuides slug="firstcry/baby-gear-finder" />
    </>
  );
}
