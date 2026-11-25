import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DiscoverableContent } from "@/lib/topics";

function formatUpdated(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/**
 * A compact homepage rail for one editorial type. Items are supplied already
 * ranked and capped by the server; this component only presents them.
 */
export default function EditorialRail({
  id,
  eyebrow,
  title,
  href,
  linkLabel,
  items,
}: {
  id: string;
  eyebrow: string;
  title: string;
  href: string;
  linkLabel: string;
  items: DiscoverableContent[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="section-panel mt-10 p-5 sm:p-7" aria-labelledby={`${id}-heading`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
            {eyebrow}
          </p>
          <h2 id={`${id}-heading`} className="mt-1 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
            {title}
          </h2>
        </div>
        <Link
          href={href}
          className="min-h-11 inline-flex items-center gap-1 text-sm font-bold text-durza-deep hover:underline"
        >
          {linkLabel}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const updated = formatUpdated(item.updatedAt);
          return (
            <li key={item.id} className="rounded-2xl border border-ledger-line bg-white p-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
                {updated ? `Checked ${updated}` : "Research desk"}
              </p>
              <h3 className="mt-2 font-serif text-base font-bold leading-snug text-ink">
                <Link href={item.href} className="hover:text-durza-deep">
                  {item.title}
                </Link>
              </h3>
              {item.summary ? (
                <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-ink-soft">{item.summary}</p>
              ) : null}
              <p className="mt-3 text-xs font-medium text-ink-soft">{item.authorName ?? "Durza Research Desk"}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
