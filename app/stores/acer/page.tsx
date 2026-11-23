import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import { resilient } from "@/lib/api";
import StoreClient from "./client";

const title = "Unlock Elite Performance: Acer Deals & Exclusive Coupon Codes";
const description =
  "Explore Acer Predator, Nitro and Swift Go laptops, current codes and tracked store links on Durza.";
const canonical = "/stores/acer";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("acer", baseMetadata);
}

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("acer", { skip: 0, limit: 1 });
  const forcedStoreHref = destination?.admitad_store_cps_url ?? null;

  return <StoreClient forcedStoreHref={forcedStoreHref} />;
}
