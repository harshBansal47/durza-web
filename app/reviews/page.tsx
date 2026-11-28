import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ListingHero from "@/components/listing/ListingHero";
import ReviewsHub, { type ReviewHubItem } from "@/components/reviews/ReviewsHub";
import { listPages, type ContentPage } from "@/lib/content";
import { getGuideCoverImage } from "@/lib/guide-cover";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Independent Reviews | Honest Buyer Assessments | Durza",
  description:
    "Real pros, honest trade-offs, and break-even math before you spend on memberships, tech, fashion, and wellness.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Independent Reviews | Durza",
    description:
      "Real pros, honest trade-offs, and break-even math before you spend on memberships, tech, fashion, and wellness.",
    url: absoluteUrl("/reviews"),
    type: "website",
  },
};

async function fetchAllReviews(): Promise<ContentPage[]> {
  const pages: ContentPage[] = [];
  for (let skip = 0; ; skip += 100) {
    const batch = await listPages("review", { skip, limit: 100 }).catch(() => []);
    pages.push(...batch);
    if (batch.length < 100) break;
  }
  return pages;
}

function formatDate(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }
  const human = new Date(`${value} 2026`);
  return Number.isNaN(human.getTime())
    ? null
    : human.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function toHubItem(page: ContentPage): ReviewHubItem {
  const summary = page.description || page.meta_description || "";
  const structured = page.structured_data as Record<string, unknown>;
  const category =
    typeof structured.category === "string" && structured.category.trim()
      ? structured.category.trim()
      : "Reviews";
  const rating = structured.rating as { value?: unknown; best?: unknown } | undefined;
  const verdictBlock = page.content_blocks.find((block) => block.type === "verdict") as
    | { body?: unknown }
    | undefined;
  const rawUpdated = typeof structured.updatedLabel === "string" ? structured.updatedLabel : null;
  const updatedLabel = rawUpdated
    ? rawUpdated.replace(/^updated\s+/i, "").trim()
    : formatDate(page.updated_at);

  return {
    slug: page.slug,
    href: `/reviews/${page.slug}`,
    title: page.title,
    summary: summary || "An independent Durza assessment.",
    verdict:
      typeof verdictBlock?.body === "string" && verdictBlock.body.trim()
        ? verdictBlock.body
        : null,
    category,
    updatedLabel,
    coverImage: getGuideCoverImage({
      slug: page.slug,
      title: page.title,
      summary,
      category,
      image: page.hero_image_url,
    }),
    ratingValue: typeof rating?.value === "number" ? rating.value : null,
    ratingBest: typeof rating?.best === "number" ? rating.best : null,
    featured: page.is_featured === true,
  };
}

export default async function ReviewsPage() {
  const items = (await fetchAllReviews()).map(toHubItem);

  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }])} />
      <ListingHero
        eyebrow="Honest Buyer Assessments"
        title="Independent Reviews"
        lead="Real pros, honest trade-offs, and break-even math before you spend on memberships, tech, fashion, and wellness."
        stats={[{ value: items.length.toLocaleString("en-IN"), label: "Reviews" }]}
        trust={false}
      />
      <ReviewsHub items={items} />
    </div>
  );
}
