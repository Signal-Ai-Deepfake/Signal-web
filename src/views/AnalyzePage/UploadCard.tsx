"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { toast } from "sonner";
import Camera from "@/shared/asset/svg/Camera";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import ImageIcon from "@/shared/asset/svg/Image";
import ProgressRing from "@/shared/asset/svg/ProgressRing";
import Button from "@/shared/ui/Button";
import PhotoResetButton from "@/shared/ui/PhotoResetButton";
import type { Status } from "./AnalyzePage";

interface UploadCardProps {
  status: Status;
  previewUrl: string | null;
  isProtected: boolean;
  onFileSelect: (file: File) => void;
  onReset: () => void;
}

export default function UploadCard({
  status,
  previewUrl,
  isProtected,
  onFileSelect,
  onReset,
}: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  function selectFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("사진 파일만 올릴 수 있어요.", {
        description: "JPG, PNG 형식의 사진을 선택해 주세요.",
      });
      return;
    }
    onFileSelect(file);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    selectFile(file);
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
    selectFile(file);
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl border border-gray-300 p-5 md:min-h-[458px] md:p-8 lg:max-w-[640px]">
      {status !== "idle" && previewUrl ? (
        <>
          <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-gray-100 md:flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="" className="max-h-[70vh] w-auto max-w-full object-contain" />
            {status === "analyzing" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/90">
                <span className="text-primary-500 animate-spin [&>svg]:h-16 [&>svg]:w-16">
                  <ProgressRing />
                </span>
                <p className="text-body-1 font-semibold text-black">분석 중...</p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <PhotoResetButton onClick={onReset} disabled={status === "analyzing"} />
            <span className="text-primary-400 text-small">{isProtected ? "보호됨" : "원본"}</span>
          </div>
        </>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed transition-colors md:flex-1 ${
            isDragging ? "border-primary-500 bg-primary-50" : "border-transparent"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="bg-secondary-50/50 border-secondary-400 flex w-full flex-col items-center gap-4 rounded-3xl border-2 border-dashed px-6 py-7 md:hidden">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="갤러리에서 사진 선택"
                className="flex size-16 items-center justify-center rounded-2xl bg-white text-black shadow-sm [&>svg]:h-6 [&>svg]:w-6"
              >
                <ImageIcon />
              </button>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                aria-label="카메라로 사진 촬영"
                className="flex size-16 items-center justify-center rounded-2xl bg-white text-black shadow-sm [&>svg]:h-6 [&>svg]:w-6"
              >
                <Camera />
              </button>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-body-2 font-semibold text-black">분석할 사진을 올려주세요.</p>
              <p className="text-small break-keep text-balance text-gray-800">
                갤러리에서 고르거나 바로 찍을 수 있어요.
              </p>
            </div>
          </div>

          <div className="hidden flex-col items-center gap-6 md:flex">
            <div className="flex flex-col items-center gap-2">
              <span className="text-black [&>svg]:h-12 [&>svg]:w-12">
                <ImageArrowUp />
              </span>
              <p className="text-body-1 font-semibold text-black">사진 업로드</p>
              <p className="text-body-2 text-gray-650">JPG , PNG 파일 지원</p>
            </div>
            <Button
              type="button"
              variant="primary"
              className="w-[151px]"
              onClick={() => fileInputRef.current?.click()}
            >
              파일 찾기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
