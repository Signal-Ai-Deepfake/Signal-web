import type { ReplyAction } from "./types";

const RULES: { pattern: RegExp; action: ReplyAction }[] = [
  { pattern: /신고/, action: { href: "/report", label: "신고 문서 작성하기" } },
  {
    pattern: /기관|센터|상담소|수사대|경찰|지원단|위원회|법률/,
    action: { href: "/support-referral", label: "전문 기관 연결하기" },
  },
];

export function resolveReplyActions(reply: string): ReplyAction[] {
  return RULES.filter(({ pattern }) => pattern.test(reply)).map(({ action }) => action);
}
