import type { Metadata } from "next";
import { editorialMetadata, renderEditorialPage } from "@/lib/editorial-pages";
import { COMPARISONS } from "@/data/comparisons";

export const revalidate = 3600;

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return editorialMetadata("comparison", (await params).slug);
}

export default async function ComparisonPage({ params }: Props) {
  return renderEditorialPage("comparison", (await params).slug);
}
