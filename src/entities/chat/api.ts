import { api } from "@/shared/api/axios";

export interface ChatSessionCreateResponse {
  sessionId: string;
  createdAt: string;
}

export interface ChatSessionResponse {
  sessionId: string;
  saveConsent?: boolean;
  createdAt: string;
}

export type ChatMessageRole = "USER" | "BOT";

export interface ChatMessageResponse {
  role: ChatMessageRole;
  content: string;
  createdAt: string;
}

export interface ChatMessagesResponse {
  messages: ChatMessageResponse[];
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

export async function createChatSession(saveConsent = false): Promise<ChatSessionCreateResponse> {
  const { data } = await api.post<ChatSessionCreateResponse>("/api/v1/chat/sessions", {
    saveConsent,
  });
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

export async function getMyChatSessions(): Promise<ChatSessionResponse[]> {
  const { data } = await api.get<ChatSessionResponse[]>("/api/v1/chat/sessions");
  return data;
}

export async function getChatSessionMessages(sessionId: string): Promise<ChatMessagesResponse> {
  const { data } = await api.get<ChatMessagesResponse>(
    `/api/v1/chat/sessions/${sessionId}/messages`
  );
  return data;
}
