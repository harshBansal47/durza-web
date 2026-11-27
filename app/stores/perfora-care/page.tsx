import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { storeLogoUrl } from "@/lib/storeLogos";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Perfora Smart Oral Care — Toothbrushes, Whitening Serums & Water Flossers";
const description =
  "Perfora Care: smart electric toothbrushes, teeth whitening serums and water flossers. Oral-care matcher; shop direct from Perfora India.";
const canonical = "/stores/perfora-care";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("perfora-care", baseMetadata);
}

const FAQS = [
  { question: "How is a smart electric toothbrush different from a manual?", answer: "Smart brushes deliver 40,000+ strokes per minute with AI bristle tracking, app coaching on brushing zones, built-in timers and pressure sensors to protect gums. For plaque-light users, the gain is marginal; for anyone with gum sensitivity or inconsistent routine, it's transformative." },
  { question: "Is teeth whitening serum safe for frequent use?", answer: "Perfora whitening serum is formulated with 44% less hydrogen peroxide than US drugstore store-controlled versions, combining with potassium nitrate for minimal sensitivity. Still, limit use to the recommended weekly cadence — overuse can thin enamel." },
  { question: "Does the water flosser replace traditional floss?", answer: "Water flossers are excellent for gum pockets, braces and implants but not a complete replacement for string floss on tight interdental spaces. Used together they deliver the best 360°-clean for adults." },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("perforacare-com-ecommerce-cps-india", { skip: 0, limit: 10 });
  const offers: CouponPublic[] = destination?.deals ?? [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const storeUrl = destination?.store.website_url ?? "https://perforacare.com/";
  const heroImageUrl = storeLogoUrl({ slug: "perfora-care", logo_url: storeLogoUrl(destination?.store), website_url: storeUrl }) ?? null;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Perfora Care", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} faqs={FAQS} stats={stats} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} />
      <RelatedGuides slug="perforacare-com-ecommerce-cps-india" />
    </>
  );
}
