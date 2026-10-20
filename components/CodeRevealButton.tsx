"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import { useTypedToast } from "@/components/ui/Toast";

export interface CodeRevealButtonProps {
  code: string;
  url: string;
  label?: string;
  successMessage?: string;
  className?: string;
  /** Render the masked-to-unmasked code inside the button. */
  showCode?: boolean;
  /** Called before the copy/open side effects. */
  onReveal?: () => void;
  /** Sync the parent's copied/revealed state with the button's. */
  onStateChange?: (state: { revealed: boolean; copied: boolean }) => void;
}

/**
 * One-tap ethical reveal: copies the code, opens the store, and confirms the
 * action without blocking or faking urgency. Later clicks copy again without
 * reopening the store.
 */
export default function CodeRevealButton({
  code,
  url,
  label = "Copy & open",
  successMessage = "✅ Code copied! You're ready to save.",
  className = "",
  showCode = true,
  onReveal,
  onStateChange,
}: CodeRevealButtonProps) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { success } = useTypedToast();

  function emit(next: { revealed: boolean; copied: boolean }) {
    onStateChange?.(next);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      return true;
    } catch {
      return false;
    }
  }

  function startCopiedTimer() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(false);
      emit({ revealed: true, copied: false });
    }, 2500);
  }

  async function reveal() {
    setRevealed(true);
    emit({ revealed: true, copied: false });
    onReveal?.();
    const copiedNow = await copy();
    if (copiedNow) {
      setCopied(true);
      emit({ revealed: true, copied: true });
      startCopiedTimer();
    }
    window.open(url, "_blank", "noopener");
    success(successMessage);
  }

  async function copyAgain() {
    const copiedNow = await copy();
    if (!copiedNow) return;
    setCopied(true);
    emit({ revealed: true, copied: true });
    startCopiedTimer();
    success(successMessage);
  }

  const masked = `${code.slice(0, Math.min(3, code.length))}••••`;
  const buttonLabel = copied ? "Copied" : revealed ? "Copy code" : label;

  return (
    <button
      type="button"
      onClick={revealed ? copyAgain : reveal}
      aria-label={buttonLabel}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 active:scale-95 ${
        copied ? "bg-verified text-white hover:bg-verified/90" : "bg-ink text-paper hover:bg-ink-hover"
      } ${className}`}
    >
      {copied ? <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} /> : <Copy aria-hidden="true" className="h-4 w-4" strokeWidth={2} />}
      {showCode ? (
        <span className="relative inline-block min-w-[5rem] text-center">
          <span className={`transition-opacity duration-300 ${revealed ? "opacity-0" : "opacity-100"}`}>{masked}</span>
          <span className={`absolute inset-0 transition-opacity duration-300 ${revealed ? "opacity-100" : "opacity-0"}`}>{code}</span>
        </span>
      ) : null}
      <span>{buttonLabel}</span>
      <ExternalLink aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}
