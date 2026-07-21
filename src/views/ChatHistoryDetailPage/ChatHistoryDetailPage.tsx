"use client";

import Link from "next/link";
import { toast } from "sonner";
import Arrow from "@/shared/asset/svg/Arrow";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import BotOutline from "@/shared/asset/svg/BotOutline";
import LinkButton from "@/shared/ui/LinkButton";
import NoticeBanner from "@/shared/ui/NoticeBanner";
import { getChatSessionById } from "@/entities/chat/model";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import ChatDetailBubble from "./ChatDetailBubble";

interface ChatHistoryDetailPageProps {
  id: string;
}

export default function ChatHistoryDetailPage({ id }: ChatHistoryDetailPageProps) {
  const session = getChatSessionById(id);

  if (!session) {
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

  function handleDelete() {
    toast.success("대화 내역 삭제 기능은 준비 중입니다.");
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
              <p className="text-body-1 text-gray-700">{session.dateLong}</p>
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
                  <p className="text-small text-gray-800">
                    {session.status === "완료" ? "상담 완료" : "상담 진행 중"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-[18px] overflow-y-auto px-7 py-8">
                {session.messages.map((message) => (
                  <ChatDetailBubble key={message.id} message={message} />
                ))}
              </div>
            </div>

            <aside className="flex w-full flex-col gap-[18px] lg:w-[392px]">
              <div className="border-primary-50 flex w-full flex-col gap-3.5 rounded-2xl border bg-white p-[25px]">
                <p className="text-body-1 font-semibold text-black">AI 상담 요약</p>

                <div className="border-primary-50 flex flex-col gap-1 border-b pb-3.5">
                  <p className="text-small font-semibold text-gray-800">현재 상황</p>
                  <p className="text-small text-black">{session.summary.situation}</p>
                </div>

                <div className="border-primary-50 flex flex-col gap-1 border-b pb-3.5">
                  <p className="text-small font-semibold text-gray-800">추천 대응 절차</p>
                  <p className="text-small text-black">
                    {session.summary.recommendedSteps
                      .map((step, index) => `${index + 1}. ${step}`)
                      .join("   ")}
                  </p>
                </div>

                <div className="border-primary-50 flex flex-col gap-1.5 border-b pb-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-small font-semibold text-gray-800">현재 위험 수준</p>
                    <span className="text-caption bg-secondary-50 text-secondary-500 rounded-full px-2.5 py-1">
                      {session.summary.riskLevel}
                    </span>
                  </div>
                  <p className="text-small text-black">{session.summary.riskDescription}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-small font-semibold text-gray-800">상담 진행률</p>
                    <p className="text-small font-semibold text-black">
                      {session.summary.progressPercent}%
                    </p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-300">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${session.summary.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <NoticeBanner>
                {session.savedConsent
                  ? "이 상담은 저장에 동의한 대화 내역입니다."
                  : "이 상담은 저장에 동의하지 않은 대화 내역입니다."}
              </NoticeBanner>

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
    </>
  );
}
