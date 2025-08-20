import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import type { ProductsResp } from "../types/productsResp";
import { getPageWindow } from "../utils/pagination";
import { twMerge } from "tailwind-merge";

import { getProducts } from "../api/products";

import ProductItem from "../components/ProductItem";
import AddProductModal from "../components/AddProductModal";

type SortField = "price" | "stock";
type SortDir = "asc" | "desc";

const PageSize = 10;

export default function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const [refresh, setRefresh] = useState(0);

  // url params
  const q = params.get("q") ?? "";
  const page = Math.max(1, Number(params.get("page") ?? "1"));
  const sortBy = (params.get("sortBy") ?? "") as "" | SortField;
  const sortDir = (params.get("sortDir") ?? "asc") as SortDir;

  // local state
  const [input, setInput] = useState(q);
  const [data, setData] = useState<ProductsResp | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<unknown>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // total pages

  const totalPages = data?.totalPages ?? 1;

  const { pages, hasPrevGap, hasNextGap } = getPageWindow(page, totalPages, 5);

  useEffect(() => setInput(q), [q]);

  // get products response
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const resp = await getProducts({
          q: q || undefined,
          page,
          pageSize: PageSize,
          sortBy: sortBy || undefined,
          sortDir,
        });

        console.log("Fetched products:", resp);
        setData(resp);
      } catch (e) {
        setErr(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [q, page, sortBy, sortDir, refresh]);

  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      const next = new URLSearchParams(params);
      if (input) {
        next.set("q", input);
      } else {
        next.delete("q");
      }
      next.set("page", "1");
      setParams(next, { replace: true });
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [input]); // eslint-disable-line react-hooks/exhaustive-deps

  // sort and set page to 1
  const onSort = (field: SortField) => {
    const next = new URLSearchParams(params);
    const nextDir: SortDir =
      sortBy === field && sortDir === "asc" ? "desc" : "asc";
    next.set("sortBy", field);
    next.set("sortDir", nextDir);
    next.set("page", "1");
    setParams(next, { replace: true });
  };

  // go to specific page
  const goPage = (p: number) => {
    const next = new URLSearchParams(params);
    next.set("page", String(Math.max(1, p)));
    setParams(next, { replace: true });
  };

  return (
    <section className="flex h-full w-full flex-col gap-4">
      {/* search bar + add product button */}
      <div className="flex w-full gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search products..."
          className="flex-1 rounded-md border border-gray-300 px-2 py-1"
          aria-label="Search products"
        />
        <button
          className="rounded-md bg-green-700 px-4 py-1 text-sm text-white"
          onClick={() => setModalOpen(true)}
        >
          添加商品
        </button>
      </div>

      {modalOpen && (
        <AddProductModal
          setModalOpen={setModalOpen}
          onCreated={() => setRefresh((prev) => prev + 1)}
        />
      )}
      {/* table */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-gray-300 shadow-2xs">
        {/* table header */}
        <div className="h-14 bg-gray-100">
          <div className="grid h-full grid-cols-6 items-center px-4 text-sm font-medium text-gray-700">
            <div>商品ID</div>
            <div>商品名</div>
            <button
              onClick={() => onSort("price")}
              className="flex items-center gap-1 text-left hover:underline"
            >
              价格
              {sortBy === "price" ? <span>({sortDir})</span> : null}
            </button>
            <button
              onClick={() => onSort("stock")}
              className="flex items-center gap-1 text-left hover:underline"
            >
              库存
              {sortBy === "stock" ? <span>({sortDir})</span> : null}
            </button>
            <div>发布时间</div>

            <div>状态</div>
          </div>
        </div>

        {/* table body */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="p-4 text-sm text-gray-600">Loading…</div>
          ) : err ? (
            <div className="p-4 text-sm text-red-600">
              Failed to load products.
            </div>
          ) : data?.items?.length ? (
            <ul className="grid h-full grid-rows-10 divide-y divide-gray-200">
              {data.items.map((product) => (
                <li key={product.id}>
                  <ProductItem
                    product={product}
                    onUpdated={() => setRefresh((prev) => prev + 1)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-gray-600">No products</div>
          )}
        </div>

        {/* pagination */}
        <div className="flex h-14 items-center justify-center bg-gray-100 px-3 py-2 text-sm">
          <div className="flex items-center gap-1">
            <button
              className="rounded px-2 py-1 hover:bg-gray-200"
              onClick={() => goPage(page - 1)}
              disabled={page <= 1}
            >
              上一页
            </button>

            {hasPrevGap && (
              <>
                <button
                  className="rounded px-2 py-1 hover:bg-gray-200"
                  onClick={() => goPage(1)}
                >
                  1
                </button>
                <span className="px-1 text-gray-500">…</span>
              </>
            )}

            {pages.map((p) => (
              <button
                key={p}
                onClick={() => goPage(p)}
                className={twMerge(
                  "rounded px-2 py-1 hover:bg-gray-200",
                  p === page && "bg-blue-600 text-white hover:bg-blue-600",
                )}
              >
                {p}
              </button>
            ))}

            {hasNextGap && (
              <>
                <span className="px-1 text-gray-500">…</span>
                <button
                  className="rounded px-2 py-1 hover:bg-gray-200"
                  onClick={() => goPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              className="rounded px-2 py-1 hover:bg-gray-200"
              onClick={() => goPage(page + 1)}
              disabled={page >= totalPages}
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
