import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/content/ContentPage";
import { getPage, listPages } from "@/lib/content";
import { contentPageMetadata } from "@/lib/content/render";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const pages = await listPages("review").catch(() => []);
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage("review", slug);
  if (!page) return { title: "Review not found", robots: { index: false, follow: false } };
  return contentPageMetadata(page, "/reviews");
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  // Render from PostgreSQL; no TS fallback.
  const page = await getPage("review", slug);
  if (!page) notFound();
  return <ContentPage kind="review" page={page} />;
}
