"use client";

import { useCallback } from "react";
import { Share2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

/**
 * Shares the current page using the native share sheet, falling back to the
 * clipboard with a visible confirmation. Rendered inside every <StoreHero />.
 */
export default function StoreShareButton({ title, text }: { title: string; text?: string }) {
  const { toast } = useToast();

  const onShare = useCallback(async () => {
    const url = window.location.href;
    const payload = { title, text: text ?? title, url };
    try {
      if (typeof navigator.share === "function") {
        await navigator.share(payload);
        return;
      }
      await navigator.clipboard.writeText(url);
      toast("Link copied!");
    } catch {
      // Share sheet dismissed / permission denied — clipboard is the fallback.
      try {
        await navigator.clipboard.writeText(url);
        toast("Link copied!");
      } catch {
        toast("Couldn't copy the link", { type: "error" });
      }
    }
  }, [title, text, toast]);

  return (
    <button
      type="button"
      onClick={onShare}
      aria-label="Share this store"
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
    >
      <Share2 aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
      <span>Share</span>
    </button>
  );
}
