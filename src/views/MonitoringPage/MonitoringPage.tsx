"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { toast } from "sonner";
import { createMonitoring } from "@/entities/monitoring/api";
import Arrow from "@/shared/asset/svg/Arrow";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import { getStoredMonitoringId, setStoredMonitoringId } from "@/shared/lib/monitoringId";
import Button from "@/shared/ui/Button";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";

export default function MonitoringPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [monitoringId, setMonitoringId] = useState<number | null>(() => getStoredMonitoringId());

  const createMutation = useMutation({
    mutationFn: (file: File) => createMonitoring(file),
    onSuccess: (data) => {
      setStoredMonitoringId(data.monitoringId);
      setMonitoringId(data.monitoringId);
      toast.success("유포 모니터링을 시작했습니다.");
    },
    onError: (error) => {
      toast.error("모니터링을 시작하지 못했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  function handleFile(file: File) {
    if (createMutation.isPending) return;
    createMutation.mutate(file);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
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
    if (file) handleFile(file);
  }

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-10 pb-[120px]">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-body-1 text-gray-700">
                홈
              </Link>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <span className="text-body-1 text-primary-500">유포 모니터링</span>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-h1 font-bold text-black">유포 모니터링</h1>
              <p className="text-body-1 text-gray-700">
                기준이 되는 이미지를 업로드하면, 웹에서 유사한 이미지가 발견될 때마다 확인할 수
                있습니다.
              </p>
            </div>
          </div>

          {monitoringId === null ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex w-full flex-col items-center gap-6 rounded-2xl border-2 border-dashed px-3 py-16 transition-colors ${
                isDragging ? "border-primary-500 bg-primary-50" : "border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-black [&>svg]:h-12 [&>svg]:w-12">
                  <ImageArrowUp />
                </span>
                <p className="text-body-1 font-semibold text-black">기준 이미지 업로드</p>
                <p className="text-body-2 text-gray-650">JPG, PNG 파일 지원</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="primary"
                className="w-[171px]"
                disabled={createMutation.isPending}
                onClick={() => fileInputRef.current?.click()}
              >
                {createMutation.isPending ? "시작하는 중..." : "모니터링 시작"}
              </Button>
            </div>
          ) : (
            <div className="bg-primary-50 flex flex-col gap-1 rounded-2xl p-6">
              <p className="text-small text-gray-700">현재 상태</p>
              <p className="text-h3 font-semibold text-black">모니터링 중</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
