import type { CreateReportRequest, UpdateReportRequest } from "@/entities/report/api";
import type { ReportDetails, ReportEvidence } from "./Step2Details";

export interface ReportDraft {
  incidentDate: string;
  damageType: string;
  discoveryRoute: string;
  sourceUrl: string;
  description: string;
  additionalNotes: string;
}

export function createDraft(damageLabel: string, details: ReportDetails): ReportDraft {
  return {
    incidentDate: details.incidentDate,
    damageType: damageLabel,
    discoveryRoute: details.platform,
    sourceUrl: details.url,
    description: details.description,
    additionalNotes: details.additionalNotes,
  };
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
