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
import { useT } from "@/shared/i18n/I18nProvider";
import { chatMessages } from "./messages";
import { uiMessages } from "@/shared/ui/messages";

type ModalKind = "reset" | "end" | null;

export default function ChatPage() {
  const t = useT(chatMessages);
  const ui = useT(uiMessages);
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const { messages, summary, isSending, hasStarted, saveConsent, setSaveConsent, send, reset } =
    useChatSession(isLoggedIn === true);
  const [modal, setModal] = useState<ModalKind>(null);

  function handleConfirm() {
    const kind = modal;
    setModal(null);
    reset();
    if (kind === "end") router.push("/");
  }

  const currentChatNotice = hasStarted && saveConsent ? t.savedNotice : t.unsavedNotice;

  const referralLink = (
    <LinkButton href="/support-referral" variant="primary" className="flex items-center gap-1">
      {t.referral}
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
                {ui.home}
              </Link>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <span className="text-body-1 text-primary-500">{t.title}</span>
            </div>
            <div className="flex flex-col gap-4 lg:gap-6">
              <h1 className="text-h2 lg:text-h1 font-bold text-black">{t.title}</h1>
              <p className="text-body-1 break-keep text-gray-700">
                {t.intro[0]}
                <br />
                {t.intro[1]}
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
                  guest={isLoggedIn === false}
                />
              }
            />
            <aside className="hidden gap-[18px] md:grid md:grid-cols-2 lg:flex lg:w-[392px] lg:flex-col md:[&>*:only-child]:col-span-2">
              {summary && <ChatSummaryCard summary={summary} />}
              <ChatPrivacyCard
                checked={saveConsent}
                onChange={setSaveConsent}
                locked={hasStarted}
                guest={isLoggedIn === false}
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
        title={modal === "end" ? t.endTitle : t.resetTitle}
        description={
          modal === "end"
            ? `${currentChatNotice}\n${t.endDescription}`
            : isLoggedIn
              ? `${currentChatNotice}\n${t.resetSaveHint}`
              : currentChatNotice
        }
        confirmLabel={modal === "end" ? t.end : t.restart}
        cancelLabel={ui.cancel}
        onConfirm={handleConfirm}
        onCancel={() => setModal(null)}
      />
    </>
  );
}
