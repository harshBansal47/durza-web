import Link from "next/link";

interface Cat {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

// Fallback glyphs when a category has no icon of its own.
const GLYPHS: [RegExp, string][] = [
  [/fashion|cloth|apparel|wear|shoe/i, "👕"],
  [/electron|mobile|phone|laptop|gadget/i, "📱"],
  [/food|dining|restaurant|grocer/i, "🍔"],
  [/travel|flight|hotel/i, "✈️"],
  [/beauty|health|care|wellness/i, "💄"],
  [/home|kitchen|furnit/i, "🛋️"],
  [/book|educat|course/i, "📚"],
  [/game|toy|kid/i, "🎮"],
  [/sport|fitness|gym/i, "🏏"],
];

function glyphFor(c: Cat) {
  if (c.icon) return c.icon;
  return GLYPHS.find(([re]) => re.test(c.name) || re.test(c.slug))?.[1] ?? "🏷️";
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
                className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-ledger-line bg-white text-3xl shadow-[var(--shadow-hairline)] transition-all duration-200 group-hover:-translate-y-1 group-hover:border-accent-soft group-hover:shadow-[var(--shadow-raised)]"
              >
                {glyphFor(c)}
              </span>
              <span className="line-clamp-2 text-xs font-medium text-ink group-hover:text-accent">{c.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
