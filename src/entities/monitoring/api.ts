import { api } from "@/shared/api/axios";

export type MonitoringStatus = "ACTIVE";

export interface MonitoringCreateResponse {
  monitoringId: number;
  status: MonitoringStatus;
}

export interface DetectionResponse {
  detectionId: number;
  sourceUrl?: string;
  thumbnailUrl?: string;
  similarity?: number;
  detectedAt: string;
}

export interface DetectionPageResponse {
  content: DetectionResponse[];
  totalElements: number;
  totalPages: number;
}

export async function createMonitoring(referenceImage: File): Promise<MonitoringCreateResponse> {
  const formData = new FormData();
  formData.append("referenceImage", referenceImage);
  const { data } = await api.post<MonitoringCreateResponse>("/api/v1/monitorings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function getMonitoringDetections(
  monitoringId: number,
  page = 0,
  size = 10,
): Promise<DetectionPageResponse> {
  const { data } = await api.get<DetectionPageResponse>(
    `/api/v1/monitorings/${monitoringId}/detections`,
    { params: { page, size } },
  );
  return data;
}

export async function deleteMonitoring(monitoringId: number): Promise<void> {
  await api.delete(`/api/v1/monitorings/${monitoringId}`);
}
