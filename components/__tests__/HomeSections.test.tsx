import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tag } from "lucide-react";
import BannerCarousel from "@/components/home/BannerCarousel";
import CategoryGrid from "@/components/home/CategoryGrid";
import StoreScroller from "@/components/home/StoreScroller";
import ActivityTicker from "@/components/home/ActivityTicker";
import FeaturedBanner from "@/components/home/FeaturedBanner";
import Hero from "@/components/home/Hero";
import SectionTitle from "@/components/SectionTitle";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("BannerCarousel", () => {
  it("renders every slide as a labelled group with working links", () => {
    render(<BannerCarousel />);
    expect(screen.getAllByRole("group")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Browse coupons" })).toHaveAttribute("href", "/coupons");
    expect(screen.getByRole("button", { name: "Next slide" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to slide 2" })).toBeInTheDocument();
  });
});

describe("CategoryGrid", () => {
  it("links each category and the all-categories tile", () => {
    render(<CategoryGrid categories={[{ id: "1", name: "Electronics", slug: "electronics" }]} />);
    expect(screen.getByRole("link", { name: /Electronics/ })).toHaveAttribute("href", "/categories/electronics");
    expect(screen.getByRole("link", { name: /All categories/ })).toHaveAttribute("href", "/categories");
  });

  it("renders nothing for an empty list", () => {
    const { container } = render(<CategoryGrid categories={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("StoreScroller", () => {
  it("renders nothing without stores", () => {
    const { container } = render(<StoreScroller stores={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("gives every logo card an accessible store name", () => {
    render(<StoreScroller stores={[{ id: "1", name: "Amazon", slug: "amazon" }]} />);
    expect(screen.getByRole("link", { name: "Amazon" })).toHaveAttribute("href", "/stores/amazon");
  });

  it("contains the hidden name inside the card, not the scroll rail", () => {
    render(<StoreScroller stores={[{ id: "1", name: "Amazon", slug: "amazon" }]} />);
    const link = screen.getByRole("link", { name: "Amazon" });
    // The sr-only label is position:absolute. Without a positioned ancestor in
    // the card, its containing block becomes the section and it escapes the
    // rail's overflow clip — each label then stretches the document's width.
    expect(link).toHaveClass("relative");
    expect(link.querySelector("span.sr-only")).toHaveTextContent("Amazon");
  });
});

describe("ActivityTicker", () => {
  const items = [
    { kind: "verified" as const, text: "Code SAVE20 confirmed 2 minutes ago" },
    { kind: "percent" as const, text: "60% off at Lenskart" },
  ];

  it("renders nothing without activity", () => {
    const { container } = render(<ActivityTicker items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("repeats the tape for the loop but hides the duplicate from assistive tech", () => {
    render(<ActivityTicker items={items} />);
    const lines = screen.getAllByText("Code SAVE20 confirmed 2 minutes ago");
    expect(lines).toHaveLength(2);
    expect(lines.filter((node) => node.closest('[aria-hidden="true"]'))).toHaveLength(1);
  });

  it("offers a pause control (WCAG 2.2.2)", async () => {
    const user = userEvent.setup();
    render(<ActivityTicker items={items} />);
    const pause = screen.getByRole("button", { name: /pause activity ticker/i });
    await user.click(pause);
    expect(screen.getByRole("button", { name: /play activity ticker/i })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("FeaturedBanner", () => {
  it("states the tracked top percentage honestly and links to the biggest discounts", () => {
    render(<FeaturedBanner percent={62} />);
    expect(screen.getByText(/Up to 62% off/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /See the biggest discounts/ })).toHaveAttribute(
      "href",
      "/coupons?sort=biggest_discount",
    );
  });
});

describe("SectionTitle", () => {
  it("renders an optional action link next to the title", () => {
    render(
      <SectionTitle hint="tracked offers" icon={Tag} action={{ href: "/deals", label: "Browse all deals" }}>
        Latest deals
      </SectionTitle>,
    );
    expect(screen.getByRole("heading", { name: "Latest deals" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Browse all deals/ })).toHaveAttribute("href", "/deals");
  });
});

describe("Hero", () => {
  it("only shows stats that are greater than zero (no fabricated numbers)", () => {
    render(
      <Hero
        stats={[
          { label: "Active coupons", value: 12 },
          { label: "Stores", value: 0 },
        ]}
        popularStores={[]}
      />,
    );
    expect(screen.getByText("Active coupons")).toBeInTheDocument();
    expect(screen.queryByText("Stores")).not.toBeInTheDocument();
  });

  it("has a labelled product search with instant suggestions", () => {
    render(<Hero stats={[]} popularStores={[{ id: "1", name: "Nike", slug: "nike" }]} />);
    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByLabelText("Search stores, brands, categories")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Nike" })).toHaveAttribute("href", "/stores/nike");
  });

  it("shows an honest empty spotlight instead of a fabricated deal", () => {
    render(<Hero stats={[]} popularStores={[]} spotlight={[]} />);
    expect(screen.getByText(/No featured deal right now/)).toBeInTheDocument();
  });
});
