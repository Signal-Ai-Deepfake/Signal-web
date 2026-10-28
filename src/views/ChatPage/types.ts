import type { ChatSummaryResponse, ConsultationProgressResponse } from "@/entities/chat/api";

export type ChatRole = "bot" | "user";

export interface ReplyAction {
  href: string;
  label: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt?: number;
  typing?: boolean;
  hasAgencies?: boolean;
  actions?: ReplyAction[];
}

export type ChatSummary = Partial<ChatSummaryResponse> & {
  progress?: ConsultationProgressResponse;
};
