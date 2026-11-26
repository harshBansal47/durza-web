"use client";

import type { ReactNode } from "react";

/**
 * Shared tablist/tabpanel shell for store matcher sections. The active state is
 * owned by the caller so the panel can stay in the page's own data shape.
 */
export default function MatcherTabs<T extends { id: string; label: string }>({
  items,
  active,
  onSelect,
  idPrefix,
  ariaLabel,
  className = "mt-5 flex flex-wrap gap-2",
  buttonClassName,
  panelClassName = "mt-6 rounded-xl border border-ledger-line bg-amber-50/40 p-5",
  renderPanel,
}: {
  items: readonly T[];
  active: string;
  onSelect: (id: string) => void;
  idPrefix: string;
  ariaLabel: string;
  className?: string;
  buttonClassName?: (selected: boolean) => string;
  panelClassName?: string;
  renderPanel: (item: T) => ReactNode;
}) {
  const current = items.find((item) => item.id === active) ?? items[0];
  const buttonClass = buttonClassName
    ? buttonClassName
    : (selected: boolean) =>
        `inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
          selected
            ? "border-amber-700 bg-amber-700 text-white"
            : "border-ledger-line bg-white text-ink hover:border-amber-700"
        }`;

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? items.length - 1
          : event.key === "ArrowRight"
            ? (index + 1) % items.length
            : (index - 1 + items.length) % items.length;
    const item = items[next];
    if (!item) return;
    onSelect(item.id);
    document.getElementById(`${idPrefix}-tab-${item.id}`)?.focus();
  }

  return (
    <>
      <div role="tablist" aria-label={ariaLabel} className={className}>
        {items.map((item, index) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              id={`${idPrefix}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${idPrefix}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onKeyDown={(event) => onKeyDown(event, index)}
              onClick={() => onSelect(item.id)}
              className={buttonClass(selected)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {current ? (
        <div
          id={`${idPrefix}-panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`${idPrefix}-tab-${current.id}`}
          className={panelClassName}
        >
          {renderPanel(current)}
        </div>
      ) : null}
    </>
  );
}
