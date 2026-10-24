"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ActionResult } from "@/app/account/action-result";

/**
 * Profile editor: display name.
 *
 * The email address is shown but not editable — changing it needs
 * re-verification, so the API deliberately does not accept it. Saying so beats
 * showing a disabled field with no explanation.
 */

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}

export default function ProfileForm({
  action,
  user,
}: {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  user: { email: string; full_name: string | null };
}) {
  const [state, formAction] = useActionState(action, {} as ActionResult);

  return (
    <form action={formAction} className="max-w-prose space-y-5">
      <div>
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-soft">
          Email
        </span>
        <p className="font-mono text-sm text-ink">{user.email}</p>
        <p className="mt-1 text-xs text-ink-soft">
          Your email is the key to your alert history. To change it, contact us from this address.
        </p>
      </div>

      <Input
        label="Display name"
        name="full_name"
        defaultValue={user.full_name ?? ""}
        hint="Shown in the header instead of your email address."
      />

      <SubmitButton />

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
