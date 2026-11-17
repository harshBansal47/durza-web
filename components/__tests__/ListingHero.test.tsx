import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ListingHero from "@/components/listing/ListingHero";

describe("ListingHero", () => {
  it("keeps the exact title text for SEO and tints only the last word", () => {
    render(<ListingHero title="Today's deals in India" lead="Lead copy" />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Today's deals in India");
    expect(h1.querySelector(".hx-grad")).toHaveTextContent("India");
  });

  it("handles a one-word title", () => {
    render(<ListingHero title="Stores" lead="x" />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Stores");
    expect(h1.querySelector(".hx-grad")).toHaveTextContent("Stores");
  });

  it("renders the eyebrow, lead, controls, quick links and real stats it is given", () => {
    render(
      <ListingHero
        eyebrow="24 live coupons"
        title="All coupons"
        lead="Codes from the store's own pages."
        controls={<input aria-label="Search" />}
        chips={[{ href: "/coupons?category=fitness", label: "Fitness" }]}
        stats={[{ value: "24", label: "Live coupons", live: true }, { value: "12", label: "Stores tracked" }]}
      />,
    );
    expect(screen.getByText("24 live coupons")).toBeInTheDocument();
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "Quick links" })).getByRole("link", { name: "Fitness" })).toHaveAttribute("href", "/coupons?category=fitness");
    expect(screen.getByText("Stores tracked")).toBeInTheDocument();
    expect(screen.getByText("· live")).toBeInTheDocument();
  });

  it("omits stats, chips and controls rather than inventing them", () => {
    const { container } = render(<ListingHero title="Stores" lead="x" />);
    expect(container.querySelector(".lx-stats")).toBeNull();
    expect(container.querySelector(".lx-chips")).toBeNull();
    expect(container.querySelector(".lx-hero-side")).toBeNull();
    expect(screen.getByText("No fake countdown timers")).toBeInTheDocument(); // the trust band is static copy, always shown
  });

  it("marks title-only mode for pages with their own mobile toolbar", () => {
    const { container } = render(<ListingHero title="Deals" lead="x" mobile="title-only" />);
    expect(container.querySelector(".lx-hero")).toHaveAttribute("data-mobile", "title-only");
  });
});
