"use client";

import RecommendationCard from "@/shared/ui/RecommendationCard";
import RiskFactorCard from "@/shared/ui/RiskFactorCard";
import type { AnalysisResult } from "./AnalyzePage";
import { useT } from "@/shared/i18n/I18nProvider";
import { analyzeMessages } from "./messages";

interface ResultDetailsProps {
  show: boolean;
  result: AnalysisResult;
}

export default function ResultDetails({ show, result }: ResultDetailsProps) {
  const t = useT(analyzeMessages);
  if (!show) return null;

  return (
    <div className="flex w-full animate-[fade-in-up_0.4s_ease-out] flex-col gap-4 rounded-2xl border border-gray-300 p-5 md:px-8 md:py-6">
      <p className="text-body-2 md:text-body-1 font-semibold text-black">{t.detailsTitle}</p>
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <RiskFactorCard factors={result.factors} />
        <RecommendationCard items={result.recommendations} aiNote={result.aiNote} />
      </div>
    </div>
  );
}
