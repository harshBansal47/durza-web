import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tag } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

describe("SectionTitle", () => {
  it("renders an optional action link next to the title", () => {
    render(
      <SectionTitle hint="latest offers" icon={Tag} action={{ href: "/deals", label: "Browse all deals" }}>
        Latest deals
      </SectionTitle>,
    );
    expect(screen.getByRole("heading", { name: "Latest deals" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Browse all deals/ })).toHaveAttribute("href", "/deals");
  });
});
