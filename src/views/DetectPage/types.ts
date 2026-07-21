export type DetectStatus = "idle" | "selected" | "analyzing" | "result";

export interface DetectResult {
  faceTheftVerdict: string;
  faceTheftScore: number;
  faceTheftCaption: string;
  deepfakeVerdict: string;
  deepfakeProbability: number;
  deepfakeCaption: string;
  overallScore: number;
  overallCaption: string;
  modelConfidence: number;
  modelConfidenceNote: string;
  evidenceHighlights: { tab: string; description: string }[];
  webMatchCount: number;
}
