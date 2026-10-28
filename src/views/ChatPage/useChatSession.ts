"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  createChatSession,
  getChatSummary,
  sendChatMessage,
  type SendMessageResponse,
} from "@/entities/chat/api";
import { INITIAL_MESSAGE_COUNT, createInitialMessages } from "./mockConversation";
import { resolveReplyActions } from "./replyActions";
import type { ChatMessage, ChatSummary } from "./types";
import { useT } from "@/shared/i18n/I18nProvider";
import { chatMessages } from "./messages";

let messageIdCounter = INITIAL_MESSAGE_COUNT;

function createMessageId() {
  messageIdCounter += 1;
  return String(messageIdCounter);
}

function mapChatSummary(
  response: SendMessageResponse,
  labels: { imageAbuse: string; general: string },
): ChatSummary | null {
  if (!response.progress) return null;
  return {
    situation: response.situationType
      ? response.situationType === "IMAGE_ABUSE"
        ? labels.imageAbuse
        : labels.general
      : undefined,
    recommendedSteps: response.suggestedActions ?? [],
    progress: response.progress,
  };
}

export function useChatSession(canSave: boolean) {
  const t = useT(chatMessages);
  const [messages, setMessages] = useState<ChatMessage[]>(() => createInitialMessages(t.greeting));
  const [summary, setSummary] = useState<ChatSummary | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [saveConsent, setSaveConsent] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const sessionCreatingRef = useRef<Promise<string> | null>(null);
  const generationRef = useRef(0);
  const effectiveConsent = canSave && saveConsent;

  function ensureSession(): Promise<string> {
    if (sessionIdRef.current) return Promise.resolve(sessionIdRef.current);
    const generation = generationRef.current;
    sessionCreatingRef.current ??= createChatSession(effectiveConsent)
      .then((session) => {
        if (generation === generationRef.current) sessionIdRef.current = session.sessionId;
        return session.sessionId;
      })
      .finally(() => {
        sessionCreatingRef.current = null;
      });
    return sessionCreatingRef.current;
  }

  function reset() {
    generationRef.current += 1;
    setIsSending(false);
    setIsEnded(false);
    sessionIdRef.current = null;
    sessionCreatingRef.current = null;
    setMessages(
      createInitialMessages(t.greeting).map((message) => ({ ...message, id: createMessageId() })),
    );
    setSummary(null);
  }

  async function send(content: string) {
    const trimmed = content.trim();
    if (!trimmed || isSending || isEnded) return;

    setMessages((prev) => [
      ...prev,
      { id: createMessageId(), role: "user", content: trimmed, createdAt: Date.now() },
    ]);
    setIsSending(true);
    const generation = generationRef.current;
    const isStale = () => generation !== generationRef.current;

    try {
      const sessionId = await ensureSession();
      const response = await sendChatMessage(sessionId, trimmed);
      if (isStale()) return;
      setSummary(mapChatSummary(response, t.summary));
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId(),
          role: "bot",
          content: response.reply,
          createdAt: Date.now(),
          typing: true,
          hasAgencies: (response.recommendedAgencies?.length ?? 0) > 0,
        },
      ]);
      if (response.sessionEnded) setIsEnded(true);
      try {
        const latestSummary = await getChatSummary(sessionId);
        if (!isStale()) setSummary(latestSummary);
      } catch (summaryError) {
        if (isStale()) return;
        toast.error(t.summaryFailed, {
          description: summaryError instanceof Error ? summaryError.message : undefined,
        });
      }
      if (response.crisisDetected) {
        toast.warning(t.crisis);
      }
    } catch (error) {
      if (isStale()) return;
      toast.error(t.sendFailed, {
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      if (!isStale()) setIsSending(false);
    }
  }

  return {
    messages: messages.map((message, index) => {
      if (message.role !== "bot") return message;
      if (index === 0) return { ...message, content: t.greeting };
      return {
        ...message,
        actions: resolveReplyActions(message.content, message.hasAgencies ?? false, t),
      };
    }),
    summary,
    isSending,
    isEnded,
    hasStarted: messages.length > INITIAL_MESSAGE_COUNT,
    saveConsent: effectiveConsent,
    setSaveConsent,
    send,
    reset,
  };
}
