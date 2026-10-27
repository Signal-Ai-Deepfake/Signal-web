"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import ChevronLeft from "@/shared/asset/svg/ChevronLeft";
import LockLine from "@/shared/asset/svg/LockLine";
import Menu from "@/shared/asset/svg/Menu";
import { useGoBack } from "@/shared/lib/useGoBack";
import { useT } from "@/shared/i18n/I18nProvider";
import { chatMessages } from "./messages";
import { uiMessages } from "@/shared/ui/messages";

interface ChatMobileHeaderProps {
  saveConsent: boolean;
  isLoggedIn: boolean;
  menuTop?: ReactNode;
  onNewChat: () => void;
  onEnd: () => void;
}

const itemClass =
  "text-body-2 flex w-full cursor-pointer items-center rounded-lg px-3 py-3 text-left transition-colors active:bg-gray-100";

export default function ChatMobileHeader({
  saveConsent,
  isLoggedIn,
  menuTop,
  onNewChat,
  onEnd,
}: ChatMobileHeaderProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const goBack = useGoBack();
  const t = useT(chatMessages);
  const ui = useT(uiMessages);

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function run(action: () => void) {
    setOpen(false);
    action();
  }

  return (
    <div ref={menuRef} className="relative z-20 w-full shrink-0 md:hidden">
      <header className="flex items-center justify-between border-b border-gray-300 bg-white/90 px-5 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={goBack}
            aria-label={ui.back}
            className="text-primary-500 cursor-pointer [&>svg]:h-5 [&>svg]:w-3"
          >
            <ChevronLeft />
          </button>
          <h1 className="text-body-1 font-bold text-black">{t.title}</h1>
        </div>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? t.mobile.closeMenu : t.mobile.openMenu}
          aria-expanded={open}
          className="text-primary-500 active:bg-primary-50 flex size-9 cursor-pointer items-center justify-center rounded-lg [&>svg]:size-5"
        >
          <Menu />
        </button>
      </header>
      <div className="bg-primary-50 text-primary-500 flex items-center justify-center gap-2 px-5 py-2.5">
        <span className="shrink-0 [&>svg]:size-4">
          <LockLine />
        </span>
        <p className="text-caption break-keep">
          {saveConsent ? t.mobile.savedBanner : t.mobile.unsavedBanner}
        </p>
      </div>

      {open && (
        <button
          type="button"
          aria-label={t.mobile.closeMenu}
          onClick={() => setOpen(false)}
          className="fixed inset-0 -z-10 animate-[fade-in_0.2s_ease-out] cursor-default bg-black/40"
        />
      )}
      {open && (
        <div className="absolute inset-x-0 top-full flex max-h-[70dvh] animate-[fade-in-up_0.2s_ease-out] flex-col gap-3 overflow-y-auto rounded-b-2xl bg-gray-100 p-4 shadow-xl">
          {menuTop}
          <nav className="flex flex-col rounded-xl bg-white p-1">
            <button
              type="button"
              onClick={() => run(onNewChat)}
              className={`${itemClass} text-black`}
            >
              {t.mobile.newChat}
            </button>
            {isLoggedIn && (
              <Link
                href="/mypage/chats"
                onClick={() => setOpen(false)}
                className={`${itemClass} text-black`}
              >
                {t.mobile.myChats}
              </Link>
            )}
            <Link
              href="/support-referral"
              onClick={() => setOpen(false)}
              className={`${itemClass} text-black`}
            >
              {t.referral}
            </Link>
            <div className="my-1 h-px bg-gray-300" />
            <button
              type="button"
              onClick={() => run(onEnd)}
              className={`${itemClass} font-semibold text-red-500`}
            >
              {t.mobile.endChat}
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
