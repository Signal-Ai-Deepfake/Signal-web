"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import ProgressRing from "@/shared/asset/svg/ProgressRing";
import Button from "@/shared/ui/Button";
import PhotoResetButton from "@/shared/ui/PhotoResetButton";
import type { DetectStatus } from "./types";

interface DetectUploadCardProps {
  status: DetectStatus;
  previewUrl: string | null;
  onFileSelect: (file: File) => void;
  onReset: () => void;
}

export default function DetectUploadCard({
  status,
  previewUrl,
  onFileSelect,
  onReset,
}: DetectUploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    onFileSelect(file);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    onFileSelect(file);
  }

  return (
    <div className="flex h-[458px] w-full flex-col gap-4 rounded-2xl border border-gray-300 p-8 lg:max-w-[640px]">
      {status !== "idle" && previewUrl ? (
        <>
          <div className="relative min-h-0 flex-1 animate-[fade-in_0.3s_ease-out] overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="" className="h-full w-full object-cover" />
            {status === "analyzing" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/90">
                <span className="text-primary-500 animate-spin [&>svg]:h-16 [&>svg]:w-16">
                  <ProgressRing />
                </span>
                <p className="text-body-1 font-semibold text-black">탐지 중...</p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <PhotoResetButton onClick={onReset} />
          </div>
        </>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex h-full animate-[fade-in_0.3s_ease-out] flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed transition-colors ${
            isDragging ? "border-primary-500 bg-primary-50" : "border-transparent"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-black [&>svg]:h-12 [&>svg]:w-12">
              <ImageArrowUp />
            </span>
            <p className="text-body-1 font-semibold text-black">사진 또는 영상 업로드</p>
            <p className="text-body-2 text-gray-650">JPG , PNG, MP4 파일 지원</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="primary"
            className="w-[151px]"
            onClick={() => fileInputRef.current?.click()}
          >
            파일 찾기
          </Button>
        </div>
      )}
    </div>
  );
}
