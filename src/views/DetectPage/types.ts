export type DetectStatus = "idle" | "selected" | "analyzing" | "result";

export interface DetectResult {
  faceTheftVerdict: string;
  faceTheftScore: number;
  faceTheftCaption: string;
  deepfakeVerdict: string;
  /** 합성 가능성(0~100). 서버의 riskScore이며, 모델 확신도(confidence)가 아니다. */
  deepfakeProbability: number;
  /** 판정 코드. 카드 색을 점수 크기가 아니라 판정으로 정하는 데 쓴다. */
  deepfakeTone?: "REAL" | "SUSPICIOUS" | "FAKE";
  deepfakeCaption: string;
  overallScore: number;
  overallCaption: string;
  modelConfidence: number;
  modelConfidenceNote: string;
  evidenceHighlights: { tab: string; description: string }[];
  webMatchCount: number;
}
