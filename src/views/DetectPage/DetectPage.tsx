"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import AnalysisGuideCard from "@/shared/ui/AnalysisGuideCard";
import Button from "@/shared/ui/Button";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import DetectResultSection from "./DetectResultSection";
import DetectUploadCard from "./DetectUploadCard";
import { MOCK_RESULT } from "./mockResult";
import type { DetectStatus } from "./types";

export default function DetectPage() {
  const [status, setStatus] = useState<DetectStatus>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFileSelect(file: File) {
    setPreviewUrl(URL.createObjectURL(file));
    setStatus("selected");
  }

  function handleReset() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setStatus("idle");
  }

  function handleDetect() {
    setStatus("analyzing");
    // TODO: 실제 탐지 API 연동. 지금은 목업 지연으로 결과 화면만 보여줌.
    window.setTimeout(() => setStatus("result"), 1200);
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

          {status === "result" && <DetectResultSection result={MOCK_RESULT} previewUrl={previewUrl} />}
        </div>
      </main>
      <Footer />
    </>
  );
}
