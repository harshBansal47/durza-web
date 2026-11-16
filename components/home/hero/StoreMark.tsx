"use client";

import { useState } from "react";
import Image from "next/image";
import { storeInitials } from "@/lib/catalog";
import type { HeroStore } from "@/lib/home-hero";

/**
 * Store identity tile: the real logo when we have one, otherwise the store's
 * initials on a soft tint of its accent. Accent colours are decorative only
 * (see lib/storeLogos.ts), so text is always ink, never the accent.
 */
export default function StoreMark({ store, size = 40 }: { store: Pick<HeroStore, "name" | "logoUrl" | "accent">; size?: number }) {
  const [failed, setFailed] = useState(false);
  const showLogo = Boolean(store.logoUrl) && !failed;
  return (
    <span
      aria-hidden="true"
      className="hx-mono"
      style={{
        ["--s" as string]: `${size}px`,
        ...(!showLogo && store.accent ? { background: `${store.accent}22`, borderColor: `${store.accent}55` } : {}),
      }}
    >
      {showLogo && store.logoUrl ? (
        <Image src={store.logoUrl} alt="" width={size} height={size} onError={() => setFailed(true)} />
      ) : (
        storeInitials(store.name)
      )}
    </span>
  );
}
