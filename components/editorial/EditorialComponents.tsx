import Link from "next/link";
import type { EditorialContent, EditorialType } from "@/lib/types";
import { editorialPath } from "@/lib/editorial-path";
import GuideArt from "./GuideArt";

const TYPE_LABELS: Record<EditorialType, string> = {
  guide: "Buying guide",
  review: "Review",
  comparison: "Comparison",
  collection: "Collection",
};

/** Rough reading time from a guide's own content blocks (real data). */
function guideReadMinutes(content: EditorialContent): number {
  let words = 0;
  for (const block of content.content_blocks ?? []) {
    const b = block as Record<string, unknown>;
    for (const key of ["text", "body", "heading", "title", "summary"]) {
      const v = b[key];
      if (typeof v === "string") words += v.split(/\s+/).filter(Boolean).length;
    }
    if (Array.isArray(b.paragraphs)) {
      for (const p of b.paragraphs) if (typeof p === "string") words += p.split(/\s+/).filter(Boolean).length;
    }
  }
  if (words === 0 && content.summary) words = content.summary.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function EditorialCard({ content, wide = false }: { content: EditorialContent; wide?: boolean }) {
  const isGuide = content.content_type === "guide";
  const readTime = guideReadMinutes(content);
  const updated = content.updated_at ? new Date(content.updated_at).toLocaleDateString("en-IN") : null;

  return (
    <article className={`info-card lift flex h-full flex-col ${wide ? "sm:col-span-2 lg:col-span-3" : ""} p-5`}>
      {(isGuide || content.hero_image_url) && (
        <GuideArt
          title={content.title}
          summary={content.summary}
          heroImageUrl={content.hero_image_url}
          className="mb-4"
        />
      )}
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
        {TYPE_LABELS[content.content_type]}
        {updated ? ` · Updated ${updated}` : ""}
      </p>
      <h3 className={`${wide ? "mt-3 text-2xl" : "mt-3 text-xl"} font-serif font-extrabold leading-snug text-ink`}>
        <Link href={editorialPath(content)} className="hover:text-durza-deep">
          {content.title}
        </Link>
      </h3>
      {content.summary && (
        <p className={`${wide ? "mt-3 line-clamp-4 text-base" : "mt-2 line-clamp-3 text-sm"} leading-6 text-ink-soft`}>
          {content.summary}
        </p>
      )}
      {isGuide && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
          <span className="inline-flex items-center gap-1">{readTime} min read</span>
          {updated && <span>Updated {updated}</span>}
        </div>
      )}
      <Link
        href={editorialPath(content)}
        className="mt-auto inline-flex min-h-11 items-center pt-4 text-sm font-bold text-durza-deep"
      >
        Read {content.content_type === "comparison" ? "comparison" : content.content_type} <span aria-hidden="true"> →</span>
      </Link>
    </article>
  );
}
