import { api } from "@/shared/api/axios";

export type MonitoringStatus = "ACTIVE";

export interface MonitoringCreateResponse {
  monitoringId: number;
  status: MonitoringStatus;
}

export async function createMonitoring(referenceImage: File): Promise<MonitoringCreateResponse> {
  const formData = new FormData();
  formData.append("referenceImage", referenceImage);
  const { data } = await api.post<MonitoringCreateResponse>("/api/v1/monitorings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
