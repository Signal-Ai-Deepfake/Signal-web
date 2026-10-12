"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createRiskAssessment } from "@/entities/analysis/api";
import { mapAssessment, type AnalysisResult } from "@/entities/analysis/model";
import Arrow from "@/shared/asset/svg/Arrow";
import Lock from "@/shared/asset/svg/Lock";
import UploadGuideCard from "@/shared/ui/UploadGuideCard";
import { pollUntil } from "@/shared/lib/poll";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import { createProtection, downloadProtection, getProtection } from "./analyzeApi";
import AnalysisPanel from "./AnalysisPanel";
import MobileAnalyzeStepper from "./MobileAnalyzeStepper";
import ResultDetails from "./ResultDetails";
import UploadCard from "./UploadCard";

export type Status = "idle" | "selected" | "analyzing" | "error" | "result";
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
  const [status, setStatus] = useState<Status>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [assessmentId, setAssessmentId] = useState<number | null>(null);
  const [protectionId, setProtectionId] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFileSelect(file: File) {
    setPreviewUrl(URL.createObjectURL(file));
    setSelectedFile(file);
    setShowDetails(false);
    setIsProtected(false);
    setResult(null);
    setAssessmentId(null);
    setProtectionId(null);
    setStatus("selected");
  }

  function handleReset() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setSelectedFile(null);
    setShowDetails(false);
    setIsProtected(false);
    setResult(null);
    setAssessmentId(null);
    setProtectionId(null);
    setStatus("idle");
  }

  const analyzeMutation = useMutation({
    mutationFn: () => {
      if (!selectedFile) throw new Error("이미지를 선택해 주세요.");
      return createRiskAssessment(selectedFile);
    },
    onSuccess: (data) => {
      if (!data.faceDetected) {
        setStatus("error");
        return;
      }
      setAssessmentId(data.assessmentId);
      setResult(mapAssessment(data));
      setStatus("result");
    },
    onError: (error) => {
      setStatus("selected");
      toast.error("분석에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const protectMutation = useMutation({
    mutationFn: async () => {
      if (!assessmentId) throw new Error("먼저 이미지를 분석해 주세요.");
      const created = await createProtection(assessmentId);
      return pollUntil(
        () => getProtection(created.protectionId),
        (protection) => protection.status !== "PROCESSING",
      );
    },
    onSuccess: (protection) => {
      if (protection.status === "FAILED") {
        toast.error("이미지 보호 처리에 실패했습니다.");
        return;
      }
      setProtectionId(protection.protectionId);
      setIsProtected(true);
      setShowDetails(true);
      toast.success("보호 처리된 이미지를 준비했습니다.");
    },
    onError: (error) => {
      toast.error("이미지 보호 처리에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const saveProtectedMutation = useMutation({
    mutationFn: async () => {
      if (!protectionId) throw new Error("보호 처리된 이미지가 없습니다.");
      return downloadProtection(protectionId);
    },
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "protected-image";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("보호본을 저장했습니다.");
    },
    onError: (error) => {
      toast.error("보호본 저장에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  function handleAnalyze() {
    setStatus("analyzing");
    analyzeMutation.mutate();
  }

  function handleProtect() {
    if (protectMutation.isPending) return;
    protectMutation.mutate();
  }

  function handleShare() {
    toast.success("SNS 공유 링크를 준비했습니다.");
  }

  function handleSaveProtected() {
    if (saveProtectedMutation.isPending) return;
    saveProtectedMutation.mutate();
  }

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-6 pb-[120px] md:py-10">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col items-start gap-6">
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
                onToggleDetails={() => setShowDetails((prev) => !prev)}
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
