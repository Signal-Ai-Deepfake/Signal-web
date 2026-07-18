import ProgressRing from "@/shared/asset/svg/ProgressRing";
import AnalysisStepCard from "@/shared/ui/AnalysisStepCard";

interface AnalysisProgressCardProps {
  percent: number;
}

export default function AnalysisProgressCard({ percent }: AnalysisProgressCardProps) {
  return (
    <AnalysisStepCard step="02" title="AI 분석 중" size="lg">
      <div className="flex flex-col items-center gap-4">
        <div className="text-primary-500 [&>svg]:h-[168px] [&>svg]:w-[168px]">
          <ProgressRing />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-large font-bold text-black">분석 진행 중...</p>
          <p className="text-small text-gray-700">
            얼굴 도용, 딥페이크 여부를
            <br />
            AI가 분석하고 있습니다.
          </p>
        </div>
        <div className="flex w-full items-center gap-3 mt-[25px]">
          <div className="h-2 flex-1 rounded-full bg-gray-200">
            <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${percent}%` }} />
          </div>
          <span className="text-caption font-semibold text-black">{percent}%</span>
        </div>
      </div>
    </AnalysisStepCard>
  );
}
