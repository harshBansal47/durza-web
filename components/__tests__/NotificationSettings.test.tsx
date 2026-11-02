import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import NotificationSettings from "@/components/account/NotificationSettings";
import type { ActionResult } from "@/app/account/action-result";

describe("NotificationSettings", () => {
  it("offers account alerts by email only", () => {
    render(
      <NotificationSettings
        action={vi.fn(async () => ({ message: "Saved" }) as ActionResult)}
        initial={{ email_enabled: true }}
      />,
    );

    expect(screen.getByLabelText("Email alerts")).toBeChecked();
    expect(screen.queryByText("Browser push")).not.toBeInTheDocument();
    expect(screen.queryByText(/telegram alert/i)).not.toBeInTheDocument();
  });

  it("submits the email preference", async () => {
    const user = userEvent.setup();
    const action = vi.fn(async () => ({ message: "Preferences saved." }) as ActionResult);
    render(<NotificationSettings action={action} initial={{ email_enabled: true }} />);

    await user.click(screen.getByRole("button", { name: "Save preferences" }));
    expect(action).toHaveBeenCalled();
  });
});
