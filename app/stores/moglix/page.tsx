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

const title = "Moglix Official Store \u2014 Tools, Electricals & Industrial Supplies | Durza";
const description = "Shop Moglix for power tools, safety gear, electricals and industrial supplies. Compare specs and check live prices, GST invoicing and bulk options on the official store.";
const canonical = "/stores/moglix";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("moglix", baseMetadata);
}

const FAQS = [
  { question: "Can I get a GST invoice on Moglix?", answer: "GST-compliant invoices are available for eligible orders when you provide valid GST details at checkout. Confirm invoice/GST applicability for your specific purchase on the order and product pages." },
  { question: "Does Moglix support bulk or business purchases?", answer: "Many products offer quantity-based pricing and bulk quote/RFQ options. Availability and terms depend on the product and order size \u2014 check the listing and bulk options on Moglix." },
  { question: "How do I choose the right power tool or electrical component?", answer: "Match specifications (power, size, ratings, certifications and compatibility) to your task. Review the detailed specs, warranty and return eligibility on the official product page before ordering." },
  { question: "What about delivery and returns on Moglix?", answer: "Delivery timelines depend on PIN-code serviceability and the seller/product. Return eligibility varies by category (some industrial/consumable items may be non-returnable) \u2014 check the product page and Moglix policies." },
  { question: "Where can I see live prices and availability?", answer: "Live prices, stock, GST details and checkout options are shown on moglix.com. Use this page to find the right category and confirm current details on the official store." }
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("moglix", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = admitadLogoForSlug("moglix") ?? storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://www.moglix.com";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Moglix", path: canonical },
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
      <RelatedGuides slug="moglix" />
    </>
  );
}
