import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import ConsentPreferences from "@/components/ConsentPreferences";
import { getConsent } from "@/lib/consent";

describe("ConsentPreferences", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("lets visitors change their analytics choice", async () => {
    const user = userEvent.setup();
    render(<ConsentPreferences />);

    expect(screen.getByRole("status")).toHaveTextContent(/not chosen/i);

    await user.click(screen.getByRole("button", { name: "Disable analytics and ads" }));
    expect(getConsent()).toBe("declined");
    expect(screen.getByRole("status")).toHaveTextContent(/analytics and ads are disabled/i);

    await user.click(screen.getByRole("button", { name: "Allow analytics and ads" }));
    expect(getConsent()).toBe("accepted");
    expect(screen.getByRole("status")).toHaveTextContent(/analytics and ads are enabled/i);
  });
});
