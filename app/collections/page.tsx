import type { Metadata } from "next";
import CollectionsHub from "@/components/collections/CollectionsHub";
import { mergedCollections } from "@/lib/collections";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Collections Built Around Real Goals | Curated Buying Kits | Durza",
  description:
    "Complete multi-brand kits researched for Indian homes, wardrobes, desks, and wellness—every item vetted for real utility and linked straight to official stores.",
  alternates: { canonical: "/collections" },
  openGraph: {
    title: "Collections Built Around Real Goals | Durza",
    description:
      "Complete multi-brand kits researched for Indian homes, wardrobes, desks, and wellness—every item vetted for real utility and linked straight to official stores.",
    url: absoluteUrl("/collections"),
    type: "website",
  },
};

export default async function CollectionsPage() {
  return <CollectionsHub items={await mergedCollections()} />;
}
