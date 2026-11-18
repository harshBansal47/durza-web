import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import BldcCalculatorClient from "./client";

const title = "BLDC Fan Power Calculator — Wattage vs Savings";
const description = "Interactive BLDC fan power calculator: compare regular vs BLDC ceiling fan wattage, hours per day and tariff to estimate yearly and 10-year savings and payback.";
const canonical = "/stores/havells/bldc-calculator";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How is a BLDC fan different from a regular ceiling fan?", answer: "Regular fans use AC induction motors (60–110W). BLDC (Brushless DC) fans use electronic DC motors (18–42W) with precise speed control, converting much more electricity into airflow and far less into heat and noise." },
  { question: "How much money does a BLDC fan actually save?", answer: "Savings depend on usage hours, electricity tariff, and the efficiency difference between fans. Use the calculator as an estimate and verify current product specs and pricing on Havells." },
  { question: "Does a BLDC fan work without remote control or inverter?", answer: "Yes. BLDC fans work directly on mains power and pair well with inverters — a 28W fan draws about a third of a regular fan during a power cut, extending inverter runtime significantly." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Havells", path: "/stores/havells" },
          { name: "BLDC Power Calculator", path: "/stores/havells/bldc-calculator" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <BldcCalculatorClient />
    </>
  );
}
