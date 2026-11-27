import type { Metadata } from "next";
import { editorialMetadata, renderEditorialPage } from "@/lib/editorial-pages";
import ContentPage from "@/components/content/ContentPage";
import { getPage } from "@/lib/content";
import { contentPageMetadata } from "@/lib/content/render";
import { STORE_GUIDES } from "@/data/store-guides";

export const revalidate = 21600;

export function generateStaticParams() {
  return STORE_GUIDES.map((guide) => ({ slug: guide.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const page = await getPage("guide", slug);
  if (page) return contentPageMetadata(page, "/guides");
  return editorialMetadata("guide", slug);
}

export default async function GuidePage({ params }: Props) {
  const slug = (await params).slug;
  // Render from PostgreSQL; fall back to existing per-page rendering (incl. JSX-only guides).
  const page = await getPage("guide", slug);
  if (page) return <ContentPage kind="guide" page={page} />;
  return renderEditorialPage("guide", slug);
}
