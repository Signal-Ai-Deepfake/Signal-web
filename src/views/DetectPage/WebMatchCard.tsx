"use client";

import { useT } from "@/shared/i18n/I18nProvider";
import { detectMessages } from "./messages";
interface WebMatchCardProps {
  matchCount: number;
  unsupported?: boolean;
}

export default function WebMatchCard({ matchCount, unsupported = false }: WebMatchCardProps) {
  const t = useT(detectMessages).result;
  const shown = 3;
  const remaining = Math.max(matchCount - shown, 0);

  if (unsupported) {
    return (
      <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-300 p-5 md:px-8 md:py-6 lg:w-[400px]">
        <p className="text-body-1 font-semibold text-black">{t.webTitle}</p>
        <p className="text-body-2 text-gray-650">{t.webUnsupported}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-300 p-5 md:px-8 md:py-6 lg:w-[400px]">
      <p className="text-body-1 font-semibold text-black">{t.webTitle}</p>
      <div className="grid grid-cols-4 gap-2 md:flex md:items-center md:gap-4">
        {Array.from({ length: shown }).map((_, index) => (
          <div
            key={index}
            className="aspect-square w-full rounded-lg bg-gray-100 md:size-[72px] md:shrink-0"
          />
        ))}
        {remaining > 0 && (
          <div className="text-primary-500 text-body-2 flex aspect-square w-full items-center justify-center rounded-lg bg-gray-100 font-medium md:size-[72px] md:shrink-0">
            +{remaining}
          </div>
        )}
      </div>
      <button
        type="button"
        className="border-primary-500 text-primary-500 text-body-2 flex h-[50px] w-full items-center justify-center rounded border"
      >
        {t.viewAll}
      </button>
    </div>
  );
}
