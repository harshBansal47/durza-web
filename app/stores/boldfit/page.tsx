import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { admitadLogoForSlug, storeLogoUrl } from "@/lib/storeLogos";

const title = "Boldfit Official Store \u2014 Home Gym, Yoga & Fitness Gear | Durza";
const description = "Explore Boldfit fitness gear by workout need \u2014 yoga mats, resistance bands, bottles and more. Check live options and availability on the official store.";
const canonical = "/stores/boldfit";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Why buy Boldfit gear from the official store?", answer: "The official store shows the current range of options, sizes/variants and product details, and lets you review Boldfit\u2019s policies directly before purchase." },
  { question: "How do I choose the right yoga mat or resistance band?", answer: "Pick mat thickness and material based on your workout and comfort needs, and choose resistance levels that match your current strength. Check specs, dimensions and care instructions on the product page." },
  { question: "Are combos or kits worth it?", answer: "Kits can be convenient if they include the items you need for your routine. Compare the contents and value against buying individual items on the official store." },
  { question: "What about returns and warranty?", answer: "Returns, replacements and any warranty/support depend on Boldfit\u2019s current policies and the product category. Review the policy and product details on boldfit.in before ordering." },
  { question: "Where can I check current prices and availability?", answer: "Live prices, variants and availability are shown on boldfit.in. Use this page to find the right category and confirm current details." }
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("boldfit", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = admitadLogoForSlug("boldfit") ?? storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://www.boldfit.in";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Boldfit", path: canonical },
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
      <RelatedGuides slug="boldfit" />
    </>
  );
}
