import type { TopicId } from "@/lib/topics";
import type { EditorialType } from "@/lib/types";

/** Local cover art used by topic cards and as a last-resort item thumbnail. */
const TOPIC_COVERS: Record<TopicId, string> = {
  tech: "/guides/laptops.webp",
  home: "/guides/home.webp",
  money: "/guides/bank.webp",
  health: "/guides/supplements.webp",
  beauty: "/guides/beauty.webp",
  fashion: "/guides/fashion.webp",
};

export function topicCoverImage(topicId: TopicId): string {
  return TOPIC_COVERS[topicId];
}

export const CONTENT_TYPE_PRESENTATION: Record<
  EditorialType,
  { singular: string; plural: string; action: string }
> = {
  comparison: { singular: "Comparison", plural: "Comparisons", action: "Read comparison" },
  guide: { singular: "Buying guide", plural: "Buying guides", action: "Read guide" },
  review: { singular: "Review", plural: "Reviews", action: "Read review" },
  collection: { singular: "Collection", plural: "Collections", action: "Explore collection" },
};

export const CONTENT_TYPE_ORDER: EditorialType[] = [
  "comparison",
  "guide",
  "review",
  "collection",
];

export function formatContentDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
