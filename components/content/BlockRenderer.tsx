import { BLOCK_REGISTRY } from "@/components/content/registry";
import type { ContentBlock } from "@/lib/content/schema";

/**
 * Render an ordered list of typed blocks. Unknown block types are skipped and
 * logged in production; in development/seed we throw so bad content fails loudly
 * (the Zod schema in `lib/content` already rejects unknown types before this
 * point; this is a second, renderer-level safety net).
 */
export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const type = (block as { type?: string })?.type;
        const Component = type ? BLOCK_REGISTRY[type] : undefined;
        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            throw new Error(`Unknown content block type: ${String(type)}`);
          }
          console.error(`[content] skipping unknown block type: ${String(type)}`);
          return null;
        }
        const props = { ...(block as Record<string, unknown>) };
        delete props.type;
        const key = `${type}-${index}`;
        return <Component key={key} {...props} />;
      })}
    </>
  );
}
