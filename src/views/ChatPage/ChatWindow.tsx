"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import BotOutline from "@/shared/asset/svg/BotOutline";
import Delete from "@/shared/asset/svg/Delete";
import ChatInputForm from "./ChatInputForm";
import ChatMessageBubble from "./ChatMessageBubble";
import ChatQuickReplies from "./ChatQuickReplies";
import { QUICK_REPLIES } from "./mockConversation";
import type { ChatMessage } from "./types";

const MENU_CLOSE_MS = 200;

interface ChatWindowProps {
  messages: ChatMessage[];
  isSending: boolean;
  onSend: (content: string) => void;
  onReset: () => void;
  mobileMenu?: ReactNode;
}

export default function ChatWindow({
  messages,
  isSending,
  onSend,
  onReset,
  mobileMenu,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => clearTimeout(closeTimerRef.current ?? undefined), []);

  function closeMenu() {
    if (!menuOpen || menuClosing) return;
    setMenuClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, MENU_CLOSE_MS);
  }

  function toggleMenu() {
    if (menuOpen && !menuClosing) {
      closeMenu();
      return;
    }
    clearTimeout(closeTimerRef.current ?? undefined);
    setMenuClosing(false);
    setMenuOpen(true);
  }

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending, scrollToBottom]);

  function handleSend(content: string) {
    closeMenu();
    onSend(content);
  }

  return (
    <section className="md:border-primary-50 flex w-full flex-col overflow-hidden bg-white max-md:min-h-0 max-md:flex-1 md:h-[min(680px,calc(100dvh-160px))] md:rounded-2xl md:border lg:w-[864px]">
      <header className="border-primary-50 hidden items-center gap-3 border-b bg-white px-[26px] py-[22px] md:flex">
        <span className="bg-secondary-50 text-secondary-500 flex size-11 shrink-0 items-center justify-center rounded-full [&>svg]:h-6 [&>svg]:w-6">
          <BotOutline />
        </span>
        <div className="flex flex-col">
          <p className="text-body-2 font-medium text-black">AI 상담사</p>
          <p className="text-small text-gray-800">상담중</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-body-2 text-gray-650 ml-auto flex shrink-0 cursor-pointer items-center gap-1.5 rounded px-2 py-1.5 transition-colors hover:text-gray-800"
        >
          <span className="[&>svg]:h-[18px] [&>svg]:w-[18px]">
            <Delete />
          </span>
          대화 초기화
        </button>
      </header>

      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-6 overflow-y-auto bg-white px-5 py-6 md:gap-[18px] md:bg-[#FCFDFE] md:p-[26px]"
      >
        {messages.map((message, index) => (
          <Fragment key={message.id}>
            <ChatMessageBubble message={message} onTyping={scrollToBottom} />
            {index === 0 && (
              <ChatQuickReplies
                items={QUICK_REPLIES}
                onSelect={handleSend}
                disabled={isSending}
                className="md:hidden"
              />
            )}
          </Fragment>
        ))}
        {isSending && (
          <ChatMessageBubble message={{ id: "pending", role: "bot", content: "" }} pending />
        )}
      </div>

      <ChatQuickReplies
        items={QUICK_REPLIES}
        onSelect={handleSend}
        disabled={isSending}
        className="hidden px-[22px] pt-3.5 pb-1 md:flex"
      />
      {menuOpen && mobileMenu && (
        <div
          className={`flex max-h-[50dvh] flex-col gap-3 overflow-y-auto border-t border-gray-300 bg-gray-100 p-4 md:hidden ${
            menuClosing
              ? "animate-[step-out_0.2s_ease-in_forwards]"
              : "animate-[step-in_0.25s_ease-out]"
          }`}
        >
          {mobileMenu}
        </div>
      )}
      <ChatInputForm
        onSend={handleSend}
        disabled={isSending}
        menuOpen={menuOpen && !menuClosing}
        onToggleMenu={mobileMenu ? toggleMenu : undefined}
      />
    </section>
  );
}
