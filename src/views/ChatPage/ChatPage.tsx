"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Arrow from "@/shared/asset/svg/Arrow";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import { useIsLoggedIn } from "@/shared/lib/useIsLoggedIn";
import ConfirmModal from "@/shared/ui/ConfirmModal";
import LinkButton from "@/shared/ui/LinkButton";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import ChatMobileHeader from "./ChatMobileHeader";
import ChatPrivacyCard from "./ChatPrivacyCard";
import ChatSummaryCard from "./ChatSummaryCard";
import ChatWindow from "./ChatWindow";
import { useChatSession } from "./useChatSession";

type ModalKind = "reset" | "end" | null;

export default function ChatPage() {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const { messages, summary, isSending, hasStarted, saveConsent, setSaveConsent, send, reset } =
    useChatSession();
  const [modal, setModal] = useState<ModalKind>(null);

  function handleConfirm() {
    const kind = modal;
    setModal(null);
    reset();
    if (kind === "end") router.push("/");
  }

  const currentChatNotice =
    hasStarted && saveConsent
      ? "지금까지의 대화는 '내 대화 내역'에 저장되어 있어요."
      : "지금까지의 대화 내용은 저장되지 않고 사라져요.";

  const referralLink = (
    <LinkButton href="/support-referral" variant="primary" className="flex items-center gap-1">
      전문 기관 연결하기
      <span className="[&>svg]:h-6 [&>svg]:w-6">
        <ArrowUp />
      </span>
    </LinkButton>
  );

  return (
    <>
      <SiteHeader className="max-md:hidden" />
      <main
        className={`flex w-full flex-col items-center bg-white max-md:overflow-hidden md:px-5 md:py-10 md:pb-[120px] ${
          isLoggedIn ? "max-md:h-[calc(100dvh-4rem-env(safe-area-inset-bottom))]" : "max-md:h-dvh"
        }`}
      >
        <ChatMobileHeader
          saveConsent={saveConsent}
          isLoggedIn={isLoggedIn === true}
          onNewChat={() => setModal("reset")}
          onEnd={() => setModal("end")}
          menuTop={summary ? <ChatSummaryCard summary={summary} /> : undefined}
        />
        <div className="flex w-full max-w-[1280px] flex-col items-end gap-8 max-md:min-h-0 max-md:flex-1 md:animate-[fade-in-up_0.5s_ease-out]">
          <div className="hidden w-full flex-col gap-6 md:flex">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-body-1 text-gray-700">
                홈
              </Link>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <span className="text-body-1 text-primary-500">익명 상담 챗봇</span>
            </div>
            <div className="flex flex-col gap-4 lg:gap-6">
              <h1 className="text-h2 lg:text-h1 font-bold text-black">익명 상담 챗봇</h1>
              <p className="text-body-1 break-keep text-gray-700">
                현재 상황을 편안하게 이야기해 주세요.
                <br />
                AI가 대화 내용을 분석하고 필요한 대응 방법을 안내해 드립니다.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-stretch gap-6 max-md:min-h-0 max-md:flex-1 lg:flex-row">
            <ChatWindow
              messages={messages}
              isSending={isSending}
              onSend={send}
              onReset={() => setModal("reset")}
              mobileMenu={
                <ChatPrivacyCard
                  checked={saveConsent}
                  onChange={setSaveConsent}
                  locked={hasStarted}
                />
              }
            />
            <aside className="hidden gap-[18px] md:grid md:grid-cols-2 lg:flex lg:w-[392px] lg:flex-col md:[&>*:only-child]:col-span-2">
              {summary && <ChatSummaryCard summary={summary} />}
              <ChatPrivacyCard
                checked={saveConsent}
                onChange={setSaveConsent}
                locked={hasStarted}
              />
            </aside>
          </div>

          <div className="max-md:hidden">{referralLink}</div>
        </div>
      </main>
      <div className="max-md:hidden">
        <Footer />
      </div>
      <ConfirmModal
        open={modal !== null}
        title={modal === "end" ? "상담을 종료할까요?" : "새 상담을 시작할까요?"}
        description={
          modal === "end"
            ? `${currentChatNotice}
홈으로 이동합니다.`
            : `${currentChatNotice}
새 상담을 저장하려면 첫 메시지를 보내기 전에 '상담 내역 저장'을 켜 주세요.`
        }
        confirmLabel={modal === "end" ? "종료" : "새로 시작"}
        cancelLabel="취소"
        onConfirm={handleConfirm}
        onCancel={() => setModal(null)}
      />
    </>
  );
}
