import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import GuideDocumentPage from "@/components/guides/redesign/GuideDocumentPage";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { guideDocument } from "@/guide-documents/adidas-sale-india-2026";

const canonical = "/guides/adidas-sale-india-2026";
const title = "Adidas Sale in India (2026): What “Up to 60% Off” Covers & How to Stack";
const description =
  "Adidas India's “up to 60% off” applies to outlet tail stock and odd sizes, not core Samba or Gazelle. Which lines actually drop, how member codes and bank slabs stack, and where to check live prices. Reviewed 24 Nov 2026.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-11-15",
  dateModified: "2026-11-24",
  author: { "@type": "Person", name: "Harsh Bansal", url: absoluteUrl("/about") },
  publisher: {
    "@type": "Organization",
    name: "Durza",
    url: "https://durza.in",
    logo: { "@type": "ImageObject", url: "https://durza.in/logo.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(canonical) },
};

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Adidas Sale India 2026", path: canonical },
];

export default function AdidasSalePage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqPageJsonLd(guideDocument.faqs ?? [])} />
      <GuideDocumentPage doc={guideDocument} />
    </>
  );
}
