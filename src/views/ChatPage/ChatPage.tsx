"use client";

import { useState } from "react";
import Link from "next/link";
import Arrow from "@/shared/asset/svg/Arrow";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import LinkButton from "@/shared/ui/LinkButton";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import { requestBotReply } from "./chatApi";
import ChatPrivacyCard from "./ChatPrivacyCard";
import ChatSummaryCard from "./ChatSummaryCard";
import ChatWindow from "./ChatWindow";
import { INITIAL_MESSAGES, MOCK_SUMMARY } from "./mockConversation";
import type { ChatMessage } from "./types";

let messageIdCounter = INITIAL_MESSAGES.length;

function createMessageId() {
  messageIdCounter += 1;
  return String(messageIdCounter);
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isSending, setIsSending] = useState(false);
  const [saveConsent, setSaveConsent] = useState(false);

  async function handleSend(content: string) {
    const trimmed = content.trim();
    if (!trimmed || isSending) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { id: createMessageId(), role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setIsSending(true);

    const reply = await requestBotReply(nextMessages);
    setMessages((prev) => [...prev, { id: createMessageId(), role: "bot", content: reply }]);
    setIsSending(false);
  }

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-10 pb-[120px]">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col items-end gap-8">
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-body-1 text-gray-700">
                홈
              </Link>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <span className="text-body-1 text-primary-500">익명 상담 챗봇</span>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-h1 font-bold text-black">익명 상담 챗봇</h1>
              <p className="text-body-1 text-gray-700">
                현재 상황을 편안하게 이야기해 주세요.
                <br />
                AI가 대화 내용을 분석하고 필요한 대응 방법을 안내해 드립니다.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-stretch gap-6 lg:flex-row">
            <ChatWindow messages={messages} isSending={isSending} onSend={handleSend} />
            <aside className="flex w-full flex-col gap-[18px] lg:w-[392px]">
              <ChatSummaryCard summary={MOCK_SUMMARY} />
              <ChatPrivacyCard checked={saveConsent} onChange={setSaveConsent} />
            </aside>
          </div>

          <LinkButton href="/report" variant="primary" className="flex items-center gap-1">
            전문 기관 연결하기
            <span className="[&>svg]:h-6 [&>svg]:w-6">
              <ArrowUp />
            </span>
          </LinkButton>
        </div>
      </main>
      <Footer />
    </>
  );
}
