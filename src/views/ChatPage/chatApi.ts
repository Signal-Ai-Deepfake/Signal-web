import { api } from "@/shared/api/axios";

export interface ChatSessionCreateResponse {
  sessionId: string;
  createdAt: string;
}

export type ChatSituationType = "GENERAL" | "IMAGE_ABUSE";

export interface SendMessageResponse {
  messageId: number;
  reply: string;
  situationType?: ChatSituationType;
  suggestedActions?: string[];
  crisisDetected?: boolean;
  recommendedAgencies?: string[];
}

export async function createChatSession(): Promise<ChatSessionCreateResponse> {
  const { data } = await api.post<ChatSessionCreateResponse>("/api/v1/chat/sessions");
  return data;
}

export async function sendChatMessage(
  sessionId: string,
  content: string
): Promise<SendMessageResponse> {
  const { data } = await api.post<SendMessageResponse>(
    `/api/v1/chat/sessions/${sessionId}/messages`,
    { content }
  );
  return data;
}
