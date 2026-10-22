import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { categoryLabel } from "@/lib/catalog";
import CategoryIcon from "@/components/CategoryIcon";

interface Cat {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

/**
 * The redesign's category grid: tinted rounded tiles with one shared outline
 * icon set (CategoryIcon) and a real offer count sourced from the API. Counts
 * are optional — when a count is missing the tile shows no number rather than
 * an invented one.
 */
export default function CategoryTileGrid({
  categories,
  counts,
}: {
  categories: Cat[];
  counts?: Record<string, number>;
}) {
  if (categories.length === 0) return null;
  return (
    <nav aria-label="Browse by category">
      <ul className="grid grid-cols-3 gap-4 py-10 md:grid-cols-6 lg:grid-cols-8">
        {categories.slice(0, 7).map((c) => (
          <li key={c.id}>
            <Link
              href={`/categories/${c.slug}`}
              className="group flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-ledger-line bg-paper-raised p-4 text-center shadow-[var(--shadow-hairline)] transition-all duration-300 hover:-translate-y-1 hover:border-accent-soft hover:shadow-[var(--shadow-raised)] motion-safe:hover:-translate-y-1"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-faint text-accent transition-colors duration-300 group-hover:bg-accent-soft/40"
              >
                <CategoryIcon category={c} className="h-6 w-6" />
              </span>
              <span className="line-clamp-2 text-sm font-medium text-ink-soft transition-colors duration-300 group-hover:text-ink">
                {categoryLabel(c)}
              </span>
              {counts && typeof counts[c.id] === "number" && counts[c.id] > 0 && (
                <span className="font-mono text-[11px] text-ink-soft">
                  {counts[c.id].toLocaleString("en-IN")} offers
                </span>
              )}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/categories"
            className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-ledger-line bg-paper-raised p-4 text-center shadow-[var(--shadow-hairline)] transition-all duration-300 hover:-translate-y-1 hover:border-accent-soft hover:shadow-[var(--shadow-raised)]"
          >
            <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-white">
              <LayoutGrid className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <span className="text-sm font-medium text-ink-soft transition-colors duration-300 group-hover:text-ink">
              All categories
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
