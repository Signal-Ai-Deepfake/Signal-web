import RecommendationCard from "@/shared/ui/RecommendationCard";
import RiskFactorCard from "@/shared/ui/RiskFactorCard";
import type { AnalysisResult } from "./AnalyzePage";

interface ResultDetailsProps {
  show: boolean;
  result: AnalysisResult;
}

export default function ResultDetails({ show, result }: ResultDetailsProps) {
  return (
    <div
      className="grid w-full transition-[grid-template-rows] duration-300 ease-in-out"
      style={{ gridTemplateRows: show ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">
        <div
          className={`flex flex-col gap-4 rounded-2xl border border-gray-300 px-8 py-6 transition-opacity duration-300 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-body-1 font-semibold text-black">상세 분석 결과</p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RiskFactorCard factors={result.factors} />
            <RecommendationCard items={result.recommendations} aiNote={result.aiNote} />
          </div>
        </div>
      </div>
    </div>
  );
}
