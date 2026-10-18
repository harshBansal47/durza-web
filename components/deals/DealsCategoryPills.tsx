import Link from "next/link";
import type { ReactNode } from "react";

interface PillCategory {
  id: string;
  name: string;
  slug: string;
}

/**
 * Quick category filters for phones: one tap re-scopes the list while
 * preserving the keyword, sort and staleness filters. The catalogue filters
 * by a single category, so the row is single-select like the filter drawer —
 * and the active pill styles itself, which lets the drawer's "Selected" line
 * stay desktop-only.
 */
export default function DealsCategoryPills({
  categories,
  active,
  params,
}: {
  categories: PillCategory[];
  active: string[];
  params: Record<string, string | undefined>;
}) {
  if (categories.length === 0) return null;

  function hrefFor(slug: string): string {
    const next = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value) next.set(key, value);
    }
    if (slug) next.set("categories", slug);
    else next.delete("categories");
    // Paging drops: page 2 of the old list is not page 2 of the new one.
    next.delete("skip");
    const query = next.toString();
    return query ? `/deals?${query}` : "/deals";
  }

  return (
    <nav
      aria-label="Quick category filters"
      className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 py-3 md:hidden"
    >
      <Pill href={hrefFor("")} active={active.length === 0}>
        All
      </Pill>
      {categories.map((category) => (
        <Pill
          key={category.id}
          href={hrefFor(category.slug)}
          active={active.includes(category.slug)}
        >
          {category.name}
        </Pill>
      ))}
    </nav>
  );
}

function Pill({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
        active
          ? "bg-accent text-white"
          : "bg-paper-alt text-ink-soft hover:bg-accent-faint hover:text-accent"
      }`}
    >
      {children}
    </Link>
  );
}
