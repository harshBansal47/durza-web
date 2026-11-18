import Link from "next/link";
import { BookOpen } from "lucide-react";
import { staticGuideForStore } from "@/data/store-guides";
import { formatStoreDisplayName } from "@/lib/store-display";

export function guideStoreDisplayName(slug: string): string {
  return formatStoreDisplayName({ slug, name: slug });
}

/**
 * "📖 Read our {Store} Smart Buying & Stacking Guide" banner — the store-side
 * half of the guide ⇄ store internal linking loop. Renders nothing if the
 * store doesn't (yet) have a hand-authored guide.
 */
export default function StoreGuideLink({ slug }: { slug: string }) {
  const guide = staticGuideForStore(slug);
  if (!guide) return null;
  const name = formatStoreDisplayName({ slug, name: slug });
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="not-prose mb-6 flex items-center gap-3 rounded-2xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50/90 via-white to-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
    >
      <BookOpen aria-hidden="true" className="h-5 w-5 shrink-0 text-indigo-600" strokeWidth={2} />
      <span>
        <span className="block font-mono text-[10px] font-semibold uppercase tracking-widest text-indigo-600">
          Smart buying guide
        </span>
        <span className="mt-0.5 block font-semibold leading-snug text-ink">
          Read our {name} buying &amp; stacking guide →
        </span>
      </span>
    </Link>
  );
}
