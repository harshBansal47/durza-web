import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/content/ContentPage";
import { getPage, listPages } from "@/lib/content";
import { contentPageMetadata } from "@/lib/content/render";


export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const pages = await listPages("comparison").catch(() => []);
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const page = await getPage("comparison", slug);
  if (!page) return { title: "Not found", robots: { index: false, follow: false } };
  return contentPageMetadata(page, "/compare");
}

export default async function ComparisonPage({ params }: Props) {
  const slug = (await params).slug;
  // Render from PostgreSQL; no TS fallback.
  const page = await getPage("comparison", slug);
  if (!page) notFound();
  return <ContentPage kind="comparison" page={page} />;
}
