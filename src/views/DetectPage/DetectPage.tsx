"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Arrow from "@/shared/asset/svg/Arrow";
import AnalysisGuideCard from "@/shared/ui/AnalysisGuideCard";
import Button from "@/shared/ui/Button";
import { pollUntil } from "@/shared/lib/poll";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import {
  createDeepfakeDetection,
  getDeepfakeDetection,
  type DeepfakeDetectionResponse,
  type DeepfakeVerdict,
} from "./detectApi";
import DetectResultSection from "./DetectResultSection";
import DetectUploadCard from "./DetectUploadCard";
import { MOCK_RESULT } from "./mockResult";
import type { DetectResult, DetectStatus } from "./types";

const VERDICT_LABEL: Record<DeepfakeVerdict, string> = {
  FAKE: "합성 흔적 발견",
  SUSPICIOUS: "합성 의심",
  REAL: "합성 흔적 없음",
};

const VERDICT_CAPTION: Record<DeepfakeVerdict, string> = {
  FAKE: "얼굴 영역에서 합성 흔적이 감지되었습니다.",
  SUSPICIOUS: "합성 여부가 의심되는 부분이 있습니다.",
  REAL: "얼굴 영역에서 합성 흔적이 발견되지 않았습니다.",
};

// 백엔드가 evidence.type을 enum 코드(영문 대문자 스네이크 케이스)로 내려줘서 한글 라벨로 변환.
// 목록에 없는 새 코드가 오면 formatEvidenceType의 fallback으로 대체 표시.
const EVIDENCE_TYPE_LABEL: Record<string, string> = {
  BLINK_PATTERN_ANOMALY: "눈 깜빡임 패턴",
  COMPRESSION_ARTIFACT: "압축 아티팩트",
  FACE_BOUNDARY: "얼굴 경계",
  LIGHTING_INCONSISTENCY: "조명 일관성",
  SKIN_TEXTURE: "피부 질감",
  MOUTH_SYNC: "입 주변 움직임",
};

function formatEvidenceType(type: string): string {
  if (EVIDENCE_TYPE_LABEL[type]) return EVIDENCE_TYPE_LABEL[type];
  return type
    .toLowerCase()
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function mapDetection(data: DeepfakeDetectionResponse): DetectResult {
  const verdict = data.verdict ?? "SUSPICIOUS";
  const confidencePercent = Math.round((data.confidence ?? 0) * 100);
  const overallScore = data.riskScore ?? confidencePercent;
  const evidenceHighlights =
    data.evidences && data.evidences.length > 0
      ? data.evidences.map((evidence, index) => ({
          tab: evidence.type ? formatEvidenceType(evidence.type) : `근거 ${index + 1}`,
          description: evidence.description || "세부 설명이 제공되지 않았습니다.",
        }))
      : [{ tab: "분석 결과", description: "탐지된 세부 근거가 없습니다." }];

  return {
    ...MOCK_RESULT,
    deepfakeVerdict: VERDICT_LABEL[verdict],
    deepfakeProbability: confidencePercent,
    deepfakeCaption: VERDICT_CAPTION[verdict],
    overallScore,
    overallCaption: VERDICT_CAPTION[verdict],
    modelConfidence: confidencePercent,
    modelConfidenceNote: data.fallbackUsed
      ? "⚠️ AI 모델 응답에 실패해 실제 이미지 분석이 아닌 참고용 추정치가 표시되고 있습니다."
      : "AI 모델이 이미지를 분석한 결과입니다.",
    evidenceHighlights,
    faceTheftVerdict: "준비 중",
    faceTheftScore: 0,
    faceTheftCaption: "얼굴 도용 웹 검색 탐지는 아직 준비 중인 기능입니다.",
    webMatchCount: 0,
  };
}

export default function DetectPage() {
  const [status, setStatus] = useState<DetectStatus>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<DetectResult>(MOCK_RESULT);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFileSelect(file: File) {
    setPreviewUrl(URL.createObjectURL(file));
    setSelectedFile(file);
    setStatus("selected");
  }

  function handleReset() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setSelectedFile(null);
    setStatus("idle");
  }

  const detectMutation = useMutation({
    mutationFn: async () => {
      if (!selectedFile) throw new Error("파일을 선택해 주세요.");
      const created = await createDeepfakeDetection(selectedFile);
      return pollUntil(
        () => getDeepfakeDetection(created.detectionId),
        (detection) => detection.status !== "PROCESSING",
      );
    },
    onSuccess: (data) => {
      if (data.status === "FAILED") {
        setStatus("selected");
        toast.error("탐지에 실패했습니다. 다시 시도해 주세요.");
        return;
      }
      setResult(mapDetection(data));
      setStatus("result");
    },
    onError: (error) => {
      setStatus("selected");
      toast.error("탐지에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  function handleDetect() {
    setStatus("analyzing");
    detectMutation.mutate();
  }

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-10 pb-[120px]">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col items-end gap-6">
          <div className="flex w-full flex-col items-start gap-12">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Link href="/" className="text-body-1 text-gray-800">
                  홈
                </Link>
                <span className="text-gray-800 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                  <Arrow />
                </span>
                <span className="text-body-1 text-primary-500">얼굴 도용·딥페이크 탐지</span>
              </div>
              <div className="flex flex-col gap-6">
                <h1 className="text-h1 font-bold text-black">얼굴 도용·딥페이크 탐지</h1>
                <p className="text-body-1 text-gray-800">
                  사진 또는 영상을 업로드하여 얼굴 도용 여부와 딥페이크 합성 여부를 확인할 수
                  있습니다.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col items-stretch gap-6 lg:flex-row lg:gap-10">
              <DetectUploadCard
                status={status}
                previewUrl={previewUrl}
                onFileSelect={handleFileSelect}
                onReset={handleReset}
              />
              <AnalysisGuideCard />
            </div>
          </div>

          {status !== "result" && (
            <Button
              type="button"
              variant="primary"
              className="w-[253px]"
              disabled={status !== "selected"}
              onClick={handleDetect}
            >
              탐지 시작
            </Button>
          )}

          {status === "result" && <DetectResultSection result={result} previewUrl={previewUrl} />}
        </div>
      </main>
      <Footer />
    </>
  );
}
