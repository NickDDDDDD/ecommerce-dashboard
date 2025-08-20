// utils/pagination.ts
export function getPageWindow(
  current: number,
  total: number,
  size = 5,
): { pages: number[]; hasPrevGap: boolean; hasNextGap: boolean } {
  if (total < 1) total = 1;
  const half = Math.floor(size / 2);

  let start = Math.max(1, current - half);
  let end = start + size - 1;

  if (end > total) {
    end = total;
    start = Math.max(1, end - size + 1);
  }

  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return {
    pages,
    hasPrevGap: start > 1,
    hasNextGap: end < total,
  };
}
