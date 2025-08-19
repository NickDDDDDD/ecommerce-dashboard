import http from "../lib/http";
import { type Product } from "../types/product";

export async function listProducts() {
  const { data } = await http.get<Product[]>("/products");
  return data;
}
