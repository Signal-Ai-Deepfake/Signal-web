"use client";

import ChevronLeft from "@/shared/asset/svg/ChevronLeft";
import Share from "@/shared/asset/svg/Share";
import { useGoBack } from "@/shared/lib/useGoBack";
import { useT } from "@/shared/i18n/I18nProvider";
import { resultMessages } from "./messages";
import { uiMessages } from "@/shared/ui/messages";

interface ResultMobileHeaderProps {
  onShare?: () => void;
}

export default function ResultMobileHeader({ onShare }: ResultMobileHeaderProps) {
  const goBack = useGoBack();
  const t = useT(resultMessages);
  const ui = useT(uiMessages);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-[6px] md:hidden print:hidden">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={goBack}
          aria-label={ui.back}
          className="text-primary-500 active:bg-primary-50 flex size-10 cursor-pointer items-center justify-center rounded-full [&>svg]:h-[18px] [&>svg]:w-[11.25px]"
        >
          <ChevronLeft />
        </button>
        <h1 className="text-body-1 text-primary-500 font-bold">{t.mobileTitle}</h1>
      </div>
      {onShare && (
        <button
          type="button"
          onClick={onShare}
          aria-label={t.shareLabel}
          className="text-primary-500 active:bg-primary-50 flex size-10 cursor-pointer items-center justify-center rounded-full [&>svg]:h-4 [&>svg]:w-3.5"
        >
          <Share />
        </button>
      )}
    </header>
  );
}
