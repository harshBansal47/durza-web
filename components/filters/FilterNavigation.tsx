"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

interface FilterNavigationValue {
  /** True from the moment a filter is chosen until the new results are on screen. */
  isPending: boolean;
  /** Go to a filtered URL without scrolling, tracked as a pending transition. */
  navigate: (url: string) => void;
}

const FilterNavigationContext = createContext<FilterNavigationValue | null>(null);

/**
 * One place that knows *something* happened on the screen after a click — either a
 * full navigation is pending (bar + shimmer) or the browser is handing the reader
 * to a store/sponsor in a new tab (a toast that names the destination).
 *
 * Two flavours of feedback, by design:
 *  1. Same-origin, in-place navigation — `startTransition(router.push(…))`; the top
 *     progress shimmer and `data-filtering` dimming signal the wait.
 *  2. Anything that opens elsewhere — outbound store/affiliate anchors, our `/go/`
 *     redirect links, `target="_blank"` — the click is never intercepted (the tab
 *     opens as usual); the toast tells the reader where they're going.
 *
 * Filter/search/sort controls keep the original API (`navigate`) so listings still
 * route without scrolling.
 */

/** A few destinations shoppers recognise by name; everything else shows its host. */
function outboundLabel(url: URL): string {
  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (host === "track.vcommission.com") return "the store — hang tight";
  if (host === "tjzuh.com") return "Acer India — hang tight";
  if (/amazon\./.test(host)) return "Amazon.in in a new tab";
  return `${host} in a new tab`;
}

export function FilterNavigationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (url: string) => {
      startTransition(() => {
        router.push(url, { scroll: false });
      });
    },
    [router],
  );

  // Intercept same-origin internal clicks and confirm outbound opens.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) return;
      if (anchor.getAttribute("target") === "_blank") {
        // Confirmation for opens-in-new-tab — internal or external.
        const url = new URL(href, window.location.origin);
        const sameOrigin = url.origin === window.location.origin;
        toast(
          sameOrigin ? `Opening in a new tab — hang tight` : `Opening ${outboundLabel(url)}`,
          { type: "info", duration: 2400 },
        );
        return; // default opens the tab; nothing to intercept
      }
      if (anchor.hasAttribute("download")) return;
      const url = new URL(href, window.location.origin);
      const sameOrigin = url.origin === window.location.origin;
      // Outbound stores and our affiliate redirect hop — confirm instead of bar.
      if (!sameOrigin || url.pathname.startsWith("/go/")) {
        toast(
          url.pathname.startsWith("/go/")
            ? "Opening the store — hang tight"
            : `Opening ${outboundLabel(url)}`,
          { type: "info", duration: 2400 },
        );
        return; // default behaviour opens the destination; nothing to prevent
      }
      // Same-origin, in-place navigation — top bar via transition.
      event.preventDefault();
      startTransition(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, toast]);

  // CSS reads this to dim `[data-filter-results]` (see globals.css).
  useEffect(() => {
    document.body.toggleAttribute("data-filtering", isPending);
    return () => document.body.removeAttribute("data-filtering");
  }, [isPending]);

  const value = useMemo(() => ({ isPending, navigate }), [isPending, navigate]);

  return (
    <FilterNavigationContext.Provider value={value}>
      {isPending && (
        <div
          role="progressbar"
          aria-label="Loading"
          className="fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden bg-accent/20"
        >
          <div className="filter-progress-bar h-full w-1/3 bg-accent" />
        </div>
      )}
      {children}
    </FilterNavigationContext.Provider>
  );
}

/** Navigate to a filtered URL. Outside the provider (tests, isolated use) it still navigates. */
export function useFilterNavigation(): FilterNavigationValue {
  const context = useContext(FilterNavigationContext);
  const router = useRouter();
  if (context) return context;
  return { isPending: false, navigate: (url) => router.push(url, { scroll: false }) };
}
