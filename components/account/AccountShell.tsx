import type { ReactNode } from "react";
import Image from "next/image";
import { displayName } from "@/lib/session";
import { logoutAction } from "@/app/account/actions";
import PageTitle from "@/components/ui/PageTitle";
import AccountTabs from "@/components/account/AccountTabs";

export default function AccountShell({
  user,
  active,
  counts = {},
  children,
}: {
  user: { email: string; full_name: string | null; avatar_url?: string | null };
  active: string;
  counts?: Partial<Record<string, number>>;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-ledger-line pb-6">
        <div className="flex min-w-0 items-center gap-4">
          {user.avatar_url && (
            <Image
              src={user.avatar_url}
              alt=""
              width={48}
              height={48}
              aria-hidden="true"
              className="h-12 w-12 shrink-0 rounded-full border border-ledger-line object-cover"
            />
          )}
          <div className="min-w-0">
            <PageTitle>{displayName(user)}</PageTitle>
            <p className="truncate text-sm text-ink-soft">{user.email}</p>
          </div>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm text-ink-soft underline underline-offset-4 hover:text-ink hover:no-underline"
          >
            Sign out
          </button>
        </form>
      </header>

      <AccountTabs active={active} counts={counts} />

      <div className="pt-8">{children}</div>
    </div>
  );
}
