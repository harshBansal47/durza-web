"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import type { ActionResult } from "@/app/account/action-result";

/**
 * Turn off alert email.
 *
 * Reached from the link in an alert email, usually signed out. The link carries
 * a signed token, which is the proof of whose address it is, so there is
 * nothing to type: one button. (It used to ask for an address and then report
 * success without changing anything for signed-out visitors.)
 *
 * It is a button rather than the link doing the work on load because mail
 * scanners and link previewers fetch URLs automatically; a GET that
 * unsubscribed people would do it to everyone whose mail is scanned.
 */
export default function UnsubscribeForm({
  action,
  token,
}: {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  /** Signed token from the email link. Absent when a signed-in visitor opens the page directly. */
  token?: string;
}) {
  const [state, formAction] = useActionState(action, {} as ActionResult);

  if (state?.message) {
    return (
      <p role="status" className="max-w-sm border border-verified bg-verified-soft px-3 py-2 text-sm text-verified">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="max-w-sm space-y-4">
      {token && <input type="hidden" name="token" value={token} />}

      <SubmitButton />

      {state?.error && (
        <p role="alert" className="border border-rust bg-rust-soft px-3 py-2 text-sm text-rust">
          {state.error}
        </p>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" fullWidth loading={pending}>
      {pending ? "Turning off…" : "Turn off email alerts"}
    </Button>
  );
}
