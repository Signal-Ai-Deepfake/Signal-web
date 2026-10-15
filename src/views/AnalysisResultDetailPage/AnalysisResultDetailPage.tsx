"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { getAssessment } from "@/entities/analysis/api";
import { mapAssessment, type AnalysisResult } from "@/entities/analysis/model";
import Arrow from "@/shared/asset/svg/Arrow";
import Share from "@/shared/asset/svg/Share";
import { useIsLoggedIn } from "@/shared/lib/useIsLoggedIn";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import ResponseGuideCard from "./ResponseGuideCard";
import ResultActions from "./ResultActions";
import ResultMobileHeader from "./ResultMobileHeader";
import ResultSummaryCard from "./ResultSummaryCard";
import RiskFactorList from "./RiskFactorList";
import RiskLevelCard from "./RiskLevelCard";

interface AnalysisResultDetailPageProps {
  id: string;
}

function buildShareText(result: AnalysisResult) {
  const topFactors = [...result.factors]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((factor) => `- ${factor.title} ${factor.score}%`);
  return [
    "[Signal 사진 위험도 분석 결과]",
    `위험도: ${result.level} (${result.score}%)`,
    result.description.replace(/\n/g, " "),
    ...(topFactors.length > 0 ? ["", "주요 위험 요인", ...topFactors] : []),
  ].join("\n");
}

async function shareResult(result: AnalysisResult) {
  const text = buildShareText(result);
  if (navigator.share) {
    try {
      await navigator.share({ title: "Signal 분석 결과", text });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error("공유하지 못했습니다.");
    }
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    toast.success("분석 결과 요약을 복사했어요.");
  } catch {
    toast.error("결과를 복사하지 못했습니다.");
  }
}

export default function AnalysisResultDetailPage({ id }: AnalysisResultDetailPageProps) {
  const assessmentId = Number(id);
  const isLoggedIn = useIsLoggedIn();

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
      <SiteHeader className="max-md:hidden print:hidden" />
      <ResultMobileHeader onShare={result ? () => shareResult(result) : undefined} />
      <main
        className={`flex w-full flex-col items-center bg-gray-100 px-5 py-5 md:bg-white md:py-10 md:pb-[120px] ${
          result ? "max-md:pb-[184px]" : "max-md:pb-10"
        }`}
      >
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-6 md:gap-8">
          <div className="hidden flex-col gap-6 md:flex">
            <div className="flex items-center gap-4 print:hidden">
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
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-h2 lg:text-h1 font-bold text-black">분석 결과 상세</h1>
              {result && (
                <button
                  type="button"
                  onClick={() => shareResult(result)}
                  className="text-body-2 text-primary-500 border-primary-500 hover:bg-primary-50 flex h-[50px] shrink-0 cursor-pointer items-center gap-2 rounded border px-5 transition-colors print:hidden [&>svg]:h-4 [&>svg]:w-3.5"
                >
                  <Share />
                  공유하기
                </button>
              )}
            </div>
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

          {assessment && result && (
            <>
              <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:gap-8">
                <div className="flex flex-col gap-6 lg:gap-8">
                  <ResultSummaryCard
                    assessmentId={assessment.assessmentId}
                    faceCount={assessment.faces.length}
                  />
                  <RiskLevelCard
                    score={result.score}
                    level={result.level}
                    description={result.description}
                  />
                </div>
                <div className="flex flex-col gap-6 lg:gap-8">
                  {result.factors.length > 0 && <RiskFactorList factors={result.factors} />}
                  {result.recommendations.length > 0 && (
                    <ResponseGuideCard items={result.recommendations} />
                  )}
                </div>
              </div>
              <ResultActions aboveBottomNav={isLoggedIn} onSave={() => window.print()} />
            </>
          )}
        </div>
      </main>
      <div className="max-md:hidden print:hidden">
        <Footer />
      </div>
    </>
  );
}
