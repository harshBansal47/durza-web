import type { ComponentType } from "react";
import type { ContentBlock } from "@/lib/content/schema";
import * as blocks from "@/components/content/blocks";

/**
 * Block registry: `type` → React component. Adding a new block = one schema
 * entry + one component + one line here.
 */
export const BLOCK_REGISTRY: Record<string, ComponentType<Record<string, unknown>>> = {
  audience: blocks.AudienceBlock as ComponentType<Record<string, unknown>>,
  verdict: blocks.VerdictBlock as ComponentType<Record<string, unknown>>,
  prose: blocks.ProseBlock as ComponentType<Record<string, unknown>>,
  bullets: blocks.BulletsBlock as ComponentType<Record<string, unknown>>,
  callout: blocks.CalloutBlock as ComponentType<Record<string, unknown>>,
  table: blocks.TableBlock as ComponentType<Record<string, unknown>>,
  keyValue: blocks.KeyValueBlock as ComponentType<Record<string, unknown>>,
  prosCons: blocks.ProsConsBlock as ComponentType<Record<string, unknown>>,
  steps: blocks.StepsBlock as ComponentType<Record<string, unknown>>,
  statusLedger: blocks.StatusLedgerBlock as ComponentType<Record<string, unknown>>,
  findings: blocks.FindingsBlock as ComponentType<Record<string, unknown>>,
  offerCards: blocks.OfferCardsBlock as ComponentType<Record<string, unknown>>,
  productLinks: blocks.ProductLinksBlock as ComponentType<Record<string, unknown>>,
  verification: blocks.VerificationBlock as ComponentType<Record<string, unknown>>,
  faq: blocks.FaqBlock as ComponentType<Record<string, unknown>>,
  sources: blocks.SourcesBlock as ComponentType<Record<string, unknown>>,
  related: blocks.RelatedBlock as ComponentType<Record<string, unknown>>,
  heading: blocks.HeadingBlock as ComponentType<Record<string, unknown>>,
  h2: blocks.H2Block as ComponentType<Record<string, unknown>>,
  h3: blocks.H3Block as ComponentType<Record<string, unknown>>,
  paragraph: blocks.ParagraphBlock as ComponentType<Record<string, unknown>>,
  list: blocks.ListBlock as ComponentType<Record<string, unknown>>,
  ordered_list: blocks.OrderedListBlock as ComponentType<Record<string, unknown>>,
  tierTable: blocks.TierTableBlock as ComponentType<Record<string, unknown>>,
  explorer: blocks.ExplorerBlock as ComponentType<Record<string, unknown>>,
  collectionGroup: blocks.CollectionGroupBlock as ComponentType<Record<string, unknown>>,
  quickPicks: blocks.QuickPicksBlock as ComponentType<Record<string, unknown>>,
  kitTray: blocks.KitTrayBlock as ComponentType<Record<string, unknown>>,
};

export type { ContentBlock };
