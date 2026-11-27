import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/content/ContentPage";
import VerifiedResearchPanel from "@/components/editorial/VerifiedResearchPanel";
import { getPage } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How Durza researches",
  description:
    "The method behind Durza's comparisons, buying guides and reviews: what we check, what we publish, and what we will never claim.",
  alternates: { canonical: "/methodology" },
};

export default async function MethodologyPage() {
  const editorial = await getPage("guide", "how-durza-verifies-offers-methodology-2026");
  if (!editorial) notFound();

  // Keep the long-standing /methodology URL and SEO copy while the body comes
  // from the same editorial document as every other guide.
  const page = {
    ...editorial,
    title: "How Durza researches",
    seo_title: "How Durza researches",
    meta_description: metadata.description,
    canonical_url: "/methodology",
  };

  return (
    <>
      <ContentPage page={page} kind="guide" />
      <div className="mx-auto w-full max-w-3xl px-4 pb-12 sm:px-6">
        <VerifiedResearchPanel kind="general" />
      </div>
    </>
  );
}
