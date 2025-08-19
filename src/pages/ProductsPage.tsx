import { listProducts } from "../api/products";
import { useState, useEffect } from "react";
import { type Product } from "../types/product";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const products = await listProducts();
    console.log("products: ", products);

    setProducts(products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="flex h-full w-full flex-col gap-4">
      <div className="flex w-full gap-2">
        <input
          type="text"
          className="flex-1 rounded-md border border-gray-300 px-2 py-1"
        />
        <button className="rounded-md bg-green-700 px-4 py-1 text-white">
          Add product
        </button>
      </div>
      <div className="flex-1 overflow-hidden rounded-md border border-gray-300 shadow-2xs">
        <div className="h-14 bg-gray-100"></div>
      </div>
    </section>
  );
};

export default ProductsPage;
