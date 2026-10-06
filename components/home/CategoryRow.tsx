import Link from "next/link";

interface Cat {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

const GRADIENTS = [
  "from-inkblue to-violet",
  "from-rust to-pink",
  "from-verified to-inkblue",
  "from-sun to-rust",
  "from-pink to-inkblue",
  "from-violet to-rust",
];

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
        {categories.slice(0, 12).map((c, i) => (
          <li key={c.id} className="shrink-0">
            <Link href={`/categories/${c.slug}`} className="group flex w-[76px] flex-col items-center gap-2 text-center">
              <span
                aria-hidden="true"
                className={`flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} text-3xl shadow-[var(--shadow-raised)] transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:rotate-3`}
              >
                {glyphFor(c)}
              </span>
              <span className="line-clamp-2 text-xs font-semibold text-ink group-hover:text-inkblue">{c.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
