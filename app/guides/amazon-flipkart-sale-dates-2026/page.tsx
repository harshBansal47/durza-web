import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import GuideDocumentPage from "@/components/guides/redesign/GuideDocumentPage";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { guideDocument } from "@/guide-documents/amazon-flipkart-sale-dates-2026";

export const revalidate = 21600;

const title = "Amazon & Flipkart Sale Dates India 2026 — Black Friday, Christmas & New Year";
const description =
  "When are Amazon and Flipkart sales in India 2026? The full calendar — Great Indian Festival, Big Billion Days, Black Friday (Nov 27), Cyber Monday (Nov 30), Christmas & New Year — plus how to stack sale prices with bank card discounts.";
const canonical = "/guides/amazon-flipkart-sale-dates-2026";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Amazon & Flipkart Sale Dates 2026", path: canonical },
];

const faqSchema = faqPageJsonLd(guideDocument.faqs ?? []);

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-11-15",
  dateModified: "2026-11-15",
  publisher: {
    "@type": "Organization",
    name: "Durza",
    url: "https://durza.in",
    logo: { "@type": "ImageObject", url: "https://durza.in/logo.png" },
  },
  author: {
    "@type": "Organization",
    name: "Durza Editors",
    url: absoluteUrl("/about"),
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(canonical) },
};

export default function AmazonFlipkartSaleDatesPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqSchema} />
      <GuideDocumentPage doc={guideDocument} />
    </>
  );
}
