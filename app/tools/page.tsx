import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ToolsPageClient from "@/components/tools/ToolsPageClient";
import { STORE_TOOLS } from "@/lib/store-tools";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const title = "Shopping Tools — Calculators & Finders for Indian Shoppers";
const description = `${STORE_TOOLS.length} free tools: fan wattage, protein cost per gram, cup size, GST net cost, diaper cost per pant and more — each tied to the store page it came from.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/tools") },
  openGraph: { title, description, url: absoluteUrl("/tools"), type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }])} />
      <ToolsPageClient />
    </div>
  );
}
