"use client";

import { useState } from "react";
import "@/components/home/hero/hero.css";
import { STORE_TOOLS, type StoreTool } from "@/lib/store-tools";
import { ToolGrid } from "./ToolHub";
import ToolDialog from "./ToolDialog";

/** The /tools page body: the same searchable grid as the home-page hub, opening the same tool dialogs. */
export default function ToolsPageClient() {
  const [tool, setTool] = useState<StoreTool | null>(null);
  return (
    <section className="hx hx-portal-flow" aria-label="Shopping tools">
      <div className="hx-bg" aria-hidden="true">
        <div className="hx-aurora" />
        <div className="hx-grain" />
      </div>
      <div style={{ padding: "clamp(20px, 3vw, 36px) 0 clamp(20px, 3vw, 32px)" }}>
        <span className="hx-eyebrow">
          <i aria-hidden="true" />
          {STORE_TOOLS.length} tools · no sign-up · runs in your browser
        </span>
        <h1 className="hx-h1">
          Shopping tools that <span className="hx-grad">do the maths.</span>
        </h1>
        <p className="hx-sub" style={{ marginBottom: 22 }}>
          Calculators, finders and checklists from the store pages we track. Prices and claims on brand-supplied tools are the brand&apos;s own and are labelled that way.
        </p>
        <ToolGrid onPick={setTool} />
      </div>
      <div className="hx-seam" aria-hidden="true" />
      {tool && <ToolDialog tool={tool} onClose={() => setTool(null)} />}
    </section>
  );
}
