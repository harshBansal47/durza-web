import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import StoreClient from "./client";

const title = "Diaper Cost-Per-Pant Tracker";
const description = "Compare Pampers, MamyPoko and Huggies cost-per-pant across pack sizes to find the cheapest bulk diaper pack for your baby.";
const canonical = "/stores/firstcry/diaper-cost-tracker";

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
    { name: "Diaper Cost-Per-Pant Tracker", path: "/stores/firstcry/diaper-cost-tracker" },
        ]}
      />
      <StoreClient />
    </>
  );
}
