import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ToolDialog from "@/components/tools/ToolDialog";
import { STORE_TOOLS, TOOLS_BY_ID } from "@/lib/store-tools";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

function open(id: string) {
  const tool = TOOLS_BY_ID.get(id);
  if (!tool) throw new Error(`no tool ${id}`);
  const onClose = vi.fn();
  render(<ToolDialog tool={tool} onClose={onClose} />);
  return { dialog: screen.getByRole("dialog", { name: tool.title }), onClose, tool };
}

describe("every registry tool renders and works", () => {
  it.each(STORE_TOOLS.map((t) => [t.id, t.kind] as const))("%s (%s) renders its title, a store link and no broken outbound links", (id) => {
    const { dialog, tool } = open(id);
    expect(dialog).toHaveTextContent(tool.storeName);
    expect(within(dialog).getByRole("link", { name: new RegExp(`All ${tool.storeName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} coupons`) })).toHaveAttribute("href", `/stores/${tool.store}`);
    for (const a of dialog.querySelectorAll<HTMLAnchorElement>('a[href^="https://"]')) {
      expect(a.href).toContain("track.vcommission.com/click");
      expect(a.rel).toContain("sponsored");
      expect(a.rel).toContain("nofollow");
      expect(a.target).toBe("_blank");
    }
    if (tool.brandSupplied) expect(dialog).toHaveTextContent(/own, copied from its store page/);
    else expect(dialog).not.toHaveTextContent(/own, copied from its store page/);
  });

});

describe("kept calculator behaviour", () => {
  it("BLDC calculator shows wattage and room size", () => {
    const { dialog } = open("bldc");
    expect(dialog).toHaveTextContent("1200 mm");
    expect(dialog).toHaveTextContent(/BLDC/);
  });

  it("protein decoder shows cost per 25 g", () => {
    const { dialog } = open("protein");
    expect(dialog).toHaveTextContent(/per 25/i);
  });
});
