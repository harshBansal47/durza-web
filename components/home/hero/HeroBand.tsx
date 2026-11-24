"use client";

import PendingLink from "@/components/ui/PendingLink";
import type { HeroStore } from "@/lib/home-hero";
import { formatStoreDisplayName } from "@/lib/store-display";
import StoreMark from "./StoreMark";

export default function HeroBand({
  popular,
  moreStores,
  stats,
}: {
  popular: HeroStore[];
  moreStores: number;
  stats: { coupons: number; stores: number; categories: number };
}) {
  const showCounts = stats.coupons >= 5000;
  const items = showCounts
    ? [
        { label: "Active coupons", value: stats.coupons, live: true },
        { label: "Stores tracked", value: stats.stores, live: false },
        { label: "Categories", value: stats.categories, live: false },
      ].filter((s) => s.value > 0)
    : [];

  return (
    <div className="hx-band hx-rise" style={{ ["--i" as string]: 4 }}>
      {popular.length > 0 && (
        <>
          <div className="hx-vline" aria-hidden="true" />
          <div>
            <div className="hx-pop-label">Popular stores</div>
            <div className="hx-poprow">
              {popular.map((store) => (
                <PendingLink key={store.id} href={`/stores/${store.slug}`} className="hx-popchip">
                  <StoreMark store={store} size={20} />
                  {formatStoreDisplayName({ slug: store.slug, name: store.name })}
                </PendingLink>
              ))}
              {moreStores > 0 && (
                <PendingLink href="/stores" className="hx-popchip more">
                  + {moreStores.toLocaleString("en-IN")} more
                </PendingLink>
              )}
            </div>
          </div>
        </>
      )}

      {items.length > 0 && (
        <>
          <div className="hx-vline" aria-hidden="true" />
          <dl className="hx-statcol" style={{ margin: 0 }}>
            {items.map((s) => (
              <div key={s.label}>
                <dd style={{ margin: 0 }}>
                  <div className="hx-num">{s.value.toLocaleString("en-IN")}</div>
                </dd>
                <dt className="hx-lbl">
                  {s.label}
                  {s.live && (
                    <>
                      {" "}
                      <b>· live</b>
                    </>
                  )}
                </dt>
              </div>
            ))}
          </dl>
        </>
      )}
    </div>
  );
}
