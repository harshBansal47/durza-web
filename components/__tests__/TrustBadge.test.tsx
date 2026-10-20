import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TrustBadge from "@/components/TrustBadge";

describe("TrustBadge", () => {
  it("shows community verification only above the report threshold", () => {
    render(<TrustBadge successRate={0.9} reports={12} checkedDate="20 Oct 2026" />);
    expect(screen.getByText(/Verified working by 12 Durza users recently/)).toBeInTheDocument();
  });

  it("shows the honest low-data state instead of a fake badge", () => {
    render(<TrustBadge successRate={0.2} reports={1} />);
    expect(screen.getByText(/No votes yet from enough shoppers/)).toBeInTheDocument();
    expect(screen.queryByText(/Verified working/)).not.toBeInTheDocument();
  });

  it("shows no-votes copy when there is no data", () => {
    render(<TrustBadge successRate={null} reports={0} checkedDate="20 Oct 2026" />);
    expect(screen.getByText(/No votes yet/)).toBeInTheDocument();
  });
});
