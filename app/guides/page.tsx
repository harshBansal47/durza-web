import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import ListingHero from "@/components/listing/ListingHero";
import GuidesHubClient, { type GuideHubItem } from "@/components/guides/GuidesHubClient";
import { resilient } from "@/lib/api";
import { STORE_GUIDES } from "@/data/store-guides";
import { getGuideCoverImage, guideHubCategory } from "@/lib/guide-cover";
import type { EditorialContent } from "@/lib/types";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Buying Guides — Research & Compare for India",
  description:
    "Practical buying guides for Indian shoppers: laptop deals, credit card and sale math, skincare, fashion, fitness, home appliances and more. Research before you spend.",
  alternates: { canonical: "/guides" },
};

async function fetchAllDbGuides(): Promise<EditorialContent[]> {
  const items: EditorialContent[] = [];
  for (let page = 0; page < 5; page++) {
    const result = await resilient.listEditorial({ content_type: "guide", limit: 100, skip: page * 100 }).catch(() => null);
    if (!result) break;
    items.push(...result.items);
    if (result.items.length < 100) break;
  }
  return items;
}

function formatUpdated(iso?: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN");
}

export default async function GuidesPage() {
  const dbGuides = await fetchAllDbGuides();

  const dbItems: GuideHubItem[] = dbGuides.map((g) => {
    const coverImage = getGuideCoverImage({
      slug: g.slug,
      title: g.title,
      summary: g.summary ?? g.meta_description ?? "",
      category: "Buying guide",
      image: g.hero_image_url,
    });
    return {
      slug: g.slug,
      href: `/guides/${g.slug}`,
      title: g.title,
      summary: g.summary ?? g.meta_description ?? "Practical buying advice for Indian shoppers.",
      categoryLabel: guideHubCategory({ slug: g.slug, title: g.title, summary: g.summary ?? "", category: "guide" }),
      hubCategory: guideHubCategory({ slug: g.slug, title: g.title, summary: g.summary ?? "", category: "guide" }),
      updatedLabel: formatUpdated(g.updated_at),
      coverImage,
    };
  });

  const staticItems: GuideHubItem[] = STORE_GUIDES.map((guide) => {
    const hubCategory = guideHubCategory({
      slug: guide.slug,
      title: guide.seo.title,
      summary: guide.summary,
      category: guide.category,
    });
    return {
      slug: guide.slug,
      href: `/guides/${guide.slug}`,
      title: guide.seo.title,
      summary: guide.summary,
      categoryLabel: guide.category || hubCategory,
      hubCategory,
      updatedLabel: formatUpdated(guide.auditedOn ?? null),
      checkedLabel: formatUpdated(guide.factsCheckedOn ?? null),
      coverImage: getGuideCoverImage({
        slug: guide.slug,
        title: guide.seo.title,
        summary: guide.summary,
        category: guide.category,
        image: guide.heroImage ?? null,
      }),
    };
  });

  const bySlug = new Map<string, GuideHubItem>();
  for (const item of dbItems) bySlug.set(item.slug, item);
  for (const item of staticItems) if (!bySlug.has(item.slug)) bySlug.set(item.slug, item);
  const items = Array.from(bySlug.values()).sort((a, b) => {
    const ad = a.updatedLabel ? Date.parse(a.updatedLabel.split("/").reverse().join("-")) : 0;
    const bd = b.updatedLabel ? Date.parse(b.updatedLabel.split("/").reverse().join("-")) : 0;
    return 0; // keep stable mixed order; server-rendered as-is
  });

  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Buying guides", path: "/guides" }])} />
      <ListingHero
        eyebrow="Spend with confidence"
        title="Buying guides"
        lead="Straightforward research and practical advice to help you find what fits before you spend."
        stats={[{ value: items.length.toLocaleString("en-IN"), label: "Guides" }]}
      />
      <GuidesHubClient items={items} />
    </div>
  );
}
