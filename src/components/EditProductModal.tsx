import Modal from "./Modal";
import { useState } from "react";
import type { Product } from "../types/product";

type EditProductModalProps = {
  setModalOpen: (open: boolean) => void;
  product: Product;
};

const EditProductModal = ({ setModalOpen, product }: EditProductModalProps) => {
  const [productData, setProductData] = useState<Product>({
    ...product,
  });
  return (
    <Modal setModalOpen={setModalOpen}>
      <form className="flex w-[50vw] flex-col gap-8 rounded-md bg-gray-100 p-8 text-xl shadow-md">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter product name"
            value={productData.name}
            className="rounded-md border border-gray-300 p-2"
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="price">Product Price</label>
          <input
            id="price"
            type="number"
            placeholder="0.00"
            value={productData.price}
            className="rounded-md border border-gray-300 p-2"
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="stock">Product Stock</label>
          <input
            id="stock"
            type="number"
            placeholder="0"
            value={productData.stock}
            className="rounded-md border border-gray-300 p-2"
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                stock: Number(e.target.value),
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="publishedAt">Published At</label>
          <input
            id="publishedAt"
            type="text"
            value={new Date(productData.publishedAt).toLocaleString("zh-CN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
            readOnly
            className="rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-600"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={productData.status}
            className="rounded-md border border-gray-300 p-2"
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                status: e.target.value as "draft" | "active" | "archived",
              }))
            }
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 rounded-md bg-green-600 p-2 text-white hover:bg-green-500"
            onClick={(e) => {
              e.preventDefault();
              // Handle product submission logic here
              console.log("Product submitted:", productData);
              setModalOpen(false);
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="flex-1 rounded-md bg-gray-200 p-2 hover:bg-gray-300"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProductModal;
