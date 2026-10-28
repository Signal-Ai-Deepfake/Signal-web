"use client";

import Warning from "@/shared/asset/svg/Warning";
import { useT } from "@/shared/i18n/I18nProvider";
import { analyzeMessages } from "./messages";

export default function ScoreInfoTooltip() {
  const t = useT(analyzeMessages);
  return (
    <div className="group relative flex">
      <button
        type="button"
        aria-label={t.scoreInfoLabel}
        className="flex cursor-pointer text-gray-600 [&>svg]:h-5 [&>svg]:w-5"
      >
        <Warning />
      </button>
      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 w-max max-w-[320px] -translate-x-1/2 pb-3 opacity-0 transition-all duration-150 group-focus-within:opacity-100 group-hover:opacity-100">
        <div className="text-caption relative rounded-lg border border-gray-200 bg-white px-5 py-3 text-center break-keep text-gray-700 shadow-lg">
          {t.scoreInfo}
          <div className="absolute -bottom-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rotate-45 border-r border-b border-gray-200 bg-white" />
        </div>
      </div>
    </div>
  );
}
