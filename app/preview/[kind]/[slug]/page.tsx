import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/content/ContentPage";
import { getPage } from "@/lib/content";
import type { ContentKind } from "@/lib/content/schema";

/**
 * Phase 3 preview: render a content page through the JSON-driven `<ContentPage>`
 * template at /__preview/<kind>/<slug>, while the existing per-page routes stay
 * live. Kind accepts the public segment names or the internal kinds.
 */

export const dynamic = "force-dynamic";

function normalizeKind(raw: string): ContentKind | null {
  switch (raw) {
    case "compare":
    case "comparison":
      return "comparison";
    case "guides":
    case "guide":
      return "guide";
    case "reviews":
    case "review":
      return "review";
    case "collections":
    case "collection":
      return "collection";
    default:
      return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kind: string; slug: string }>;
}): Promise<Metadata> {
  const { kind, slug } = await params;
  const normalized = normalizeKind(kind);
  const page = normalized ? await getPage(normalized, slug) : null;
  return {
    title: page?.seo_title ?? page?.title ?? "Preview",
    description: page?.meta_description ?? page?.description ?? undefined,
    robots: { index: false, follow: false },
  };
}

export default async function ContentPreviewPage({
  params,
}: {
  params: Promise<{ kind: string; slug: string }>;
}) {
  const { kind, slug } = await params;
  const normalized = normalizeKind(kind);
  if (!normalized) notFound();

  const page = await getPage(normalized, slug);
  if (!page) notFound();
  // The template only renders published content.
  if (page.status !== "published") notFound();

  return <ContentPage kind={normalized} page={page} />;
}
