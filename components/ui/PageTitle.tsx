import type { ElementType, ReactNode } from "react";

/**
 * Page and section titles: the display serif at a calm weight. Every route
 * title uses this so the scale, font and weight stay consistent instead of
 * copy-pasting a class string per page.
 */
export default function PageTitle({
  children,
  className = "",
  as: Tag = "h1",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={`font-serif text-display font-medium tracking-tight text-ink ${className}`}>
      {children}
    </Tag>
  );
}
