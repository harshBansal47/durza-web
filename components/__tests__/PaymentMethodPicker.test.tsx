import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import PaymentMethodPicker from "@/components/PaymentMethodPicker";

describe("PaymentMethodPicker", () => {
  it("keeps selections local and toggles them", async () => {
    const user = userEvent.setup();
    render(<PaymentMethodPicker />);

    const upi = screen.getByRole("button", { name: "UPI" });
    expect(upi).toHaveAttribute("aria-pressed", "false");
    await user.click(upi);
    expect(upi).toHaveAttribute("aria-pressed", "true");
    await user.click(upi);
    expect(upi).toHaveAttribute("aria-pressed", "false");
  });
});
