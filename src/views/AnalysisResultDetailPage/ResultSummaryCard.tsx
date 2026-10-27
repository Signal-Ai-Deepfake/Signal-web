"use client";

import { useT } from "@/shared/i18n/I18nProvider";
import { resultMessages } from "./messages";
interface ResultSummaryCardProps {
  assessmentId: number;
  faceCount: number;
}

export default function ResultSummaryCard({ assessmentId, faceCount }: ResultSummaryCardProps) {
  const t = useT(resultMessages);
  return (
    <div className="flex w-full flex-col gap-1 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:border-gray-300 md:p-6">
      <div className="flex items-center gap-2">
        <span className="size-2 shrink-0 rounded-full bg-green-500" />
        <p className="text-small font-semibold text-green-500">{t.completed}</p>
      </div>
      <h2 className="text-body-1 text-primary-500 font-bold">{t.summaryTitle}</h2>
      <p className="text-caption text-gray-600">{t.summaryMeta(assessmentId, faceCount)}</p>
    </div>
  );
}
