import type { CreateReportRequest, UpdateReportRequest } from "@/entities/report/api";
import type { DamageType } from "./Step1TypeSelect";
import type { ReportDetails, ReportEvidence } from "./Step2Details";

export interface ReportDraft {
  incidentDate: string;
  damageType: string;
  discoveryRoute: string;
  sourceUrl: string;
  description: string;
  additionalNotes: string;
}

export const REQUEST_TEXT = "해당 게시물의 삭제, 추가 확산 방지 및 필요한 조치를 요청합니다.";

export function createDraft(damageType: DamageType, details: ReportDetails): ReportDraft {
  return {
    incidentDate: details.incidentDate,
    damageType,
    discoveryRoute: details.platform,
    sourceUrl: details.url,
    description: details.description,
    additionalNotes: details.additionalNotes,
  };
}

export function formatDraftDate(value: string) {
  if (!value) return "미입력";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function overviewText(damageType: string) {
  return `${damageType.trim() || "신고"} 피해가 발생한 것으로 보여 신고합니다.`;
}

export function evidenceText(evidence: ReportEvidence | null) {
  return evidence?.name ?? "첨부된 자료 없음";
}

function optional(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function toCreateRequest(
  draft: ReportDraft,
  evidence: ReportEvidence | null,
): CreateReportRequest {
  const sourceUrl = optional(draft.sourceUrl);
  return {
    incidentDate: optional(draft.incidentDate),
    discoveryRoute: optional(draft.discoveryRoute),
    damageType: optional(draft.damageType),
    description: optional(draft.description),
    additionalNotes: optional(draft.additionalNotes),
    sourceUrls: sourceUrl ? [sourceUrl] : undefined,
    evidenceIds: evidence ? [evidence.id] : undefined,
  };
}

export function toUpdateRequest(
  draft: ReportDraft,
  evidence: ReportEvidence | null,
): UpdateReportRequest {
  const created = toCreateRequest(draft, evidence);
  return {
    incidentDate: created.incidentDate ?? null,
    discoveryRoute: created.discoveryRoute ?? null,
    damageType: created.damageType ?? null,
    description: created.description ?? null,
    additionalNotes: created.additionalNotes ?? null,
    sourceUrls: created.sourceUrls ?? [],
    evidenceIds: created.evidenceIds ?? [],
  };
}
