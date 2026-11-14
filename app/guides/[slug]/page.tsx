import type { Metadata } from "next";
import { editorialMetadata, renderEditorialPage } from "@/lib/editorial-pages";
import { STORE_GUIDES } from "@/data/store-guides";

export const revalidate = 300;

// DB-driven guides are rendered on first request and then cached/refreshed —
// but the hand-authored store guides below are known at build time, so they
// prerender for zero-request first hits. Any DB slug not listed here still
// renders dynamically (dynamicParams defaults to true).
export function generateStaticParams() {
  return STORE_GUIDES.map((guide) => ({ slug: guide.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return editorialMetadata("guide", (await params).slug);
}

export default async function GuidePage({ params }: Props) {
  return renderEditorialPage("guide", (await params).slug);
}
