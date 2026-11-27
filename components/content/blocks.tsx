import type { ContentBlock } from "@/lib/content/schema";
import CollectionExplorer from "@/components/content/CollectionExplorer";
import { renderInline } from "@/components/content/inline";

/**
 * Block renderer registry. One component per block type, registered in
 * `registry.ts`. Adding a new block = one schema entry + one component here +
 * one registry line. Unknown blocks are skipped/logged by <BlockRenderer>.
 *
 * Reuses the existing design tokens (ink, ink-soft, accent, durza-deep,
 * ledger-line, verified, paper, etc.) — no new visual style.
 */

export const HOW_DURZA_RESEARCHES_HREF = "/guides/how-durza-verifies-offers-methodology-2026";

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

function inlineText(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function headingId(label: string): string {
  return (
    "section-" +
    label
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80)
  );
}

// ---- block components --------------------------------------------------------

export function AudienceBlock({ forWho, skipIf }: { forWho: string[]; skipIf?: string[] }) {
  return (
    <section className="my-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-ledger-line bg-paper-raised p-5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-verified">Best for</p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
          {asStringArray(forWho).map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      </div>
      {asStringArray(skipIf).length ? (
        <div className="rounded-2xl border border-ledger-line bg-paper-raised p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-durza-deep">Skip if</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
            {asStringArray(skipIf).map((item, i) => (
              <li key={i}>{renderInline(item)}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

export function VerdictBlock({
  variant,
  heading,
  body,
  ctas,
}: {
  variant?: "answer10s" | "quick";
  heading?: string;
  body?: string;
  ctas?: { label: string; href: string }[];
}) {
  const label = variant === "answer10s" ? "Answer in 10 seconds" : "The short answer";
  return (
    <aside className="my-8 rounded-2xl border border-verified/20 bg-verified-soft p-5">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-verified">{label}</p>
      {heading ? <p className="mt-2 font-serif text-lg font-semibold text-ink">{renderInline(heading)}</p> : null}
      {body ? <p className="mt-2 text-base leading-7 text-ink">{renderInline(body)}</p> : null}
      {ctas && ctas.length ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {ctas.map((cta, i) => (
            <a key={i} href={cta.href} {...(cta.href.startsWith("/go/") ? { target: "_blank", rel: "sponsored nofollow noopener noreferrer" } : {})} className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper-raised hover:bg-ink-soft">
              {cta.label}
            </a>
          ))}
        </div>
      ) : null}
    </aside>
  );
}

export function ProseBlock({
  id,
  heading,
  level,
  paragraphs,
  badge,
}: {
  id?: string;
  heading?: string;
  level?: "2" | "3";
  paragraphs: string[];
  badge?: string;
}) {
  const Heading = level === "3" ? "h3" : "h2";
  return (
    <section className="my-6" id={id ?? (heading ? headingId(heading) : undefined)}>
      {heading ? (
        <Heading className={level === "3" ? "mt-6 font-sans text-lg font-semibold text-ink" : "mt-8 font-serif text-2xl font-extrabold text-ink"}>
          {renderInline(heading)}
          {badge ? <span className="ml-2 rounded-full bg-accent-faint px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-durza-deep">{badge}</span> : null}
        </Heading>
      ) : null}
      {asStringArray(paragraphs).map((p, i) => (
        <p key={i} className="mt-4 text-base leading-7 text-ink-soft">{renderInline(p)}</p>
      ))}
    </section>
  );
}

export function BulletsBlock({ heading, items }: { heading?: string; items: string[] }) {
  return (
    <section className="my-6">
      {heading ? <h2 className="mt-8 font-serif text-2xl font-extrabold text-ink">{renderInline(heading)}</h2> : null}
      <ul className="my-4 space-y-2 pl-6 text-base leading-7 text-ink-soft" style={{ listStyleType: "disc" }}>
        {asStringArray(items).map((item, i) => <li key={i}>{renderInline(item)}</li>)}
      </ul>
    </section>
  );
}

const CALLOUT_TONE: Record<string, string> = {
  info: "border-ledger-line bg-paper-alt text-ink-soft",
  caution: "border-accent/30 bg-accent-faint text-ink",
  verified: "border-verified/20 bg-verified-soft text-ink",
  disclosure: "border-ledger-line bg-paper-alt text-ink-soft",
};

export function CalloutBlock({ tone, title, text, body }: { tone?: string; title?: string; text?: string; body?: string }) {
  const cls = CALLOUT_TONE[tone ?? "info"] ?? CALLOUT_TONE.info;
  return (
    <aside className={`my-6 rounded-xl border px-4 py-3 ${cls}`}>
      {title ? <p className="font-mono text-[10px] font-bold uppercase tracking-widest">{title}</p> : null}
      <p className="mt-1 text-sm leading-6">{renderInline(body ?? text ?? "")}</p>
    </aside>
  );
}

export function TableBlock({
  id,
  caption,
  columns,
  rows,
  headers,
}: {
  id?: string;
  caption?: string;
  columns?: string[];
  rows: string[][];
  headers?: string[];
}) {
  const cols = asStringArray(columns ?? headers);
  const renderedRows = rows.filter((r) => Array.isArray(r)).map((r) => r.map((c) => (typeof c === "string" ? c : "")));
  return (
    <figure className="my-6" id={id ?? undefined}>
      <div className="overflow-x-auto rounded-xl border border-ledger-line bg-paper-raised">
        <table className="w-full border-collapse text-sm text-ink-soft" data-table>
          {caption ? <caption className="px-4 py-3 text-left font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft">{renderInline(caption)}</caption> : null}
          {cols.length ? (
            <thead>
              <tr className="border-b border-ledger-line bg-paper-alt text-left">
                {cols.map((c, i) => <th key={i} className="px-4 py-3 font-semibold text-ink">{renderInline(c)}</th>)}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {renderedRows.map((row, ri) => (
              <tr key={ri} className="border-t border-ledger-line align-top">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    data-label={cols[ci] ?? ""}
                    className="px-4 py-3 text-ink-soft [&[data-label]]:before:content-[attr(data-label)]"
                  >
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function KeyValueBlock({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="my-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-xl border border-ledger-line bg-paper-raised p-4 text-sm">
      {items.map((item, i) => (
        <div key={i} className="contents">
          <dt className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-soft">{item.label}</dt>
          <dd className="text-ink">{renderInline(item.value)}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProsConsBlock({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <section className="my-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-verified/20 bg-verified-soft p-5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-verified">Pros</p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-ink">{asStringArray(pros).map((p, i) => <li key={i}>{renderInline(p)}</li>)}</ul>
      </div>
      <div className="rounded-2xl border border-accent/30 bg-accent-faint p-5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-durza-deep">Cons</p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-ink">{asStringArray(cons).map((c, i) => <li key={i}>{renderInline(c)}</li>)}</ul>
      </div>
    </section>
  );
}

export function StepsBlock({ heading, items }: { heading?: string; items: { title?: string; body?: string }[] }) {
  return (
    <section className="my-6">
      {heading ? <h2 className="mt-8 font-serif text-2xl font-extrabold text-ink">{renderInline(heading)}</h2> : null}
      <ol className="my-4 space-y-4 text-base leading-7 text-ink-soft" style={{ listStyleType: "decimal" }}>
        {items.map((item, i) => (
          <li key={i} className="pl-1">
            {item.title ? <p className="font-semibold text-ink">{renderInline(item.title)}</p> : null}
            {item.body ? <p className="mt-1">{renderInline(item.body)}</p> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

const STATUS_BADGE: Record<string, string> = {
  confirmed: "bg-verified-soft text-verified-ink",
  expected: "bg-accent-faint text-durza-deep",
  unconfirmed: "bg-paper-alt text-ink-soft",
  reveal_only: "bg-accent-faint text-durza-deep",
  not_reverified: "bg-paper-alt text-ink-soft",
};

export function StatusLedgerBlock({
  rows,
}: {
  rows: { label: string; value: string; status?: string; source?: string }[];
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-ledger-line bg-paper-raised">
      <table className="w-full border-collapse text-sm text-ink-soft" data-table>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-ledger-line align-top first:border-t-0">
              <th className="px-4 py-3 text-left font-mono text-[11px] font-semibold uppercase tracking-wide text-ink">{row.label}</th>
              <td className="px-4 py-3 text-ink">{renderInline(row.value)}</td>
              {row.status ? (
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide ${STATUS_BADGE[row.status] ?? STATUS_BADGE.unconfirmed}`}>
                    {row.status.replace(/_/g, " ")}
                  </span>
                </td>
              ) : <td />}
              {row.source ? <td className="px-4 py-3 text-xs text-ink-soft">{row.source}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FindingsBlock({
  heading,
  items,
}: {
  heading?: string;
  items: { claim: string; detail: string; sourceUrl?: string }[];
}) {
  return (
    <section className="my-6">
      {heading ? <h2 className="mt-8 font-serif text-2xl font-extrabold text-ink">{renderInline(heading)}</h2> : null}
      <ul className="my-4 space-y-4 text-base leading-7 text-ink-soft">
        {items.map((item, i) => (
          <li key={i}>
            <p className="font-semibold text-ink">{renderInline(item.claim)}</p>
            <p className="mt-1">{renderInline(item.detail)}</p>
            {item.sourceUrl ? <a href={item.sourceUrl} className="text-xs text-inkblue underline" target="_blank" rel="noopener noreferrer">Source</a> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function OfferCardsBlock({
  heading,
  items,
}: {
  heading?: string;
  items: { store: string; points: string[]; ctaLabel: string; href: string }[];
}) {
  return (
    <section className="my-8">
      {heading ? <h2 className="mt-8 font-serif text-2xl font-extrabold text-ink">{renderInline(heading)}</h2> : null}
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <div key={i} className="rounded-2xl border border-ledger-line bg-paper-raised p-5">
            <p className="font-serif text-lg font-semibold text-ink">{item.store}</p>
            <ul className="mt-3 space-y-1 text-sm leading-6 text-ink-soft">{asStringArray(item.points).map((p, j) => <li key={j}>{renderInline(p)}</li>)}</ul>
            <a href={item.href} {...(item.href.startsWith("/go/") ? { target: "_blank", rel: "sponsored nofollow noopener noreferrer" } : {})} className="mt-4 inline-block rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper-raised hover:bg-ink-soft">{item.ctaLabel}</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProductLinksBlock({ items }: { items: { label: string; href: string; note?: string }[] }) {
  return (
    <div className="my-6 rounded-2xl border border-ledger-line bg-paper-raised p-5">
      <ul className="space-y-2 text-sm leading-6 text-ink-soft">
        {items.map((item, i) => (
          <li key={i}>
            <a href={item.href} className="font-semibold text-inkblue underline" target="_blank" rel="noopener noreferrer">{item.label}</a>
            {item.note ? <span className="text-ink-soft"> — {item.note}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VerificationBlock({
  verified,
  notVerified,
  checkedAt,
}: {
  verified: unknown[];
  notVerified: unknown[];
  checkedAt?: string;
}) {
  const renderItem = (v: unknown, key: number) => {
    if (typeof v === "string") return <li key={key}>{renderInline(v)}</li>;
    if (v && typeof v === "object") {
      const rec = v as Record<string, unknown>;
      const label = inlineText(rec.label) ?? inlineText(rec.title) ?? inlineText(rec.claim) ?? JSON.stringify(v);
      return <li key={key}>{renderInline(label)}</li>;
    }
    return <li key={key}>{String(v)}</li>;
  };
  return (
    <section className="my-8 rounded-2xl border border-ledger-line bg-paper-raised p-5">
      <h2 className="font-serif text-xl font-semibold text-ink">What we verified, and what we did not</h2>
      {checkedAt ? <p className="mt-1 font-mono text-xs text-ink-soft">Checked {checkedAt}</p> : null}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-verified">Verified</p>
          <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">{asStringArray(verified).length ? verified.map(renderItem) : <li>—</li>}</ul>
        </div>
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-durza-deep">Not verified</p>
          <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">{asStringArray(notVerified).length ? notVerified.map(renderItem) : <li>—</li>}</ul>
        </div>
      </div>
    </section>
  );
}

export function FaqBlock({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="my-8" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-serif text-2xl font-extrabold text-ink">Frequently asked questions</h2>
      <div className="mt-4 divide-y divide-ledger-line rounded-2xl border border-ledger-line bg-paper-raised">
        {items.map((item, i) => (
          <details key={i} className="group px-5 py-4" open={i === 0}>
            <summary className="cursor-pointer list-none font-semibold text-ink">{renderInline(item.q)}</summary>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{renderInline(item.a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function SourcesBlock({
  items,
}: {
  items: { title: string; url: string; checkedAt?: string; type?: string }[];
}) {
  return (
    <section className="my-8" aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="font-serif text-2xl font-extrabold text-ink">Sources</h2>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-ink-soft">
        {items.map((item, i) => (
          <li key={i}>
            <a href={item.url} className="text-inkblue underline" target="_blank" rel="noopener noreferrer">{item.title}</a>
            {item.checkedAt ? <span className="text-ink-soft"> · checked {item.checkedAt}</span> : null}
            {item.type ? <span className="text-ink-soft"> · {item.type}</span> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RelatedBlock({ groups }: { groups: { label: string; links: { title: string; href: string }[] }[] }) {
  return (
    <section className="my-10" aria-labelledby="related-heading">
      <h2 id="related-heading" className="font-serif text-2xl font-extrabold text-ink">Related</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {groups.map((group, i) => (
          <div key={i}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-durza-deep">{group.label}</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              {group.links.map((link, j) => <li key={j}><a href={link.href} className="text-inkblue underline">{link.title}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HeadingBlock({ heading }: { heading: string }) {
  return <h2 id={headingId(heading)} className="mt-10 font-serif text-2xl font-extrabold text-ink">{renderInline(heading)}</h2>;
}

export function H2Block({ heading }: { heading: string }) {
  return <h2 id={headingId(heading)} className="mt-10 font-serif text-2xl font-extrabold text-ink">{renderInline(heading)}</h2>;
}

export function H3Block({ heading }: { heading: string }) {
  return <h3 id={headingId(heading)} className="mt-8 font-sans text-lg font-semibold text-ink">{renderInline(heading)}</h3>;
}

export function ParagraphBlock({ text }: { text: string }) {
  return <p className="mt-4 text-base leading-7 text-ink-soft">{renderInline(text)}</p>;
}

export function ListBlock({ items }: { items: string[] }) {
  return (
    <ul className="my-4 space-y-2 pl-6 text-base leading-7 text-ink-soft" style={{ listStyleType: "disc" }}>
      {asStringArray(items).map((item, i) => <li key={i}>{renderInline(item)}</li>)}
    </ul>
  );
}

export function OrderedListBlock({ items }: { items: string[] }) {
  return (
    <ol className="my-4 space-y-2 pl-6 text-base leading-7 text-ink-soft" style={{ listStyleType: "decimal" }}>
      {asStringArray(items).map((item, i) => <li key={i}>{renderInline(item)}</li>)}
    </ol>
  );
}

export type { ContentBlock };

const SHOW_PRICES = process.env.NEXT_PUBLIC_SHOW_PRICES === "1";

function brandInitial(name: string): string {
  const t = (name || "").trim();
  return t ? t.charAt(0).toUpperCase() : "?";
}

export function TierTableBlock({ tiers }: { tiers?: unknown[] }) {
  return (
    <div>
      {(tiers || []).map((t: any, i: number) => (
        <section key={i}>
          <h3>{t?.label}</h3>
          {t?.suits ? <p>{t.suits}</p> : null}
          <ul>{(t?.stepIds || []).map((sid: string, j: number) => <li key={j}>{sid}</li>)}</ul>
        </section>
      ))}
    </div>
  );
}

export function CollectionGroupBlock({ items }: { items: unknown[] }) {
  return (
    <div>
      {(items || []).map((it: any, i: number) => {
        const o = it?._original || {};
        const name = o.name || it?.name || it?.product || "";
        const href = o.ctaHref || it?.href || it?.affiliate_href || "#";
        const imageUrl = it?.image_url || it?.image || o.image_url || null;
        const price = it?.price_inr ?? it?.priceLabel ?? null;
        const priceCheckedAt = it?.price_checked_at ?? null;
        const badge = o.storeBadge || it?.badge || it?.store || null;
        return (
          <div key={i}>
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="" />
            ) : (
              <div aria-hidden="true">{brandInitial(name)}</div>
            )}
            {badge ? <span>{badge}</span> : null}
            <a href={href}>{name}</a>
            {o.why ? <p>{o.why}</p> : null}
            {o.skipIf ? <p>{o.skipIf}</p> : null}
            {SHOW_PRICES && price != null && priceCheckedAt ? (
              <span>{typeof price === "number" ? `₹${price}` : price}</span>
            ) : SHOW_PRICES ? (
              <span>Check price</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function QuickPicksBlock({ lists }: { lists?: unknown[] }) {
  return (
    <div>
      {(lists || []).map((l: any, i: number) => (
        <section key={i}>
          {l?.heading ? <h3>{l.heading}</h3> : null}
          <ul>
            {(l?.items || []).map((it: any, j: number) => {
              const href = it?.href || it?._original?.ctaHref || "#";
              return <li key={j}><a href={href}>{it?.label || it?.name || it?.product}</a></li>;
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function KitTrayBlock({ enabled, shareText }: { enabled?: boolean; shareText?: string }) {
  if (enabled === false) return null;
  return <div data-kit-tray="">{shareText ? <span>{shareText}</span> : null}</div>;
}


export function ExplorerBlock({ children }: { children?: React.ReactNode }) {
  return <CollectionExplorer>{children}</CollectionExplorer>;
}
