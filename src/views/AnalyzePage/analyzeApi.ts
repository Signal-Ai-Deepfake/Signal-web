import { api } from "@/shared/api/axios";

export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";
export type ProtectionLevel = "LIGHT" | "NORMAL" | "STRONG";
export type ProcessingStatus = "PROCESSING" | "COMPLETED" | "FAILED";

export interface RiskFactorResponse {
  type: string;
  label: string;
  score: number;
  description: string;
}

export interface BoundingBoxResponse {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FaceResponse {
  index: number;
  boundingBox: BoundingBoxResponse;
}

export interface RiskAssessmentResponse {
  assessmentId: number;
  overallRiskLevel: RiskLevel;
  overallScore: number;
  factors: RiskFactorResponse[];
  recommendations: string[];
  faceDetected: boolean;
  faces: FaceResponse[];
}

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

export async function createRiskAssessment(file: File): Promise<RiskAssessmentResponse> {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await api.post<RiskAssessmentResponse>("/api/v1/risk-assessments", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function createProtection(
  assessmentId: number,
  protectionLevel: ProtectionLevel = "NORMAL"
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
