"use client";

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
import Footer from "@/widgets/Footer";
import HeaderAuthenticated from "@/widgets/HeaderAuthenticated";
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

// TODO: 실제 분석 API 연동 시 이 목데이터를 응답 값으로 교체
const MOCK_RESULT: AnalysisResult = {
  score: 74,
  level: "위험",
  description: "AI 악용 위험이 높습니다.\n이미지 보호 처리 후 업로드를 권장합니다.",
  factors: [
    { icon: ScanFace, title: "얼굴 노출 정도", subtitle: "얼굴 식별 가능성", score: 80 },
    { icon: Image, title: "배경 정보 노출", subtitle: "위치 추정 가능성", score: 30 },
    { icon: IdCard, title: "개인정보 노출", subtitle: "개인정보 포함 여부", score: 68 },
    { icon: Hd, title: "이미지 해상도", subtitle: "세부 정보 식별 수준", score: 80 },
  ],
  recommendations: [
    "얼굴이 선명하게 노출되어 있어 AI 악용 가능성이 높습니다.",
    "얼굴 각도를 조금 변경하거나 얼굴 크기를 줄여 촬영하면 위험도를 낮출 수 있습니다.",
    "배경 정보와 이미지 해상도는 안전한 수준으로 분석되었습니다.",
    "SNS 업로드 전 이미지 보호 처리를 적용하는 것을 권장합니다.",
  ],
  aiNote: "얼굴 노출 위험이 높습니다. 이미지 보호를 권장합니다.",
};

// TODO: 실제 얼굴 인식 실패 시 API 응답에 따라 이 상태로 전환
const SIMULATE_FACE_NOT_FOUND = false;

export default function AnalyzePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isProtected, setIsProtected] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFileSelect(file: File) {
    setPreviewUrl(URL.createObjectURL(file));
    setShowDetails(false);
    setIsProtected(false);
    setStatus("selected");
  }

  function handleReset() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setShowDetails(false);
    setIsProtected(false);
    setStatus("idle");
  }

  function handleAnalyze() {
    setStatus("analyzing");
    // TODO: 실제 분석 API 연동. 지금은 목업 지연으로 결과 화면만 보여줌.
    window.setTimeout(() => {
      setStatus(SIMULATE_FACE_NOT_FOUND ? "error" : "result");
    }, 1200);
  }

  function handleProtect() {
    setIsProtected(true);
    setShowDetails(true);
    toast.success("보호 처리된 이미지를 준비했습니다.");
  }

  function handleShare() {
    toast.success("SNS 공유 링크를 준비했습니다.");
  }

  function handleSaveProtected() {
    toast.success("보호본을 저장했습니다.");
  }

  return (
    <>
      <HeaderAuthenticated />
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
                result={MOCK_RESULT}
                isProtected={isProtected}
                showDetails={showDetails}
                onToggleDetails={() => setShowDetails((prev) => !prev)}
                onProtect={handleProtect}
                onShare={handleShare}
                onSaveProtected={handleSaveProtected}
              />
            </div>
          </div>

          {status === "result" && <ResultDetails show={showDetails} result={MOCK_RESULT} />}
        </div>
      </main>
      <Footer />
    </>
  );
}
