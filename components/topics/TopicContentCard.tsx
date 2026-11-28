import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  CONTENT_TYPE_PRESENTATION,
  formatContentDate,
  topicCoverImage,
} from "@/components/topics/topic-view";
import type { DiscoverableContent } from "@/lib/topics";

/** Image-led card for one published guide, review, comparison or collection. */
export default function TopicContentCard({
  item,
  fallbackImage,
}: {
  item: DiscoverableContent;
  fallbackImage?: string;
}) {
  const presentation = CONTENT_TYPE_PRESENTATION[item.contentType];
  const image = item.heroImage || fallbackImage || topicCoverImage(item.topicId);
  const updated = formatContentDate(item.updatedAt);

  return (
    <article className="group overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={item.href} className="flex h-full flex-col">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-paper-raised">
            {presentation.singular}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-paper px-2.5 py-1 font-semibold text-ink">
              {presentation.plural}
            </span>
            {updated && (
              <span className="rounded-full border border-ink/10 px-2.5 py-1 font-medium text-ink-soft">
                Updated {updated}
              </span>
            )}
          </div>
          <h3 className="mt-3 line-clamp-2 font-serif text-lg font-extrabold leading-snug text-ink">
            {item.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">
            {item.summary || `Read our ${presentation.singular.toLowerCase()} for the full breakdown.`}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-durza-deep">
            {presentation.action}
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
