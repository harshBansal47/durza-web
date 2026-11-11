import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import StoreClient from "./client";

const title = "FirstCry Coupons, Baby Products & Diaper Deals";
const description = "Verified FirstCry coupons and live deals on baby gear, diapers, clothing and feeding — plus Club break-even and diaper cost tools.";
const canonical = "/stores/firstcry";

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
        ]}
      />
      <StoreClient />
    </>
  );
}
