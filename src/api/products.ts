import http from "../lib/http";
import { type ProductsResp } from "../types/productsResp";

export async function listProducts(params: {
  q?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: string;
}) {
  const { data } = await http.get<ProductsResp>("/products", { params });
  return data;
}
