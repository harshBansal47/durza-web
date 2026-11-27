"use client";

import { useState } from "react";

export default function CollectionExplorer({ children }: { children?: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div data-collection-explorer="">
      {children}
      <button type="button" onClick={() => setExpanded((v) => !v)}>
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
