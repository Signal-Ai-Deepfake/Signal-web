export type ChatRole = "bot" | "user";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

export interface ChatSummary {
  situation: string;
  recommendedSteps: string[];
  riskLevel: string;
  riskDescription: string;
  progressPercent: number;
}
