import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import type { ProductsResp } from "../types/productsResp";
import { listProducts } from "../api/products";
import ProductItem from "../components/ProductItem";

// 服务端/Mock 支持的字段（你可以在后端/Mock里按需实现）
type SortField = "price" | "stock";
type SortDir = "asc" | "desc";

const PageSize = 10;

export default function ProductsPage() {
  const [params, setParams] = useSearchParams();

  // 1) URL 参数源
  const q = params.get("q") ?? "";
  const page = Math.max(1, Number(params.get("page") ?? "1"));
  const sortBy = (params.get("sortBy") ?? "") as "" | SortField;
  const sortDir = (params.get("sortDir") ?? "asc") as SortDir;

  // 2) 本地状态
  const [input, setInput] = useState(q);
  const [data, setData] = useState<ProductsResp | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<unknown>(null);

  // URL → 输入框同步
  useEffect(() => setInput(q), [q]);

  // 3) 根据 URL 拉数（带竞态取消）
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const resp = await listProducts({
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
  }, [q, page, sortBy, sortDir]);

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

  const totalPages = data?.totalPages ?? 1;

  return (
    <section className="flex h-full w-full flex-col gap-4">
      {/* search bar */}
      <div className="flex w-full gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search products..."
          className="flex-1 rounded-md border border-gray-300 px-2 py-1"
          aria-label="Search products"
        />
        <button className="rounded-md bg-green-700 px-4 py-1 text-white">
          Add product
        </button>
      </div>

      {/* table */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-gray-300 shadow-2xs">
        {/* table header */}
        <div className="h-14 bg-gray-100">
          <div className="grid h-full grid-cols-6 items-center px-4 text-sm font-medium text-gray-700">
            <div className="col-span-2">Name</div>
            <button
              onClick={() => onSort("price")}
              className="flex items-center gap-1 text-left hover:underline"
            >
              Price
              {sortBy === "price" ? <span>({sortDir})</span> : null}
            </button>
            <button
              onClick={() => onSort("stock")}
              className="flex items-center gap-1 text-left hover:underline"
            >
              Stock
              {sortBy === "stock" ? <span>({sortDir})</span> : null}
            </button>
            <div>Published</div>

            <div>Status</div>
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
            <ul className="flex h-full flex-col divide-y divide-gray-200">
              {data.items.map((product) => (
                <li key={product.id} className="flex-1">
                  <ProductItem product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-gray-600">No products</div>
          )}
        </div>

        {/* pagination */}
        <div className="flex h-14 items-center justify-between border-t px-3 py-2 text-sm">
          <div className="text-gray-600">
            Page {data?.page ?? page} / {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="rounded border px-2 py-1 disabled:opacity-50"
              onClick={() => goPage(page - 1)}
              disabled={page <= 1}
            >
              Prev
            </button>
            <button
              className="rounded border px-2 py-1 disabled:opacity-50"
              onClick={() => goPage(page + 1)}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
