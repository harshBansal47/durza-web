import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import GuideDocumentPage from "@/components/guides/redesign/GuideDocumentPage";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { guideDocument } from "@/guide-documents/how-to-save-on-amazon-india";

const title = "How to Save on Amazon India: Coupons, Bank Offers & Exchange Deals";
const description =
  "A repeatable Amazon India checkout order: deal price, clipped coupon, exchange check, bank instant discount or co-branded cashback. Worked examples with all inputs shown. Reviewed 24 Nov 2026.";
const canonical = "/guides/how-to-save-on-amazon-india";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: absoluteUrl(canonical), type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-10-18",
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
  { name: "How to save on Amazon India", path: canonical },
];

export default function HowToSaveOnAmazonPage() {
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
