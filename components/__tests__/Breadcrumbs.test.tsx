import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Breadcrumbs from "@/components/Breadcrumbs";

const items = [
  { name: "Home", path: "/" },
  { name: "Stores", path: "/stores" },
  { name: "Acer", path: "/stores/acer" },
];

describe("Breadcrumbs", () => {
  const html = renderToStaticMarkup(<Breadcrumbs items={items} />);

  it("shows a visible trail with links to every parent", () => {
    expect(html).toContain('aria-label="Breadcrumb"');
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/stores"');
  });

  it("shows the current page as text, not a link", () => {
    expect(html).not.toContain('href="/stores/acer"');
    expect(html).toContain('aria-current="page"');
  });

  it("emits BreadcrumbList data for exactly the crumbs that are shown", () => {
    const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)![1];
    const data = JSON.parse(json);
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement.map((i: { name: string }) => i.name)).toEqual(["Home", "Stores", "Acer"]);
  });
});
