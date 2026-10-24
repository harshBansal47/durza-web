import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  EditorialContent,
  EditorialEntityLink,
  EditorialFAQ,
  EditorialRelation,
  EditorialType,
} from "@/lib/types";
import { api } from "@/lib/api";
import PageTitle from "@/components/ui/PageTitle";
import { editorialPath } from "@/lib/editorial-path";
import { absoluteUrl, faqPageJsonLd } from "@/lib/seo";
import GuideArt from "./GuideArt";
import { SITE_URL } from "@/lib/site";
import { BRAND } from "@/lib/brand";
import { renderBrandText } from "@/lib/brandMentions";
import AdSenseSlot from "./AdSenseSlot";

const TYPE_LABELS: Record<EditorialType, string> = {
  guide: "Buying guide",
  review: "Review",
  comparison: "Comparison",
  collection: "Collection",
};


/** Rough reading time from a guide's own content blocks (real data). */
function guideReadMinutes(content: EditorialContent): number {
  let words = 0;
  for (const block of content.content_blocks ?? []) {
    const b = block as Record<string, unknown>;
    for (const key of ["text", "body", "heading", "title", "summary"]) {
      const v = b[key];
      if (typeof v === "string") words += v.split(/\s+/).filter(Boolean).length;
    }
    if (Array.isArray(b.paragraphs)) {
      for (const p of b.paragraphs) if (typeof p === "string") words += p.split(/\s+/).filter(Boolean).length;
    }
  }
  if (words === 0 && content.summary) words = content.summary.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function EditorialCard({ content, wide = false }: { content: EditorialContent; wide?: boolean }) {
  const isGuide = content.content_type === "guide";
  const readTime = guideReadMinutes(content);
  const updated = content.updated_at ? new Date(content.updated_at).toLocaleDateString("en-IN") : null;

  return (
    <article className={`info-card lift flex h-full flex-col ${wide ? "sm:col-span-2 lg:col-span-3" : ""} p-5`}>
      {isGuide && (
        <GuideArt
          title={content.title}
          summary={content.summary}
          heroImageUrl={content.hero_image_url}
          className="mb-4"
        />
      )}
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
        {TYPE_LABELS[content.content_type]}
        {updated ? ` · Updated ${updated}` : ""}
      </p>
      <h3 className={`${wide ? "mt-3 text-2xl" : "mt-3 text-xl"} font-serif font-extrabold leading-snug text-ink`}>
        <Link href={editorialPath(content)} className="hover:text-durza-deep">
          {content.title}
        </Link>
      </h3>
      {content.summary && (
        <p className={`${wide ? "mt-3 line-clamp-4 text-base" : "mt-2 line-clamp-3 text-sm"} leading-6 text-ink-soft`}>
          {content.summary}
        </p>
      )}
      {isGuide && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
          <span className="inline-flex items-center gap-1">{readTime} min read</span>
          {updated && <span>Updated {updated}</span>}
        </div>
      )}
      <Link
        href={editorialPath(content)}
        className="mt-auto inline-flex min-h-11 items-center pt-4 text-sm font-bold text-durza-deep"
      >
        Read {content.content_type === "comparison" ? "comparison" : content.content_type} <span aria-hidden="true"> →</span>
      </Link>
    </article>
  );
}

export function EditorialSection({
  title,
  items,
  href,
  label,
  wideFirst = false,
}: {
  title: string;
  items: EditorialContent[];
  href: string;
  label: string;
  wideFirst?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12" aria-label={title}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
            Make a confident choice
          </p>
          <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink sm:text-3xl">{title}</h2>
        </div>
        <Link href={href} className="min-h-11 inline-flex items-center text-sm font-bold text-durza-deep hover:underline">
          {label} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 3).map((item, index) => (
          <EditorialCard key={item.id} content={item} wide={wideFirst && index === 0} />
        ))}
      </div>
    </section>
  );
}

function asText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function safeHref(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function absoluteHref(value: string): string {
  return /^https?:\/\//i.test(value) ? value : absoluteUrl(value);
}

function headingLabel(block: Record<string, unknown>): string | null {
  const type = asText(block.type) ?? "paragraph";
  if (type !== "heading" && type !== "h2" && type !== "h3") return null;
  return asText(block.heading) ?? asText(block.title) ?? asText(block.text);
}

function headingId(block: Record<string, unknown>, index: number): string | undefined {
  const label = headingLabel(block);
  if (!label) return undefined;
  const slug = label
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `section-${index}-${slug || "section"}`;
}

function countWords(value: unknown): number {
  if (typeof value === "string") return value.trim() ? value.trim().split(/\s+/).length : 0;
  if (Array.isArray(value)) {
    return value.reduce<number>((total, item) => total + countWords(item), 0);
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).reduce<number>(
      (total, item) => total + countWords(item),
      0,
    );
  }
  return 0;
}

function Sources({ sources }: { sources: unknown }) {
  if (!Array.isArray(sources)) return null;
  const items = sources.flatMap((source) => {
    if (!source || typeof source !== "object") return [];
    const record = source as Record<string, unknown>;
    const url = safeHref(record.url);
    if (!url || !/^https?:\/\//i.test(url)) return [];
    const title = asText(record.title) ?? url;
    const publisher = asText(record.publisher);
    const note = asText(record.note);
    const accessed = asText(record.accessed_at);
    const accessedLabel =
      accessed && !Number.isNaN(Date.parse(accessed))
        ? new Date(accessed).toLocaleDateString("en-IN")
        : null;
    return [{ url, title, publisher, note, accessedLabel }];
  });
  if (items.length === 0) return null;
  return (
    <section className="mt-12" aria-labelledby="editorial-sources-heading">
      <h2 id="editorial-sources-heading" className="font-serif text-2xl font-extrabold text-ink">
        Sources
      </h2>
      <p className="mt-2 text-sm leading-6 text-ink-soft">
        These are the official pages and references used when this guide was checked.
      </p>
      <ol className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.url} className="rounded-xl border border-ledger-line bg-white px-4 py-3 text-sm leading-6">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-inkblue underline decoration-inkblue/30 underline-offset-2 hover:decoration-inkblue"
            >
              {item.title}
            </a>
            {item.publisher && <span className="text-ink-soft"> · {item.publisher}</span>}
            {item.accessedLabel && (
              <span className="text-ink-soft"> · checked {item.accessedLabel}</span>
            )}
            {item.note && <p className="mt-1 text-ink-soft">{item.note}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}

function ContentBlock({ block, id }: { block: Record<string, unknown>; id?: string }) {
  const type = asText(block.type) ?? "paragraph";
  const heading = asText(block.heading) ?? asText(block.title);
  const text = asText(block.text) ?? asText(block.body);
  if (type === "heading" || type === "h2" || type === "h3") {
    const label = heading ?? text;
    if (!label) return null;
    return type === "h3" ? (
      <h3 id={id} className="mt-8 scroll-mt-24 font-serif text-xl font-bold text-ink">
        {renderBrandText(label)}
      </h3>
    ) : (
      <h2 id={id} className="mt-10 scroll-mt-24 font-serif text-2xl font-extrabold text-ink">
        {renderBrandText(label)}
      </h2>
    );
  }
  if (type === "list" || type === "unordered_list" || type === "ordered_list") {
    const items = asStringArray(block.items);
    if (items.length === 0) return null;
    const List = type === "ordered_list" ? "ol" : "ul";
    return (
      <List className="my-5 space-y-2 pl-6 text-base leading-7 text-ink-soft" style={{ listStyleType: type === "ordered_list" ? "decimal" : "disc" }}>
        {items.map((item, index) => <li key={`${index}-${item.slice(0, 24)}`}>{renderBrandText(item)}</li>)}
      </List>
    );
  }
  if (type === "callout" || type === "quote") {
    if (!text) return null;
    return <blockquote className="my-6 border-l-4 border-sun bg-sun-soft px-5 py-4 text-base leading-7 text-ink">{text}</blockquote>;
  }
  if (type === "table" && Array.isArray(block.rows)) {
    const headers = asStringArray(block.headers);
    const rows = block.rows.filter((row): row is unknown[] => Array.isArray(row));
    return (
      <div className="my-6 overflow-x-auto rounded-2xl border border-ledger-line bg-white">
        <table className="min-w-full text-left text-sm">
          {headers.length > 0 && <thead className="bg-paper"><tr>{headers.map((cell) => <th key={cell} scope="col" className="px-4 py-3 font-bold text-ink">{cell}</th>)}</tr></thead>}
          <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex} className="border-t border-ledger-line">{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 text-ink-soft">{String(cell ?? "")}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }
  if (type === "image" || type === "gif") {
    const src = safeHref(block.url) ?? safeHref(block.src);
    if (!src) return null;
    const isGif = /\.gif(?:[?#].*)?$/i.test(src) || type === "gif";
    return (
      <figure className="my-8">
        <Image
          src={src}
          alt={asText(block.alt) ?? ""}
          width={1200}
          height={675}
          unoptimized
          loading="lazy"
          className={`h-auto w-full rounded-2xl border border-ledger-line ${isGif ? "bg-paper" : ""}`}
        />
        {asText(block.caption) && <figcaption className="mt-2 text-center text-sm text-ink-soft">{asText(block.caption)}</figcaption>}
      </figure>
    );
  }
  if (!text) return null;
  return <p className="my-5 text-base leading-8 text-ink-soft">{renderBrandText(text)}</p>;
}

function ComparisonTable({ data }: { data: Record<string, unknown> }) {
  const features = Array.isArray(data.features) ? data.features : Array.isArray(data.comparison_features) ? data.comparison_features : [];
  const rows = features.filter((row): row is Record<string, unknown> => Boolean(row) && typeof row === "object" && !Array.isArray(row));
  if (rows.length === 0) return null;
  const leftName = asText(data.left_name) ?? "Option A";
  const rightName = asText(data.right_name) ?? "Option B";
  return (
    <section className="my-10" aria-labelledby="comparison-table-heading">
      <h2 id="comparison-table-heading" className="mb-4 font-serif text-2xl font-extrabold text-ink">At a glance</h2>
      <div className="overflow-x-auto rounded-2xl border border-ledger-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-paper"><tr><th scope="col" className="px-4 py-3">Feature</th><th scope="col" className="px-4 py-3">{leftName}</th><th scope="col" className="px-4 py-3">{rightName}</th></tr></thead>
          <tbody>{rows.map((row, index) => <tr key={index} className="border-t border-ledger-line"><th scope="row" className="px-4 py-3 font-semibold text-ink">{asText(row.name) ?? asText(row.feature) ?? `Feature ${index + 1}`}</th><td className="px-4 py-3 text-ink-soft">{String(row.left ?? row.product_a ?? "—")}</td><td className="px-4 py-3 text-ink-soft">{String(row.right ?? row.product_b ?? "—")}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

function ReviewHighlights({ data }: { data: Record<string, unknown> }) {
  const pros = asStringArray(data.pros);
  const cons = asStringArray(data.cons);
  if (pros.length === 0 && cons.length === 0) return null;
  return (
    <section className="my-8 grid gap-4 sm:grid-cols-2" aria-label="Review pros and cons">
      {[[ "Pros", pros ], [ "Cons", cons ]].map(([title, values]) => (
        <div key={title as string} className="rounded-2xl border border-ledger-line bg-white p-5">
          <h2 className="font-serif text-xl font-bold text-ink">{title as string}</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
            {(values as string[]).map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true">{title === "Pros" ? "+" : "-"}</span>{item}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}

async function LinkedEntities({ links }: { links: EditorialEntityLink[] }) {
  const ordered = [...links].sort((a, b) => a.sort_order - b.sort_order);
  const resolved = await Promise.all(ordered.map(async (link) => {
    if (link.store_id) {
      const entity = await api.getStoreById(link.store_id).catch(() => null);
      return entity ? { href: `/stores/${entity.slug}`, label: link.anchor_text ?? entity.name } : null;
    }
    if (link.product_id) {
      const entity = await api.getProductById(link.product_id).catch(() => null);
      return entity ? { href: `/products/${entity.slug}`, label: link.anchor_text ?? entity.name } : null;
    }
    if (link.coupon_id) {
      const entity = await api.getCouponById(link.coupon_id).catch(() => null);
      return entity ? { href: `/coupons/${entity.slug}`, label: link.anchor_text ?? entity.title } : null;
    }
    if (link.category_id) {
      const categories = await api.listCategories({ limit: 100 }).catch(() => null);
      const entity = categories?.items.find((item) => item.id === link.category_id);
      return entity ? { href: `/categories/${entity.slug}`, label: link.anchor_text ?? entity.name } : null;
    }
    return null;
  }));
  const items = resolved.filter((item): item is NonNullable<typeof item> => item !== null);
  if (items.length === 0) return null;
  return (
    <nav className="my-10" aria-label="Related stores and offers">
      <h2 className="mb-3 font-serif text-xl font-bold text-ink">Explore related savings</h2>
      <ul className="flex flex-wrap gap-2">{items.map((item) => <li key={item.href}><Link href={item.href} className="inline-flex min-h-11 items-center rounded-full border border-ledger-line bg-white px-4 text-sm font-semibold text-inkblue hover:border-inkblue/40">{item.label}</Link></li>)}</ul>
    </nav>
  );
}

async function RelatedEditorial({ relations }: { relations: EditorialRelation[] }) {
  if (relations.length === 0) return null;
  const types: EditorialType[] = ["guide", "review", "comparison", "collection"];
  const lists = await Promise.all(types.map((content_type) => api.listEditorial({ content_type, limit: 100 }).catch(() => null)));
  const byId = new Map(lists.flatMap((list) => list?.items ?? []).map((item) => [item.id, item]));
  const items = [...relations]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((relation) => byId.get(relation.related_content_id))
    .filter((item): item is EditorialContent => item !== undefined);
  if (items.length === 0) return null;
  return (
    <section className="mt-12" aria-label="Related editorial content">
      <div className="mb-5">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Make a confident choice</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Keep exploring</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 3).map((item) => <EditorialCard key={item.id} content={item} />)}
      </div>
    </section>
  );
}

export function EditorialListing({ items }: { items: EditorialContent[] }) {
  if (items.length === 0) {
    return <p className="rounded-2xl border border-dashed border-ledger-line bg-white p-8 text-center text-ink-soft">No published content here yet. Check back as our editors add useful buying advice.</p>;
  }
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <EditorialCard key={item.id} content={item} />)}</div>;
}

export default async function EditorialArticle({ content }: { content: EditorialContent }) {
  const data = content.structured_data ?? {};
  const verdict = asText(data.verdict);
  const bestFor = asText(data.best_for);
  const checkedAt = asText(data.checked_at);
  const faqItems: EditorialFAQ[] = [...content.faqs].sort((a, b) => a.sort_order - b.sort_order);
  const keyTakeaways = asStringArray(data.key_takeaways);
  const keywordValues = Array.isArray(data.keywords)
    ? asStringArray(data.keywords)
    : typeof data.keywords === "string"
      ? data.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean)
      : [];
  const tocItems = content.content_blocks.flatMap((block, index) => {
    const label = headingLabel(block);
    const id = headingId(block, index);
    if (!label || !id) return [];
    const type = asText(block.type) ?? "paragraph";
    return [{ id, label, level: type === "h3" ? 3 : 2 }];
  });
  const articleWords =
    countWords(content.content_blocks) + countWords(faqItems) + countWords(content.summary);
  const adCount = articleWords >= 1200 ? 4 : articleWords >= 900 ? 3 : 2;
  const blockCount = content.content_blocks.length;
  const midAdPositions =
    adCount >= 4 && blockCount >= 3
      ? [Math.max(1, Math.floor(blockCount / 3)), Math.max(2, Math.floor((blockCount * 2) / 3))]
      : adCount === 3 && blockCount >= 2
        ? [Math.max(1, Math.floor(blockCount / 2))]
        : [];
  const contentAdSlot = process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT;
  const topAdSlot =
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP || BRAND.adsenseSlots.top || contentAdSlot;
  const midAdSlot =
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID || BRAND.adsenseSlots.mid || contentAdSlot;
  const lowerAdSlot =
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_LOWER || BRAND.adsenseSlots.lower || contentAdSlot;
  const endAdSlot =
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_END || BRAND.adsenseSlots.end || contentAdSlot;

  const breadcrumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    {
      "@type": "ListItem",
      position: 2,
      name: TYPE_LABELS[content.content_type],
      item: absoluteUrl(editorialPath({ content_type: content.content_type, slug: "" }).replace(/\/$/, "")),
    },
    { "@type": "ListItem", position: 3, name: content.title, item: absoluteUrl(editorialPath(content)) },
  ];
  const canonicalPath = content.canonical_url ?? editorialPath(content);
  const canonicalUrl = absoluteHref(canonicalPath);
  const heroImage = content.hero_image_url
    ? absoluteHref(content.hero_image_url)
    : content.content_type === "guide"
      ? absoluteUrl(`/guides/${content.slug}/opengraph-image`)
      : absoluteUrl("/opengraph-image");
  const author = content.author_name
    ? {
        "@type": /editorial|team/i.test(content.author_name) ? "Organization" : "Person",
        name: content.author_name,
        url: absoluteUrl("/about"),
      }
    : undefined;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.meta_description ?? content.summary,
    datePublished: content.published_at ?? content.created_at,
    dateModified: content.updated_at,
    ...(author ? { author } : {}),
    publisher: {
      "@type": "Organization",
      name: "Durza",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    image: [heroImage],
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    articleSection: TYPE_LABELS[content.content_type],
    ...(keywordValues.length > 0 ? { keywords: keywordValues.join(", ") } : {}),
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbs }) }} />
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqItems)) }}
        />
      )}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft">
        <Link href="/" className="hover:text-inkblue">Home</Link>
        <span className="px-2" aria-hidden="true">/</span>
        <Link href={editorialPath({ content_type: content.content_type, slug: "" }).replace(/\/$/, "")} className="hover:text-inkblue">{TYPE_LABELS[content.content_type]}s</Link>
      </nav>
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">{TYPE_LABELS[content.content_type]}</p>
      <PageTitle className="mt-3 leading-tight">{content.title}</PageTitle>
      {content.summary && <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-soft">{renderBrandText(content.summary)}</p>}
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink-soft">
        {content.author_name && <span>By {content.author_name}</span>}
        {content.published_at && <time dateTime={content.published_at}>Published {new Date(content.published_at).toLocaleDateString("en-IN")}</time>}
        <time dateTime={content.updated_at}>Updated {new Date(content.updated_at).toLocaleDateString("en-IN")}</time>
        {checkedAt && <span>Pricing checked {new Date(checkedAt).toLocaleDateString("en-IN")}</span>}
      </div>
      <p className="mt-5 rounded-xl border border-inkblue/15 bg-inkblue/[0.04] px-4 py-3 text-sm leading-6 text-ink-soft">
        We may earn a commission when you buy through links on this page. This does not change the price you pay. See our{" "}
        <Link href="/affiliate-disclosure" className="font-semibold text-inkblue underline">affiliate disclosure</Link>.
      </p>
      {(content.hero_image_url || content.content_type === "guide") && (
        <GuideArt
          title={content.title}
          summary={content.summary}
          heroImageUrl={content.hero_image_url}
          size="hero"
          className="mt-8"
        />
      )}
      {verdict && <aside className="my-8 rounded-2xl border border-verified/20 bg-verified-soft p-5"><p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-verified">The short answer</p><p className="mt-2 text-base leading-7 text-ink">{verdict}</p>{bestFor && <p className="mt-2 text-sm text-ink-soft"><strong>Best for:</strong> {bestFor}</p>}</aside>}
      {keyTakeaways.length > 0 && (
        <aside className="my-8 rounded-2xl border border-inkblue/15 bg-inkblue/[0.04] p-5" aria-labelledby="key-takeaways-heading">
          <h2 id="key-takeaways-heading" className="font-serif text-lg font-bold text-ink">Key takeaways</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
            {keyTakeaways.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true">•</span>{item}</li>)}
          </ul>
        </aside>
      )}
      {content.content_type === "comparison" && <ComparisonTable data={data} />}
      {content.content_type === "review" && <ReviewHighlights data={data} />}
      {content.content_type === "guide" && asText(data.methodology) && <aside className="my-8 rounded-2xl border border-ledger-line bg-white p-5"><h2 className="font-serif text-lg font-bold text-ink">How we chose</h2><p className="mt-2 text-sm leading-6 text-ink-soft">{asText(data.methodology)}</p></aside>}
      {tocItems.length >= 3 && (
        <nav aria-label="On this page" className="my-8 rounded-2xl border border-ledger-line bg-white p-5">
          <h2 className="font-serif text-lg font-bold text-ink">On this page</h2>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {tocItems.map((item) => (
              <li key={item.id} className={item.level === 3 ? "pl-4" : undefined}>
                <a href={`#${item.id}`} className="text-sm font-semibold text-inkblue hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <AdSenseSlot eligible={content.adsense_eligible} slot={topAdSlot} />
      <div className="editorial-body mt-8">
        {content.content_blocks.map((block, index) => (
          <Fragment key={`${String(block.type ?? "block")}-${index}`}>
            <ContentBlock block={block} id={headingId(block, index)} />
            {midAdPositions[0] === index && (
              <AdSenseSlot eligible={content.adsense_eligible} slot={midAdSlot} />
            )}
            {midAdPositions[1] === index && (
              <AdSenseSlot
                eligible={content.adsense_eligible}
                slot={lowerAdSlot}
                desktopOnly
              />
            )}
          </Fragment>
        ))}
      </div>
      <AdSenseSlot eligible={content.adsense_eligible} slot={endAdSlot} />
      {faqItems.length > 0 && (
        <section className="mt-12" aria-labelledby="editorial-faq-heading">
          <h2 id="editorial-faq-heading" className="font-serif text-2xl font-extrabold text-ink">Frequently asked questions</h2>
          <dl className="mt-4 divide-y divide-ledger-line rounded-2xl border border-ledger-line bg-white px-5">
            {faqItems.map((faq) => <div key={faq.question} className="py-4"><dt className="font-semibold text-ink">{renderBrandText(faq.question)}</dt><dd className="mt-2 text-sm leading-6 text-ink-soft">{renderBrandText(faq.answer)}</dd></div>)}
          </dl>
        </section>
      )}
      <Sources sources={data.sources} />
      <LinkedEntities links={content.entity_links} />
      <RelatedEditorial relations={content.relations} />
      <p className="mt-10 border-t border-ledger-line pt-5 text-xs leading-5 text-ink-soft">Prices and product features can change. Check the provider’s current terms before purchasing. Recommendations are editorial; paid placements are labeled.</p>
    </article>
  );
}
