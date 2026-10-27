"use client";

import Link from "next/link";
import Comments from "@/shared/asset/svg/Comments";
import Download from "@/shared/asset/svg/Download";
import { useT } from "@/shared/i18n/I18nProvider";
import { resultMessages } from "./messages";

interface ResultActionsProps {
  aboveBottomNav: boolean | null;
  onSave: () => void;
}

const actionClass =
  "text-body-2 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl font-bold transition-colors md:w-[253px]";

export default function ResultActions({ aboveBottomNav, onSave }: ResultActionsProps) {
  const t = useT(resultMessages);
  return (
    <div
      className={`flex w-full flex-col gap-3 max-md:fixed max-md:inset-x-0 max-md:z-20 max-md:border-t max-md:border-gray-200 max-md:bg-white max-md:p-5 max-md:shadow-[0_-10px_10px_rgba(0,0,0,0.03)] md:flex-row md:justify-end print:hidden ${
        aboveBottomNav === null
          ? "max-md:invisible"
          : aboveBottomNav
            ? "max-md:bottom-[calc(4rem+env(safe-area-inset-bottom))]"
            : "max-md:bottom-0 max-md:pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
      }`}
    >
      <Link
        href="/chat"
        className={`${actionClass} bg-primary-500 active:bg-primary-600 md:hover:bg-primary-600 text-white`}
      >
        <span className="[&>svg]:h-4 [&>svg]:w-5">
          <Comments />
        </span>
        {t.startChat}
      </Link>
      <button
        type="button"
        onClick={onSave}
        className={`${actionClass} bg-primary-50 text-primary-500 active:bg-primary-100 md:hover:bg-primary-100 md:order-first`}
      >
        <span className="[&>svg]:size-4">
          <Download />
        </span>
        {t.save}
      </button>
    </div>
  );
}
