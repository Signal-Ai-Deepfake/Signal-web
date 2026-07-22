"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { toast } from "sonner";
import {
  createMonitoring,
  deleteMonitoring,
  getMonitoringDetections,
} from "@/entities/monitoring/api";
import Arrow from "@/shared/asset/svg/Arrow";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import ImageIcon from "@/shared/asset/svg/Image";
import {
  clearStoredMonitoringId,
  getStoredMonitoringId,
  setStoredMonitoringId,
} from "@/shared/lib/monitoringId";
import Button from "@/shared/ui/Button";
import ConfirmModal from "@/shared/ui/ConfirmModal";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";

const PAGE_SIZE = 9;

function formatDateLong(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export default function MonitoringPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [monitoringId, setMonitoringId] = useState<number | null>(() => getStoredMonitoringId());
  const [page, setPage] = useState(0);
  const [stopModalOpen, setStopModalOpen] = useState(false);

  const {
    data: detectionPage,
    isPending: isDetectionsPending,
    isError: isDetectionsError,
  } = useQuery({
    queryKey: ["monitoringDetections", monitoringId, page],
    queryFn: () => getMonitoringDetections(monitoringId as number, page, PAGE_SIZE),
    enabled: monitoringId !== null,
  });

  const createMutation = useMutation({
    mutationFn: (file: File) => createMonitoring(file),
    onSuccess: (data) => {
      setStoredMonitoringId(data.monitoringId);
      setMonitoringId(data.monitoringId);
      setPage(0);
      toast.success("유포 모니터링을 시작했습니다.");
    },
    onError: (error) => {
      toast.error("모니터링을 시작하지 못했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteMonitoring(monitoringId as number),
    onSuccess: () => {
      clearStoredMonitoringId();
      setMonitoringId(null);
      setPage(0);
      setStopModalOpen(false);
      queryClient.removeQueries({ queryKey: ["monitoringDetections"] });
      toast.success("모니터링을 중지했습니다.");
    },
    onError: (error) => {
      setStopModalOpen(false);
      toast.error("모니터링 중지에 실패했습니다.", {
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

  const detections = detectionPage?.content ?? [];
  const totalPages = detectionPage?.totalPages ?? 0;

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
            <>
              <div className="bg-primary-50 flex items-center justify-between rounded-2xl p-6">
                <div className="flex flex-col gap-1">
                  <p className="text-small text-gray-700">현재 상태</p>
                  <p className="text-h3 font-semibold text-black">모니터링 중</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStopModalOpen(true)}
                  disabled={deleteMutation.isPending}
                  className="border-primary-500 text-primary-500 text-body-2 active:bg-primary-50 flex h-12 items-center justify-center rounded border px-6 transition-colors disabled:opacity-50"
                >
                  {deleteMutation.isPending ? "중지하는 중..." : "모니터링 중지"}
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-h3 px-1 font-semibold text-black">발견된 유사 이미지</p>

                {isDetectionsPending && (
                  <p className="text-body-1 px-1 text-gray-700">불러오는 중...</p>
                )}

                {isDetectionsError && (
                  <p className="text-body-1 px-1 text-red-500">탐지 결과를 불러오지 못했습니다.</p>
                )}

                {detectionPage && detections.length === 0 && (
                  <p className="text-body-1 px-1 text-gray-700">
                    아직 발견된 유사 이미지가 없습니다.
                  </p>
                )}

                {detections.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {detections.map((detection) => (
                      <div
                        key={detection.detectionId}
                        className="flex flex-col gap-3 rounded-2xl border border-gray-300 p-4"
                      >
                        <div className="flex aspect-square size-full items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                          {detection.thumbnailUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={detection.thumbnailUrl}
                              alt=""
                              className="size-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-600 [&>svg]:h-8 [&>svg]:w-8">
                              <ImageIcon />
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          {typeof detection.similarity === "number" && (
                            <p className="text-body-1 font-semibold text-black">
                              유사도 {Math.round(detection.similarity * 100)}%
                            </p>
                          )}
                          <p className="text-small text-gray-700">
                            {formatDateLong(detection.detectedAt)}
                          </p>
                          {detection.sourceUrl && (
                            <a
                              href={detection.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-secondary-600 text-small underline"
                            >
                              원본 보기
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                      disabled={page === 0}
                      className="text-body-2 text-primary-500 disabled:cursor-not-allowed disabled:text-gray-400"
                    >
                      이전
                    </button>
                    <span className="text-body-2 text-gray-700">
                      {page + 1} / {totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
                      disabled={page >= totalPages - 1}
                      className="text-body-2 text-primary-500 disabled:cursor-not-allowed disabled:text-gray-400"
                    >
                      다음
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
      <ConfirmModal
        open={stopModalOpen}
        title="모니터링을 중지할까요?"
        description="중지하면 더 이상 유사 이미지 탐지 결과를 받아볼 수 없습니다."
        confirmLabel="중지"
        cancelLabel="취소"
        onConfirm={() => deleteMutation.mutate()}
        onCancel={() => setStopModalOpen(false)}
      />
    </>
  );
}
