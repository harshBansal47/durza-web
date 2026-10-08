import type { Metadata } from "next";
import { editorialMetadata, renderEditorialPage } from "@/lib/editorial-pages";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return editorialMetadata("comparison", (await params).slug);
}

export default async function ComparisonPage({ params }: Props) {
  return renderEditorialPage("comparison", (await params).slug);
}
