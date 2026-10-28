import type { ReplyAction } from "./types";

interface ReplyActionLabels {
  writeReport: string;
  referral: string;
}

const REPORT_PATTERN = /신고|report|通報|举报/i;
const AGENCY_PATTERN =
  /기관|센터|상담소|수사대|경찰|지원단|위원회|법률|agency|center|police|機関|警察|机构/i;

export function resolveReplyActions(
  reply: string,
  hasAgencies: boolean,
  labels: ReplyActionLabels,
): ReplyAction[] {
  const actions: ReplyAction[] = [];
  if (REPORT_PATTERN.test(reply)) actions.push({ href: "/report", label: labels.writeReport });
  if (hasAgencies || AGENCY_PATTERN.test(reply)) {
    actions.push({ href: "/support-referral", label: labels.referral });
  }
  return actions;
}
