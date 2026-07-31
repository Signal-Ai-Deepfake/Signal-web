import AnalysisProgressCard from "@/shared/ui/AnalysisProgressCard";
import AnalysisResultCard from "@/shared/ui/AnalysisResultCard";
import UploadStepCard from "@/shared/ui/UploadStepCard";

interface AnalysisStepStackProps {
  percent: number;
  riskPercent: number;
  level: "안전" | "위험" | "주의";
  message: string;
}

export default function AnalysisStepStack({
  percent,
  riskPercent,
  level,
  message,
}: AnalysisStepStackProps) {
  return (
    <div className="relative h-[460px] w-[460px]">
      <div className="absolute top-12 right-68 -rotate-4 rounded-3xl shadow-lg">
        <UploadStepCard />
      </div>
      <div className="absolute top-12 left-68 rotate-4 rounded-3xl shadow-lg">
        <AnalysisResultCard riskPercent={riskPercent} level={level} message={message} />
      </div>
      <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 rounded-3xl shadow-xl">
        <AnalysisProgressCard percent={percent} />
      </div>
    </div>
  );
}
