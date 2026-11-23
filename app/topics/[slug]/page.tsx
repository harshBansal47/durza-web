import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TOPICS, TOPIC_BY_ID, isTopicId, scoreContent, siblingTopicIds, type TopicId } from "@/lib/topics";
import { contentForTopic, discoverableContent } from "@/lib/topic-content";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import type { EditorialType } from "@/lib/types";

const TYPE_LABELS: Record<EditorialType, string> = {
  comparison: "Comparisons",
  guide: "Buying guides",
  review: "Reviews",
  collection: "Collections",
};

const TYPE_ORDER: EditorialType[] = ["comparison", "guide", "review", "collection"];

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
  return {
    title: topic.label,
    description: topic.description,
    alternates: { canonical: absoluteUrl(topic.hubHref) },
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

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Topics", path: "/topics" },
    { name: topic.label, path: topic.hubHref },
  ]);

  return (
    <div className="page-shell py-10 sm:py-14">
      <JsonLd data={breadcrumbs} />
      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <Link href="/" className="hover:text-inkblue">Home</Link>
        <span className="px-2" aria-hidden="true">/</span>
        <Link href="/topics" className="hover:text-inkblue">Topics</Link>
      </nav>

      <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
        {topic.eyebrow}
      </p>
      <h1 className="mt-2 font-serif text-4xl font-extrabold text-ink">{topic.label}</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">{topic.description}</p>

      {content.length === 0 ? (
        <p className="section-panel mt-10 p-6 text-sm text-ink-soft">
          Nothing is published in this topic yet. We would rather show an empty topic than fill it
          with content we have not researched.
        </p>
      ) : (
        <div className="mt-10 space-y-10">
          {TYPE_ORDER.map((type) => {
            const items = content.filter((item) => item.contentType === type);
            if (items.length === 0) return null;
            return (
              <section key={type} aria-labelledby={`topic-${type}`}>
                <h2 id={`topic-${type}`} className="font-serif text-2xl font-bold text-ink">
                  {TYPE_LABELS[type]}
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <li key={item.id} className="rounded-2xl border border-ledger-line bg-white p-4">
                      <h3 className="font-serif text-base font-bold leading-snug text-ink">
                        <Link href={item.href} className="hover:text-durza-deep">{item.title}</Link>
                      </h3>
                      {item.summary && (
                        <p className="mt-2 line-clamp-3 text-xs leading-5 text-ink-soft">{item.summary}</p>
                      )}
                      {(item.authorName || item.updatedAt) && (
                        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                          {[item.authorName, item.updatedAt ? new Date(item.updatedAt).toLocaleDateString("en-IN") : null]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}

      <section className="mt-12 border-t border-ledger-line pt-6" aria-labelledby="sibling-topics">
        <h2 id="sibling-topics" className="font-serif text-xl font-bold text-ink">Related topics</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {siblingTopicIds(topicId).map((id) => (
            <Link
              key={id}
              href={TOPIC_BY_ID[id].hubHref}
              className="min-h-11 inline-flex items-center rounded-full border border-ledger-line bg-white px-4 text-sm font-semibold text-ink hover:border-durza/50 hover:text-durza-deep"
            >
              {TOPIC_BY_ID[id].label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
