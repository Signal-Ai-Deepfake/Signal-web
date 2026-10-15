import { api } from "@/shared/api/axios";
import { guestHeaders } from "@/shared/api/guestHeaders";

export type ProcessingStatus = "PROCESSING" | "COMPLETED" | "FAILED";
export type DeepfakeVerdict = "REAL" | "FAKE" | "SUSPICIOUS";

export interface RegionResponse {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EvidenceResponse {
  type: string;
  description: string;
  region?: RegionResponse;
  frame?: number;
}

export interface DeepfakeDetectionCreateResponse {
  detectionId: number;
  status: ProcessingStatus;
}

export interface DeepfakeDetectionResponse {
  detectionId: number;
  status: ProcessingStatus;
  verdict?: DeepfakeVerdict;
  confidence?: number;
  riskScore?: number;
  evidences?: EvidenceResponse[];
  highlightedResultUrl?: string;
}

export async function createDeepfakeDetection(file: File): Promise<DeepfakeDetectionCreateResponse> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<DeepfakeDetectionCreateResponse>(
    "/api/v1/deepfake-detections",
    formData,
    { headers: { "Content-Type": "multipart/form-data", ...guestHeaders() } }
  );
  return data;
}

export async function getDeepfakeDetection(detectionId: number): Promise<DeepfakeDetectionResponse> {
  const { data } = await api.get<DeepfakeDetectionResponse>(
    `/api/v1/deepfake-detections/${detectionId}`,
    { headers: guestHeaders() }
  );
  return data;
}
