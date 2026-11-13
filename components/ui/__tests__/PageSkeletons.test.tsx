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

describe("route loading files", () => {
  const loaders = import.meta.glob("/app/**/loading.tsx", { eager: true }) as Record<string, { default: () => React.JSX.Element }>;

  it("finds the loaders (guards against the glob silently matching nothing)", () => {
    expect(Object.keys(loaders).length).toBeGreaterThanOrEqual(15);
  });

  it.each(Object.entries(loaders))("%s renders a busy region", (_path, module) => {
    const Loading = module.default;
    const { container } = render(<Loading />);
    expect(container.querySelector('[aria-busy="true"]')).toBeTruthy();
  });
});
