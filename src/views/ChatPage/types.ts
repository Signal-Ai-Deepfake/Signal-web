export type ChatRole = "bot" | "user";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

export interface ChatSummary {
  situation: string | null;
  recommendedSteps: string[];
  crisisDetected: boolean;
  recommendedAgencies: string[];
}
