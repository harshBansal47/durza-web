import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOPICS } from "@/lib/topics";
import { staticDiscoverableContent } from "@/lib/topic-content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Browse by topic",
  description:
    "Every Durza comparison, buying guide, review and collection organized into decision topics.",
  alternates: { canonical: absoluteUrl("/topics") },
};

export default function TopicsIndexPage() {
  const content = staticDiscoverableContent();
  const counts = new Map<string, number>();
  for (const item of content) counts.set(item.topicId, (counts.get(item.topicId) ?? 0) + 1);

  return (
    <div className="page-shell py-10 sm:py-14">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
        Product decisions
      </p>
      <h1 className="mt-2 font-serif text-4xl font-extrabold text-ink">Browse by topic</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
        Start with the decision you are making. Each topic collects the comparisons, guides,
        reviews and tools that belong together — offers stay attached to the product, never in
        charge of the page.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((topic) => (
          <li key={topic.id}>
            <Link
              href={topic.hubHref}
              className="lift group flex h-full flex-col rounded-2xl border border-ledger-line bg-white p-5"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
                {topic.eyebrow}
              </span>
              <span className="mt-2 font-serif text-xl font-bold text-ink">{topic.label}</span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                Category hub: {topic.categoryLabel}
              </span>
              <span className="mt-2 flex-1 text-sm leading-6 text-ink-soft">{topic.description}</span>
              <span className="mt-4 inline-flex items-center justify-between text-sm font-bold text-durza-deep">
                {counts.get(topic.id) ?? 0} published pieces
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
