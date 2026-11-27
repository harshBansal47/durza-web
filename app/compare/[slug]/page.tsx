import type { Metadata } from "next";
import { editorialMetadata, renderEditorialPage } from "@/lib/editorial-pages";
import ContentPage from "@/components/content/ContentPage";
import { getPage } from "@/lib/content";
import { contentPageMetadata } from "@/lib/content/render";
import { COMPARISONS } from "@/data/comparisons";

export const revalidate = 21600;

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const page = await getPage("comparison", slug);
  if (page) return contentPageMetadata(page, "/compare");
  return editorialMetadata("comparison", slug);
}

export default async function ComparisonPage({ params }: Props) {
  const slug = (await params).slug;
  // Render from PostgreSQL; fall back to existing per-page rendering.
  const page = await getPage("comparison", slug);
  if (page) return <ContentPage kind="comparison" page={page} />;
  return renderEditorialPage("comparison", slug);
}
