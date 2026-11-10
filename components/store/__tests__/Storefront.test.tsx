import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProductCard from "@/components/store/ProductCard";
import Storefront, { type StoreProductCollection } from "@/components/store/Storefront";
import { api } from "@/lib/api";
import type { Product, ProductCategory, Store } from "@/lib/types";

vi.mock("@/components/SaveDealBanner", () => ({ default: () => null }));

const store: Store = {
  id: "store-1",
  name: "Example Shop",
  slug: "example-shop",
  logo_url: null,
  website_url: "https://shop.example",
  description: null,
  pricing_summary: null,
  pricing_checked_at: null,
  is_active: true,
  commission_disclosure: null,
  country_code: "IN",
  currency: "INR",
  created_at: "2026-01-01T00:00:00Z",
};

const category: ProductCategory = {
  id: "category-1",
  name: "Shoes",
  slug: "shoes",
  product_count: 10,
};

function product(index: number, overrides: Partial<Product> = {}): Product {
  return {
    id: `product-${index}`,
    name: `Shoe ${index}`,
    slug: `shoe-${index}`,
    store_id: store.id,
    category_id: category.id,
    has_url: true,
    image_url: null,
    currency: "INR",
    current_price: 1500,
    list_price: 2000,
    in_stock: true,
    last_captured_at: "2026-11-10T00:00:00Z",
    lowest_price_7d: null,
    lowest_price_30d: null,
    lowest_price_90d: null,
    last_price_drop_at: null,
    last_price_drop_pct: null,
    created_at: "2026-11-01T00:00:00Z",
    effective_price: null,
    ...overrides,
  };
}

function collection(products: Product[] = Array.from({ length: 8 }, (_, index) => product(index + 1))) {
  return { category, products } satisfies StoreProductCollection;
}

describe("store product storefront", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("uses store categories for navigation and loads more products only on request", async () => {
    const listProducts = vi.spyOn(api, "listProducts").mockResolvedValue({
      items: [product(9), product(10)],
      total: 10,
      skip: 8,
      limit: 8,
    });

    render(<Storefront store={store} collections={[collection()]} />);

    expect(screen.getByRole("link", { name: "All products" }).getAttribute("href")).toBe(
      "#all-collections",
    );
    expect(screen.getByRole("link", { name: "Shoes" }).getAttribute("href")).toBe("#collection-shoes");
    expect(screen.getByRole("link", { name: "Shoes, 10 products" })).toBeTruthy();
    expect(listProducts).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "View all 10" }));
    fireEvent.click(screen.getByRole("button", { name: "Load more" }));

    await waitFor(() => expect(screen.getByRole("heading", { name: "Shoe 10" })).toBeTruthy());
    expect(listProducts).toHaveBeenCalledWith({
      store_id: store.id,
      category_id: category.id,
      skip: 8,
      limit: 8,
    });
    expect(screen.getByRole("button", { name: "Show less" })).toBeTruthy();
  });

  it("keeps an empty storefront honest without inventing categories or products", () => {
    render(<Storefront store={store} collections={[]} />);

    expect(screen.getByRole("status").textContent).toMatch(/no products are listed/i);
    expect(screen.queryByRole("navigation", { name: /product categories/i })).toBeNull();
  });

  it("uses a two-column mobile grid and scrollable category navigation", () => {
    const { container } = render(<Storefront store={store} collections={[collection()]} />);

    expect(container.querySelector('[aria-label="Example Shop product categories"]')?.className).toContain(
      "overflow-x-auto",
    );
    const productGrid = Array.from(container.querySelectorAll("div")).find(
      (element) =>
        element.classList.contains("grid-cols-2") &&
        element.classList.contains("lg:grid-cols-3") &&
        element.classList.contains("2xl:grid-cols-4"),
    );
    expect(productGrid).toBeTruthy();
    expect(container.querySelector("article")?.className).toContain("sm:flex-row");
    expect(container.querySelector("article > div")?.classList.contains("aspect-[3/4]")).toBe(true);
  });

  it("keeps configured category order and renders empty categories without fabricated products", () => {
    const bags: ProductCategory = {
      id: "category-2",
      name: "Bags",
      slug: "bags",
      product_count: 0,
    };
    render(
      <Storefront
        store={store}
        collections={[collection(), { category: bags, products: [] }]}
      />,
    );

    const navigation = screen.getByRole("navigation", { name: "Example Shop product categories" });
    expect(Array.from(navigation.querySelectorAll("a")).map((link) => link.getAttribute("href"))).toEqual([
      "#all-collections",
      "#collection-shoes",
      "#collection-bags",
    ]);
    expect(screen.getByText("No products are available in this category right now.")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /view all 0/i })).toBeNull();
  });

  it("does not display missing prices, images, ratings, or tracked outbound links", () => {
    render(
      <ProductCard
        product={product(1, {
          has_url: false,
          image_url: null,
          current_price: null,
          list_price: null,
          effective_price: null,
          last_captured_at: null,
        })}
        categoryName="Shoes"
      />,
    );

    expect(screen.getByText("Image unavailable")).toBeTruthy();
    expect(screen.getByText("Price unavailable")).toBeTruthy();
    expect(screen.queryByText(/rating|reviews|verified/i)).toBeNull();
    expect(screen.queryByRole("link", { name: /at the store/i })).toBeNull();
  });

  it("keeps product links on the tracked redirect and shows only price-derived savings", () => {
    render(<ProductCard product={product(1)} categoryName="Shoes" />);

    const link = screen.getByRole("link", { name: /view product at the store/i });
    expect(link.getAttribute("href")).toMatch(/\/products\/product-1\/go\?src=storefront$/);
    expect(link.getAttribute("rel")).toContain("sponsored");
    expect(screen.getByText(/save ₹500/i)).toBeTruthy();
  });

  it("can render supplied merchandising metadata without requiring those values", () => {
    render(
      <ProductCard
        product={product(1)}
        categoryName="Shoes"
        presentation={{
          promotionalBadge: "Bestseller",
          rating: "4.3",
          reviewCount: "1,420",
          verifiedAt: "2026-11-10T00:00:00Z",
          ctaText: "Grab deal",
        }}
      />,
    );

    expect(screen.getByText("Bestseller")).toBeTruthy();
    expect(screen.getByText(/4\.3/)).toBeTruthy();
    expect(screen.getByText(/1,420 reviews/)).toBeTruthy();
    expect(screen.getByText(/verified/i)).toBeTruthy();
    expect(screen.getByText("Grab deal")).toBeTruthy();
  });
});
