import type { Metadata } from "next";
import Link from "next/link";
import UnsubscribeForm from "@/components/account/UnsubscribeForm";
import { unsubscribeAction } from "@/app/account/actions";
import { getAccessToken } from "@/lib/session";
import { absoluteUrl } from "@/lib/seo";
import PageTitle from "@/components/ui/PageTitle";

export const metadata: Metadata = {
  title: "Turn off email alerts",
  description: "Stop Durza email alerts using the link in your email.",
  alternates: { canonical: absoluteUrl("/account/unsubscribe") },
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const params = await searchParams;
  const token = Array.isArray(params.token) ? params.token[0] : params.token;

  // Signed in? Then the page can act on the account without a token.
  const session = await getAccessToken();

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-16">
      <PageTitle>Turn off email alerts</PageTitle>
      <p className="mt-2 text-ink-soft">
        {token
          ? "This will stop Durza alert emails to the address this link was sent to. Everything else on Durza keeps working."
          : session
            ? "This will stop email alerts for your account. Everything else on Durza keeps working."
            : "Open the unsubscribe link from one of our emails, or sign in to manage alerts from your account."}
      </p>

      <div className="mt-8">
        {token || session ? (
          <UnsubscribeForm action={unsubscribeAction} token={token} />
        ) : (
          <Link href="/account/login?next=/account/notifications" className="text-inkblue hover:underline">
            Sign in to manage alerts
          </Link>
        )}
      </div>

      <p className="mt-8 text-sm text-ink-soft">
        <Link href="/account/notifications" className="text-inkblue hover:underline">
          Fine-tune which channels you hear from
        </Link>
      </p>
    </main>
  );
}
