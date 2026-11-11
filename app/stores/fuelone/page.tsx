import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import StoreClient from "./client";

const title = "Fuel One Coupons, Whey Protein & Creatine Deals";
const description = "Verified Fuel One deals on whey isolate, creatine and pre-workout with live prices vs MRP and free delivery across India.";
const canonical = "/stores/fuelone";

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
    { name: "Fuel One", path: "/stores/fuelone" },
        ]}
      />
      <StoreClient />
    </>
  );
}
