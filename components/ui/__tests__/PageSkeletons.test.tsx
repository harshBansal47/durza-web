import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ArticleSkeleton,
  DetailSkeleton,
  ListingSkeleton,
  ResultsSkeleton,
  TileGridSkeleton,
} from "@/components/ui/PageSkeletons";

describe("page skeletons", () => {
  const cases = [
    ["ListingSkeleton", () => <ListingSkeleton label="Loading guides" />, "Loading guides"],
    ["TileGridSkeleton", () => <TileGridSkeleton />, "Loading categories"],
    ["ArticleSkeleton", () => <ArticleSkeleton label="Loading guide" />, "Loading guide"],
    ["ResultsSkeleton", () => <ResultsSkeleton />, "Loading results"],
    ["DetailSkeleton", () => <DetailSkeleton />, "Loading product"],
  ] as const;

  it.each(cases)("%s tells assistive tech it is loading, and nothing else", (_name, view, label) => {
    const { container } = render(view());

    const region = container.firstElementChild as HTMLElement;
    expect(region.getAttribute("aria-busy")).toBe("true");
    expect(screen.getByText(label)).toBeTruthy();
    // Only the screen-reader label is text: no placeholder numbers or words that could be
    // mistaken for real content.
    expect(container.textContent).toBe(label);
  });

  it("draws the requested number of cards", () => {
    const { container } = render(<ListingSkeleton cards={4} />);
    expect(container.querySelectorAll(".rounded-2xl.border")).toHaveLength(4);
  });
});

// NOTE: route-level app/**/loading.tsx files were removed — a streamed shell
// commits HTTP 200 before generateMetadata can call notFound(), so /stores
// and /coupons returned 200 for pages carrying 404 content. The skeletons
// above (components/ui/PageSkeletons.tsx) remain in use wherever a static
// fallback is still helpful.
