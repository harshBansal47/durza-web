import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import ListingHero from "@/components/listing/ListingHero";
import GuidesHubClient, { type GuideHubItem } from "@/components/guides/GuidesHubClient";
import { listAllPages, type ContentPage } from "@/lib/content";
import { getGuideCoverImage, guideHubCategory } from "@/lib/guide-cover";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Buying Guides — Research & Compare for India",
  description:
    "Practical buying guides for Indian shoppers: laptop deals, credit card and sale math, skincare, fashion, fitness, home appliances and more. Research before you spend.",
  alternates: { canonical: "/guides" },
};

function formatDate(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }
  // structured_data dates are authored as "26 Nov 2026".
  const human = new Date(`${value} 2026`);
  return Number.isNaN(human.getTime()) ? null : human.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function toHubItem(page: ContentPage): GuideHubItem {
  const summary = page.description || page.meta_description || "";
  const structured = page.structured_data as Record<string, unknown>;
  const declaredCategory = typeof structured.category === "string" ? structured.category : undefined;
  const hubCategory = guideHubCategory({
    slug: page.slug,
    title: page.title,
    summary,
    category: declaredCategory,
  });

  return {
    slug: page.slug,
    href: `/guides/${page.slug}`,
    title: page.title,
    summary: summary || "Practical buying advice for Indian shoppers.",
    categoryLabel: declaredCategory || hubCategory,
    hubCategory,
    updatedLabel: formatDate(page.updated_at),
    checkedLabel: formatDate(structured.researchReviewedDate),
    coverImage: getGuideCoverImage({
      slug: page.slug,
      title: page.title,
      summary,
      category: declaredCategory || hubCategory,
      image: page.hero_image_url,
    }),
    featured: page.is_featured === true,
  };
}

export default async function GuidesPage() {
  const items = (await listAllPages("guide")).map(toHubItem);

  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Buying guides", path: "/guides" }])} />
      <ListingHero
        eyebrow="Spend with confidence"
        title="Buying guides"
        lead="Straightforward research and practical advice to help you find what fits before you spend."
        stats={[{ value: items.length.toLocaleString("en-IN"), label: "Guides" }]}
        trust={false}
      />
      <GuidesHubClient items={items} />
    </div>
  );
}
