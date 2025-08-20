import Modal from "./Modal";
import { useState } from "react";
import type { Product } from "../types/product";
import { formatPublishedAt } from "../utils/date";
import { updateProduct } from "../api/products";

type EditProductModalProps = {
  setModalOpen: (open: boolean) => void;
  onUpdated: () => void;

  product: Product;
};

const EditProductModal = ({
  setModalOpen,
  product,
  onUpdated,
}: EditProductModalProps) => {
  const [productData, setProductData] = useState<Product>({
    ...product,
  });

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSave = async () => {
    setSubmitting(true);
    setErr(null);

    try {
      await updateProduct(productData.id, productData);
      onUpdated();
      setModalOpen(false);
    } catch (error) {
      setErr("Failed to update product");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal setModalOpen={setModalOpen}>
      <form className="flex w-[50vw] flex-col gap-8 rounded-md bg-gray-100 p-8 text-xl shadow-md">
        {err && (
          <div className="rounded bg-red-50 p-2 text-sm text-red-600">
            {err}
          </div>
        )}

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
            value={formatPublishedAt(productData.publishedAt)}
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
              handleSave();
              console.log("Product submitted:", productData);
              setModalOpen(false);
            }}
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="flex-1 rounded-md bg-gray-200 p-2 hover:bg-gray-300"
            onClick={() => setModalOpen(false)}
            disabled={submitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProductModal;
