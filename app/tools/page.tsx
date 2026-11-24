import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ToolsPageClient from "@/components/tools/ToolsPageClient";
import { STORE_TOOLS } from "@/lib/store-tools";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const title = "Shopping Calculators — Cost Per Gram, Savings & Break-even";
const description = `${STORE_TOOLS.length} free calculators: BLDC fan power and protein cost per gram, each tied to a buying guide and a tracked store link. Research-based, not hands-on tested.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/tools") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/tools"),
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function ToolsPage() {
  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
        ])}
      />
      <ToolsPageClient />
    </div>
  );
}
