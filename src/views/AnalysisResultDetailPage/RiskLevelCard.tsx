"use client";

import type { DisplayRiskLevel } from "@/entities/analysis/model";
import RiskSemiGauge from "@/shared/ui/RiskSemiGauge";
import RiskTag from "@/shared/ui/RiskTag";
import { useT } from "@/shared/i18n/I18nProvider";
import { resultMessages } from "./messages";
import { uiMessages } from "@/shared/ui/messages";

interface RiskLevelCardProps {
  score: number;
  level: DisplayRiskLevel;
  description: string;
}

export default function RiskLevelCard({ score, level, description }: RiskLevelCardProps) {
  const t = useT(resultMessages);
  const ui = useT(uiMessages);
  return (
    <div className="flex w-full flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:border-gray-300">
      <div className="flex items-center justify-between">
        <h3 className="text-body-2 text-primary-500 font-bold">{t.levelTitle}</h3>
        <RiskTag level={level} />
      </div>
      <div className="flex justify-center pt-4">
        <RiskSemiGauge score={score} level={level} className="max-w-[285px] lg:max-w-[340px]" />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-primary-500 text-xl font-bold">
          {t.levelLine(ui.riskLevel[level], score)}
        </p>
        <p className="text-small text-gray-650 break-keep whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
}
