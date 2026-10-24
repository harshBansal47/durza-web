import type { Metadata } from "next";
import Link from "next/link";
import { EmailOtpLoginForm } from "@/components/account/EmailOtpLoginForm";
import { requestEmailOtpAction, verifyEmailOtpAction } from "@/app/account/actions";
import { getSessionUser } from "@/lib/session";
import { absoluteUrl } from "@/lib/seo";
import PageTitle from "@/components/ui/PageTitle";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Durza account to see saved deals and tracked prices.",
  alternates: { canonical: absoluteUrl("/account/login") },
  // Account pages are per-user; keep them out of the index.
  robots: { index: false, follow: true },
};

/** Reads `next` defensively — it comes straight from the URL. */
function safeNext(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return undefined;
  return raw;
}

/** First value of a search param that may arrive as string or string[]. */
function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * The callback redirects here as `/account/login?error=google&reason=...`.
 * The reason codes are our own (see app/api/auth/callback/google/route.ts) and
 * are mapped to something the visitor can act on; anything unknown still gets
 * a generic message rather than silence.
 */
const GOOGLE_ERROR_MESSAGES: Record<string, string> = {
  missing_config:
    "Google sign-in isn't fully configured on our side yet. Please sign in with your email instead.",
  google_denied: "Google sign-in was cancelled or denied.",
  exchange_failed: "Google rejected the sign-in attempt. Please try again.",
  exchange_unreachable: "We couldn't reach Google. Check your connection and try again.",
  no_id_token: "Google didn't return your account details. Please try again.",
  backend_unreachable: "Our servers didn't respond in time. Please try again in a moment.",
  backend_rejected: "We couldn't create your session. Please try again.",
  empty_session: "We couldn't create your session. Please try again.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[]; error?: string | string[]; reason?: string | string[] }>;
}) {
  const params = await searchParams;
  const next = safeNext(params.next);
  const error = first(params.error);

  // Already signed in? Go straight through rather than showing a dead form.
  const user = await getSessionUser();
  if (user) {
    const { redirect } = await import("next/navigation");
    redirect(next ?? "/account");
  }

  return (
    <main className="mx-auto w-full max-w-sm px-4 py-16">
      <PageTitle>Sign in</PageTitle>
      <p className="mt-2 text-sm text-ink-soft">
        {next
          ? "Sign in to continue where you left off."
          : "Your saved stores, followed products and alert history live here."}
      </p>

      {error === "google" && (
        <p role="alert" className="mt-6 border border-rust bg-rust-soft px-3 py-2 text-sm text-rust">
          {GOOGLE_ERROR_MESSAGES[first(params.reason) ?? ""] ??
            "We couldn't complete the Google sign-in. Please try again."}
        </p>
      )}

      <div className="mt-8">
        <EmailOtpLoginForm requestAction={requestEmailOtpAction} verifyAction={verifyEmailOtpAction} next={next} />
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        No account yet?{" "}
        <Link
          href={next ? `/account/register?next=${encodeURIComponent(next)}` : "/account/register"}
          className="text-inkblue hover:underline"
        >
          Create one
        </Link>
      </p>
    </main>
  );
}