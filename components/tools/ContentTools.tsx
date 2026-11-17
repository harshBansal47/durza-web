"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getAffiliateLink } from "@/lib/affiliate";
import { basketTotals, diaperRanking, gearFor, type StoreTool, type ToolCta } from "@/lib/store-tools";
import { Result, inr } from "./fields";

type Of<K extends StoreTool["kind"]> = Extract<StoreTool, { kind: K }>;

/** Tracked outbound link, built exactly like the store pages build theirs. */
export function CtaLink({ store, cta }: { store: StoreTool["store"]; cta: ToolCta }) {
  return (
    <a className="hx-cta hx-cta-inline" href={getAffiliateLink(store, cta.url, cta.sub)} target="_blank" rel="nofollow sponsored noopener">
      {cta.label}
      <ExternalLink aria-hidden="true" size={14} strokeWidth={2.4} />
    </a>
  );
}

function Points({ items, ordered }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className="hx-terms">
      {items.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </Tag>
  );
}

export function GuideTool({ tool }: { tool: Of<"guide"> }) {
  return (
    <>
      {tool.intro && <p className="hx-intro">{tool.intro}</p>}
      {tool.paragraphs?.map((p) => (
        <p className="hx-intro" key={p}>
          {p}
        </p>
      ))}
      {tool.steps && (
        <ol className="hx-steps">
          {tool.steps.map((s, i) => (
            <li key={s.title ?? s.detail}>
              <span className="n" aria-hidden="true">
                {tool.ordered === false ? "•" : i + 1}
              </span>
              <span>
                {s.title && <b>{s.title}: </b>}
                {s.detail}
              </span>
            </li>
          ))}
        </ol>
      )}
      {tool.cta && <CtaLink store={tool.store} cta={tool.cta} />}
    </>
  );
}

export function ChooserTool({ tool }: { tool: Of<"chooser"> }) {
  const [id, setId] = useState(tool.defaultId);
  const opt = tool.options.find((o) => o.id === id) ?? tool.options[0];
  const cta = opt.cta ?? tool.cta;
  return (
    <>
      {tool.intro && <p className="hx-intro">{tool.intro}</p>}
      {tool.facts && (
        <div className="hx-facts">
          {tool.facts.map((f) => (
            <div key={f.title}>
              <b>{f.title}</b>
              <span>{f.detail}</span>
            </div>
          ))}
        </div>
      )}
      <div className="hx-field" role="group" aria-label="Choose an option">
        <div className="hx-seg stack">
          {tool.options.map((o) => (
            <button key={o.id} type="button" aria-pressed={o.id === opt.id} onClick={() => setId(o.id)}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <div className="hx-result" role="status" aria-live="polite">
        {opt.title && <div className="hx-r-main" style={{ fontSize: 18 }}>{opt.title}</div>}
        {opt.body && <p className="hx-r-body">{opt.body}</p>}
        {opt.points && <Points items={opt.points} />}
        {opt.compare && (
          <div className="hx-compare">
            {[opt.compare.left, opt.compare.right].map((side, i) => (
              <div key={side.label} className={i === 1 ? "win" : undefined}>
                <b>{side.label}</b>
                <Points items={side.points} />
              </div>
            ))}
          </div>
        )}
        {opt.rows && (
          <div className="hx-r-rows">
            {opt.rows.map(([k, v]) => (
              <div className="hx-r-row" key={k}>
                <span>{k}</span>
                <b>{v}</b>
              </div>
            ))}
          </div>
        )}
        {opt.note && <p className="hx-r-body" style={{ marginTop: 10 }}>{opt.note}</p>}
      </div>
      {tool.footnote && <p className="hx-mo-note" style={{ marginTop: 0, marginBottom: 12 }}>{tool.footnote}</p>}
      {cta && <CtaLink store={tool.store} cta={cta} />}
    </>
  );
}

export function BasketTool({ tool }: { tool: Of<"basket"> }) {
  const [selected, setSelected] = useState<string[]>(tool.defaults);
  const t = basketTotals(tool.items, selected, tool.rules);
  const toggle = (id: string) => setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const rows: [string, string][] = [["Subtotal", `₹${inr(t.subtotal)}`]];
  const { code, percent, minSubtotal, upiPct, freeShipAt } = tool.rules;
  rows.push([
    percent != null ? `${code} (${Math.round(percent * 100)}% off)` : `${code}${!t.codeMet && minSubtotal ? ` (needs ₹${inr(minSubtotal)}+)` : ""}`,
    `− ₹${inr(t.discount)}`,
  ]);
  if (upiPct != null) rows.push([`${Math.round(upiPct * 100)}% UPI instant deduction`, `− ₹${inr(t.upi)}`]);
  if (freeShipAt != null) rows.push([`Free shipping (₹${inr(freeShipAt)}+)`, t.freeShip ? "Unlocked" : `Add ₹${inr(t.shortfall)} more`]);
  return (
    <>
      <p className="hx-intro">{tool.intro}</p>
      <div className="hx-field" role="group" aria-label="Pick items for your cart">
        <div className="hx-seg stack">
          {tool.items.map((i) => (
            <button key={i.id} type="button" aria-pressed={selected.includes(i.id)} onClick={() => toggle(i.id)}>
              {i.label}
            </button>
          ))}
        </div>
      </div>
      <Result label="You pay" main={<>₹{inr(t.net)}</>} rows={rows} />
      <p className="hx-mo-note" style={{ marginBottom: 12 }}>Item prices and discount rules are the ones the store lists on its page. Confirm the final price at checkout.</p>
      <CtaLink store={tool.store} cta={tool.cta} />
    </>
  );
}

export function TableTool({ tool }: { tool: Of<"table"> }) {
  const [type, setType] = useState<"All" | "Stroller" | "Car Seat">("All");
  let content: ReactNode;
  if (tool.table === "diapers") {
    const rows = diaperRanking();
    content = (
      <div className="hx-table-wrap">
        <table className="hx-table">
          <caption className="sr-only">Diapers ranked by cost per pant</caption>
          <thead><tr><th>Brand</th><th>Pack</th><th>Price</th><th>Cost / pant</th></tr></thead>
          <tbody>
            {rows.map((d, i) => (
              <tr key={`${d.brand}-${d.pack}`} className={i === 0 ? "best" : undefined}>
                <td>{d.brand}</td><td>{d.pack}</td><td>₹{inr(d.price)}</td><td><b>₹{d.perPant.toFixed(2)}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    const rows = gearFor(type);
    content = (
      <>
        <div className="hx-field" role="group" aria-label="Gear type">
          <div className="hx-seg">
            {(["All", "Stroller", "Car Seat"] as const).map((f) => (
              <button key={f} type="button" aria-pressed={type === f} onClick={() => setType(f)}>{f}</button>
            ))}
          </div>
        </div>
        <div className="hx-table-wrap">
          <table className="hx-table">
            <caption className="sr-only">Baby gear comparison</caption>
            <thead><tr><th>Product</th><th>Type</th><th>Weight</th><th>Fold</th></tr></thead>
            <tbody>
              {rows.map((g) => (
                <tr key={g.name}><td>{g.name}</td><td>{g.type}</td><td>{g.weight}</td><td>{g.fold}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  return (
    <>
      {content}
      <p className="hx-mo-note" style={{ marginBottom: 12 }}>
        {tool.table === "diapers" ? "Pack sizes and prices are as listed on the store page and can change; cheapest per pant is highlighted." : "Specs as listed on the store page. Check the store for current availability and safety certification."}
      </p>
      {tool.cta && <CtaLink store={tool.store} cta={tool.cta} />}
    </>
  );
}

export function StoreLinkTool({ tool }: { tool: Of<"store-link"> }) {
  return (
    <>
      <p className="hx-intro">
        This one recommends from {tool.storeName}&apos;s live product list, so it runs on the store page where that list is loaded.
      </p>
      <Link className="hx-cta hx-cta-inline" href={tool.href}>
        Open the {tool.storeName} tool
      </Link>
    </>
  );
}
