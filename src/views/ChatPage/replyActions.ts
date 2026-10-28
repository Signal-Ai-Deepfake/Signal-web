import type { ReplyAction } from "./types";

interface ReplyActionLabels {
  writeReport: string;
  referral: string;
}

const RULES: { pattern: RegExp; href: string; label: keyof ReplyActionLabels }[] = [
  { pattern: /신고|report/i, href: "/report", label: "writeReport" },
  {
    pattern: /기관|센터|상담소|수사대|경찰|지원단|위원회|법률|agency|center|police/i,
    href: "/support-referral",
    label: "referral",
  },
];

export function resolveReplyActions(reply: string, labels: ReplyActionLabels): ReplyAction[] {
  return RULES.filter(({ pattern }) => pattern.test(reply)).map(({ href, label }) => ({
    href,
    label: labels[label],
  }));
}
