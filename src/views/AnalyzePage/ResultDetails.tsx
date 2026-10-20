import RecommendationCard from "@/shared/ui/RecommendationCard";
import RiskFactorCard from "@/shared/ui/RiskFactorCard";
import type { AnalysisResult } from "./AnalyzePage";

interface ResultDetailsProps {
  show: boolean;
  result: AnalysisResult;
}

export default function ResultDetails({ show, result }: ResultDetailsProps) {
  if (!show) return null;

  return (
    <div className="flex w-full animate-[fade-in-up_0.4s_ease-out] flex-col gap-4 rounded-2xl border border-gray-300 px-8 py-6">
      <p className="text-body-1 font-semibold text-black">상세 분석 결과</p>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RiskFactorCard factors={result.factors} />
        <RecommendationCard items={result.recommendations} aiNote={result.aiNote} />
      </div>
    </div>
  );
}
