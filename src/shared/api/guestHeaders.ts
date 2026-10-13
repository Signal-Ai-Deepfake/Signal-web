import { getOrCreateAnonymousId } from "@/shared/lib/anonymousId";
import { getAccessToken } from "@/shared/lib/authToken";

// 비로그인 요청에는 백엔드가 요구하는 익명 식별자를 붙인다.
export function guestHeaders() {
  return getAccessToken() ? undefined : { "X-Anonymous-Id": getOrCreateAnonymousId() };
}
