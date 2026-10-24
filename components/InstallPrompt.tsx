"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/Logo";

/**
 * BeforeInstallPromptEvent is not yet in the TypeScript DOM lib.
 * It fires when the browser is ready to install the PWA.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const MAX_TABLET_WIDTH = 1366;
const ANSWERED_KEY = "durza.install-prompt.answered";

function isCandidateDevice() {
  if (typeof window === "undefined") return false;
  const touch = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
  return touch && window.innerWidth <= MAX_TABLET_WIDTH;
}

function hasAnswered() {
  try {
    return window.localStorage.getItem(ANSWERED_KEY) === "1";
  } catch {
    return false;
  }
}

export default function InstallPrompt() {
  const pathname = usePathname();
  const isAuthRoute =
    pathname.startsWith("/account/login") ||
    pathname.startsWith("/account/register") ||
    pathname.startsWith("/account/unsubscribe");

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isAuthRoute) return;
    const handler = (e: Event) => {
      e.preventDefault();
      if (!isCandidateDevice() || hasAnswered()) return;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };
    const handleResize = () => {
      setIsVisible((visible) => visible && isCandidateDevice());
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("resize", handleResize);
    };
  }, [isAuthRoute]);

  function rememberAnswer() {
    try {
      window.localStorage.setItem(ANSWERED_KEY, "1");
    } catch {
      // Storage blocked.
    }
    setIsVisible(false);
  }

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    rememberAnswer();
  };

  const isStandalone =
    typeof window !== "undefined" && window.matchMedia("(display-mode: standalone)").matches;

  if (isAuthRoute || !isVisible || isStandalone) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-sm">
      <div className="rounded-2xl border border-ledger-line bg-white p-4 shadow-[var(--shadow-overlay)]">
        <div className="flex items-start gap-3">
          <LogoMark size={40} />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-ink">Install Durza</h3>
            <p className="mt-0.5 text-xs text-ink-soft">
              Add to your home screen for quick access to deals and coupons.
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={handleInstall} className="btn-primary flex-1 text-sm">
            Install
          </button>
          <button onClick={rememberAnswer} className="btn-ghost text-sm">
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
