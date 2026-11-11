import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import StoreClient from "./client";

const title = "Baby Gear Fit & Safety Matrix";
const description = "Compare stroller and car seat weights, fold mechanisms and safety ratings to pick the right baby gear on FirstCry.";
const canonical = "/stores/firstcry/baby-gear-finder";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "FirstCry", path: "/stores/firstcry" },
    { name: "Baby Gear Fit & Safety Matrix", path: "/stores/firstcry/baby-gear-finder" },
        ]}
      />
      <StoreClient />
    </>
  );
}
