import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DisclosureNote from "@/components/DisclosureNote";
import { DEFAULT_DISCLOSURE } from "@/lib/disclosure";

describe("DisclosureNote", () => {
  it("compact: one paragraph with a link to the full policy, and no box of its own", () => {
    const { container } = render(<DisclosureNote compact commissionDisclosure={null} />);

    expect(container.querySelector("p")).toHaveTextContent(DEFAULT_DISCLOSURE);
    expect(screen.getByRole("link", { name: /learn more/i })).toHaveAttribute(
      "href",
      "/affiliate-disclosure",
    );
    // Not a card nested inside another card.
    expect(container.querySelector(".border")).toBeNull();
  });

  it("uses the store's own disclosure text when it has one", () => {
    render(<DisclosureNote compact commissionDisclosure="Nykaa pays us a small fee." />);
    expect(screen.getByText(/nykaa pays us a small fee/i)).toBeInTheDocument();
    expect(screen.queryByText(DEFAULT_DISCLOSURE, { exact: false })).not.toBeInTheDocument();
  });

  it("default: keeps the bordered box used when there is no store card to sit inside", () => {
    const { container } = render(<DisclosureNote commissionDisclosure={null} />);
    expect(container.firstElementChild?.className).toContain("border");
    expect(screen.queryByRole("link", { name: /learn more/i })).not.toBeInTheDocument();
  });
});
