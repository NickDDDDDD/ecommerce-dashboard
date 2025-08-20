// src/mocks/index.ts
import Mock from "mockjs";
import type { Product } from "../types/product";
import type { ProductCreate } from "../types/productCreate";
import type { ProductsResp } from "../types/productsResp";

const list: Product[] = Mock.mock({
  "list|50": [
    {
      id: "@id",
      name: "@ctitle(5, 10)",
      price: "@float(10, 2000, 2, 2)",
      stock: "@integer(0, 1000)",
      "status|1": ["draft", "active", "archived"],
      publishedAt: () => {
        const now = Date.now();
        const past = now - 180 * 24 * 60 * 60 * 1000;
        const ts = Mock.Random.integer(past, now);
        return new Date(ts).toISOString();
      },
    },
  ],
}).list;

// mock getProducts API
Mock.mock(
  /\/api\/products(\?.*)?$/,
  "get",
  (options: { url: string }): ProductsResp => {
    const url = new URL(options.url, window.location.origin);
    const sp = url.searchParams;

    const page = Math.max(1, Number(sp.get("page") || 1));
    const pageSize = Math.max(1, Number(sp.get("pageSize") || 10));

    const total = list.length;
    const totalPages = Math.ceil(total / pageSize);
    const safePage = Math.min(page, totalPages);

    const start = (safePage - 1) * pageSize;
    const items = list.slice(start, start + pageSize);

    return {
      items,
      page: safePage,
      pageSize,
      total,
      totalPages,
    };
  },
);

Mock.mock("/api/products", "post", (options: { body: string }): Product => {
  const payload = JSON.parse(options.body) as ProductCreate;

  const newProduct: Product = {
    id: Mock.Random.id(),
    name: payload.name,
    price: payload.price,
    stock: payload.stock,
    status: "draft",
    publishedAt: null,
  };

  list.unshift(newProduct);
  return newProduct;
});

Mock.setup({ timeout: "200-600" });
