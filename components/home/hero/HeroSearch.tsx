"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { track } from "@/lib/analytics";
import { buildHeroResults, SCOPES, splitHighlight, type HeroScope } from "@/lib/hero-search";
import type { HeroDeal, HeroStore } from "@/lib/home-hero";
import StoreMark from "./StoreMark";
import { TOOL_ICONS } from "@/components/tools/icons";
import { STORE_TOOLS, type StoreTool } from "@/lib/store-tools";
import { useMediaQuery, usePrefersReducedMotion } from "./hooks";
import { hasOpenOverlay } from "./useDialog";

const GROUP_LABEL = { deal: "Matching offers", store: "Stores", tool: "Instant tools" } as const;

function Highlight({ text, query }: { text: string; query: string }) {
  const [before, match, after] = splitHighlight(text, query);
  return (
    <>
      {before}
      {match && <mark>{match}</mark>}
      {after}
    </>
  );
}

/**
 * The hero's command search. It searches the offers, stores and tools already on
 * the page (instant, no network); anything it cannot answer goes to /search.
 * Combobox keyboard model: ↑/↓ move, ↵ opens, Esc closes (then clears), "/" focuses.
 */
export default function HeroSearch({
  deals,
  featured,
  stores,
  popularStores,
  totals,
  onOpenDeal,
  onOpenTool,
}: {
  deals: HeroDeal[];
  featured: HeroDeal[];
  stores: HeroStore[];
  popularStores: HeroStore[];
  totals: { coupons: number; stores: number };
  onOpenDeal: (deal: HeroDeal) => void;
  onOpenTool: (id: string) => void;
}) {
  const router = useRouter();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<HeroScope>("all");
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(0);
  // After an overlay closes, focus returns to the input programmatically. That must not
  // pop the dropdown back open; any real interaction (key, pointer, typing) re-arms it.
  const quietFocus = useRef(false);
  const compact = useMediaQuery("(max-width: 640px)");
  const reduced = usePrefersReducedMotion();

  const results = useMemo(
    () => buildHeroResults<HeroDeal, HeroStore, StoreTool>(query, scope, { deals, featured, stores, popularStores, tools: STORE_TOOLS }),
    [query, scope, deals, featured, stores, popularStores],
  );
  const trimmed = query.trim();
  const active = results.length > 0 ? Math.min(sel, results.length - 1) : -1;

  // "/" focuses the search from anywhere that is not a text field or an open overlay.
  useEffect(() => {
    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey || hasOpenOverlay()) return;
      const el = event.target as HTMLElement | null;
      if (el && (/^(input|textarea|select)$/i.test(el.tagName) || el.isContentEditable)) return;
      event.preventDefault();
      quietFocus.current = false;
      inputRef.current?.focus();
      inputRef.current?.scrollIntoView?.({ block: "center", behavior: reduced ? "auto" : "smooth" });
      setOpen(true);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [reduced]);

  // Click/tap outside closes the list.
  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (zoneRef.current && !zoneRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  // Keep the highlighted row visible while arrowing.
  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current?.querySelector<HTMLElement>(`[data-ri="${active}"]`)?.scrollIntoView?.({ block: "nearest" });
  }, [open, active]);

  function goToFullSearch() {
    if (!trimmed) return;
    track("search", { query: trimmed, src: "homepage-hero" });
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  function pick(index: number) {
    const result = results[index];
    if (!result) return;
    setOpen(false);
    quietFocus.current = true;
    if (result.type === "deal") onOpenDeal(result.deal);
    else if (result.type === "tool") onOpenTool(result.tool.id);
    else router.push(`/stores/${result.store.slug}`);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (results.length === 0) return;
      setSel((active + (event.key === "ArrowDown" ? 1 : -1) + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (open && active >= 0 && results[active]) pick(active);
      else goToFullSearch();
    } else if (event.key === "Escape") {
      if (open) {
        event.preventDefault();
        setOpen(false);
      } else if (query) {
        setQuery("");
      }
    }
  }

  const placeholder = compact
    ? "Search stores, codes, tools…"
    : `Search ${totals.stores > 0 ? `${totals.stores.toLocaleString("en-IN")} stores` : "stores"}, ${
        totals.coupons > 0 ? `${totals.coupons.toLocaleString("en-IN")} codes` : "codes"
      }, ${STORE_TOOLS.length} tools…`;

  const headings = results.map((r) => (r.type === "deal" && !trimmed ? "Fresh-checked picks" : GROUP_LABEL[r.type]));
  return (
    <div
      className="hx-searchzone hx-rise"
      style={{ ["--i" as string]: 2 }}
      ref={zoneRef}
      role="search"
      aria-label="Search offers, stores and tools"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <div className="hx-searchbox">
        <Search className="sicon" aria-hidden="true" size={20} strokeWidth={2.4} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          aria-label="Search stores, codes and tools"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
          onChange={(event) => {
            setQuery(event.target.value);
            setSel(0);
            setOpen(true);
          }}
          onFocus={() => {
            if (!quietFocus.current) setOpen(true);
          }}
          onPointerDown={() => {
            quietFocus.current = false;
            setOpen(true);
          }}
          onKeyDown={(event) => {
            quietFocus.current = false;
            onKeyDown(event);
          }}
        />
        {query ? (
          <button
            type="button"
            className="hx-clear"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setSel(0);
              inputRef.current?.focus();
            }}
          >
            <X aria-hidden="true" size={13} strokeWidth={2.6} />
          </button>
        ) : (
          <span className="hx-kbd" aria-hidden="true">
            /
          </span>
        )}
      </div>

      <div className="hx-scopes" role="tablist" aria-label="Search scope">
        {SCOPES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            className="hx-scope"
            aria-selected={scope === s.id}
            onClick={() => {
              setScope(s.id);
              setSel(0);
              setOpen(true);
              inputRef.current?.focus();
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {open && (
        <div className="hx-results" id={listId} role="listbox" aria-label="Search results" ref={listRef}>
          {results.length === 0 ? (
            <div className="hx-empty">
              Nothing in today&apos;s picks matches <b>“{trimmed}”</b>.
              <br />
              Try a store like <b>HealthKart</b>, a code like <b>SV10VC</b>, or a tool like <b>protein</b>.
              {trimmed && (
                <>
                  <br />
                  <Link href={`/search?q=${encodeURIComponent(trimmed)}`} className="hx-foot-link" style={{ fontWeight: 700, color: "var(--hx-orange-deep)" }}>
                    Search the whole catalogue for “{trimmed}” →
                  </Link>
                </>
              )}
            </div>
          ) : (
            <>
              {results.map((result, i) => {
                const heading = headings[i];
                const showHeading = i === 0 || headings[i - 1] !== heading;
                const common = {
                  id: `${listId}-${i}`,
                  role: "option" as const,
                  "data-ri": i,
                  "aria-selected": i === active,
                  className: "hx-item",
                  onMouseDown: (e: React.MouseEvent) => e.preventDefault(),
                  onMouseEnter: () => setSel(i),
                  onClick: () => pick(i),
                };
                return (
                  <div key={`${result.type}-${i}`}>
                    {showHeading && <div className="hx-group">{heading}</div>}
                    {result.type === "deal" && (
                      <button type="button" {...common}>
                        <StoreMark store={result.deal.store} size={34} />
                        <span className="hx-item-body">
                          <span className="hx-item-title">
                            <Highlight text={result.deal.title} query={trimmed} />
                          </span>
                          <span className="hx-item-meta">
                            {result.deal.store.name}
                            {result.deal.checkedLabel ? ` · checked ${result.deal.checkedLabel}` : ""} · {result.deal.discount}
                          </span>
                        </span>
                        <span className={`hx-badge ${result.deal.code ? "code" : "deal"}`}>{result.deal.code ?? "DEAL"}</span>
                      </button>
                    )}
                    {result.type === "store" && (
                      <button type="button" {...common}>
                        <StoreMark store={result.store} size={34} />
                        <span className="hx-item-body">
                          <span className="hx-item-title">
                            <Highlight text={result.store.name} query={trimmed} />
                          </span>
                          <span className="hx-item-meta">
                            {result.store.offerCount != null ? `${result.store.offerCount} live offers` : "Store page"}
                          </span>
                        </span>
                        <span className="hx-badge store">{result.store.offerCount != null ? `${result.store.offerCount} offers` : "STORE"}</span>
                      </button>
                    )}
                    {result.type === "tool" && (() => {
                      const Icon = TOOL_ICONS[result.tool.icon];
                      return (
                        <button type="button" {...common}>
                          <span className={`hx-tc-icon tone-${result.tool.tone}`} style={{ width: 34, height: 34 }} aria-hidden="true">
                            <Icon size={17} strokeWidth={2.1} />
                          </span>
                          <span className="hx-item-body">
                            <span className="hx-item-title">
                              <Highlight text={result.tool.title} query={trimmed} />
                            </span>
                            <span className="hx-item-meta">{result.tool.storeName} · {result.tool.desc}</span>
                          </span>
                          <span className="hx-badge tool">{result.tool.time}</span>
                        </button>
                      );
                    })()}
                  </div>
                );
              })}
              <div className="hx-foot">
                <span><b>↑↓</b> navigate</span>
                <span><b>↵</b> open</span>
                <span><b>esc</b> close</span>
                {trimmed ? (
                  <Link href={`/search?q=${encodeURIComponent(trimmed)}`}>All results for “{trimmed}” →</Link>
                ) : (
                  <span style={{ marginLeft: "auto" }}>
                    <b>{results.length}</b> suggestion{results.length === 1 ? "" : "s"}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
