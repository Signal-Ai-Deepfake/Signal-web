"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Arrow from "@/shared/asset/svg/Arrow";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import BotOutline from "@/shared/asset/svg/BotOutline";
import ConfirmModal from "@/shared/ui/ConfirmModal";
import LinkButton from "@/shared/ui/LinkButton";
import NoticeBanner from "@/shared/ui/NoticeBanner";
import { deleteChatSession, getChatSessionMessages, getMyChatSessions } from "@/entities/chat/api";
import type { ChatMessage } from "@/entities/chat/model";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import ChatDetailBubble from "./ChatDetailBubble";

interface ChatHistoryDetailPageProps {
  id: string;
}

function formatDateLong(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export default function ChatHistoryDetailPage({ id }: ChatHistoryDetailPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { data: sessions } = useQuery({
    queryKey: ["myChatSessions"],
    queryFn: getMyChatSessions,
  });
  const {
    data: messagesResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chatSessionMessages", id],
    queryFn: () => getChatSessionMessages(id),
  });

  const session = sessions?.find((item) => item.sessionId === id);

  const deleteMutation = useMutation({
    mutationFn: () => deleteChatSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myChatSessions"] });
      toast.success("대화 내역이 삭제되었습니다.");
      router.push("/mypage/chats");
    },
    onError: (error) => {
      toast.error("대화 내역 삭제에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  if (isLoading) {
    return (
      <>
        <SiteHeader />
        <main className="flex w-full flex-col items-center bg-white px-5 py-20">
          <p className="text-body-1 text-gray-700">불러오는 중입니다...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (isError || !messagesResponse) {
    return (
      <>
        <SiteHeader />
        <main className="flex w-full flex-col items-center bg-white px-5 py-20">
          <p className="text-body-1 text-gray-700">해당 대화 내역을 찾을 수 없습니다.</p>
        </main>
        <Footer />
      </>
    );
  }

  const messages: ChatMessage[] = messagesResponse.messages.map((message, index) => ({
    id: String(index),
    role: message.role === "USER" ? "user" : "bot",
    content: message.content,
  }));

  function handleDelete() {
    setDeleteModalOpen(true);
  }

  function handleDeleteConfirm() {
    setDeleteModalOpen(false);
    if (deleteMutation.isPending) return;
    deleteMutation.mutate();
  }

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-10 pb-[120px]">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href="/" className="text-body-1 text-gray-700">
                홈
              </Link>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <Link href="/mypage/chats" className="text-body-1 text-primary-500">
                대화 내역
              </Link>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <span className="text-body-1 text-primary-500">대화 내역 상세</span>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-h1 font-bold text-black">익명 상담 챗봇</h1>
              {session && (
                <p className="text-body-1 text-gray-700">{formatDateLong(session.createdAt)}</p>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col items-stretch gap-6 lg:flex-row">
            <div className="border-primary-50 flex w-full flex-col overflow-hidden rounded-2xl border bg-white">
              <div className="border-primary-50 flex items-center gap-3 border-b px-[26px] py-[22px]">
                <span className="bg-secondary-50 text-secondary-500 flex size-11 shrink-0 items-center justify-center rounded-full p-1.5 [&>svg]:h-6 [&>svg]:w-6">
                  <BotOutline />
                </span>
                <div className="flex flex-col">
                  <p className="text-body-2 font-medium text-black">AI 상담사</p>
                </div>
              </div>
              <div className="flex flex-col gap-[18px] overflow-y-auto px-7 py-8">
                {messages.map((message) => (
                  <ChatDetailBubble key={message.id} message={message} />
                ))}
              </div>
            </div>

            <aside className="flex w-full flex-col gap-[18px] lg:w-[392px]">
              <NoticeBanner>AI 상담 요약 정보는 아직 제공되지 않는 기능입니다.</NoticeBanner>

              {session && (
                <NoticeBanner>
                  {session.saveConsent
                    ? "이 상담은 저장에 동의한 대화 내역입니다."
                    : "이 상담은 저장에 동의하지 않은 대화 내역입니다."}
                </NoticeBanner>
              )}

              <button
                type="button"
                onClick={handleDelete}
                className="cursor-pointer text-[15px] leading-6 text-red-500 underline"
              >
                대화 내역 삭제
              </button>
            </aside>
          </div>

          <LinkButton href="/report" variant="primary" className="flex items-center gap-1 self-end">
            전문 기관 연결하기
            <span className="[&>svg]:h-6 [&>svg]:w-6">
              <ArrowUp />
            </span>
          </LinkButton>
        </div>
      </main>
      <Footer />
      <ConfirmModal
        open={deleteModalOpen}
        title="대화 내역을 삭제하시겠습니까?"
        description="삭제한 대화 내역은 복구할 수 없습니다."
        confirmLabel="삭제하기"
        cancelLabel="취소"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  );
}
