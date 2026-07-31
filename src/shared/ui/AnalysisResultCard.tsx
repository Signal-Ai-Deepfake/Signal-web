import ArrowUp from "@/shared/asset/svg/ArrowUp";
import AnalysisStepCard from "@/shared/ui/AnalysisStepCard";
import RiskTag from "@/shared/ui/RiskTag";

interface AnalysisResultCardProps {
  riskPercent: number;
  level: "안전" | "위험" | "주의";
  message: string;
  onViewGuide?: () => void;
}

export default function AnalysisResultCard({
  riskPercent,
  level,
  message,
  onViewGuide,
}: AnalysisResultCardProps) {
  return (
    <AnalysisStepCard step="03" title="분석 완료" size="sm">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-small text-black">위험도</p>
          <p className="text-h2 text-primary-500 font-bold">{riskPercent}%</p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <RiskTag level={level} />
          <p className="text-small text-gray-650">{message}</p>
        </div>
        <button
          type="button"
          onClick={onViewGuide}
          className="text-large mt-2 flex w-full items-center justify-center gap-2 rounded bg-primary-50 py-3 font-semibold text-primary-500 transition-colors hover:bg-primary-100"
        >
          보호 가이드 보기
          <span className="[&>svg]:h-6 [&>svg]:w-6">
            <ArrowUp />
          </span>
        </button>
      </div>
    </AnalysisStepCard>
  );
}
