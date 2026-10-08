import type { Metadata } from "next";
import { editorialMetadata, renderEditorialPage } from "@/lib/editorial-pages";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return editorialMetadata("review", (await params).slug);
}

export default async function ReviewPage({ params }: Props) {
  return renderEditorialPage("review", (await params).slug);
}
