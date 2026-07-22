const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");

// 백엔드가 파일 URL을 절대 경로가 아닌 상대 경로(예: "/uploads/...")로 내려주는 경우가 있어,
// <img src>/<a href>에 그대로 쓰면 프론트엔드 자체 origin으로 요청이 나가 깨진다.
export function resolveFileUrl(url: string): string;
export function resolveFileUrl(url: string | null | undefined): string | undefined;
export function resolveFileUrl(url: string | null | undefined): string | undefined {
  if (!url) return url ?? undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}
