import type { ReplyAction } from "./types";

interface ReplyActionLabels {
  writeReport: string;
  referral: string;
}

const REPORT_PATTERN = /신고|report|通報|举报/i;

export function resolveReplyActions(
  reply: string,
  hasAgencies: boolean,
  labels: ReplyActionLabels,
): ReplyAction[] {
  const actions: ReplyAction[] = [];
  if (REPORT_PATTERN.test(reply)) actions.push({ href: "/report", label: labels.writeReport });
  if (hasAgencies) actions.push({ href: "/support-referral", label: labels.referral });
  return actions;
}
