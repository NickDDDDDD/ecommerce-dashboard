import { getPageWindow } from "../utils/pagination";
import { twMerge } from "tailwind-merge";

type PaginationProps = {
  page: number;
  totalPages: number;
  goPage: (page: number) => void;
};
const Pagination = ({ page, totalPages, goPage }: PaginationProps) => {
  const { pages, hasPrevGap, hasNextGap } = getPageWindow(page, totalPages, 5);

  return (
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
  );
};

export default Pagination;
