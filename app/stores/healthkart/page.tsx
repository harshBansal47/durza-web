import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { admitadLogoForSlug, storeLogoUrl } from "@/lib/storeLogos";

const title = "HealthKart Official Store \u2014 Protein, Creatine & Supplements | Durza";
const description = "Explore HealthKart supplements by fitness goal \u2014 whey, creatine, vitamins and more. Check authenticity guidance and live prices on the official store.";
const canonical = "/stores/healthkart";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("healthkart", baseMetadata);
}

const FAQS = [
  { question: "How does HealthKart address product authenticity?", answer: "HealthKart provides authenticity guidance and verification steps for eligible products and emphasizes sourcing from brands/authorized channels. Follow the verification instructions provided with your product and on the HealthKart site." },
  { question: "How do I choose the right protein or supplement?", answer: "Match the product to your goal, diet and tolerance. Compare protein per serving, ingredients, allergens and certifications on the label, and consult a qualified professional if you have health conditions or specific needs." },
  { question: "Are combos or rewards available on HealthKart?", answer: "Combo packs and loyalty/reward benefits may be offered and can change over time. Check live combo pricing, reward terms and checkout offers on the official HealthKart store." },
  { question: "What is the return policy for supplements?", answer: "Returns/replacements depend on HealthKart\u2019s policy and product eligibility (often requiring items to be unopened/sealed and reported within the stated window). Review the current policy and product conditions before ordering." },
  { question: "Where can I check current prices and offers?", answer: "Live prices, combos and checkout offers are shown on healthkart.com. Use this page to find the right category and confirm current details on the official store." }
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("healthkart", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = admitadLogoForSlug("healthkart") ?? storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://www.healthkart.com";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "HealthKart", path: canonical },
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
      <RelatedGuides slug="healthkart" />
    </>
  );
}
