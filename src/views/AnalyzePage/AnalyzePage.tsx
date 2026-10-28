"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { AnalysisResult } from "@/entities/analysis/model";
import Arrow from "@/shared/asset/svg/Arrow";
import Lock from "@/shared/asset/svg/Lock";
import { scrollToElement } from "@/shared/lib/scrollToElement";
import BackButton from "@/shared/ui/BackButton";
import UploadGuideCard from "@/shared/ui/UploadGuideCard";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import AnalysisPanel from "./AnalysisPanel";
import MobileAnalyzeStepper from "./MobileAnalyzeStepper";
import ResultDetails from "./ResultDetails";
import UploadCard from "./UploadCard";
import { useAnalyzeFlow } from "./useAnalyzeFlow";
import { useT } from "@/shared/i18n/I18nProvider";
import { analyzeMessages } from "./messages";
import { uiMessages } from "@/shared/ui/messages";

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
    isSimulatedProtection,
    result,
    assessmentId,
    toggleDetails,
    handleFileSelect,
    handleReset,
    handleAnalyze,
    handleProtect,
    handleShare,
    handleSaveProtected,
  } = useAnalyzeFlow();
  const t = useT(analyzeMessages);
  const ui = useT(uiMessages);
  const detailsRef = useRef<HTMLDivElement>(null);
  const scrollToDetailsRef = useRef(false);

  useEffect(() => {
    if (!showDetails || !scrollToDetailsRef.current || !detailsRef.current) return;
    scrollToDetailsRef.current = false;
    return scrollToElement(detailsRef.current);
  }, [showDetails]);

  function handleToggleDetails() {
    scrollToDetailsRef.current = !showDetails;
    toggleDetails();
  }

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-6 pb-[120px] md:py-10">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col items-start gap-6">
          <BackButton className="md:hidden" />
          <div className="hidden items-center gap-4 md:flex">
            <Link href="/" className="text-body-1 text-gray-800">
              {ui.home}
            </Link>
            <span className="text-gray-800 [&>svg]:h-[18px] [&>svg]:w-[18px]">
              <Arrow />
            </span>
            <span className="text-body-1 text-primary-500">{t.title}</span>
          </div>
          <div className="flex flex-col gap-2 md:gap-6">
            <h1 className="text-h3 md:text-h1 font-bold text-black">{t.title}</h1>
            <p className="text-small md:text-body-1 break-keep text-gray-800">{t.description}</p>
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
                  <p className="text-caption text-gray-800">{t.encrypted}</p>
                </div>
              )}
              <AnalysisPanel
                status={status}
                canAnalyze={status === "selected"}
                onAnalyze={handleAnalyze}
                result={result ?? EMPTY_RESULT}
                detailHref={assessmentId ? `/analyze/results/${assessmentId}` : null}
                isProtected={isProtected}
                isSimulatedProtection={isSimulatedProtection}
                showDetails={showDetails}
                onToggleDetails={handleToggleDetails}
                onProtect={handleProtect}
                onShare={handleShare}
                onSaveProtected={handleSaveProtected}
              />
            </div>
          </div>

          {status === "result" && (
            <div ref={detailsRef} className="w-full">
              <ResultDetails show={showDetails} result={result ?? EMPTY_RESULT} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
