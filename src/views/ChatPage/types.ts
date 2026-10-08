import type { ChatSummaryResponse, ConsultationProgressResponse } from "@/entities/chat/api";

export type ChatRole = "bot" | "user";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

export type ChatSummary = Partial<ChatSummaryResponse> & {
  progress?: ConsultationProgressResponse;
};
