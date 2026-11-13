"use client";

import { useState } from "react";
import { cleanSegment } from "@/lib/subid";

/**
 * SSR computes the href from the raw link; on client hydration the visitor's
 * `utm_source` is folded into `content_ref` (e.g. `homepage/top|id|instagram`),
 * so the redirect records the ad platform the click came from.
 *
 * Computed lazily during state initialisation and unchanged afterwards —
 * identical output between server and client, no post-mount rewrite.
 */
export function useTrackedHref(href: string): string {
  const [final] = useState(() => {
    if (typeof window === "undefined") return href;
    try {
      const utm = new URLSearchParams(window.location.search).get("utm_source");
      if (!utm) return href;
      const url = new URL(href, window.location.origin);
      const ref = url.searchParams.get("content_ref");
      if (!ref) return href;
      url.searchParams.set("content_ref", `${ref}:${cleanSegment(utm)}`.slice(0, 78));
      return `${url.pathname}${url.search}`;
    } catch {
      return href;
    }
  });
  return final;
}
