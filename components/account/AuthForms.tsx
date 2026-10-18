"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ActionResult } from "@/app/account/action-result";

/**
 * Sign-in and registration forms. Both are Server Actions driven by
 * `useActionState`, so there is no client-side fetch and no exposed endpoint —
 * the password only ever travels in the action payload.
 */

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" fullWidth loading={pending} className="mt-2">
      {pending ? pendingLabel : label}
    </Button>
  );
}

/**
 * Server Action state is opaque to the DOM, so errors are mirrored into a live
 * region — a failed submit must be announced, not just coloured red.
 */
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

function PasswordField({
  label,
  name,
  autoComplete,
  required,
  hint,
}: {
  label: string;
  name: string;
  autoComplete?: string;
  required?: boolean;
  hint?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <Input
      label={label}
      name={name}
      type={show ? "text" : "password"}
      autoComplete={autoComplete}
      required={required}
      hint={hint}
      rightIcon={
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          className="text-ink-soft transition-colors hover:text-ink"
        >
          {show ? <EyeOff className="h-4 w-4" strokeWidth={1.75} /> : <Eye className="h-4 w-4" strokeWidth={1.75} />}
        </button>
      }
    />
  );
}

const EMPTY: ActionResult = {};

/**
 * Starts the Google OAuth redirect flow.
 *
 * `state` carries the post-login destination through Google and back; the
 * callback validates that it is a same-site path before using it. Without
 * this, a visitor who clicks "Continue with Google" on
 * /account/login?next=/saved lands on /account instead.
 */
function startGoogleOAuth(next?: string) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    // Build-time misconfiguration (NEXT_PUBLIC_GOOGLE_CLIENT_ID missing from
    // the deploy environment). Sending an empty client_id makes Google render
    // a raw error page, which is a worse outcome than a no-op that logs here.
    console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set — Google sign-in unavailable");
    return;
  }
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${window.location.origin}/api/auth/callback/google`,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
    state: next && next.startsWith("/") && !next.startsWith("//") ? next : "/account",
  });
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export function LoginForm({
  action,
  next,
}: {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  next?: string;
}) {
  const [state, formAction] = useActionState(action, EMPTY);

  return (
    <form action={formAction} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}

      <Input label="Email" name="email" type="email" autoComplete="email" required />

      <PasswordField
        label="Password"
        name="password"
        autoComplete="current-password"
        required
      />

      <SubmitButton label="Sign in" pendingLabel="Signing in…" />

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-ledger-line" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-paper px-3 text-xs text-ink-soft">or</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => startGoogleOAuth(next)}
        className="btn btn-outline flex w-full items-center justify-center gap-2"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      <ActionMessages state={state} />
    </form>
  );
}

export function RegisterForm({
  action,
  next,
}: {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  next?: string;
}) {
  const [state, formAction] = useActionState(action, EMPTY);

  return (
    <form action={formAction} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}

      <Input label="Name" name="full_name" autoComplete="name" hint="Optional." />

      <Input label="Email" name="email" type="email" autoComplete="email" required />

      <PasswordField
        label="Password"
        name="password"
        autoComplete="new-password"
        required
        hint="At least 8 characters."
      />

      <SubmitButton label="Create account" pendingLabel="Creating your account…" />

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-ledger-line" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-paper px-3 text-xs text-ink-soft">or</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => startGoogleOAuth(next)}
        className="btn btn-outline flex w-full items-center justify-center gap-2"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      <ActionMessages state={state} />

      <p className="text-sm text-ink-soft">
        Already have an account?{" "}
        <Link
          href={next ? `/account/login?next=${encodeURIComponent(next)}` : "/account/login"}
          className="text-inkblue hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

export function ResetPasswordForm({
  action,
  token,
}: {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  token: string;
}) {
  const [state, formAction] = useActionState(action, EMPTY);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />

      <PasswordField
        label="New password"
        name="new_password"
        autoComplete="new-password"
        required
        hint="At least 8 characters"
      />

      <PasswordField
        label="Confirm new password"
        name="confirm_password"
        autoComplete="new-password"
        required
      />

      <SubmitButton label="Reset password" pendingLabel="Resetting…" />

      <ActionMessages state={state} />
    </form>
  );
}

export function ForgotPasswordForm({
  action,
}: {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
}) {
  const [state, formAction] = useActionState(action, EMPTY);

  return (
    <form action={formAction} className="space-y-4">
      <Input label="Email address" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />

      <SubmitButton label="Send reset link" pendingLabel="Sending…" />

      <ActionMessages state={state} />
    </form>
  );
}