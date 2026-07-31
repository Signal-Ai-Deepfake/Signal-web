import BotOutline from "@/shared/asset/svg/BotOutline";
import Warning from "@/shared/asset/svg/Warning";
import RiskScoreGauge from "@/shared/ui/RiskScoreGauge";
import type { DetectResult } from "./types";

interface OverallRiskCardProps {
  result: DetectResult;
}

export default function OverallRiskCard({ result }: OverallRiskCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-lg border border-gray-300 p-6 lg:w-[424px]">
      <div className="flex items-center gap-1">
        <p className="text-body-1 font-semibold text-black">종합 위험도</p>
        <span className="text-gray-600 [&>svg]:h-5 [&>svg]:w-5">
          <Warning />
        </span>
      </div>
      <div className="relative flex h-40 w-40 items-center justify-center">
        <RiskScoreGauge score={result.overallScore} size={160} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-h1 font-bold text-black">{result.overallScore}</p>
          <p className="text-h3 font-semibold text-gray-500">/100</p>
        </div>
      </div>
      <p className="text-body-2 text-gray-800 text-center">{result.overallCaption}</p>
      <div className="h-px w-full bg-gray-200" />
      <div className="bg-secondary-50 border-secondary-200 flex w-full items-center gap-2 rounded-lg border p-4">
        <span className="text-secondary-600 shrink-0 [&>svg]:h-8 [&>svg]:w-8">
          <BotOutline />
        </span>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <p className="text-secondary-600 text-body-2 font-medium">모델 판단 신뢰도</p>
            <span className="text-secondary-600 [&>svg]:h-[18px] [&>svg]:w-[18px]">
              <Warning />
            </span>
            <p className="text-secondary-600 text-body-2 font-medium">{result.modelConfidence}%</p>
          </div>
          <p className="text-secondary-600 text-body-2 font-medium">{result.modelConfidenceNote}</p>
        </div>
      </div>
    </div>
  );
}
