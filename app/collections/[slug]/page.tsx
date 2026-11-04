import type { Metadata } from "next";
import { editorialMetadata, renderEditorialPage } from "@/lib/editorial-pages";

export const revalidate = 300;

// Without this export a dynamic route is rendered on every request and `revalidate` is ignored
// for the page (it goes out `private, no-store`). See stores/[slug] for the full note.
export function generateStaticParams() {
  return [];
}
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return editorialMetadata("collection", (await params).slug);
}

export default async function CollectionPage({ params }: Props) {
  return renderEditorialPage("collection", (await params).slug);
}
