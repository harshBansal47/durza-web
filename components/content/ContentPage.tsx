import Link from "next/link";
import DisclosureNote from "@/components/DisclosureNote";
import JsonLd from "@/components/JsonLd";
import { BlockRenderer } from "@/components/content/BlockRenderer";
import { HOW_DURZA_RESEARCHES_HREF } from "@/components/content/blocks";
import { renderInline } from "@/components/content/inline";
import { editorialPath } from "@/lib/editorial-path";
import { absoluteUrl } from "@/lib/seo";
import type { ContentBlock, ContentKind, ContentPage } from "@/lib/content/schema";

/**
 * `<ContentPage kind>` shell — the JSON-driven template shared by comparisons,
 * guides and reviews. The template owns boilerplate (title + dek, breadcrumbs,
 * byline, affiliate + editorial disclosure footer, "How Durza researches" link,
 * mobile sticky CTA, JSON-LD); JSON owns only what is unique to the page.
 */

const KIND_LABEL: Record<ContentKind, string> = {
  guide: "Buying guide",
  review: "Review",
  comparison: "Comparison",
  collection: "Collection",
};

const KIND_SEGMENT: Record<ContentKind, string> = {
  guide: "/guides",
  review: "/reviews",
  comparison: "/compare",
  collection: "/collections",
};

/** Author identity lives once in code/config, not in every JSON document. */
const DEFAULT_AUTHOR = "Durza Research Desk";
const AUTHOR_BIO =
  "The Durza research desk verifies offers against official source pages and tracks affiliate links; it never invents hands-on testing it did not perform.";

function formatDate(value?: string | null): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function faqItems(blocks: ContentBlock[], pageFaqs?: { question: string; answer: string }[]): { q: string; a: string }[] {
  const fromBlock = (blocks.find((b) => b.type === "faq") as { items?: { q: string; a: string }[] } | undefined)?.items ?? [];
  const fromPage = (pageFaqs ?? []).map((i) => ({ q: i.question, a: i.answer }));
  const seen = new Set<string>();
  const out: { q: string; a: string }[] = [];
  for (const i of [...fromBlock, ...fromPage]) {
    const key = i.q.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push({ q: i.q, a: i.a });
  }
  return out;
}

export default function ContentPage({ page, kind }: { page: ContentPage; kind?: ContentKind }) {
  const pageKind = kind ?? page.kind;
  const canonical = absoluteUrl(page.canonical_url ?? editorialPath({ content_type: pageKind, slug: page.slug }));
  const title = page.seo_title ?? page.title;
  const description = page.meta_description ?? page.description;
  const authorName = page.author_name ?? DEFAULT_AUTHOR;
  const published = formatDate(page.published_at);
  const updated = formatDate(page.updated_at);
  const factsChecked = formatDate(page.facts_checked_at);
  const image = page.hero_image_url ? absoluteUrl(page.hero_image_url) : absoluteUrl(`/opengraph-image.png`);

  const breadcrumbs = [
    { name: "Home", item: absoluteUrl("/") },
    { name: KIND_LABEL[pageKind], item: absoluteUrl(KIND_SEGMENT[pageKind]) },
    { name: page.title, item: canonical },
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.name, item: b.item })),
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": pageKind === "review" ? "Review" : "Article",
    headline: page.title,
    name: page.title,
    description,
    url: canonical,
    datePublished: page.published_at ?? undefined,
    dateModified: page.updated_at ?? undefined,
    author: { "@type": /editorial|team/i.test(authorName) ? "Organization" : "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Durza", logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") } },
    image: [image],
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: KIND_LABEL[pageKind],
  };

  const faqs = faqItems(page.content_blocks, page.faqs);
  const faqLd = faqs.length
    ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) }
    : null;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6" itemScope itemType={pageKind === "review" ? "https://schema.org/Review" : "https://schema.org/Article"}>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={articleLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}

      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-ink-soft">
        <ol className="flex flex-wrap items-center gap-2">
          {breadcrumbs.map((b, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden="true">›</span> : null}
              {i === breadcrumbs.length - 1 ? <span className="text-ink">{b.name}</span> : <Link href={b.item} className="hover:text-ink">{b.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>

      <header className="mb-8">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-durza-deep">{KIND_LABEL[pageKind]}</p>
        <h1 className="mt-2 font-serif text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{renderInline(page.title)}</h1>
        {description ? <p className="mt-3 text-lg leading-7 text-ink-soft">{renderInline(description)}</p> : null}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-soft">
          <span>By {authorName}</span>
          {published ? <span>· Published {published}</span> : null}
          {updated ? <span>· Updated {updated}</span> : null}
          {factsChecked ? <span>· Facts checked {factsChecked}</span> : null}
        </div>
        <p className="mt-2 text-xs leading-5 text-ink-soft">{AUTHOR_BIO}</p>
      </header>

      <div className="prose-content">
        <BlockRenderer blocks={page.content_blocks} />
      </div>

      <footer className="mt-12 border-t border-ledger-line pt-6">
        <DisclosureNote commissionDisclosure={null} compact />
        <p className="mt-4 text-sm text-ink-soft">
          <Link href={HOW_DURZA_RESEARCHES_HREF} className="font-medium text-inkblue hover:underline">How Durza researches</Link>
        </p>
      </footer>

      {page.stickyCta ? (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-30 border-t border-ledger-line bg-paper-raised px-4 py-3">
          <a href={page.stickyCta.href} className="block w-full rounded-lg bg-ink px-4 py-3 text-center text-sm font-semibold text-paper-raised hover:bg-ink-soft">
            {page.stickyCta.label}
          </a>
        </div>
      ) : null}
    </article>
  );
}

export { KIND_LABEL };
