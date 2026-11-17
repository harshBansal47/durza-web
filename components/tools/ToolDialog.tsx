"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import StoreMark from "@/components/home/hero/StoreMark";
import { useDialog } from "@/components/home/hero/useDialog";
import type { HeroDeal } from "@/lib/home-hero";
import type { StoreTool } from "@/lib/store-tools";
import { TOOL_ICONS } from "./icons";
import ToolRunner from "./ToolRunner";

/**
 * One tool in a modal: the working tool, a label when the figures are the brand's
 * own, a link to the longer version, and (when the page has them) live offers from
 * the same store. Esc, scrim, close button and focus handling come from useDialog.
 */
export default function ToolDialog({
  tool,
  deals = [],
  onClose,
  onBack,
  onOpenDeal,
}: {
  tool: StoreTool;
  deals?: HeroDeal[];
  onClose: () => void;
  /** Present when opened from the hub: returns to the list instead of closing. */
  onBack?: () => void;
  onOpenDeal?: (deal: HeroDeal) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, onClose);
  const Icon = TOOL_ICONS[tool.icon];
  const related = deals.filter((d) => d.store.slug === tool.store).slice(0, 2);

  return createPortal(
    <div className="hx-portal">
      <div className="hx-scrim" onClick={onClose} aria-hidden="true" />
      <div className="hx-modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="hx-modal-card" ref={ref} role="dialog" aria-modal="true" aria-labelledby="hx-tool-title" tabIndex={-1}>
          <div className="hx-mo-head">
            {onBack && (
              <button type="button" className="hx-iconbtn" aria-label="Back to all tools" onClick={onBack}>
                <ArrowLeft aria-hidden="true" size={14} strokeWidth={2.6} />
              </button>
            )}
            <span className={`hx-mo-icon tone-${tool.tone}`} aria-hidden="true">
              <Icon size={20} strokeWidth={2.1} />
            </span>
            <div style={{ minWidth: 0 }}>
              <div className="hx-mo-title" id="hx-tool-title">{tool.title}</div>
              <div className="hx-mo-sub">{tool.storeName} · {tool.desc}</div>
            </div>
            <button type="button" className="hx-iconbtn" style={{ marginLeft: "auto" }} aria-label="Close tool" onClick={onClose}>
              <X aria-hidden="true" size={14} strokeWidth={2.6} />
            </button>
          </div>
          <div className="hx-mo-body">
            <ToolRunner tool={tool} />
            {tool.brandSupplied && (
              <p className="hx-mo-note hx-brandnote">
                Figures and claims here are {tool.storeName}&apos;s own, copied from its store page. Prices change, and Durza has not independently tested the claims.
              </p>
            )}
            <p className="hx-mo-note">
              <Link href={tool.href} onClick={onClose}>Open the {tool.hrefLabel}</Link>
              {" · "}
              <Link href={`/stores/${tool.store}`} onClick={onClose}>All {tool.storeName} coupons</Link>
            </p>
            {related.length > 0 && onOpenDeal && (
              <div className="hx-mo-deals">
                <div className="hx-md-label">Live offers from {tool.storeName}</div>
                {related.map((deal) => (
                  <button key={deal.id} type="button" className="hx-mo-deal" onClick={() => onOpenDeal(deal)}>
                    <StoreMark store={deal.store} size={28} />
                    <span className="hx-md-t">{deal.title}</span>
                    <span className="hx-md-c">{deal.code ?? deal.discount}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
