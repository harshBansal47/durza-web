"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Select";
import type { ActionResult } from "@/app/account/action-result";

export default function NotificationSettings({
  action,
  initial,
}: {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  initial: { email_enabled: boolean };
}) {
  const [state, formAction, saving] = useActionState(action, {} as ActionResult);
  const [emailEnabled, setEmailEnabled] = useState(initial.email_enabled);

  return (
    <form action={formAction} className="space-y-6">
      <fieldset className="space-y-3">
        <legend className="sr-only">Notification channel</legend>
        <div className="border border-ledger-line bg-paper-raised p-4">
          <Checkbox
            label="Email alerts"
            description="Updates about new offers from stores you follow and changes to offers you have saved."
            checked={emailEnabled}
            onChange={setEmailEnabled}
          />
        </div>
      </fieldset>

      <input type="hidden" name="email_enabled" value={emailEnabled ? "true" : "false"} />
      <Button type="submit" loading={saving}>
        {saving ? "Saving…" : "Save preferences"}
      </Button>

      {state?.error && (
        <p role="alert" className="border border-rust bg-rust-soft px-3 py-2 text-sm text-rust">
          {state.error}
        </p>
      )}
      {state?.message && (
        <p role="status" className="border border-verified bg-verified-soft px-3 py-2 text-sm text-verified">
          {state.message}
        </p>
      )}
    </form>
  );
}
