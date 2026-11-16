"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Shared behaviour for the hero's drawer and tool modal.
 *
 * - Overlays stack (a tool modal can open an offer drawer): only the topmost one
 *   handles Escape and Tab, so one keypress never closes two layers.
 * - Page scroll is locked by reference count and restored exactly once, when the
 *   last overlay closes — repeated open/close cycles cannot leave it stuck.
 * - Focus moves in on open, is trapped while open, and returns to whatever had it
 *   before, if that element is still on the page.
 * Every listener added here is removed in the effect cleanup.
 */
const stack: symbol[] = [];
let scrollLocks = 0;
let previousOverflow = "";

/** True while any hero overlay is open (the "/" shortcut must stay quiet then). */
export function hasOpenOverlay(): boolean {
  return stack.length > 0;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function focusables(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => !el.hasAttribute("inert") && el.getClientRects().length > 0);
}

export function useDialog(ref: RefObject<HTMLElement | null>, onClose: () => void) {
  // Keep the latest callback without re-running the effect (which would re-lock and steal focus).
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const id = Symbol("hero-overlay");
    stack.push(id);
    const returnTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    if (scrollLocks++ === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    (focusables(node)[0] ?? node).focus();

    function onKeyDown(event: KeyboardEvent) {
      if (stack[stack.length - 1] !== id) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== "Tab" || !node) return;
      const items = focusables(node);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !node.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !node.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      const at = stack.indexOf(id);
      if (at >= 0) stack.splice(at, 1);
      if (--scrollLocks === 0) document.body.style.overflow = previousOverflow;
      if (returnTo?.isConnected) returnTo.focus();
    };
  }, [ref]);
}
