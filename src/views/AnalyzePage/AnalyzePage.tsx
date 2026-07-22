"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Arrow from "@/shared/asset/svg/Arrow";
import Hd from "@/shared/asset/svg/Hd";
import IdCard from "@/shared/asset/svg/IdCard";
import Image from "@/shared/asset/svg/Image";
import ScanFace from "@/shared/asset/svg/ScanFace";
import type { RiskFactor } from "@/shared/ui/RiskFactorCard";
import UploadGuideCard from "@/shared/ui/UploadGuideCard";
import { pollUntil } from "@/shared/lib/poll";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import {
  createProtection,
  createRiskAssessment,
  downloadProtection,
  getProtection,
  type RiskAssessmentResponse,
  type RiskLevel,
} from "./analyzeApi";
import AnalysisPanel from "./AnalysisPanel";
import ResultDetails from "./ResultDetails";
import UploadCard from "./UploadCard";

export type Status = "idle" | "selected" | "analyzing" | "error" | "result";

export interface AnalysisResult {
  score: number;
  level: "안전" | "위험" | "주의";
  description: string;
  factors: RiskFactor[];
  recommendations: string[];
  aiNote: string;
}

const EMPTY_RESULT: AnalysisResult = {
  score: 0,
  level: "안전",
  description: "",
  factors: [],
  recommendations: [],
  aiNote: "",
};

const RISK_LEVEL_LABEL: Record<RiskLevel, AnalysisResult["level"]> = {
  HIGH: "위험",
  MEDIUM: "주의",
  LOW: "안전",
};

const RISK_LEVEL_DESCRIPTION: Record<RiskLevel, string> = {
  HIGH: "AI 악용 위험이 높습니다.\n이미지 보호 처리 후 업로드를 권장합니다.",
  MEDIUM: "AI 악용 위험이 있습니다.\n이미지 보호 처리를 고려해 보세요.",
  LOW: "AI 악용 위험이 낮습니다.",
};

const FACTOR_ICON_BY_TYPE: Record<string, RiskFactor["icon"]> = {
  FACE: ScanFace,
  BACKGROUND: Image,
  PERSONAL_INFO: IdCard,
  RESOLUTION: Hd,
};

function mapAssessment(data: RiskAssessmentResponse): AnalysisResult {
  return {
    score: data.overallScore,
    level: RISK_LEVEL_LABEL[data.overallRiskLevel],
    description: RISK_LEVEL_DESCRIPTION[data.overallRiskLevel],
    factors: data.factors.map((factor) => ({
      icon: FACTOR_ICON_BY_TYPE[factor.type] ?? ScanFace,
      title: factor.label,
      subtitle: factor.description,
      score: factor.score,
    })),
    recommendations: data.recommendations,
    aiNote: data.recommendations[0] ?? RISK_LEVEL_DESCRIPTION[data.overallRiskLevel],
  };
}

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
        (protection) => protection.status !== "PROCESSING"
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
      <main className="flex w-full flex-col items-center bg-white px-5 py-10 pb-[120px]">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col items-start gap-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-body-1 text-gray-800">
              홈
            </Link>
            <span className="text-gray-800 [&>svg]:h-[18px] [&>svg]:w-[18px]">
              <Arrow />
            </span>
            <span className="text-body-1 text-primary-500">사진 위험도 분석 및 보호</span>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-h1 font-bold text-black">사진 위험도 분석 및 보호</h1>
            <p className="text-body-1 text-gray-800">
              SNS 업로드 전 사진의 위험 요소를 AI가 분석하고 안전하게 보호할 수 있도록 도와드립니다.
            </p>
          </div>

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
