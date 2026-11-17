import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { admitadLogoForSlug, storeLogoUrl } from "@/lib/storeLogos";

const title = "BeastLife Official Store \u2014 Whey, Creatine & Performance | Durza";
const description = "Explore BeastLife sports nutrition by training goal \u2014 whey, creatine and stacks. Check product information and live availability on the official store.";
const canonical = "/stores/beast-life";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Why buy BeastLife from the official store?", answer: "Ordering direct gives you access to the current BeastLife range, flavors and pack options, along with product information provided by the brand. Check live availability and terms on beastlife.in." },
  { question: "How do I choose between whey, creatine and stacks?", answer: "Choose based on your training goal and diet. Protein supports daily intake/recovery, creatine is commonly used for strength routines, and stacks bundle items \u2014 always follow label directions and consult a professional if unsure." },
  { question: "Are there lab tests or quality details available?", answer: "BeastLife shares product and quality/testing information on its site for customers to review. Check the relevant product pages on the official store for the latest details." },
  { question: "Can I combine pre-workout with other supplements?", answer: "Be cautious about overlapping stimulants or ingredients. Read labels carefully, assess tolerance and consult a qualified professional, especially if you have health conditions or take medication." },
  { question: "Where can I check current prices and flavors?", answer: "Live prices, flavors, combos and availability are shown on beastlife.in. Browse the relevant category via this page to confirm current details." }
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("beast-life", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = admitadLogoForSlug("beast-life") ?? storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://beastlife.in";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "BeastLife", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient
        faqs={FAQS}
        stats={stats}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
      />
      <RelatedGuides slug="beast-life" />
    </>
  );
}
