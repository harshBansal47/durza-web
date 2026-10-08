import type { Metadata } from "next";
import { editorialMetadata, renderEditorialPage } from "@/lib/editorial-pages";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return editorialMetadata("guide", (await params).slug);
}

export default async function GuidePage({ params }: Props) {
  return renderEditorialPage("guide", (await params).slug);
}
