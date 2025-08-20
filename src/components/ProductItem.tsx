import { type Product } from "../types/product";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import EditProductModal from "./EditProductModal";
const ProductItem = ({ product }: { product: Product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const formatedDate = new Date(product.publishedAt).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusStyle = {
    draft: "bg-gray-500",
    active: "bg-green-600",
    archived: "bg-red-600",
  }[product.status];

  return (
    <div className="group relative grid h-full grid-cols-6 items-center px-4 py-2 hover:bg-gray-100">
      <div className="col-span-2 truncate">{product.name}</div>
      <div>${product.price}</div>
      <div>{product.stock ?? "-"}</div>
      <div>{formatedDate ?? "-"}</div>
      <div
        className={twMerge(
          statusStyle,
          "w-fit rounded-md px-2 py-1 text-xs font-semibold text-white",
        )}
      >
        {product.status ?? "-"}
      </div>
      <div className="absolute right-4 hidden items-center gap-2 group-hover:flex">
        <button
          className="rounded-md bg-gray-500 px-4 py-1 text-white"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      </div>

      {isEditing && (
        <EditProductModal setModalOpen={setIsEditing} product={product} />
      )}
    </div>
  );
};

export default ProductItem;
