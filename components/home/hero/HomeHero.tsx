"use client";

import { useEffect, useRef, useState } from "react";
import type { ActivityItem } from "@/components/home/ActivityTicker";
import type { HeroDeal, HeroStore } from "@/lib/home-hero";
import "./hero.css";
import ToolDialog from "@/components/tools/ToolDialog";
import ToolHubDialog from "@/components/tools/ToolHub";
import { TOOL_ICONS } from "@/components/tools/icons";
import { FEATURED_TOOLS, STORE_TOOLS, TOOLS_BY_ID } from "@/lib/store-tools";
import FeaturedDesk from "./FeaturedDesk";
import HeroBand from "./HeroBand";
import HeroSearch from "./HeroSearch";
import OfferDrawer from "./OfferDrawer";
import VerifyDeskTicker from "./VerifyDeskTicker";
import { usePrefersReducedMotion } from "./hooks";

export interface HomeHeroProps {
  /** Search pool (includes the featured offers). */
  deals: HeroDeal[];
  featured: HeroDeal[];
  stores: HeroStore[];
  popularStores: HeroStore[];
  tickerItems: ActivityItem[];
  stats: { coupons: number; stores: number; categories: number };
  /** Offers the backend re-checked in the last 24h (a real count). */
  checkedToday: number;
}

/**
 * Homepage hero, light theme: verification ticker, headline + command search +
 * quick tools, the featured-offers panel, and a trust/stats band. Owns the two
 * overlays (offer drawer, tool modal) so any entry point — search result,
 * featured card, a tool's related offer — opens the same ones.
 */
export default function HomeHero({ deals, featured, stores, popularStores, tickerItems, stats, checkedToday }: HomeHeroProps) {
  const [drawerDeal, setDrawerDeal] = useState<HeroDeal | null>(null);
  // `fromHub` makes the tool's back arrow return to the list instead of closing.
  const [toolView, setToolView] = useState<{ id: string; fromHub: boolean } | null>(null);
  const [hubOpen, setHubOpen] = useState(false);
  const hubButton = useRef<HTMLButtonElement>(null);
  const activeTool = toolView ? TOOLS_BY_ID.get(toolView.id) ?? null : null;
  const backToHub = () => {
    setToolView(null);
    setHubOpen(true);
  };
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // Dot-grid parallax: one passive listener, frame-throttled, removed on unmount.
  useEffect(() => {
    const el = gridRef.current;
    if (!el || reduced) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.transform = `translateY(${Math.min(window.scrollY, 1000) * 0.12}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section className="hx" aria-label="Today's verified coupons">
      <div className="hx-bg" aria-hidden="true">
        <div className="hx-aurora" />
        <div className="hx-grid" ref={gridRef} />
        <div className="hx-grain" />
      </div>

      <VerifyDeskTicker items={tickerItems} />

      <div className="hx-main">
        <div className="hx-left">
          {checkedToday > 0 && (
            <span className="hx-eyebrow hx-rise" style={{ ["--i" as string]: 0 }}>
              <i aria-hidden="true" />
              {checkedToday.toLocaleString("en-IN")} offers re-checked against store pages today
            </span>
          )}
          <h1 className="hx-h1 hx-rise" style={{ ["--i" as string]: 1 }}>
            Skip the hunt.{" "}
            <br />
            <span className="hx-grad">Copy a code that works.</span>
          </h1>
          <p className="hx-sub hx-rise" style={{ ["--i" as string]: 1 }}>
            India&apos;s verification-first coupon desk — <b>real codes, stated terms, check dates</b>, read from official store pages. No sign-up, no fake timers, ₹0 extra.
          </p>

          <HeroSearch
            deals={deals}
            featured={featured}
            stores={stores}
            popularStores={popularStores}
            totals={{ coupons: stats.coupons, stores: stats.stores }}
            onOpenDeal={setDrawerDeal}
            onOpenTool={(id) => setToolView({ id, fromHub: false })}
          />

          <div className="hx-tools hx-rise" style={{ ["--i" as string]: 3 }}>
            <div className="hx-tools-label">
              Shopping tools <em>— answers in seconds, no sign-up</em>
            </div>
            <div className="hx-toolrow">
              {FEATURED_TOOLS.map((tool) => {
                const Icon = TOOL_ICONS[tool.icon];
                return (
                  <button key={tool.id} type="button" className="hx-toolchip" onClick={() => setToolView({ id: tool.id, fromHub: false })}>
                    <span className={`hx-tc-icon tone-${tool.tone}`} aria-hidden="true">
                      <Icon size={18} strokeWidth={2.1} />
                    </span>
                    <span>
                      <span className="hx-tc-name">{tool.title}</span>
                      <span className="hx-tc-desc">{tool.desc}</span>
                    </span>
                    <span className="hx-tc-time">{tool.time}</span>
                  </button>
                );
              })}
              <button ref={hubButton} type="button" className="hx-toolchip all" onClick={() => setHubOpen(true)}>
                <span>
                  <span className="hx-tc-name">Browse all {STORE_TOOLS.length} shopping tools</span>
                  <span className="hx-tc-desc">Fitness, beauty, fashion, home, tech, family — from our store pages</span>
                </span>
                <span className="hx-tc-time">See all →</span>
              </button>
            </div>
          </div>
        </div>

        <FeaturedDesk deals={featured} total={stats.coupons} onOpenDeal={setDrawerDeal} />
      </div>

      <HeroBand popular={popularStores} moreStores={Math.max(0, stats.stores - popularStores.length)} stats={stats} />
      <div className="hx-seam" aria-hidden="true" />

      {hubOpen && (
        <ToolHubDialog
          onClose={() => setHubOpen(false)}
          onPick={(tool) => {
            setHubOpen(false);
            setToolView({ id: tool.id, fromHub: true });
          }}
        />
      )}
      {activeTool && toolView && (
        <ToolDialog
          key={activeTool.id}
          tool={activeTool}
          deals={deals}
          onClose={() => {
            setToolView(null);
            // The hub card that launched this is gone; put focus back on the hub button.
            if (toolView.fromHub) requestAnimationFrame(() => hubButton.current?.focus());
          }}
          onBack={toolView.fromHub ? backToHub : undefined}
          onOpenDeal={setDrawerDeal}
        />
      )}
      {drawerDeal && <OfferDrawer key={drawerDeal.id} deal={drawerDeal} onClose={() => setDrawerDeal(null)} />}
    </section>
  );
}
