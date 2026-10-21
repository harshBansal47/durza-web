"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { isAnalyticsAllowed } from "@/lib/consent";

export function ContentViewTracker({ contentId, contentType }: { contentId: string; contentType: string }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current || !isAnalyticsAllowed()) return;
    fired.current = true;
    track("content_view", { content_id: contentId, content_type: contentType });
  }, [contentId, contentType]);
  return null;
}

export function ScrollTracker() {
  const fired = useRef(new Set<number>());
  useEffect(() => {
    if (!isAnalyticsAllowed()) return;
    const handler = () => {
      const pct = Math.round((window.scrollY + window.innerHeight) / Math.max(1, document.body.scrollHeight) * 100);
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark && !fired.current.has(mark)) {
          fired.current.add(mark);
          track("scroll", { depth: mark });
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return null;
}

export function EngagedTimeTracker() {
  const start = useRef<number | null>(null);
  const total = useRef(0);
  useEffect(() => {
    if (!isAnalyticsAllowed()) return;
    const tick = () => {
      if (document.visibilityState === "visible") {
        if (start.current === null) start.current = Date.now();
      } else if (start.current !== null) {
        total.current += Date.now() - start.current;
        start.current = null;
      }
    };
    const send = () => {
      tick();
      const ms = Math.min(total.current + (start.current ? Date.now() - start.current : 0), 300000);
      track("engaged_time", { ms });
    };
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("pagehide", send);
    return () => {
      document.removeEventListener("visibilitychange", tick);
      window.removeEventListener("pagehide", send);
    };
  }, []);
  return null;
}
