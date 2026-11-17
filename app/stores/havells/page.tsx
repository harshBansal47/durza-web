import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { admitadLogoForSlug, storeLogoUrl } from "@/lib/storeLogos";

const title = "Havells Official Store \u2014 Fans, Geysers & Home Appliances | Durza";
const description = "Explore Havells fans, water heaters, kitchen appliances and more by use case. Check live models, prices and availability on the official Havells store.";
const canonical = "/stores/havells";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Why buy Havells appliances from the official store?", answer: "The official store lets you view current models, specifications and ratings, with manufacturer-backed warranty and access to authorized service/installation support on eligible products as specified on the listing. Always confirm live price, availability and terms at checkout." },
  { question: "Does Havells provide installation for products like geysers?", answer: "Installation or demo support may be available for eligible appliances depending on your PIN code and the product. Check installation availability and terms on the specific product page before ordering." },
  { question: "How do I choose the right fan or water heater?", answer: "Match fan sweep and motor type to your room and efficiency needs. For water heaters, choose capacity for your household and verify pressure/safety ratings for your building. Confirm exact specs on the official listing." },
  { question: "Are EMI or bank offers available on Havells?", answer: "EMI and bank/card payment options may be available on eligible orders, but they vary by product and payment method. Review live options and terms shown at checkout on the official store." },
  { question: "Where can I check current Havells prices and stock?", answer: "Live prices, configurations, stock and checkout offers are shown on havells.com. Use the links on this page to browse the relevant range and confirm details before you buy." }
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("havells", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = admitadLogoForSlug("havells") ?? storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://havells.com";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Havells", path: canonical },
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
      <RelatedGuides slug="havells" />
    </>
  );
}
