"use client";

import type { RiskLevel } from "@/entities/analysis/api";
import { RISK_LEVEL_LABEL } from "@/entities/analysis/model";
import RiskTag from "@/shared/ui/RiskTag";
import type { ChatSummary } from "./types";
import { useT } from "@/shared/i18n/I18nProvider";
import { chatMessages } from "./messages";

interface ChatSummaryCardProps {
  summary: ChatSummary;
}

function isRiskLevel(value?: string): value is RiskLevel {
  return value === "HIGH" || value === "MEDIUM" || value === "LOW";
}

export default function ChatSummaryCard({ summary }: ChatSummaryCardProps) {
  const t = useT(chatMessages);
  return (
    <div className="border-primary-50 flex w-full flex-col gap-3.5 rounded-2xl border bg-white p-[25px]">
      <p className="text-body-1 font-semibold text-black">{t.summary.title}</p>

      {summary.situation && (
        <div className="border-primary-50 flex flex-col gap-1 border-b pb-3.5">
          <p className="text-small font-semibold text-gray-800">{t.summary.situation}</p>
          <p className="text-small text-black">{summary.situation}</p>
        </div>
      )}

      {(summary.recommendedSteps?.length ?? 0) > 0 && (
        <div className="border-primary-50 flex flex-col gap-1 border-b pb-3.5">
          <p className="text-small font-semibold text-gray-800">{t.summary.steps}</p>
          <p className="text-small text-black">
            {summary.recommendedSteps?.map((step, index) => `${index + 1}. ${step}`).join("   ")}
          </p>
        </div>
      )}

      {summary.riskLevel && (
        <div className="border-primary-50 flex flex-col gap-1.5 border-b pb-3.5">
          <div className="flex items-center justify-between">
            <p className="text-small font-semibold text-gray-800">{t.summary.riskLevel}</p>
            {isRiskLevel(summary.riskLevel) ? (
              <RiskTag level={RISK_LEVEL_LABEL[summary.riskLevel]} />
            ) : (
              <span className="text-caption bg-secondary-50 text-secondary-500 rounded-full px-2.5 py-1">
                {summary.riskLevel}
              </span>
            )}
          </div>
          {summary.riskDescription && (
            <p className="text-small text-black">{summary.riskDescription}</p>
          )}
        </div>
      )}

      {(summary.progress?.progressPercent ?? summary.progressPercent) !== undefined && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-small font-semibold text-gray-800">{t.summary.progress}</p>
            <p className="text-small font-semibold text-black">
              {summary.progress?.progressPercent ?? summary.progressPercent}%
            </p>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-300">
            <div
              className="bg-primary-500 h-2 rounded-full"
              style={{ width: `${summary.progress?.progressPercent ?? summary.progressPercent}%` }}
            />
          </div>
          {summary.progress?.currentStage && (
            <p className="text-caption text-gray-700">
              {summary.progress.stages.find(
                (stage) => stage.stage === summary.progress?.currentStage,
              )?.label ?? summary.progress.currentStage}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
