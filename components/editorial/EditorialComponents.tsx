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
import { editorialPath } from "@/lib/editorial-path";
import AdSenseSlot from "./AdSenseSlot";

const TYPE_LABELS: Record<EditorialType, string> = {
  guide: "Buying guide",
  review: "Review",
  comparison: "Comparison",
  collection: "Collection",
};

export function EditorialCard({ content }: { content: EditorialContent }) {
  return (
    <article className="info-card lift flex h-full flex-col p-5">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
        {TYPE_LABELS[content.content_type]}
        {content.updated_at ? ` · Updated ${new Date(content.updated_at).toLocaleDateString("en-IN")}` : ""}
      </p>
      <h3 className="mt-3 font-serif text-xl font-extrabold leading-snug text-ink">
        <Link href={editorialPath(content)} className="hover:text-inkblue">
          {content.title}
        </Link>
      </h3>
      {content.summary && <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">{content.summary}</p>}
      <Link
        href={editorialPath(content)}
        className="mt-auto inline-flex min-h-11 items-center pt-4 text-sm font-bold text-inkblue"
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
}: {
  title: string;
  items: EditorialContent[];
  href: string;
  label: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12" aria-label={title}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
            Make a confident choice
          </p>
          <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink sm:text-3xl">{title}</h2>
        </div>
        <Link href={href} className="min-h-11 inline-flex items-center text-sm font-bold text-inkblue hover:underline">
          {label} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 3).map((item) => <EditorialCard key={item.id} content={item} />)}
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

function ContentBlock({ block }: { block: Record<string, unknown> }) {
  const type = asText(block.type) ?? "paragraph";
  const heading = asText(block.heading) ?? asText(block.title);
  const text = asText(block.text) ?? asText(block.body);
  if (type === "heading" || type === "h2" || type === "h3") {
    const label = heading ?? text;
    if (!label) return null;
    return type === "h3" ? (
      <h3 className="mt-8 font-serif text-xl font-bold text-ink">{label}</h3>
    ) : (
      <h2 className="mt-10 font-serif text-2xl font-extrabold text-ink">{label}</h2>
    );
  }
  if (type === "list" || type === "unordered_list" || type === "ordered_list") {
    const items = asStringArray(block.items);
    if (items.length === 0) return null;
    const List = type === "ordered_list" ? "ol" : "ul";
    return (
      <List className="my-5 space-y-2 pl-6 text-base leading-7 text-ink-soft" style={{ listStyleType: type === "ordered_list" ? "decimal" : "disc" }}>
        {items.map((item, index) => <li key={`${index}-${item.slice(0, 24)}`}>{item}</li>)}
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
  if (type === "image") {
    const src = safeHref(block.url) ?? safeHref(block.src);
    if (!src) return null;
    return <figure className="my-8"><Image src={src} alt={asText(block.alt) ?? ""} width={1200} height={675} unoptimized className="h-auto w-full rounded-2xl border border-ledger-line" />{asText(block.caption) && <figcaption className="mt-2 text-center text-sm text-ink-soft">{asText(block.caption)}</figcaption>}</figure>;
  }
  if (!text) return null;
  return <p className="my-5 text-base leading-8 text-ink-soft">{text}</p>;
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
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Make a confident choice</p>
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
  const breadcrumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: "/" },
    { "@type": "ListItem", position: 2, name: TYPE_LABELS[content.content_type], item: editorialPath({ content_type: content.content_type, slug: "" }).replace(/\/$/, "") },
    { "@type": "ListItem", position: 3, name: content.title, item: editorialPath(content) },
  ];
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.meta_description ?? content.summary,
    datePublished: content.published_at ?? content.created_at,
    dateModified: content.updated_at,
    ...(content.author_name ? { author: { "@type": "Person", name: content.author_name } } : {}),
    mainEntityOfPage: content.canonical_url ?? editorialPath(content),
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbs }) }} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft">
        <Link href="/" className="hover:text-inkblue">Home</Link>
        <span className="px-2" aria-hidden="true">/</span>
        <Link href={editorialPath({ content_type: content.content_type, slug: "" }).replace(/\/$/, "")} className="hover:text-inkblue">{TYPE_LABELS[content.content_type]}s</Link>
      </nav>
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">{TYPE_LABELS[content.content_type]}</p>
      <h1 className="mt-3 font-serif text-4xl font-extrabold leading-tight text-ink sm:text-5xl">{content.title}</h1>
      {content.summary && <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-soft">{content.summary}</p>}
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
      {content.hero_image_url && <Image src={content.hero_image_url} alt="" width={1200} height={675} unoptimized className="mt-8 h-auto w-full rounded-2xl border border-ledger-line" />}
      {verdict && <aside className="my-8 rounded-2xl border border-verified/20 bg-verified-soft p-5"><p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-verified">The short answer</p><p className="mt-2 text-base leading-7 text-ink">{verdict}</p>{bestFor && <p className="mt-2 text-sm text-ink-soft"><strong>Best for:</strong> {bestFor}</p>}</aside>}
      {content.content_type === "comparison" && <ComparisonTable data={data} />}
      {content.content_type === "review" && <ReviewHighlights data={data} />}
      {content.content_type === "guide" && asText(data.methodology) && <aside className="my-8 rounded-2xl border border-ledger-line bg-white p-5"><h2 className="font-serif text-lg font-bold text-ink">How we chose</h2><p className="mt-2 text-sm leading-6 text-ink-soft">{asText(data.methodology)}</p></aside>}
      <div className="editorial-body mt-8">
        {content.content_blocks.map((block, index) => <ContentBlock key={`${String(block.type ?? "block")}-${index}`} block={block} />)}
      </div>
      {faqItems.length > 0 && (
        <section className="mt-12" aria-labelledby="editorial-faq-heading">
          <h2 id="editorial-faq-heading" className="font-serif text-2xl font-extrabold text-ink">Frequently asked questions</h2>
          <dl className="mt-4 divide-y divide-ledger-line rounded-2xl border border-ledger-line bg-white px-5">
            {faqItems.map((faq) => <div key={faq.question} className="py-4"><dt className="font-semibold text-ink">{faq.question}</dt><dd className="mt-2 text-sm leading-6 text-ink-soft">{faq.answer}</dd></div>)}
          </dl>
        </section>
      )}
      <LinkedEntities links={content.entity_links} />
      <RelatedEditorial relations={content.relations} />
      <AdSenseSlot eligible={content.adsense_eligible} />
      <p className="mt-10 border-t border-ledger-line pt-5 text-xs leading-5 text-ink-soft">Prices and product features can change. Check the provider’s current terms before purchasing. Recommendations are editorial; paid placements are labeled.</p>
    </article>
  );
}
