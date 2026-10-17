import Link from "next/link";
import { categoryLabel } from "@/lib/catalog";
import CategoryIcon from "@/components/CategoryIcon";

interface Cat {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

export default function CategoryRow({ categories }: { categories: Cat[] }) {
  if (categories.length === 0) return null;
  return (
    <nav aria-label="Browse by category">
      <ul className="scrollbar-hide -mx-4 flex gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:justify-center sm:px-0">
        {categories.slice(0, 12).map((c) => (
          <li key={c.id} className="shrink-0">
            <Link href={`/categories/${c.slug}`} className="group flex w-[76px] flex-col items-center gap-2 text-center">
              <span
                aria-hidden="true"
                className="flex h-16 w-16 items-center justify-center rounded-lg border border-ledger-line bg-white text-ink shadow-[var(--shadow-hairline)] transition-all duration-200 group-hover:-translate-y-1 group-hover:border-accent-soft group-hover:shadow-[var(--shadow-raised)]"
              >
                <CategoryIcon category={c} className="h-7 w-7" />
              </span>
              <span className="line-clamp-2 text-xs font-medium text-ink group-hover:text-accent">{categoryLabel(c)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
