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

const title = "The Man Company Official Store \u2014 Grooming, Fragrance & Gifts | Durza";
const description = "Explore The Man Company grooming, fragrances and gift sets by routine. Check live ranges and availability on the official store.";
const canonical = "/stores/the-man-company";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("the-man-company", baseMetadata);
}

const FAQS = [
  { question: "Why buy The Man Company products from the official store?", answer: "The official store offers the full current range, combos and curated gift sets with product details provided by the brand. Check live availability and checkout terms on themancompany.com." },
  { question: "How do I choose a fragrance or grooming routine?", answer: "Pick products based on your scent preference, skin type and routine needs. Consider discovery sets for fragrances and patch-test new skincare/beard products if you have sensitive skin." },
  { question: "Are gift sets available?", answer: "Yes, curated gift sets and combos are offered on the official store, with contents varying by set. Check the listing for included items, packaging and availability." },
  { question: "What about returns and delivery?", answer: "Delivery timelines and return/replacement eligibility depend on The Man Company\u2019s current policies and product condition. Review policy details on the official store before ordering." },
  { question: "Where can I check current prices and availability?", answer: "Live prices, variants and availability are shown on themancompany.com. Use this page to find the right category and confirm current details." }
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("the-man-company", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = admitadLogoForSlug("the-man-company") ?? storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://www.themancompany.com";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "The Man Company", path: canonical },
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
      <RelatedGuides slug="the-man-company" />
    </>
  );
}
