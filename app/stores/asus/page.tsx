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
import { ASUS_COMPARISONS, ASUS_FAQS } from "./content";

const title = "ASUS India Laptop Buying Guide — ROG, TUF, Zenbook & Vivobook";
const description =
  "Compare ASUS ROG, TUF Gaming, Zenbook and Vivobook laptop families by use case, specs and budget. Check ASUS India for current models, prices and stock.";
const canonical = "/stores/asus";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("asus", baseMetadata);
}

const productJsonLd = {
  "@context": "https://schema.org",
  "@graph": ASUS_COMPARISONS.map((product) => ({
    "@type": "Product",
    name: `ASUS ${product.name}`,
    description: `${product.bestFor}. ${product.keySpec}. Indicative range: ${product.budget}.`,
    category: "Laptop",
    brand: { "@type": "Brand", name: "ASUS" },
  })),
};

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("asus", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = admitadLogoForSlug("asus") ?? storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://asus.com/in/";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);
  const forcedStoreHref = destination?.admitad_store_cps_url ?? null;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "ASUS", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(ASUS_FAQS)} />
      <JsonLd data={productJsonLd} />
      <StoreClient
        faqs={ASUS_FAQS}
        stats={stats}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
        forcedStoreHref={forcedStoreHref}
      />
      <RelatedGuides slug="asus" />
    </>
  );
}
