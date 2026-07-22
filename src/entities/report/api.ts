import { api } from "@/shared/api/axios";

export type ReportDocumentStatus = "DRAFT" | "FINALIZED";
export type ReportTimelineEvent = "CREATED" | "UPDATED" | "FINALIZED";

export interface CreateReportRequest {
  incidentDate?: string;
  discoveryRoute?: string;
  damageType?: string;
  description?: string;
  sourceUrls?: string[];
  evidenceIds?: number[];
}

export interface UpdateReportRequest {
  incidentDate?: string;
  discoveryRoute?: string;
  damageType?: string;
  description?: string;
  sourceUrls?: string[];
  evidenceIds?: number[];
}

export interface ReportStatusResponse {
  reportId: number;
  status: ReportDocumentStatus;
  documentUrl?: string;
}

export interface TimelineEntryResponse {
  event: ReportTimelineEvent;
  occurredAt: string;
}

export interface ReportResponse {
  reportId: number;
  status: ReportDocumentStatus;
  incidentDate?: string;
  discoveryRoute?: string;
  damageType?: string;
  description?: string;
  sourceUrls?: string[];
  evidenceIds?: number[];
  targetAgencyType?: string;
  documentUrl?: string;
  timeline?: TimelineEntryResponse[];
  createdAt: string;
}

export interface ReportEvidenceResponse {
  evidenceId: number;
  fileUrl: string;
}

export async function createReport(payload: CreateReportRequest): Promise<ReportStatusResponse> {
  const { data } = await api.post<ReportStatusResponse>("/api/v1/reports", payload);
  return data;
}

export async function getMyReports(): Promise<ReportResponse[]> {
  const { data } = await api.get<ReportResponse[]>("/api/v1/reports");
  return data;
}

export async function getReport(reportId: number): Promise<ReportResponse> {
  const { data } = await api.get<ReportResponse>(`/api/v1/reports/${reportId}`);
  return data;
}

export async function updateReport(
  reportId: number,
  payload: UpdateReportRequest
): Promise<ReportResponse> {
  const { data } = await api.patch<ReportResponse>(`/api/v1/reports/${reportId}`, payload);
  return data;
}

export async function finalizeReport(reportId: number): Promise<ReportStatusResponse> {
  const { data } = await api.post<ReportStatusResponse>(
    `/api/v1/reports/${reportId}/finalize`
  );
  return data;
}

export async function uploadReportEvidence(file: File): Promise<ReportEvidenceResponse> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<ReportEvidenceResponse>(
    "/api/v1/reports/evidence",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}
