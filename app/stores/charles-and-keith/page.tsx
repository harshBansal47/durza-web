import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import CharlesKeithLuxuryStore from "./CharlesKeithLuxuryPage";

const title = "Charles & Keith India — The Architectural Edit | Official Boutique Access";
const description =
  "A private editorial edit of Charles & Keith India — sculpted bags, architectural heels, loafers, work totes and gilded finishing pieces. Direct access to the official charleskeith.in boutique.";
const canonical = "/stores/charles-and-keith";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "Why acquire directly from the official Charles & Keith India store?",
    answer:
      "Shopping directly via the official boutique guarantees access to limited-edition runway capsules, full EU sizing (35–41), and signature branded presentation boxes with protective dust bags—items rarely stocked on third-party marketplaces.",
  },
  {
    question: "How often do new seasonal capsules arrive in India?",
    answer:
      "New architectural bags, metallic evening edits, and resort footwear drop monthly alongside global Singapore and European releases on charleskeith.in.",
  },
  {
    question: "How are packaging, authenticity, and size exchanges handled?",
    answer:
      "All orders are fulfilled directly by Charles & Keith's authorized India flagship operations with boutique-grade packaging and streamlined size exchanges within the store's return window.",
  },
];

export const revalidate = 3600;

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Charles & Keith", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <CharlesKeithLuxuryStore />
    </>
  );
}
