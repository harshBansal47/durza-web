import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import StoreClient from "./client";

const title = "FirstCry Club Break-Even Calculator";
const description = "Check if a FirstCry Club membership pays for itself — compare monthly spend vs the ₹499 or ₹999 fee and see your net annual savings.";
const canonical = "/stores/firstcry/club-calculator";

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
    { name: "Club Break-Even Calculator", path: "/stores/firstcry/club-calculator" },
        ]}
      />
      <StoreClient />
    </>
  );
}
