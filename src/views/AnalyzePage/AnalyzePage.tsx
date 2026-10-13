"use client";

import Link from "next/link";
import type { AnalysisResult } from "@/entities/analysis/model";
import Arrow from "@/shared/asset/svg/Arrow";
import Lock from "@/shared/asset/svg/Lock";
import BackButton from "@/shared/ui/BackButton";
import UploadGuideCard from "@/shared/ui/UploadGuideCard";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import AnalysisPanel from "./AnalysisPanel";
import MobileAnalyzeStepper from "./MobileAnalyzeStepper";
import ResultDetails from "./ResultDetails";
import UploadCard from "./UploadCard";
import { useAnalyzeFlow } from "./useAnalyzeFlow";

export type { Status } from "./useAnalyzeFlow";
export type { AnalysisResult };

const EMPTY_RESULT: AnalysisResult = {
  score: 0,
  level: "안전",
  description: "",
  factors: [],
  recommendations: [],
  aiNote: "",
};

export default function AnalyzePage() {
  const {
    status,
    previewUrl,
    showDetails,
    isProtected,
    result,
    toggleDetails,
    handleFileSelect,
    handleReset,
    handleAnalyze,
    handleProtect,
    handleShare,
    handleSaveProtected,
  } = useAnalyzeFlow();

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-6 pb-[120px] md:py-10">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col items-start gap-6">
          <BackButton className="md:hidden" />
          <div className="hidden items-center gap-4 md:flex">
            <Link href="/" className="text-body-1 text-gray-800">
              홈
            </Link>
            <span className="text-gray-800 [&>svg]:h-[18px] [&>svg]:w-[18px]">
              <Arrow />
            </span>
            <span className="text-body-1 text-primary-500">사진 위험도 분석 및 보호</span>
          </div>
          <div className="flex flex-col gap-2 md:gap-6">
            <h1 className="text-h3 font-bold text-black md:text-h1">사진 위험도 분석 및 보호</h1>
            <p className="text-small text-gray-800 md:text-body-1">
              SNS 업로드 전 사진의 위험 요소를 AI가 분석하고 안전하게 보호할 수 있도록 도와드립니다.
            </p>
          </div>

          <MobileAnalyzeStepper status={status} />

          <div className="flex w-full flex-col items-stretch gap-6 lg:flex-row lg:gap-10">
            <UploadCard
              status={status}
              previewUrl={previewUrl}
              isProtected={isProtected}
              onFileSelect={handleFileSelect}
              onReset={handleReset}
            />

            <div className="flex flex-col gap-6 lg:flex-1">
              <UploadGuideCard />
              {(status === "idle" || status === "selected") && (
                <div className="flex items-center justify-center gap-1.5 opacity-70 md:hidden">
                  <span className="text-gray-800 [&>svg]:h-5 [&>svg]:w-5">
                    <Lock />
                  </span>
                  <p className="text-caption text-gray-800">
                    모든 데이터는 암호화되어 안전하게 보호됩니다.
                  </p>
                </div>
              )}
              <AnalysisPanel
                status={status}
                canAnalyze={status === "selected"}
                onAnalyze={handleAnalyze}
                result={result ?? EMPTY_RESULT}
                isProtected={isProtected}
                showDetails={showDetails}
                onToggleDetails={toggleDetails}
                onProtect={handleProtect}
                onShare={handleShare}
                onSaveProtected={handleSaveProtected}
              />
              {(status === "idle" || status === "selected") && (
                <p className="text-caption -mt-4 text-center text-gray-800 md:hidden">
                  파일을 업로드하면 분석을 시작할 수 있습니다.
                </p>
              )}
            </div>
          </div>

          {status === "result" && (
            <ResultDetails show={showDetails} result={result ?? EMPTY_RESULT} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
