const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");

export function resolveFileUrl(url: string): string;
export function resolveFileUrl(url: string | null | undefined): string | undefined;
export function resolveFileUrl(url: string | null | undefined): string | undefined {
  if (!url) return url ?? undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}
