"use client";

import AnalysisProgressCard from "@/shared/ui/AnalysisProgressCard";
import AnalysisResultCard from "@/shared/ui/AnalysisResultCard";
import UploadStepCard from "@/shared/ui/UploadStepCard";
import { useT } from "@/shared/i18n/I18nProvider";
import { uiMessages } from "@/shared/ui/messages";
import type { RiskLevel } from "@/shared/ui/messages";

interface AnalysisStepStackProps {
  percent: number;
  riskPercent: number;
  level: RiskLevel;
  message: string;
}

export default function AnalysisStepStack({
  percent,
  riskPercent,
  level,
  message,
}: AnalysisStepStackProps) {
  const t = useT(uiMessages);
  return (
    <div className="relative h-[300px] w-[300px] overflow-visible sm:h-[380px] sm:w-[380px] lg:h-[460px] lg:w-[460px]">
      <div className="relative h-[460px] w-[460px] origin-top scale-[0.65] sm:scale-[0.826] lg:scale-100">
        <div className="absolute top-12 right-68 -rotate-4 animate-[step-in_0.7s_ease-out_both] rounded-3xl shadow-lg [animation-delay:600ms] group-data-[typing=pending]/hero:[animation-play-state:paused] motion-reduce:animate-none">
          <UploadStepCard />
        </div>
        <div className="absolute top-12 left-68 rotate-4 animate-[step-in_0.7s_ease-out_both] rounded-3xl shadow-lg [animation-delay:1300ms] group-data-[typing=pending]/hero:[animation-play-state:paused] motion-reduce:animate-none">
          <AnalysisResultCard riskPercent={riskPercent} level={level} message={message} />
        </div>
        <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 animate-[step-in_0.7s_ease-out_both] rounded-3xl shadow-xl [animation-delay:950ms] group-data-[typing=pending]/hero:[animation-play-state:paused] motion-reduce:animate-none">
          <AnalysisProgressCard percent={percent} />
        </div>
      </div>
      <p className="text-caption absolute inset-x-0 bottom-0 animate-[step-in_0.7s_ease-out_both] text-center text-gray-700 [animation-delay:1650ms] group-data-[typing=pending]/hero:[animation-play-state:paused] motion-reduce:animate-none">
        {t.exampleScreen} · {t.exampleResultSequence}
      </p>
    </div>
  );
}
