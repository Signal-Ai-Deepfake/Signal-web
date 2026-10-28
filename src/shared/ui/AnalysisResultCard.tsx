"use client";

import ArrowUp from "@/shared/asset/svg/ArrowUp";
import AnalysisStepCard from "@/shared/ui/AnalysisStepCard";
import RiskTag from "@/shared/ui/RiskTag";
import { useT } from "@/shared/i18n/I18nProvider";
import { uiMessages } from "@/shared/ui/messages";
import type { RiskLevel } from "@/shared/ui/messages";

interface AnalysisResultCardProps {
  riskPercent: number;
  level: RiskLevel;
  message: string;
  onViewGuide?: () => void;
}

export default function AnalysisResultCard({
  riskPercent,
  level,
  message,
  onViewGuide,
}: AnalysisResultCardProps) {
  const t = useT(uiMessages);
  return (
    <AnalysisStepCard step="03" title={t.stepDone} size="sm">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-small text-black">{t.riskLabel}</p>
          <p className="text-h2 text-primary-500 font-bold">{riskPercent}%</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <RiskTag level={level} />
          <p className="text-small text-gray-650">{message}</p>
        </div>
        <button
          type="button"
          onClick={onViewGuide}
          className="text-large bg-primary-50 text-primary-500 hover:bg-primary-100 mt-2 flex w-full items-center justify-center gap-2 rounded py-3 font-semibold transition-colors"
        >
          {t.viewProtectionGuide}
          <span className="[&>svg]:h-6 [&>svg]:w-6">
            <ArrowUp />
          </span>
        </button>
      </div>
    </AnalysisStepCard>
  );
}
