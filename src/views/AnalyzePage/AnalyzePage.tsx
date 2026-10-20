"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { AnalysisResult } from "@/entities/analysis/model";
import Arrow from "@/shared/asset/svg/Arrow";
import Lock from "@/shared/asset/svg/Lock";
import { animateScrollTo, easeInOutSine } from "@/shared/lib/animateScrollTo";
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

const DETAILS_SCROLL_MS = 1200;

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
    assessmentId,
    toggleDetails,
    handleFileSelect,
    handleReset,
    handleAnalyze,
    handleProtect,
    handleShare,
    handleSaveProtected,
  } = useAnalyzeFlow();
  const detailsRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef(0);

  useEffect(() => {
    const cancelScroll = () => cancelAnimationFrame(scrollFrameRef.current);
    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchstart", cancelScroll, { passive: true });
    return () => {
      cancelScroll();
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
    };
  }, []);

  function handleToggleDetails() {
    const opening = !showDetails;
    toggleDetails();
    const el = detailsRef.current;
    if (!opening || !el) return;
    const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const targetY = el.getBoundingClientRect().top + window.scrollY - offset;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: targetY, behavior: "instant" });
      return;
    }
    cancelAnimationFrame(scrollFrameRef.current);
    animateScrollTo(
      targetY,
      (frame) => {
        scrollFrameRef.current = frame;
      },
      DETAILS_SCROLL_MS,
      easeInOutSine,
    );
  }

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
                detailHref={assessmentId ? `/analyze/results/${assessmentId}` : null}
                isProtected={isProtected}
                showDetails={showDetails}
                onToggleDetails={handleToggleDetails}
                onProtect={handleProtect}
                onShare={handleShare}
                onSaveProtected={handleSaveProtected}
              />
            </div>
          </div>

          {status === "result" && (
            <div ref={detailsRef} className="w-full scroll-mt-24">
              <ResultDetails show={showDetails} result={result ?? EMPTY_RESULT} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
