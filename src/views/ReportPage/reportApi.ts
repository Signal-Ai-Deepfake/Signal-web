import { api } from "@/shared/api/axios";

export type ReportDocumentStatus = "DRAFT" | "FINALIZED";

export interface CreateReportRequest {
  incidentDate?: string;
  discoveryRoute?: string;
  damageType?: string;
  description?: string;
  sourceUrls?: string[];
}

export interface ReportStatusResponse {
  reportId: number;
  status: ReportDocumentStatus;
  documentUrl?: string;
}

export async function createReport(payload: CreateReportRequest): Promise<ReportStatusResponse> {
  const { data } = await api.post<ReportStatusResponse>("/api/v1/reports", payload);
  return data;
}
