"use client";

import { useEffect, useRef } from "react";
import BotOutline from "@/shared/asset/svg/BotOutline";
import ChatInputForm from "./ChatInputForm";
import ChatMessageBubble from "./ChatMessageBubble";
import ChatQuickReplies from "./ChatQuickReplies";
import { QUICK_REPLIES } from "./mockConversation";
import type { ChatMessage } from "./types";

interface ChatWindowProps {
  messages: ChatMessage[];
  isSending: boolean;
  onSend: (content: string) => void;
}

export default function ChatWindow({ messages, isSending, onSend }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isSending]);

  return (
    <section className="flex h-[680px] w-full flex-col overflow-hidden rounded-2xl border border-primary-50 bg-white lg:w-[864px]">
      <header className="flex items-center gap-3 border-b border-primary-50 bg-white px-[26px] py-[22px]">
        <span className="bg-secondary-50 text-secondary-500 flex size-11 shrink-0 items-center justify-center rounded-full [&>svg]:h-6 [&>svg]:w-6">
          <BotOutline />
        </span>
        <div className="flex flex-col">
          <p className="text-body-2 font-medium text-black">AI 상담사</p>
          <p className="text-small text-gray-800">상담중</p>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-[18px] overflow-y-auto bg-[#FCFDFE] p-[26px]"
      >
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}
        {isSending && (
          <ChatMessageBubble
            message={{ id: "typing", role: "bot", content: "답변을 작성하고 있어요..." }}
          />
        )}
      </div>

      <ChatQuickReplies items={QUICK_REPLIES} onSelect={onSend} disabled={isSending} />
      <ChatInputForm onSend={onSend} disabled={isSending} />
    </section>
  );
}
