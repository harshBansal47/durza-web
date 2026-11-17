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

  it("every outbound link carries the store's placement tag", () => {
    const { dialog } = open("zoff-restock");
    const href = within(dialog).getByRole("link", { name: /Shop Pantry Combos on ZOFF/ }).getAttribute("href") ?? "";
    expect(decodeURIComponent(href)).toContain("url=https://zofffoods.com/collections/combos");
    expect(href).toContain("p1=restock_hack");
  });
});

describe("tool behaviour", () => {
  it("basket: toggling items updates subtotal, discount, UPI and free-shipping state", async () => {
    const user = userEvent.setup();
    const { dialog } = open("zoff-restock");
    expect(dialog).toHaveTextContent("₹834"); // both items: 1098 − 220 − 44
    await user.click(within(dialog).getByRole("button", { name: /Essential Masala Combo/ }));
    expect(dialog).toHaveTextContent("₹599");
    expect(dialog).toHaveTextContent("PANTRY20 (20% off)− ₹120");
    await user.click(within(dialog).getByRole("button", { name: /Almonds/ }));
    expect(dialog).toHaveTextContent("Add ₹499 more");
  });

  it("basket: a flat code only applies once the minimum is met", async () => {
    const user = userEvent.setup();
    const { dialog } = open("bear-multiplier");
    expect(dialog).toHaveTextContent("₹2,468");
    await user.click(within(dialog).getByRole("button", { name: /Stretch Chino/ }));
    expect(dialog).toHaveTextContent("(needs ₹2,999+)");
    expect(dialog).toHaveTextContent("BUNDLE500 (needs ₹2,999+)− ₹0");
  });

  it("chooser: picking an option changes the recommendation and the outbound link", async () => {
    const user = userEvent.setup();
    const { dialog } = open("lavie-capacity");
    expect(dialog).toHaveTextContent("Work Tote");
    await user.click(within(dialog).getByRole("button", { name: "Phone + Cards Only" }));
    expect(dialog).toHaveTextContent("Quilted Sling");
    expect(within(dialog).getByRole("link", { name: /Shop Quilted Sling on Lavie/ })).toBeInTheDocument();
  });

  it("chooser: comparison tools show both sides", async () => {
    const user = userEvent.setup();
    const { dialog } = open("truebasics-matrix");
    expect(dialog).toHaveTextContent("Generic Ashwagandha");
    await user.click(within(dialog).getByRole("button", { name: "Triple Strength vs Standard" }));
    expect(dialog).toHaveTextContent("Standard 1000mg Fish Oil");
  });

  it("calc: sliders drive live results", () => {
    const { dialog } = open("fitspire-stack");
    expect(dialog).toHaveTextContent("₹1,450");
    fireEvent.change(within(dialog).getByRole("slider", { name: /Cart total/ }), { target: { value: "3000" } });
    expect(dialog).toHaveTextContent("₹2,210"); // 3000 − 600 (FIT20) − 120 (5% of 2,400) − 70 delivery
  });

  it("calc: NordPass per-person cost follows the member count", async () => {
    const user = userEvent.setup();
    const { dialog } = open("nordpass-plan");
    expect(dialog).toHaveTextContent("~₹42");
    await user.click(within(dialog).getByRole("button", { name: "2 vaults" }));
    expect(dialog).toHaveTextContent("~₹125");
  });

  it("calc: FirstCry Club recomputes as spend and plan change", async () => {
    const user = userEvent.setup();
    const { dialog } = open("firstcry-club");
    expect(dialog).toHaveTextContent("₹2,301"); // ₹2,500 × 12 months: 3,300 savings − 999
    fireEvent.change(within(dialog).getByRole("slider", { name: /Monthly spend/ }), { target: { value: "1000" } });
    await user.click(within(dialog).getByRole("button", { name: "3 months (₹499)" }));
    expect(dialog).toHaveTextContent("₹11"); // 510 − 499: barely positive at the minimum
  });

  it("table: diapers are ranked cheapest per pant first, with no unsourced ratings", () => {
    const { dialog } = open("firstcry-diapers");
    expect(within(dialog).getAllByRole("row")[1]).toHaveTextContent("MamyPoko");
    expect(dialog).not.toHaveTextContent("★");
  });

  it("table: baby gear filters by type", async () => {
    const user = userEvent.setup();
    const { dialog } = open("firstcry-gear");
    expect(within(dialog).getAllByRole("row")).toHaveLength(5);
    await user.click(within(dialog).getByRole("button", { name: "Car Seat" }));
    expect(within(dialog).getAllByRole("row")).toHaveLength(3);
    expect(dialog).not.toHaveTextContent("Pocket Stroller");
  });

  it("store-link tools point to the store page instead of faking live data", () => {
    const { dialog } = open("boult-audio");
    expect(within(dialog).getByRole("link", { name: /Open the Boult tool/ })).toHaveAttribute("href", "/stores/boult");
  });

  it("closes from the close button", async () => {
    const user = userEvent.setup();
    const { dialog, onClose } = open("hkvitals-day");
    await user.click(within(dialog).getByRole("button", { name: "Close tool" }));
    expect(onClose).toHaveBeenCalled();
  });
});
