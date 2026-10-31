import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { ActionResult, EmailOtpRequestResult } from "@/app/account/action-result";
import { EmailOtpLoginForm } from "@/components/account/EmailOtpLoginForm";

describe("EmailOtpLoginForm", () => {
  it("opens code entry without showing the generic API message", async () => {
    const user = userEvent.setup();
    const requestAction = vi.fn(
      async (_previous: EmailOtpRequestResult, _formData: FormData): Promise<EmailOtpRequestResult> => ({
        codeEntry: true,
      }),
    );
    const verifyAction = vi.fn(
      async (_previous: ActionResult, _formData: FormData): Promise<ActionResult> => ({}),
    );

    render(
      <EmailOtpLoginForm
        requestAction={requestAction}
        verifyAction={verifyAction}
        next="/account/saved"
      />,
    );

    await user.type(screen.getByLabelText("Email"), "reader@example.com");
    await user.click(screen.getByRole("button", { name: "Send sign-in code" }));

    expect(await screen.findByLabelText("Sign-in code")).toBeInTheDocument();
    expect(
      screen.queryByText("If that address can sign in, a sign-in code is on its way."),
    ).not.toBeInTheDocument();
    expect(screen.getByDisplayValue("/account/saved")).toHaveAttribute("name", "next");
  });

  it("stays on email entry when the request is not confirmed", async () => {
    const user = userEvent.setup();
    const requestAction = vi.fn(
      async (_previous: EmailOtpRequestResult, _formData: FormData): Promise<EmailOtpRequestResult> => ({
        error: "We couldn't confirm the request yet. Please try again.",
      }),
    );
    const verifyAction = vi.fn(
      async (_previous: ActionResult, _formData: FormData): Promise<ActionResult> => ({}),
    );

    render(<EmailOtpLoginForm requestAction={requestAction} verifyAction={verifyAction} />);

    await user.type(screen.getByLabelText("Email"), "reader@example.com");
    await user.click(screen.getByRole("button", { name: "Send sign-in code" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("We couldn't confirm the request yet.");
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.queryByLabelText("Sign-in code")).not.toBeInTheDocument();
    expect(
      screen.queryByText("If that address can sign in, a sign-in code is on its way."),
    ).not.toBeInTheDocument();
  });

  it("stays on email entry for an invalid address", async () => {
    const user = userEvent.setup();
    const requestAction = vi.fn(
      async (_previous: EmailOtpRequestResult, _formData: FormData): Promise<EmailOtpRequestResult> => ({
        error: "Enter a valid email address.",
      }),
    );
    const verifyAction = vi.fn(
      async (_previous: ActionResult, _formData: FormData): Promise<ActionResult> => ({}),
    );

    render(<EmailOtpLoginForm requestAction={requestAction} verifyAction={verifyAction} />);

    await user.type(screen.getByLabelText("Email"), "reader@example.com");
    await user.click(screen.getByRole("button", { name: "Send sign-in code" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Enter a valid email address.");
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.queryByLabelText("Sign-in code")).not.toBeInTheDocument();
  });
});
