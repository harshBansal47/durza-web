"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "@/components/session/SessionProvider";
import SignOutForm from "@/components/session/SignOutForm";

/** Account chip/menu, extracted unchanged from the old header. */
export default function AccountMenu() {
  const { session } = useSession();
  const user = session.user;
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  if (session.status === "loading") {
    return (
      <span
        aria-hidden="true"
        className="flex h-10 items-center gap-2.5 rounded-full border border-ledger-line bg-white px-3 sm:px-4"
      >
        <User className="h-4 w-4 text-accent/40" strokeWidth={1.75} />
        <span className="hidden h-3 w-14 rounded-full bg-ink/10 md:block" />
      </span>
    );
  }

  if (!user) {
    return (
      <Link
        href="/account/login"
        className="flex h-10 items-center gap-2.5 rounded-full border border-ledger-line bg-white px-3 text-sm font-medium text-ink transition-all duration-150 hover:border-accent-soft hover:bg-accent-faint focus-visible:outline-2 focus-visible:outline-accent sm:px-4"
      >
        <User aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={1.75} />
        <span className="hidden md:inline">Sign in</span>
      </Link>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 items-center gap-2.5 rounded-full border border-ledger-line bg-white px-3 text-sm font-medium text-ink transition-all duration-150 hover:border-accent-soft hover:bg-accent-faint focus-visible:outline-2 focus-visible:outline-accent sm:px-4"
      >
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
            className="h-7 w-7 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-medium text-white"
          >
            {user.name.trim().charAt(0).toUpperCase() || "U"}
          </span>
        )}
        <span className="hidden max-w-[100px] truncate md:inline">{user.name}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-48 rounded-2xl border border-ledger-line bg-white p-2 shadow-[var(--shadow-overlay)]">
          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
          >
            Your account
          </Link>
          <Link
            href="/account/settings"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
          >
            Settings
          </Link>
          <SignOutForm
            onClick={() => setOpen(false)}
            className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
          />
        </div>
      )}
    </div>
  );
}
