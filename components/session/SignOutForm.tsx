"use client";

import { useSession } from "@/components/session/SessionProvider";
import { logoutAction } from "@/app/account/actions";

/**
 * Sign-out button shared by the header menu and the account shell.
 *
 * The cookies are cleared by the server action; the client-side session is
 * flipped optimistically as the form is submitted, because a redirect is a
 * soft navigation and the provider would otherwise keep showing the visitor's
 * name after they have signed out.
 */
export default function SignOutForm({
  className,
  label = "Sign out",
  onClick,
}: {
  className?: string;
  label?: string;
  onClick?: () => void;
}) {
  const { markSignedOut } = useSession();

  return (
    <form action={logoutAction}>
      <button
        type="submit"
        onClick={() => {
          markSignedOut();
          onClick?.();
        }}
        className={className}
      >
        {label}
      </button>
    </form>
  );
}
