import { api } from "@/shared/api/axios";
import { guestHeaders } from "@/shared/api/guestHeaders";

export type ProcessingStatus = "PROCESSING" | "COMPLETED" | "FAILED";
export type DeepfakeVerdict = "REAL" | "FAKE" | "SUSPICIOUS";
export type DetectionFailureReason =
  | "NO_FACE_DETECTED"
  | "VIDEO_NOT_SUPPORTED"
  | "AI_SERVER_ERROR"
  | "TIMEOUT";

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
  /** 전용 탐지 모델 모드에서 판단 불가 등이면 null. */
  riskScore?: number | null;
  evidences?: EvidenceResponse[];
  highlightedResultUrl?: string;
  /** true면 실제 AI 분석이 아니라 서버가 자동으로 대체한 참고용 추정치(폴백)입니다. */
  fallbackUsed?: boolean;
  failureReason?: DetectionFailureReason | null;
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
