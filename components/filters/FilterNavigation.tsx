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
 * One place that knows a filtered page is loading.
 *
 * Choosing a filter, sort or search term re-renders a server page, which on a
 * slow connection (or a cold cache) takes a second or more. With a bare
 * `router.push` nothing on screen changes during that time, so people click
 * again, and again. Routing every filter control through here lets the page
 * show that the click was received: a progress bar across the top and the old
 * results dimmed and unclickable until the new ones arrive.
 *
 * Mounted once, near the root, so controls outside the listing layout (the
 * search box, the sort menu, the chips) are covered too.
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
          aria-label="Loading results"
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
