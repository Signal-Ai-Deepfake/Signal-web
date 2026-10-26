"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import BotOutline from "@/shared/asset/svg/BotOutline";
import ConfirmModal from "@/shared/ui/ConfirmModal";
import LinkButton from "@/shared/ui/LinkButton";
import NoticeBanner from "@/shared/ui/NoticeBanner";
import PageHeading from "@/shared/ui/PageHeading";
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
      <main className="flex w-full flex-col items-center bg-white px-5 py-6 pb-[120px] md:py-10">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-6 md:gap-8">
          <PageHeading
            title="익명 상담 챗봇"
            description={session ? formatDateLong(session.createdAt) : undefined}
            breadcrumbs={[
              { label: "대화 내역", href: "/mypage/chats" },
              { label: "대화 내역 상세" },
            ]}
            backHref="/mypage/chats"
          />

          <div className="flex w-full flex-col items-stretch gap-6 lg:flex-row">
            <div className="border-primary-50 flex w-full flex-col overflow-hidden rounded-2xl border bg-white">
              <div className="border-primary-50 flex items-center gap-3 border-b px-4 py-4 md:px-[26px] md:py-[22px]">
                <span className="bg-secondary-50 text-secondary-500 flex size-11 shrink-0 items-center justify-center rounded-full p-1.5 [&>svg]:h-6 [&>svg]:w-6">
                  <BotOutline />
                </span>
                <div className="flex flex-col">
                  <p className="text-body-2 font-medium text-black">AI 상담사</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 overflow-y-auto px-4 py-5 md:gap-[18px] md:px-7 md:py-8">
                {messages.map((message) => (
                  <ChatDetailBubble key={message.id} message={message} />
                ))}
              </div>
            </div>

            <aside className="flex w-full flex-col gap-3 md:gap-[18px] lg:w-[392px] lg:shrink-0">
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
                className="cursor-pointer self-start text-[15px] leading-6 text-red-500 underline lg:self-center"
              >
                대화 내역 삭제
              </button>
            </aside>
          </div>

          <LinkButton
            href="/support-referral"
            variant="primary"
            className="flex w-full items-center gap-1 md:w-auto md:self-end"
          >
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
