import { api } from "@/shared/api/axios";

export type ProtectionLevel = "LIGHT" | "NORMAL" | "STRONG";
export type ProcessingStatus = "PROCESSING" | "COMPLETED" | "FAILED";

export interface ProtectionCreateResponse {
  protectionId: number;
  status: ProcessingStatus;
}

export interface ProtectionResponse {
  protectionId: number;
  status: ProcessingStatus;
  originalImageUrl?: string;
  protectedImageUrl?: string;
  visualDifference?: number;
}

export async function createProtection(
  assessmentId: number,
  protectionLevel: ProtectionLevel = "NORMAL",
): Promise<ProtectionCreateResponse> {
  const { data } = await api.post<ProtectionCreateResponse>("/api/v1/protections", {
    assessmentId,
    protectionLevel,
  });
  return data;
}

export async function getProtection(protectionId: number): Promise<ProtectionResponse> {
  const { data } = await api.get<ProtectionResponse>(`/api/v1/protections/${protectionId}`);
  return data;
}

export async function downloadProtection(protectionId: number): Promise<Blob> {
  const { data } = await api.get<Blob>(`/api/v1/protections/${protectionId}/download`, {
    responseType: "blob",
  });
  return data;
}
