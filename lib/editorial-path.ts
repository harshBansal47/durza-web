import type { EditorialContent } from "./types";

export function editorialPath(content: Pick<EditorialContent, "content_type" | "slug">): string {
  const segment = content.content_type === "comparison" ? "compare" : `${content.content_type}s`;
  return `/${segment}/${content.slug}`;
}
