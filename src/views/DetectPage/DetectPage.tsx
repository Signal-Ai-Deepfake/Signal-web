"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AnalysisGuideCard from "@/shared/ui/AnalysisGuideCard";
import Button from "@/shared/ui/Button";
import PageHeading from "@/shared/ui/PageHeading";
import { animateScrollTo } from "@/shared/lib/animateScrollTo";
import { pollUntil } from "@/shared/lib/poll";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import {
  createDeepfakeDetection,
  getDeepfakeDetection,
  type DeepfakeDetectionResponse,
  type DeepfakeVerdict,
  type DetectionFailureReason,
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

const FAILURE_MESSAGE: Record<DetectionFailureReason, { title: string; description: string }> = {
  NO_FACE_DETECTED: {
    title: "사진에서 얼굴을 찾지 못했어요.",
    description: "얼굴이 정면으로 잘 보이는 사진으로 다시 시도해 주세요.",
  },
  VIDEO_NOT_SUPPORTED: {
    title: "영상 탐지는 아직 지원하지 않아요.",
    description: "영상 속 얼굴이 잘 보이는 장면을 캡처한 사진으로 시도해 주세요.",
  },
  AI_SERVER_ERROR: {
    title: "AI 분석 서버에 일시적인 문제가 있어요.",
    description: "잠시 후 다시 시도해 주세요.",
  },
  TIMEOUT: {
    title: "분석 시간이 초과되었어요.",
    description: "잠시 후 다시 시도해 주세요.",
  },
};

const RESULT_SCROLL_DURATION = 1100;
const RESULT_SCROLL_OFFSET = 24;

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
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (status !== "result" || !resultRef.current) return;

    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = Math.min(
      Math.max(
        resultRef.current.getBoundingClientRect().top + window.scrollY - RESULT_SCROLL_OFFSET,
        0,
      ),
      maxY,
    );
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: targetY, behavior: "instant" });
      return;
    }

    let frame = 0;
    const cancelScroll = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    animateScrollTo(
      targetY,
      (id) => {
        frame = id;
      },
      RESULT_SCROLL_DURATION,
    );
    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchstart", cancelScroll, { passive: true });
    return () => {
      cancelScroll();
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
    };
  }, [status]);

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
        const failure = data.failureReason ? FAILURE_MESSAGE[data.failureReason] : undefined;
        toast.error(failure?.title ?? "탐지에 실패했습니다.", {
          description: failure?.description ?? "다시 시도해 주세요.",
        });
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
      <main className="flex w-full flex-col items-center bg-white px-5 py-6 pb-[120px] md:py-10">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col items-end gap-6">
          <div className="flex w-full flex-col items-start gap-6 md:gap-12">
            <PageHeading
              title="얼굴 도용·딥페이크 탐지"
              description="사진을 업로드하여 얼굴 도용 여부와 딥페이크 합성 여부를 확인할 수 있습니다."
              breadcrumbs={[{ label: "얼굴 도용·딥페이크 탐지" }]}
            />

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
              className="w-full md:w-[253px]"
              disabled={status !== "selected"}
              onClick={handleDetect}
            >
              탐지 시작
            </Button>
          )}

          {status === "result" && (
            <div ref={resultRef} className="w-full">
              <DetectResultSection result={result} previewUrl={previewUrl} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
