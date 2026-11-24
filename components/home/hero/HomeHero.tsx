"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { HeroDeal, HeroStore } from "@/lib/home-hero";
import "./hero.css";
import FeaturedDesk from "./FeaturedDesk";
import HeroBand from "./HeroBand";
import HeroSearch from "./HeroSearch";
import OfferDrawer from "./OfferDrawer";
import { usePrefersReducedMotion } from "./hooks";

export interface HomeHeroProps {
  /** Search pool (includes the featured offers). */
  deals: HeroDeal[];
  featured: HeroDeal[];
  stores: HeroStore[];
  popularStores: HeroStore[];
  stats: { coupons: number; stores: number; categories: number };
  /** Offers the backend re-checked in the last 24h (a real count). */
}

/**
 * Homepage hero, light theme: verification ticker, headline + command search +
 * the featured-offers panel and a trust/stats band. Owns the offer drawer so
 * any entry point — search result or featured card — opens the same one.
 */
export default function HomeHero({ deals, featured, stores, popularStores, stats }: HomeHeroProps) {
  const [drawerDeal, setDrawerDeal] = useState<HeroDeal | null>(null);
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
    <section className="hx" aria-label="Current offers">
      <div className="hx-bg" aria-hidden="true">
        <div className="hx-aurora" />
        <div className="hx-grid" ref={gridRef} />
        <div className="hx-grain" />
      </div>

      <div className="hx-main">
        <div className="hx-left">
          <h1 className="hx-h1 hx-rise" style={{ ["--i" as string]: 1 }}>
            Discover genuine deals.{" "}
            <br />
            <span className="hx-grad">Shop smarter. Save more.</span>
          </h1>
          <p className="hx-sub hx-rise" style={{ ["--i" as string]: 1 }}>
            Curated shopping opportunities from stores we track. Every offer states its type; a last-checked date appears when known.
          </p>

          <HeroSearch
            deals={deals}
            featured={featured}
            stores={stores}
            popularStores={popularStores}
            totals={{ coupons: stats.coupons, stores: stats.stores }}
            onOpenDeal={setDrawerDeal}
          />

        </div>

        <div className="hx-right">
          <FeaturedDesk deals={featured} total={stats.coupons} onOpenDeal={setDrawerDeal} />

        </div>
      </div>

      <HeroBand popular={popularStores} moreStores={Math.max(0, stats.stores - popularStores.length)} stats={stats} />
      <div className="hx-seam" aria-hidden="true" />

      {drawerDeal && <OfferDrawer key={drawerDeal.id} deal={drawerDeal} onClose={() => setDrawerDeal(null)} />}
    </section>
  );
}
