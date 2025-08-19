// src/mocks/index.ts
import Mock from "mockjs";
import type { Product } from "../types/product";

const list: Product[] = Mock.mock({
  "list|50": [
    {
      id: "@id",
      name: "@ctitle(5, 10)",
      price: "@float(10, 2000, 2, 2)",
      stock: "@integer(0, 1000)",
      "status|1": ["draft", "active", "archived"],
      // 随机 ISO 时间（过去 6 个月内）
      publishedAt: () => {
        const now = Date.now();
        const past = now - 180 * 24 * 60 * 60 * 1000;
        const ts = Mock.Random.integer(past, now);
        return new Date(ts).toISOString();
      },
    },
  ],
}).list;

// ✅ 用正则匹配，命中 /api/products（带前导斜杠）
Mock.mock(/\/api\/products$/, "get", () => list);

Mock.setup({ timeout: "200-600" });
