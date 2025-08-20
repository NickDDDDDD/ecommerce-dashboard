/**
 * format PublishedAt
 * @param isoString ISO string or null
 * @returns Formatted time string or "-"
 */
export function formatPublishedAt(isoString: string | null): string {
  if (!isoString) return "-";
  try {
    return new Date(isoString).toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "-";
  }
}
