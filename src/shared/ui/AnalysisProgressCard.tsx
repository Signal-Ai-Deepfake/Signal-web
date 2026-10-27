"use client";

import ProgressRing from "@/shared/asset/svg/ProgressRing";
import AnalysisStepCard from "@/shared/ui/AnalysisStepCard";
import { useT } from "@/shared/i18n/I18nProvider";
import { uiMessages } from "@/shared/ui/messages";

interface AnalysisProgressCardProps {
  percent: number;
}

export default function AnalysisProgressCard({ percent }: AnalysisProgressCardProps) {
  const t = useT(uiMessages);
  return (
    <AnalysisStepCard step="02" title={t.stepAnalyzing} size="lg">
      <div className="flex flex-col items-center gap-4">
        <div className="text-primary-500 [&>svg]:h-[168px] [&>svg]:w-[168px]">
          <ProgressRing />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-large font-bold text-black">{t.analyzingTitle}</p>
          <p className="text-small max-w-[240px] break-keep text-gray-700">
            {t.analyzingDescription}
          </p>
        </div>
        <div className="mt-[25px] flex w-full items-center gap-3">
          <div className="h-2 flex-1 rounded-full bg-gray-200">
            <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${percent}%` }} />
          </div>
          <span className="text-caption font-semibold text-black">{percent}%</span>
        </div>
      </div>
    </AnalysisStepCard>
  );
}
