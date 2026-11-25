
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Heart,
  Home as HomeIcon,
  Laptop,
  Shirt,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { TopicGlyph, TopicSpotlight } from "@/lib/topics";

const GLYPHS: Record<TopicGlyph, LucideIcon> = {
  laptop: Laptop,
  home: HomeIcon,
  wallet: Wallet,
  heart: Heart,
  sparkles: Sparkles,
  shirt: Shirt,
};

const TYPE_LABELS = {
  comparison: "COMPARISON",
  guide: "BUYING GUIDE",
  review: "REVIEW",
  collection: "COLLECTION",
} as const;

function formatUpdated(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return null;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ArticleMeta({
  type,
  updated,
}: {
  type: string;
  updated: string | null;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-durza-deep">
        {type}
      </span>
      {updated && (
        <>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-[10px] text-ink-soft">{updated}</span>
        </>
      )}
    </div>
  );
}

export default function DecisionDesk({
  topics,
}: {
  topics: TopicSpotlight[];
}) {
  const [activeId, setActiveId] = useState<string | null>(
    topics[0]?.topic.id ?? null
  );

  if (topics.length === 0) return null;

  const active =
    topics.find((spotlight) => spotlight.topic.id === activeId) ??
    topics[0];

  const featured = active.items[0];
  const recommendations = active.items.slice(1, 3);

  return (
    <section
      className="section-panel mt-8 overflow-hidden p-4 sm:p-6 lg:p-7"
      aria-labelledby="decision-desk-heading"
    >
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center gap-2">
            <BookOpen
              className="h-4 w-4 text-durza-deep"
              aria-hidden="true"
            />
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-durza-deep">
              The Durza Buying Desk
            </p>
          </div>

          <h2
            id="decision-desk-heading"
            className="font-serif text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
          >
            Buy better. Know more.
          </h2>

          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-soft">
            Practical buying guides, honest comparisons and useful
            insights to help you make smarter purchases.
          </p>
        </div>

        <Link
          href="/guides/how-to-match-laptop-model-codes-india"
          className="inline-flex items-center gap-1.5 rounded-lg border border-ledger-line bg-white px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-durza hover:text-durza-deep"
        >
          Buying tips
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* CATEGORY NAVIGATION */}
      <div className="mt-5 border-y border-ledger-line py-3">
        <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-widest text-ink-soft">
          Explore by interest
        </p>

        <div
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
          aria-label="Browse topics"
        >
          {topics.map((spotlight) => {
            const Glyph = GLYPHS[spotlight.topic.glyph];
            const selected =
              spotlight.topic.id === active.topic.id;

            return (
              <button
                key={spotlight.topic.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveId(spotlight.topic.id)}
                className={[
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-all",
                  selected
                    ? "border-durza bg-durza text-white shadow-sm"
                    : "border-ledger-line bg-white text-ink-soft hover:border-durza/50 hover:text-ink",
                ].join(" ")}
              >
                <Glyph className="h-3.5 w-3.5" />
                {spotlight.topic.label}
                <span
                  className={
                    selected ? "text-white/75" : "text-ink-soft"
                  }
                >
                  {spotlight.total}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE TOPIC */}
      <div className="mt-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-durza-deep">
              {active.topic.eyebrow}
            </p>

            <h3 className="mt-1 font-serif text-xl font-bold text-ink">
              {active.topic.label}
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              {active.topic.description}
            </p>
          </div>

          <Link
            href={active.topic.hubHref}
            className="inline-flex items-center gap-1 text-xs font-bold text-durza-deep hover:underline"
          >
            Explore all ({active.total})
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* FEATURED + RECOMMENDATIONS */}
        {featured && (
          <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr]">

            {/* FEATURED ARTICLE */}
            <Link
              href={featured.href}
              className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-xl border border-orange-200/80 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-4 transition-all hover:border-durza/50 hover:shadow-md sm:p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-durza-deep">
                    <Sparkles className="h-3 w-3" />
                    Featured guide
                  </span>

                  <ArrowUpRight className="h-4 w-4 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-durza" />
                </div>

                <div className="mt-5">
                  <ArticleMeta
                    type={TYPE_LABELS[featured.contentType]}
                    updated={formatUpdated(featured.updatedAt)}
                  />

                  <h4 className="mt-2 max-w-xl font-serif text-xl font-bold leading-snug text-ink transition-colors group-hover:text-durza-deep sm:text-2xl">
                    {featured.title}
                  </h4>

                  {featured.summary && (
                    <p className="mt-2 line-clamp-2 max-w-xl text-xs leading-relaxed text-ink-soft sm:text-sm">
                      {featured.summary}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-orange-200/70 pt-3">
                <span className="text-xs font-bold text-durza-deep">
                  Read this guide
                </span>
                <ArrowRight className="h-4 w-4 text-durza-deep transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* OTHER ARTICLES */}
            <div className="flex flex-col gap-3">
              {recommendations.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group flex flex-1 flex-col justify-between rounded-xl border border-ledger-line bg-white p-4 transition-all hover:border-durza/40 hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <ArticleMeta
                        type={TYPE_LABELS[item.contentType]}
                        updated={formatUpdated(item.updatedAt)}
                      />

                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-colors group-hover:text-durza" />
                    </div>

                    <h4 className="mt-2 font-serif text-base font-bold leading-snug text-ink transition-colors group-hover:text-durza-deep">
                      {item.title}
                    </h4>

                    {item.summary && (
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-soft">
                        {item.summary}
                      </p>
                    )}
                  </div>

                  <span className="mt-3 text-[10px] font-semibold text-durza-deep">
                    Read article →
                  </span>
                </Link>
              ))}

              {recommendations.length === 0 && (
                <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-ledger-line p-5 text-center text-xs text-ink-soft">
                  Explore the topic to discover more articles.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
