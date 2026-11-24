import type { ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HomePage, { generateMetadata } from "@/app/page";
import JsonLd from "@/components/JsonLd";
import { api } from "@/lib/api";
import { BRAND } from "@/lib/brand";
import { SITE_TITLE } from "@/lib/site";
import type { CouponPublic } from "@/lib/types";

vi.mock("@/lib/api", () => ({
  api: {
    listCoupons: vi.fn(),
    listStores: vi.fn(),
    listCategories: vi.fn(),
    getEditorialHomepage: vi.fn(),
    goUrl: vi.fn(() => "https://go.test/offer"),
  },
}));
vi.mock("@/lib/topic-content", () => ({ discoverableContent: vi.fn(async () => []) }));
vi.mock("@/lib/flags", () => ({ REDESIGN_ENABLED: false }));

const store = {
  id: "s1",
  slug: "test-store",
  name: "Test Store",
  logo_url: null,
  website_url: null,
};

function offer(id: string, title: string): CouponPublic {
  return {
    id,
    slug: id,
    title,
    store_id: store.id,
    is_active: true,
    auto_suppressed: false,
    last_checked_at: new Date("2026-11-25T00:00:00Z").toISOString(),
    last_verified_at: null,
    expires_at: null,
    code: null,
    discount_type: "deal",
    discount_value: null,
    min_spend: null,
    category_id: null,
    clicks_count: 1,
    success_count: 0,
    fail_count: 0,
    verification_status: "verified",
    terms: [],
    restrictions: null,
    description: null,
  } as unknown as CouponPublic;
}

function pageOf<T>(items: T[], total = items.length) {
  return { items, total, skip: 0, limit: 20 };
}

function configureApi(items: CouponPublic[] = []) {
  vi.mocked(api.listCoupons).mockResolvedValue(pageOf(items, items.length));
  vi.mocked(api.listStores).mockResolvedValue(pageOf([store]) as never);
  vi.mocked(api.listCategories).mockResolvedValue(pageOf([]));
  vi.mocked(api.getEditorialHomepage).mockResolvedValue({
    guides: [], comparisons: [], reviews: [], collections: [],
  });
}

/** Walk the returned element tree without mounting the client islands. */
function jsonLdSchemas(node: unknown): Array<Record<string, unknown>> {
  if (!node || typeof node !== "object") return [];
  const element = node as { type?: unknown; props?: { children?: unknown; data?: unknown } };
  const found: Array<Record<string, unknown>> = [];
  if (element.type === JsonLd && element.props?.data) {
    found.push(element.props.data as Record<string, unknown>);
  }
  const children = element.props?.children;
  if (Array.isArray(children)) {
    for (const child of children) found.push(...jsonLdSchemas(child));
  } else if (children) {
    found.push(...jsonLdSchemas(children));
  }
  return found;
}

const originalMitgo = process.env.MITGO_VERIFICATION;

beforeEach(() => {
  vi.mocked(api.listCoupons).mockReset();
  configureApi();
});

afterEach(() => {
  if (originalMitgo === undefined) delete process.env.MITGO_VERIFICATION;
  else process.env.MITGO_VERIFICATION = originalMitgo;
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("homepage metadata", () => {
  it("keeps the layout's shared tags and only emits MITGO when configured", async () => {
    delete process.env.MITGO_VERIFICATION;
    const metadata = await generateMetadata();

    expect(metadata.title).toEqual({ absolute: SITE_TITLE });
    expect(metadata.alternates?.canonical).toContain("/");
    expect((metadata.openGraph as { siteName?: string }).siteName).toBe("Durza Coupons India");
    expect(metadata.other).toMatchObject({ "fo-verify": BRAND.verification.foVerify });
    expect(metadata.other).not.toHaveProperty("mitgo-verification");

    process.env.MITGO_VERIFICATION = "test-token";
    const withToken = await generateMetadata();
    expect(withToken.other).toHaveProperty("mitgo-verification", "test-token");
  });
});

describe("homepage structured data", () => {
  it("describes the rails and steps actually rendered", async () => {
    configureApi([offer("c1", "Test offer")]);
    const schemas = jsonLdSchemas(await HomePage() as ReactElement);
    const types = schemas.map((schema) => schema["@type"]);

    expect(types).toContain("ItemList");
    expect(types).toContain("HowTo");
    const itemList = schemas.find((schema) => schema["@type"] === "ItemList");
    expect(itemList?.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        name: "Test offer",
        url: expect.stringContaining("/coupons/c1"),
      },
    ]);
    const howTo = schemas.find((schema) => schema["@type"] === "HowTo");
    expect(howTo?.step).toHaveLength(3);
  });
});

describe("homepage degradation", () => {
  it("throws instead of caching an outage as an empty catalogue", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    configureApi([]);
    vi.mocked(api.listStores).mockResolvedValue(pageOf([]) as never);
    vi.mocked(api.listCoupons).mockRejectedValue(new Error("backend down"));
    vi.stubEnv("NODE_ENV", "production");

    await expect(HomePage()).rejects.toThrow(/keeping the last good render/);
  });
});
