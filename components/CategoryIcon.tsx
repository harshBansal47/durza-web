import type { ReactElement } from "react";
import {
  BookOpen,
  Dumbbell,
  Gamepad2,
  Plane,
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
  Tag,
  Utensils,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

/** Line-icon mapping for category tiles, keyed by slug then name. The
    render functions are declared at module level so the react-hooks
    static-components rule is satisfied; the icons are stateless. */
const ICONS: [RegExp, (className?: string) => ReactElement][] = [
  [/fashion|cloth|apparel|wear|shoe/i, (c) => <Shirt aria-hidden="true" strokeWidth={1.75} className={c} />],
  [/electron|mobile|phone|laptop|gadget|tech/i, (c) => <Smartphone aria-hidden="true" strokeWidth={1.75} className={c} />],
  [/food|dining|restaurant|grocery/i, (c) => <Utensils aria-hidden="true" strokeWidth={1.75} className={c} />],
  [/travel|flight|hotel/i, (c) => <Plane aria-hidden="true" strokeWidth={1.75} className={c} />],
  [/beauty|health|care|wellness|cosmetic/i, (c) => <Sparkles aria-hidden="true" strokeWidth={1.75} className={c} />],
  [/home|kitchen|furnit|decor/i, (c) => <Sofa aria-hidden="true" strokeWidth={1.75} className={c} />],
  [/book|educat|course|learn/i, (c) => <BookOpen aria-hidden="true" strokeWidth={1.75} className={c} />],
  [/game|toy|kid|baby/i, (c) => <Gamepad2 aria-hidden="true" strokeWidth={1.75} className={c} />],
  [/sport|fitness|gym/i, (c) => <Dumbbell aria-hidden="true" strokeWidth={1.75} className={c} />],
];

/**
 * One consistent line-icon set for category tiles. The API's own `icon`
 * string (an emoji on some seeds) is ignored in favour of these so every
 * tile shares one stroke width; a Tag icon is the fallback.
 */
export function CategoryIcon({ category, className }: { category: Category; className?: string }) {
  const probe = `${category.slug} ${category.name}`;
  const render = ICONS.find(([re]) => re.test(probe))?.[1] ?? ((c?: string) => <Tag aria-hidden="true" strokeWidth={1.75} className={c} />);
  return render(className);
}

export default CategoryIcon;
