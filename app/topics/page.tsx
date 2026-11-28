import type { Metadata } from "next";
import DiscoveryStrip from "@/components/DiscoveryStrip";
import JsonLd from "@/components/JsonLd";
import ListingHero from "@/components/listing/ListingHero";
import TopicCard from "@/components/topics/TopicCard";
import TopicContentCard from "@/components/topics/TopicContentCard";
import { CONTENT_TYPE_ORDER } from "@/components/topics/topic-view";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { discoverableContent } from "@/lib/topic-content";
import { scoreContent, TOPICS, type TopicId } from "@/lib/topics";
import type { EditorialType } from "@/lib/types";

export const revalidate = 21600;

const DESCRIPTION =
  "Every Durza comparison, buying guide, review and collection organized into decision topics, with artwork on every card.";

export const metadata: Metadata = {
  title: "Browse by Topic | Durza Editorial",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/topics") },
  openGraph: {
    title: "Browse by Topic | Durza",
    description: DESCRIPTION,
    url: absoluteUrl("/topics"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse by Topic | Durza",
    description: DESCRIPTION,
  },
};

export default async function TopicsIndexPage() {
  const allContent = await discoverableContent();

  const byTopic = new Map<TopicId, (typeof allContent)[number][]>();
  const countsByType = new Map<EditorialType, number>();
  for (const item of allContent) {
    const bucket = byTopic.get(item.topicId) ?? [];
    bucket.push(item);
    byTopic.set(item.topicId, bucket);
    countsByType.set(item.contentType, (countsByType.get(item.contentType) ?? 0) + 1);
  }
  for (const bucket of byTopic.values()) {
    bucket.sort((a, b) => scoreContent(b) - scoreContent(a) || a.title.localeCompare(b.title));
  }

  const editorialCount = CONTENT_TYPE_ORDER.reduce(
    (sum, type) => (type === "collection" ? sum : sum + (countsByType.get(type) ?? 0)),
    0,
  );
  const spotlight = [...allContent]
    .sort((a, b) => scoreContent(b) - scoreContent(a) || a.title.localeCompare(b.title))
    .slice(0, 12);

  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Topics", path: "/topics" },
        ])}
      />

      <ListingHero
        eyebrow="Editorial Topics"
        title="Browse by topic"
        lead={DESCRIPTION}
        chips={[
          { href: "/guides", label: "Buying guides" },
          { href: "/reviews", label: "Reviews" },
          { href: "/compare", label: "Comparisons" },
          { href: "/collections", label: "Collections" },
        ]}
        stats={[
          { value: editorialCount.toLocaleString("en-IN"), label: "Guides, reviews & comparisons" },
          { value: (countsByType.get("guide") ?? 0).toLocaleString("en-IN"), label: "Buying guides" },
          { value: String(TOPICS.length), label: "Decision topics" },
        ]}
        trust={false}
      />

      <section aria-labelledby="topic-grid-heading" className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
              By decision
            </p>
            <h2 id="topic-grid-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
              Choose a topic
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-ink-soft">
            Each tile opens a curated page with the full set of guides, comparisons, reviews and collections.
          </p>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <TopicCard key={topic.id} topic={topic} items={byTopic.get(topic.id) ?? []} />
          ))}
        </div>
      </section>

      <section aria-labelledby="topic-picks-heading" className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
              Across every topic
            </p>
            <h2 id="topic-picks-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
              Editorial picks
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-ink-soft">
            A ranked look at the pieces our research team has published most recently.
          </p>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {spotlight.map((item) => (
            <TopicContentCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <DiscoveryStrip
        className="mt-14"
        ariaLabel="Browse all editorial hubs"
        items={[
          {
            href: "/guides",
            title: "All buying guides",
            note: "Practical research for laptops, cards, skincare, fitness and more.",
          },
          {
            href: "/reviews",
            title: "All independent reviews",
            note: "Real pros, honest trade-offs and break-even math before you spend.",
          },
          {
            href: "/compare",
            title: "All side-by-side comparisons",
            note: "Store-versus-store verdicts and bank card stacking rules.",
          },
        ]}
      />
    </div>
  );
}
