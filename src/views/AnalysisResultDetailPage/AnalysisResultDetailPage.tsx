"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getAssessment } from "@/entities/analysis/api";
import { mapAssessment } from "@/entities/analysis/model";
import Arrow from "@/shared/asset/svg/Arrow";
import RecommendationCard from "@/shared/ui/RecommendationCard";
import RiskFactorCard from "@/shared/ui/RiskFactorCard";
import RiskScoreGauge from "@/shared/ui/RiskScoreGauge";
import RiskTag from "@/shared/ui/RiskTag";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";

interface AnalysisResultDetailPageProps {
  id: string;
}

export default function AnalysisResultDetailPage({ id }: AnalysisResultDetailPageProps) {
  const assessmentId = Number(id);

  const {
    data: assessment,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["riskAssessments", assessmentId],
    queryFn: () => getAssessment(assessmentId),
    enabled: Number.isFinite(assessmentId),
  });

  const result = assessment ? mapAssessment(assessment) : null;

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-10 pb-[120px]">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-body-1 text-gray-800">
                홈
              </Link>
              <span className="text-gray-800 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <Link href="/analyze" className="text-body-1 text-gray-800">
                사진 위험도 분석 및 보호
              </Link>
              <span className="text-gray-800 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <span className="text-body-1 text-primary-500">분석 결과 상세</span>
            </div>
            <h1 className="text-h1 font-bold text-black">분석 결과 상세</h1>
          </div>

          {!Number.isFinite(assessmentId) && (
            <p className="text-body-1 text-red-500">잘못된 분석 결과 주소입니다.</p>
          )}

          {isPending && Number.isFinite(assessmentId) && (
            <p className="text-body-1 text-gray-700">불러오는 중...</p>
          )}

          {isError && (
            <p className="text-body-1 text-red-500">
              분석 결과를 불러오지 못했습니다.
              {error instanceof Error ? ` (${error.message})` : ""}
            </p>
          )}

          {result && (
            <>
              <div className="flex flex-col gap-4 rounded-2xl border border-gray-300 px-8 py-6 sm:flex-row sm:items-center sm:gap-6">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                  <RiskScoreGauge score={result.score} size={80} level={result.level} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-body-2 font-bold text-black">{result.score}</p>
                    <p className="text-caption text-gray-650">/100</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-large font-semibold text-black">위험도 등급</p>
                    <RiskTag level={result.level} />
                  </div>
                  <p className="text-body-2 whitespace-pre-line text-gray-800">
                    {result.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <RiskFactorCard factors={result.factors} />
                <RecommendationCard items={result.recommendations} aiNote={result.aiNote} />
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
