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

const title = "Nilkamal Furniture Official Store \u2014 Beds, Chairs & Storage | Durza";
const description = "Explore Nilkamal furniture by room \u2014 chairs, desks, beds, sofas and storage. Check live prices, delivery and installation availability on the official store.";
const canonical = "/stores/nilkamalfurniture";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("nilkamalfurniture", baseMetadata);
}

const FAQS = [
  { question: "Does Nilkamal offer delivery and assembly?", answer: "Delivery and assembly/installation support are offered on eligible furniture items and depend on PIN-code serviceability. Check the product page for delivery timelines, assembly availability and conditions before ordering." },
  { question: "What warranty comes with Nilkamal furniture?", answer: "Nilkamal products carry manufacturer warranty against manufacturing defects as per category/product terms. Review the warranty period and coverage on the specific listing." },
  { question: "How do I make sure the furniture fits my home?", answer: "Measure your room, doorways and elevator access and compare them with the dimensions on the Nilkamal product page. For beds and wardrobes, confirm mattress size and clearance requirements." },
  { question: "Can I pay using EMI?", answer: "EMI and other payment options may be available on eligible orders depending on cart value and payment method. Check live options at checkout on the official store." },
  { question: "Where can I check current prices and availability?", answer: "Live prices, configurations and PIN-code serviceability are shown on nilkamalfurniture.com. Browse the relevant range via this page and confirm details before purchase." }
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("nilkamalfurniture", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = admitadLogoForSlug("nilkamalfurniture") ?? storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://www.nilkamalfurniture.com";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Nilkamal Furniture", path: canonical },
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
      <RelatedGuides slug="nilkamalfurniture" />
    </>
  );
}
