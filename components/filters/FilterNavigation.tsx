"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";

interface FilterNavigationValue {
  /** True from the moment a filter is chosen until the new results are on screen. */
  isPending: boolean;
  /** Go to a filtered URL without scrolling, tracked as a pending transition. */
  navigate: (url: string) => void;
}

const FilterNavigationContext = createContext<FilterNavigationValue | null>(null);

/**
 * One place that knows a same-origin navigation is pending.
 *
 * Choosing a filter, sort or search term re-renders a server page — and so does any
 * plain internal link, such as clicking a buying guide. On a slow connection (or a
 * cold cache) that takes a second or more, during which a bare click looks dead.
 *
 * Two routes funnel into the same pending state:
 *  1. `navigate(url)` — the filter/sort/search controls (client-managed, scroll:false).
 *  2. Any same-origin `<a href="/…">` click anywhere in the document, intercepted at
 *     the capture phase (this provider mounts once, near the root) and replayed
 *     through a transition.
 *
 * While pending, the page dims `[data-filter-results]` and shows a shimmering
 * progress bar across the top. External redirects, new tabs, downloads, hash
 * jumps on the current page, and explicit `target`/`download` links are never
 * intercepted.
 */
export function FilterNavigationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (url: string) => {
      startTransition(() => {
        router.push(url, { scroll: false });
      });
    },
    [router],
  );

  // Intercept same-origin anchor clicks document-wide.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("http") || href.startsWith("//") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (href.startsWith("#")) return;
      if (anchor.getAttribute("target") === "_blank") return;
      if (anchor.hasAttribute("download")) return;
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      const current = new URL(window.location.href);
      // Hash-only jump on the current page — browser handles it, not us.
      if (url.pathname === current.pathname && url.search === current.search && url.hash) return;
      // Static asset downloads / media are not route navigations.
      if (/\.(pdf|zip|tar|gz|csv|xlsx|png|jpe?g|webp|avif|gif|svg|mp4|webm|mp3)(?:[?#]|$)/i.test(url.pathname)) return;

      event.preventDefault();
      startTransition(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

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
