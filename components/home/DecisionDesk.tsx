"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
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
  comparison: "Comparison",
  guide: "Buying guide",
  review: "Review",
  collection: "Collection",
} as const;

const ROUTES = [
  {
    href: "/compare",
    title: "Choosing between two products?",
    body: "See them spec by spec, with a winner for each factor.",
    cta: "Browse comparisons",
  },
  {
    href: "/guides",
    title: "Shopping with a budget?",
    body: "Best picks at a price, with the tradeoffs explained.",
    cta: "Browse guides",
  },
];

function formatUpdated(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/**
 * Dynamic editorial entry point. The server pre-groups and ranks the content;
 * this component only chooses which topic is in focus. It deliberately does
 * not hardcode a fixed section list — if a topic has no published content it
 * is never shown, and the leading topic is decided by the ranking, not by a
 * position in a static array.
 */
export default function DecisionDesk({ topics }: { topics: TopicSpotlight[] }) {
  const [activeId, setActiveId] = useState<string | null>(topics[0]?.topic.id ?? null);
  if (topics.length === 0) return null;

  const active = topics.find((spotlight) => spotlight.topic.id === activeId) ?? topics[0];

  return (
    <section className="section-panel mt-10 p-5 sm:p-7" aria-labelledby="decision-desk-heading">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
        Start with a decision, not a coupon
      </p>
      <h2 id="decision-desk-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
        What are you trying to figure out?
      </h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {ROUTES.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="lift group flex min-h-[132px] flex-col rounded-2xl border border-ledger-line bg-white p-4"
          >
            <span className="font-serif text-base font-bold leading-snug text-ink">{route.title}</span>
            <span className="mt-1.5 flex-1 text-xs leading-5 text-ink-soft">{route.body}</span>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-durza-deep">
              {route.cta}
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-7 border-t border-ledger-line pt-6">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Browse by topic">
          {topics.map((spotlight) => {
            const Glyph = GLYPHS[spotlight.topic.glyph];
            const selected = spotlight.topic.id === active.topic.id;
            return (
              <button
                key={spotlight.topic.id}
                type="button"
                role="tab"
                id={`topic-tab-${spotlight.topic.id}`}
                aria-selected={selected}
                aria-controls="topic-panel"
                onClick={() => setActiveId(spotlight.topic.id)}
                className={[
                  "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                  selected
                    ? "border-durza bg-durza text-white"
                    : "border-ledger-line bg-white text-ink hover:border-durza/50 hover:text-durza-deep",
                ].join(" ")}
              >
                <Glyph aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                {spotlight.topic.label}
                <span className={selected ? "text-white/75" : "text-ink-soft"}>{spotlight.total}</span>
              </button>
            );
          })}
        </div>

        <div
          id="topic-panel"
          role="tabpanel"
          aria-labelledby={`topic-tab-${active.topic.id}`}
          className="mt-5"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
                {active.topic.eyebrow}
              </p>
              <h3 className="mt-1 font-serif text-xl font-bold text-ink">{active.topic.label}</h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-ink-soft">{active.topic.description}</p>
            </div>
            <Link
              href={active.topic.hubHref}
              className="min-h-11 inline-flex items-center gap-1 text-sm font-bold text-durza-deep hover:underline"
            >
              Explore {active.topic.label}
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {active.items.map((item) => {
              const updated = formatUpdated(item.updatedAt);
              return (
                <li key={item.id} className="rounded-2xl border border-ledger-line bg-white p-4">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
                    {TYPE_LABELS[item.contentType]}
                    {updated ? ` · ${updated}` : ""}
                  </p>
                  <h4 className="mt-2 font-serif text-base font-bold leading-snug text-ink">
                    <Link href={item.href} className="hover:text-durza-deep">
                      {item.title}
                    </Link>
                  </h4>
                  {item.summary && (
                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-ink-soft">{item.summary}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
