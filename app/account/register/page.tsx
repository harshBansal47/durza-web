import type { Metadata } from "next";
import { getSessionUser } from "@/lib/session";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create a free Durza account to track prices and get alerted when new codes land.",
  alternates: { canonical: absoluteUrl("/account/register") },
  robots: { index: false, follow: true },
};

/** First value of a search param that may arrive as string or string[]. */
function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Only same-origin, path-relative destinations are ever honoured. */
function safeNext(value: string | string[] | undefined): string | undefined {
  const raw = first(value);
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return undefined;
  return raw;
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const params = await searchParams;
  const next = safeNext(params.next);

  const user = await getSessionUser();
  if (user) {
    const { redirect } = await import("next/navigation");
    redirect(next ?? "/account");
  }

  // Public sign-in no longer has a password-based registration step. A visitor
  // who wants an account goes through the email sign-in code flow, which
  // creates the account under the public policy once the code is verified.
  const { redirect } = await import("next/navigation");
  redirect(next ? `/account/login?next=${encodeURIComponent(next)}` : "/account/login");
  throw new Error("unreachable");
}
