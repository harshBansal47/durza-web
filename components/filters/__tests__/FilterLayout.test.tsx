import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FilterLayout from "@/components/filters/FilterLayout";
import KeywordForm from "@/components/filters/KeywordForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/deals",
  useSearchParams: () => new URLSearchParams(),
}));

describe("FilterLayout mobile trigger", () => {
  it("renders no trigger when the page's own toolbar owns it, keeping rows and sidebar panel", () => {
    const { container } = render(
      <FilterLayout mobileDrawer mobileTrigger="none" panel={<p>panel body</p>}>
        <p>result rows</p>
      </FilterLayout>,
    );

    expect(screen.queryByRole("button", { name: "Filters" })).not.toBeInTheDocument();
    expect(container.querySelector("details")).toBeNull();
    expect(container.querySelector("dialog")).toBeNull();
    expect(screen.getByText("result rows")).toBeInTheDocument();
    expect(screen.getByText("panel body")).toBeInTheDocument();
  });

  it("keeps the default trigger when a page does not opt out", () => {
    render(
      <FilterLayout mobileDrawer panel={<p>panel body</p>}>
        <p>result rows</p>
      </FilterLayout>,
    );

    expect(screen.getByRole("button", { name: "Filters" })).toBeInTheDocument();
  });
});

describe("KeywordForm compact bar", () => {
  it("renders the search field with a screen-reader submit button", () => {
    render(<KeywordForm size="bar" placeholder="Search today's deals…" label="Search today's deals" />);

    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search today's deals…")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toHaveClass("sr-only");
  });
});
