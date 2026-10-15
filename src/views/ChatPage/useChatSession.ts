"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  createChatSession,
  getChatSummary,
  sendChatMessage,
  type SendMessageResponse,
} from "@/entities/chat/api";
import { INITIAL_MESSAGES } from "./mockConversation";
import type { ChatMessage, ChatSummary } from "./types";

let messageIdCounter = INITIAL_MESSAGES.length;

function createMessageId() {
  messageIdCounter += 1;
  return String(messageIdCounter);
}

function mapChatSummary(response: SendMessageResponse): ChatSummary | null {
  if (!response.progress) return null;
  return {
    situation: response.situationType
      ? response.situationType === "IMAGE_ABUSE"
        ? "이미지 관련 상담"
        : "일반 상담"
      : undefined,
    recommendedSteps: response.suggestedActions ?? [],
    progress: response.progress,
  };
}

export function useChatSession() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [summary, setSummary] = useState<ChatSummary | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [saveConsent, setSaveConsent] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const sessionCreatingRef = useRef<Promise<string> | null>(null);

  function ensureSession(): Promise<string> {
    if (sessionIdRef.current) return Promise.resolve(sessionIdRef.current);
    sessionCreatingRef.current ??= createChatSession(saveConsent)
      .then((session) => {
        sessionIdRef.current = session.sessionId;
        return session.sessionId;
      })
      .finally(() => {
        sessionCreatingRef.current = null;
      });
    return sessionCreatingRef.current;
  }

  function reset() {
    sessionIdRef.current = null;
    sessionCreatingRef.current = null;
    setMessages(INITIAL_MESSAGES.map((message) => ({ ...message, id: createMessageId() })));
    setSummary(null);
  }

  async function send(content: string) {
    const trimmed = content.trim();
    if (!trimmed || isSending) return;

    setMessages((prev) => [
      ...prev,
      { id: createMessageId(), role: "user", content: trimmed, createdAt: Date.now() },
    ]);
    setIsSending(true);

    try {
      const sessionId = await ensureSession();
      const response = await sendChatMessage(sessionId, trimmed);
      setSummary(mapChatSummary(response));
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId(),
          role: "bot",
          content: response.reply,
          createdAt: Date.now(),
          typing: true,
        },
      ]);
      try {
        setSummary(await getChatSummary(sessionId));
      } catch (summaryError) {
        toast.error("상담 요약을 불러오지 못했습니다.", {
          description: summaryError instanceof Error ? summaryError.message : undefined,
        });
      }
      if (response.crisisDetected) {
        toast.warning("긴급 상황이 감지되었어요. 전문 기관 연결을 고려해 주세요.");
      }
    } catch (error) {
      toast.error("메시지 전송에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setIsSending(false);
    }
  }

  return {
    messages,
    summary,
    isSending,
    hasStarted: messages.length > INITIAL_MESSAGES.length,
    saveConsent,
    setSaveConsent,
    send,
    reset,
  };
}
