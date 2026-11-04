import type { Metadata } from "next";
import { editorialMetadata, renderEditorialPage } from "@/lib/editorial-pages";

export const revalidate = 300;

// Without this export a dynamic route is rendered on every request and `revalidate` is ignored
// for the page (it goes out `private, no-store`). Returning nothing keeps builds from needing
// the API; pages are rendered on first request, then cached and refreshed. See stores/[slug].
export function generateStaticParams() {
  return [];
}
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return editorialMetadata("review", (await params).slug);
}

export default async function ReviewPage({ params }: Props) {
  return renderEditorialPage("review", (await params).slug);
}
