"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ActionResult, EmailOtpRequestResult } from "@/app/account/action-result";

const EMPTY: ActionResult = {};
const EMPTY_REQUEST: EmailOtpRequestResult = {};

const CODE_PATTERN = "^[0-9]{6}$";

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" fullWidth loading={pending} className="mt-2">
      {pending ? pendingLabel : label}
    </Button>
  );
}

function ActionMessages({ state }: { state: ActionResult }) {
  return (
    <>
      {state.error && (
        <p role="alert" className="mt-4 border border-rust bg-rust-soft px-3 py-2 text-sm text-rust">
          {state.error}
        </p>
      )}
      {state.message && (
        <p role="status" className="mt-4 border border-verified bg-verified-soft px-3 py-2 text-sm text-verified">
          {state.message}
        </p>
      )}
    </>
  );
}

/**
 * Passwordless sign-in: email first, then the six-digit code from the email.
 * The email and code are both handled by Server Actions, so the API is never
 * called with an unvalidated code from the client.
 */
export function EmailOtpLoginForm({
  requestAction,
  verifyAction,
  next,
}: {
  requestAction: (prev: EmailOtpRequestResult, formData: FormData) => Promise<EmailOtpRequestResult>;
  verifyAction: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  next?: string;
}) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");

  const [requestState, requestActionState] = useActionState(requestAction, EMPTY_REQUEST);
  const [verifyState, verifyActionState] = useActionState(verifyAction, EMPTY);

  useEffect(() => {
    if (requestState.codeEntry) setStep("code");
  }, [requestState]);

  const googleHref = `/api/auth/start/google${next ? `?next=${encodeURIComponent(next)}` : ""}`;

  if (step === "email") {
    return (
      <div className="space-y-4">
        <form action={requestActionState} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <SubmitButton label="Send sign-in code" pendingLabel="Sending…" />
          <ActionMessages state={{ error: requestState.error }} />
        </form>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-ledger-line" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-paper px-3 text-xs text-ink-soft">or</span>
          </div>
        </div>

        <a
          href={googleHref}
          className="btn btn-outline flex w-full items-center justify-center gap-2"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form action={verifyActionState} className="space-y-4">
        <input type="hidden" name="email" value={email} />
        {next && <input type="hidden" name="next" value={next} />}
        <Input
          label="Sign-in code"
          name="code"
          type="text"
          autoComplete="one-time-code"
          inputMode="numeric"
          required
          maxLength={6}
          pattern={CODE_PATTERN}
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
        />
        <p className="text-sm text-ink-soft">
          Enter the 6-digit code from your email. If it hasn’t arrived yet, you can resend it.
        </p>
        <SubmitButton label="Sign in" pendingLabel="Signing in…" />
        <ActionMessages state={verifyState} />
      </form>

      <form action={requestActionState} className="space-y-4">
        <input type="hidden" name="email" value={email} />
        <SubmitButton label="Resend code" pendingLabel="Sending…" />
        <ActionMessages state={{ error: requestState.error }} />
      </form>

      <Button
        type="button"
        variant="outline"
        fullWidth
        onClick={() => {
          setStep("email");
          setCode("");
        }}
      >
        Use a different email
      </Button>
    </div>
  );
}
