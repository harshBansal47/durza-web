import Link from "next/link";
import { resolveAuthor } from "@/lib/authors";

/**
 * Reusable E-E-A-T block. It renders only facts the content actually has:
 * a byline, real dates, and a link to the published method. No relative
 * freshness claim ("checked today") is made unless the caller supplies a date.
 */
export default function EditorialByline({
  authorName,
  publishedAt,
  updatedAt,
  checkedAt,
  hasMethod = false,
}: {
  authorName?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  checkedAt?: string | null;
  hasMethod?: boolean;
}) {
  const author = resolveAuthor(authorName);
  const published = formatDate(publishedAt);
  const updated = formatDate(updatedAt);
  const checked = formatDate(checkedAt);

  return (
    <div className="mt-5 rounded-2xl border border-ledger-line bg-white p-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-soft">
        <span className="inline-flex items-center gap-2 font-semibold text-ink">
          {author.avatarUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={author.avatarUrl}
              alt=""
              aria-hidden="true"
              className="h-8 w-8 rounded-full object-cover"
            />
          )}
          By {author.name}
        </span>
        <span>{author.credential}</span>
        {published && <time dateTime={publishedAt ?? undefined}>Published {published}</time>}
        {updated && <time dateTime={updatedAt ?? undefined}>Last updated {updated}</time>}
        {checked && <span>Facts checked {checked}</span>}
      </div>
      <p className="mt-2 text-xs leading-5 text-ink-soft">{author.bio}</p>
      <p className="mt-2 text-[11px] leading-5 text-ink-soft">
        {hasMethod ? (
          <>
            Our research method is published with this article.{" "}
            <Link href="/methodology" className="font-semibold text-durza-deep hover:underline">
              How Durza researches
            </Link>
          </>
        ) : (
          <>
            Recommendations are editorial and commissions never change a verdict.{" "}
            <Link href="/methodology" className="font-semibold text-durza-deep hover:underline">
              How Durza researches
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

function formatDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
