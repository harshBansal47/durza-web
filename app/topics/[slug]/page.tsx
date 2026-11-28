import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import VerifiedResearchPanel from "@/components/editorial/VerifiedResearchPanel";
import JsonLd from "@/components/JsonLd";
import ListingHero from "@/components/listing/ListingHero";
import TopicContentCard from "@/components/topics/TopicContentCard";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { contentForTopic, discoverableContent } from "@/lib/topic-content";
import {
  CONTENT_TYPE_ORDER,
  CONTENT_TYPE_PRESENTATION,
  topicCoverImage,
} from "@/components/topics/topic-view";
import {
  isTopicId,
  scoreContent,
  siblingTopicIds,
  TOPICS,
  TOPIC_BY_ID,
  type TopicId,
} from "@/lib/topics";
import type { EditorialType } from "@/lib/types";

export const revalidate = 21600;

const HUB_BY_TYPE: Record<EditorialType, string> = {
  comparison: "/compare",
  guide: "/guides",
  review: "/reviews",
  collection: "/collections",
};

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ slug: topic.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isTopicId(slug)) return {};
  const topic = TOPIC_BY_ID[slug];
  const image = absoluteUrl(topicCoverImage(topic.id));
  return {
    title: `${topic.label} | Durza Editorial`,
    description: topic.description,
    alternates: { canonical: absoluteUrl(topic.hubHref) },
    openGraph: {
      title: topic.label,
      description: topic.description,
      url: absoluteUrl(topic.hubHref),
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: topic.label,
      description: topic.description,
      images: [image],
    },
  };
}

export default async function TopicHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isTopicId(slug)) notFound();

  const topicId: TopicId = slug;
  const topic = TOPIC_BY_ID[topicId];
  const allContent = await discoverableContent();
  const content = contentForTopic(allContent, topicId)
    .slice()
    .sort((a, b) => scoreContent(b) - scoreContent(a) || a.title.localeCompare(b.title));

  const countsByType = new Map<EditorialType, number>();
  for (const item of content) {
    countsByType.set(item.contentType, (countsByType.get(item.contentType) ?? 0) + 1);
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Topics", path: "/topics" },
    { name: topic.label, path: topic.hubHref },
  ]);

  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
      <JsonLd data={breadcrumbs} />

      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <Link href="/" className="hover:text-inkblue">Home</Link>
        <span className="px-2" aria-hidden="true">/</span>
        <Link href="/topics" className="hover:text-inkblue">Topics</Link>
      </nav>

      <ListingHero
        eyebrow={topic.eyebrow}
        title={topic.label}
        lead={
          <>
            {topic.description} Shopping for this topic? Browse{" "}
            <Link href={topic.categoryHref} className="font-semibold text-durza-deep hover:underline">
              {topic.categoryLabel} offers and stores
            </Link>{" "}
            after reading.
          </>
        }
        chips={[
          { href: "/topics", label: "All topics" },
          { href: "/guides", label: "Buying guides" },
          { href: "/reviews", label: "Reviews" },
          { href: "/compare", label: "Comparisons" },
        ]}
        stats={[
          { value: content.length.toLocaleString("en-IN"), label: "Editorial pieces" },
          { value: (countsByType.get("guide") ?? 0).toLocaleString("en-IN"), label: "Buying guides" },
          {
            value: ((countsByType.get("comparison") ?? 0) + (countsByType.get("review") ?? 0)).toLocaleString("en-IN"),
            label: "Comparisons & reviews",
          },
        ]}
        trust={false}
      />

      {slug === "money" && (
        <div className="mt-8">
          <VerifiedResearchPanel kind="money" />
        </div>
      )}
      {slug === "tech" && (
        <div className="mt-8">
          <VerifiedResearchPanel kind="model-codes" />
        </div>
      )}
      {(slug === "beauty" || slug === "fashion") && (
        <div className="mt-8">
          <VerifiedResearchPanel kind="sale-calendar" />
        </div>
      )}

      {content.length === 0 ? (
        <p className="section-panel mt-10 p-6 text-sm text-ink-soft">
          Nothing is published in this topic yet. We would rather show an empty topic than fill it
          with content we have not researched.
        </p>
      ) : (
        <div className="mt-12 space-y-12">
          {CONTENT_TYPE_ORDER.map((type) => {
            const items = content.filter((item) => item.contentType === type);
            if (items.length === 0) return null;
            const presentation = CONTENT_TYPE_PRESENTATION[type];
            const sectionId = `topic-${type}`;
            return (
              <section key={type} aria-labelledby={sectionId}>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
                      {items.length} {presentation.plural.toLowerCase()}
                    </p>
                    <h2 id={sectionId} className="mt-1 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
                      {presentation.plural}
                    </h2>
                  </div>
                  <Link
                    href={HUB_BY_TYPE[type]}
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-durza-deep hover:underline"
                  >
                    Browse all {presentation.plural.toLowerCase()}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <TopicContentCard
                      key={item.id}
                      item={item}
                      fallbackImage={topicCoverImage(topicId)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <section className="mt-14 border-t border-ledger-line pt-8" aria-labelledby="sibling-topics">
        <h2 id="sibling-topics" className="font-serif text-2xl font-extrabold text-ink sm:text-3xl">
          Related topics
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Keep exploring the other decisions our research desk covers.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siblingTopicIds(topicId).map((id) => {
            const sibling = TOPIC_BY_ID[id];
            const siblingCount = contentForTopic(allContent, id).length;
            return (
              <Link
                key={id}
                href={sibling.hubHref}
                className="group flex items-center gap-4 rounded-2xl border border-ledger-line bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-paper">
                  <Image
                    src={topicCoverImage(id)}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-base font-bold text-ink">{sibling.label}</span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                    {siblingCount} editorial pieces
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
