"use client";

import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import { useDialog } from "@/components/home/hero/useDialog";
import { STORE_TOOLS, TOOL_CATEGORIES, toolsByCategory, type StoreTool, type ToolCategory } from "@/lib/store-tools";
import { TOOL_ICONS } from "./icons";

/**
 * Searchable grid of every tool. Used inside the home-page dialog and on /tools.
 * `onPick` receives the chosen tool; the parent decides how to open it.
 */
export function ToolGrid({ onPick, autoFocus = false }: { onPick: (tool: StoreTool) => void; autoFocus?: boolean }) {
  const [category, setCategory] = useState<ToolCategory | "all">("all");
  const [query, setQuery] = useState("");
  const shown = useMemo(() => toolsByCategory(category, query), [category, query]);
  const counts = useMemo(() => new Map(TOOL_CATEGORIES.map((c) => [c.id, STORE_TOOLS.filter((t) => t.category === c.id).length])), []);

  return (
    <div>
      <div className="hx-searchbox" style={{ height: 48, boxShadow: "none" }}>
        <Search className="sicon" aria-hidden="true" size={18} strokeWidth={2.4} />
        <input
          type="search"
          autoFocus={autoFocus}
          value={query}
          placeholder={`Search ${STORE_TOOLS.length} tools…`}
          aria-label="Search tools"
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button type="button" className="hx-clear" aria-label="Clear tool search" onClick={() => setQuery("")}>
            <X aria-hidden="true" size={13} strokeWidth={2.6} />
          </button>
        )}
      </div>
      <div className="hx-scopes" role="group" aria-label="Tool categories">
        <button type="button" className="hx-scope" aria-pressed={category === "all"} onClick={() => setCategory("all")}>
          All {STORE_TOOLS.length}
        </button>
        {TOOL_CATEGORIES.map((c) => (
          <button key={c.id} type="button" className="hx-scope" aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>
            {c.label} {counts.get(c.id)}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="hx-empty">No tool matches “{query}”. Try a store name, like <b>Sirona</b>, or a topic, like <b>protein</b>.</p>
      ) : (
        <div className="hx-tgrid">
          {shown.map((tool) => {
            const Icon = TOOL_ICONS[tool.icon];
            return (
              <button key={tool.id} type="button" className="hx-tcard" onClick={() => onPick(tool)}>
                <span className={`hx-tc-icon tone-${tool.tone}`} aria-hidden="true">
                  <Icon size={18} strokeWidth={2.1} />
                </span>
                <span className="hx-tcard-body">
                  <span className="hx-tc-name">{tool.title}</span>
                  <span className="hx-tc-desc">{tool.storeName} · {tool.desc}</span>
                </span>
                <span className="hx-tc-time">{tool.time}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ToolHubDialog({ onClose, onPick }: { onClose: () => void; onPick: (tool: StoreTool) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, onClose, 'input[type="search"]');
  return createPortal(
    <div className="hx-portal">
      <div className="hx-scrim" onClick={onClose} aria-hidden="true" />
      <div className="hx-modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="hx-modal-card wide" ref={ref} role="dialog" aria-modal="true" aria-labelledby="hx-hub-title" tabIndex={-1}>
          <div className="hx-mo-head">
            <div>
              <div className="hx-mo-title" id="hx-hub-title">Shopping tools</div>
              <div className="hx-mo-sub">Calculators, finders and checklists from our store pages — no sign-up</div>
            </div>
            <button type="button" className="hx-iconbtn" style={{ marginLeft: "auto" }} aria-label="Close tools" onClick={onClose}>
              <X aria-hidden="true" size={14} strokeWidth={2.6} />
            </button>
          </div>
          <div className="hx-mo-body">
            <ToolGrid onPick={onPick} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
