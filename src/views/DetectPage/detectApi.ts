import { api } from "@/shared/api/axios";
import { getAccessToken } from "@/shared/lib/authToken";
import { getOrCreateAnonymousId } from "@/shared/lib/anonymousId";

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
  /** true면 실제 AI 분석이 아니라 서버가 자동으로 대체한 참고용 추정치(폴백)입니다. */
  fallbackUsed?: boolean;
}

function guestHeaders() {
  return getAccessToken() ? undefined : { "X-Anonymous-Id": getOrCreateAnonymousId() };
}

export async function createDeepfakeDetection(
  file: File,
): Promise<DeepfakeDetectionCreateResponse> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<DeepfakeDetectionCreateResponse>(
    "/api/v1/deepfake-detections",
    formData,
    { headers: { "Content-Type": "multipart/form-data", ...guestHeaders() } },
  );
  return data;
}

export async function getDeepfakeDetection(
  detectionId: number,
): Promise<DeepfakeDetectionResponse> {
  const { data } = await api.get<DeepfakeDetectionResponse>(
    `/api/v1/deepfake-detections/${detectionId}`,
    { headers: guestHeaders() },
  );
  return data;
}
