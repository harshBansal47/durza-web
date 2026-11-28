import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  CONTENT_TYPE_ORDER,
  CONTENT_TYPE_PRESENTATION,
  topicCoverImage,
} from "@/components/topics/topic-view";
import { scoreContent, type DiscoverableContent, type TopicDefinition } from "@/lib/topics";
import type { EditorialType } from "@/lib/types";

/** A topic tile with real cover art, live DB counts and clickable editorial previews. */
export default function TopicCard({
  topic,
  items,
}: {
  topic: TopicDefinition;
  items: DiscoverableContent[];
}) {
  const cover = topicCoverImage(topic.id);
  const counts = new Map<EditorialType, number>();
  for (const item of items) {
    counts.set(item.contentType, (counts.get(item.contentType) ?? 0) + 1);
  }

  const topItems = [...items]
    .sort((a, b) => scoreContent(b) - scoreContent(a) || a.title.localeCompare(b.title))
    .slice(0, 3);

  return (
    <article className="group overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={topic.hubHref} className="block">
        <div className="relative aspect-[16/8] w-full overflow-hidden bg-paper">
          <Image
            src={cover}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-white/80">
              {topic.eyebrow}
            </p>
            <h3 className="mt-1 font-serif text-2xl font-extrabold text-white">{topic.label}</h3>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm leading-6 text-ink-soft">{topic.description}</p>
          {counts.size > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {CONTENT_TYPE_ORDER.filter((type) => counts.get(type)).map((type) => (
                <span
                  key={type}
                  className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-semibold text-ink"
                >
                  {counts.get(type)} {CONTENT_TYPE_PRESENTATION[type].plural.toLowerCase()}
                </span>
              ))}
            </div>
          )}
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-durza-deep">
            Open topic <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>

      {topItems.length > 0 && (
        <div className="border-t border-ledger-line px-5 pb-5 pt-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-soft">
            Top in this topic
          </p>
          <ul className="mt-2 space-y-1.5">
            {topItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-paper"
                >
                  <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-paper-raised">
                    <Image
                      src={item.heroImage || cover}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-durza-deep">
                      {CONTENT_TYPE_PRESENTATION[item.contentType].singular}
                    </span>
                    <span className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-ink">
                      {item.title}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
