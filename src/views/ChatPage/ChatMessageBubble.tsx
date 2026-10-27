"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import BotFilled from "@/shared/asset/svg/BotFilled";
import BotOutline from "@/shared/asset/svg/BotOutline";
import ChatMarkdown, { parseChatMarkdown } from "./ChatMarkdown";
import TypingText from "./TypingText";
import type { ChatMessage } from "./types";
import { useT } from "@/shared/i18n/I18nProvider";
import { chatMessages } from "./messages";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  pending?: boolean;
  onTyping?: () => void;
}

function formatTime(timestamp?: number) {
  if (!timestamp) return null;
  return new Date(timestamp).toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" });
}

export default function ChatMessageBubble({ message, pending, onTyping }: ChatMessageBubbleProps) {
  const t = useT(chatMessages);
  const time = formatTime(message.createdAt);
  const timeLabel = time && (
    <p className="text-caption text-gray-800 opacity-60 md:hidden">{time}</p>
  );

  const [typed, setTyped] = useState(!message.typing);
  const actions = typed ? (message.actions ?? []) : [];

  useEffect(() => {
    if (actions.length > 0) onTyping?.();
  }, [actions.length, onTyping]);

  if (message.role === "user") {
    return (
      <div className="flex w-full flex-col items-end gap-2">
        <div className="bg-primary-500 max-w-[80%] rounded-2xl rounded-tr-none px-4 py-3.5 shadow-sm md:rounded-tr-[2px] md:px-[17px] md:py-[13px] md:shadow-none">
          <p className="text-body-2 break-words whitespace-pre-wrap text-white">
            {message.content}
          </p>
        </div>
        {timeLabel}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 md:gap-2">
      <span className="border-secondary-400 bg-secondary-50 text-secondary-400 md:text-secondary-500 flex size-10 shrink-0 items-center justify-center rounded-full border md:size-11 md:border-0">
        <span className="md:hidden [&>svg]:h-4 [&>svg]:w-5">
          <BotFilled />
        </span>
        <span className="hidden md:inline [&>svg]:h-6 [&>svg]:w-6">
          <BotOutline />
        </span>
      </span>
      <div className="flex max-w-[80%] flex-col items-start gap-2">
        <div className="max-md:border-secondary-400/30 max-md:bg-secondary-50 rounded-2xl rounded-tl-none border p-4 max-md:shadow-sm md:rounded-tl-[2px] md:border-gray-300 md:bg-white">
          {pending ? (
            <span
              role="status"
              aria-label={t.typing}
              className="flex h-6 items-center gap-1.5 px-1"
            >
              <span className="bg-secondary-500 size-2 animate-bounce rounded-full [animation-delay:-0.3s]" />
              <span className="bg-secondary-500 size-2 animate-bounce rounded-full [animation-delay:-0.15s]" />
              <span className="bg-secondary-500 size-2 animate-bounce rounded-full" />
            </span>
          ) : (
            <div className="text-body-2 break-words text-black">
              {message.typing && !typed ? (
                <TypingText
                  text={message.content}
                  onProgress={onTyping}
                  onComplete={() => setTyped(true)}
                />
              ) : (
                <ChatMarkdown blocks={parseChatMarkdown(message.content)} />
              )}
            </div>
          )}
        </div>
        {actions.length > 0 && (
          <div className="flex animate-[fade-in-up_0.3s_ease-out] flex-wrap gap-2">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="text-small border-primary-200 text-primary-500 hover:bg-primary-50 active:bg-primary-50 flex items-center gap-1 rounded-full border bg-white px-3 py-1.5 font-medium transition-colors"
              >
                {action.label}
                <span className="[&>svg]:h-4 [&>svg]:w-4">
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        )}
        {timeLabel}
      </div>
    </div>
  );
}
