"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createRiskAssessment } from "@/entities/analysis/api";
import { mapAssessment, type AnalysisResult } from "@/entities/analysis/model";
import { getAccessToken } from "@/shared/lib/authToken";
import { pollUntil } from "@/shared/lib/poll";
import { createProtection, downloadProtection, getProtection } from "./analyzeApi";

export type Status = "idle" | "selected" | "analyzing" | "error" | "result";

// 비로그인 사용자에게 그대로 보여주기엔 부적절한 서버 메시지 (내부 용어, 인증 오류).
function isInternalMessage(message?: string) {
  return !message || message.includes("X-Anonymous-Id") || message === "인증이 필요합니다.";
}

export function useAnalyzeFlow() {
  const router = useRouter();
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

  // 비로그인 상태에서는 로그인 안내와 로그인 버튼을 함께 보여준다.
  function showError(title: string, error: unknown, guestFallback: string) {
    const message = error instanceof Error ? error.message : undefined;
    if (getAccessToken()) {
      toast.error(title, { description: message });
      return;
    }
    toast.error(title, {
      description: isInternalMessage(message) ? guestFallback : message,
      action: { label: "로그인", onClick: () => router.push("/login") },
    });
  }

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
      showError("분석에 실패했습니다.", error, "로그인 후 다시 시도해 주세요.");
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
      showError(
        "이미지 보호 처리에 실패했습니다.",
        error,
        "보호 처리는 로그인 후 이용할 수 있어요.",
      );
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
      showError("보호본 저장에 실패했습니다.", error, "보호본 저장은 로그인 후 이용할 수 있어요.");
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

  return {
    status,
    previewUrl,
    showDetails,
    isProtected,
    result,
    toggleDetails: () => setShowDetails((prev) => !prev),
    handleFileSelect,
    handleReset,
    handleAnalyze,
    handleProtect,
    handleShare,
    handleSaveProtected,
  };
}
