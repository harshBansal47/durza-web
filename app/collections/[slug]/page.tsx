import type { Metadata } from "next";
import { editorialMetadata, renderEditorialPage } from "@/lib/editorial-pages";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return editorialMetadata("collection", (await params).slug);
}

export default async function CollectionPage({ params }: Props) {
  return renderEditorialPage("collection", (await params).slug);
}
