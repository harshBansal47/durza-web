"use client";

import type { StoreTool } from "@/lib/store-tools";
import { BldcSavings, FirstcryClub, FitspireStack, NordpassPlan } from "./CalcTools";
import { BasketTool, ChooserTool, GuideTool, StoreLinkTool, TableTool } from "./ContentTools";
import { BldcSizing, GstMatcher, ProteinDecoder } from "./NativeTools";

/** Renders the working body of any registry tool. */
export default function ToolRunner({ tool }: { tool: StoreTool }) {
  switch (tool.kind) {
    case "native":
      return tool.nativeId === "bldc" ? <BldcSizing /> : tool.nativeId === "protein" ? <ProteinDecoder /> : <GstMatcher />;
    case "calc":
      return tool.calc === "bldc-savings" ? <BldcSavings /> : tool.calc === "fitspire-stack" ? <FitspireStack /> : tool.calc === "nordpass-plan" ? <NordpassPlan /> : <FirstcryClub />;
    case "basket":
      return <BasketTool tool={tool} />;
    case "table":
      return <TableTool tool={tool} />;
    case "chooser":
      return <ChooserTool tool={tool} />;
    case "guide":
      return <GuideTool tool={tool} />;
    case "store-link":
      return <StoreLinkTool tool={tool} />;
  }
}
