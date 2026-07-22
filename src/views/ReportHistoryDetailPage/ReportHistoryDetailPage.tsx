"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Arrow from "@/shared/asset/svg/Arrow";
import Button from "@/shared/ui/Button";
import ConfirmModal from "@/shared/ui/ConfirmModal";
import Input from "@/shared/ui/Input";
import NoticeBanner from "@/shared/ui/NoticeBanner";
import { resolveFileUrl } from "@/shared/lib/resolveFileUrl";
import {
  deleteReport,
  finalizeReport,
  getReport,
  updateReport,
  type ReportResponse,
  type UpdateReportRequest,
} from "@/entities/report/api";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";

interface ReportHistoryDetailPageProps {
  id: string;
}

interface ReportDraft {
  incidentDate: string;
  discoveryRoute: string;
  damageType: string;
  description: string;
  sourceUrl: string;
}

function formatDateLong(value?: string) {
  if (!value) return "생성일 정보 없음";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function toDraft(report: ReportResponse): ReportDraft {
  return {
    incidentDate: report.incidentDate ?? "",
    discoveryRoute: report.discoveryRoute ?? "",
    damageType: report.damageType ?? "",
    description: report.description ?? "",
    sourceUrl: report.sourceUrls?.[0] ?? "",
  };
}

export default function ReportHistoryDetailPage({ id }: ReportHistoryDetailPageProps) {
  const router = useRouter();
  const reportId = Number(id);
  const queryClient = useQueryClient();
  const {
    data: report,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["report", reportId],
    queryFn: () => getReport(reportId),
    enabled: Number.isInteger(reportId),
  });

  const [draft, setDraft] = useState<ReportDraft | null>(null);
  const [syncedReport, setSyncedReport] = useState<ReportResponse | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (report && report !== syncedReport) {
    setSyncedReport(report);
    if (!isEditing) setDraft(toDraft(report));
  }

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateReportRequest) => updateReport(reportId, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["report", reportId], data);
      setDraft(toDraft(data));
      setIsEditing(false);
      toast.success("변경사항이 저장되었습니다.");
    },
    onError: (error) => {
      toast.error("변경사항 저장에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const finalizeMutation = useMutation({
    mutationFn: () => finalizeReport(reportId),
    onSuccess: (data) => {
      queryClient.setQueryData(["report", reportId], (prev: ReportResponse | undefined) =>
        prev ? { ...prev, status: data.status, documentUrl: data.documentUrl } : prev,
      );
      toast.success("신고서 제출이 확정되었습니다.");
    },
    onError: (error) => {
      toast.error("신고서 제출 확정에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteReport(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReports"] });
      toast.success("신고 문서가 삭제되었습니다.");
      router.push("/mypage/reports");
    },
    onError: (error) => {
      toast.error("신고 문서 삭제에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  if (!Number.isInteger(reportId) || isError) {
    return (
      <>
        <SiteHeader />
        <main className="flex w-full flex-col items-center bg-white px-5 py-20">
          <p className="text-body-1 text-gray-700">해당 신고 문서를 찾을 수 없습니다.</p>
        </main>
        <Footer />
      </>
    );
  }

  if (isLoading || !report || !draft) {
    return (
      <>
        <SiteHeader />
        <main className="flex w-full flex-col items-center bg-white px-5 py-20">
          <p className="text-body-1 text-gray-700">불러오는 중입니다...</p>
        </main>
        <Footer />
      </>
    );
  }

  function startEditing() {
    if (!report) return;
    setDraft(toDraft(report));
    setIsEditing(true);
  }

  function cancelEditing() {
    if (!report) return;
    setDraft(toDraft(report));
    setIsEditing(false);
  }

  function saveEditing() {
    if (!draft || updateMutation.isPending) return;
    updateMutation.mutate({
      incidentDate: draft.incidentDate || undefined,
      discoveryRoute: draft.discoveryRoute || undefined,
      damageType: draft.damageType || undefined,
      description: draft.description || undefined,
      sourceUrls: draft.sourceUrl ? [draft.sourceUrl] : undefined,
    });
  }

  function handleDelete() {
    setDeleteModalOpen(true);
  }

  function handleDeleteConfirm() {
    setDeleteModalOpen(false);
    if (deleteMutation.isPending) return;
    deleteMutation.mutate();
  }

  function handleFindAgency() {
    router.push("/support-referral");
  }

  function handleFinalize() {
    if (finalizeMutation.isPending || report?.status === "FINALIZED") return;
    finalizeMutation.mutate();
  }

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-10 pb-[120px]">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href="/" className="text-body-1 text-gray-700">
                홈
              </Link>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <Link href="/mypage/reports" className="text-body-1 text-primary-500">
                신고 문서 내역
              </Link>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <span className="text-body-1 text-primary-500">신고 문서 내역 상세</span>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-h1 font-bold text-black">신고 문서</h1>
              <p className="text-body-1 text-gray-700">
                {formatDateLong(report.createdAt)} 생성 ·{" "}
                {report.status === "FINALIZED" ? "제출 확정됨" : "작성 중"}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 rounded-2xl border border-gray-300 p-5 sm:p-8">
            <div className="flex flex-col gap-1">
              <p className="text-h3 font-semibold text-black">신고 문서 내용을 확인해 주세요</p>
              {isEditing && (
                <p className="text-body-2 text-gray-700">
                  아래 내용은 자유롭게 수정할 수 있습니다.
                </p>
              )}
            </div>

            <NoticeBanner>
              AI가 입력 내용을 정리한 문서입니다. 실제 제출 전 날짜, URL, 피해 내용을 한 번 더
              확인해 주세요.
            </NoticeBanner>

            {report.documentUrl && (
              <a
                href={resolveFileUrl(report.documentUrl)}
                target="_blank"
                rel="noreferrer"
                className="text-secondary-600 text-body-2 w-fit underline"
              >
                생성된 신고 문서 파일 보기
              </a>
            )}

            {isEditing ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="피해 발생 일시"
                    type="date"
                    value={draft.incidentDate}
                    onChange={(event) =>
                      setDraft((prev) =>
                        prev ? { ...prev, incidentDate: event.target.value } : prev,
                      )
                    }
                  />
                  <Input
                    label="피해 유형"
                    value={draft.damageType}
                    onChange={(event) =>
                      setDraft((prev) =>
                        prev ? { ...prev, damageType: event.target.value } : prev,
                      )
                    }
                  />
                  <Input
                    label="피해 경로"
                    value={draft.discoveryRoute}
                    onChange={(event) =>
                      setDraft((prev) =>
                        prev ? { ...prev, discoveryRoute: event.target.value } : prev,
                      )
                    }
                  />
                  <Input
                    label="원본 URL"
                    type="url"
                    value={draft.sourceUrl}
                    onChange={(event) =>
                      setDraft((prev) => (prev ? { ...prev, sourceUrl: event.target.value } : prev))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-body-1 px-1 text-black">피해 내용</label>
                  <textarea
                    value={draft.description}
                    onChange={(event) =>
                      setDraft((prev) =>
                        prev ? { ...prev, description: event.target.value } : prev,
                      )
                    }
                    rows={10}
                    className="text-body-1 focus:border-secondary-500 w-full resize-none rounded-lg border border-gray-300 p-[17px] whitespace-pre-wrap text-black outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-small font-semibold text-gray-800">피해 발생 일시</p>
                    <p className="text-body-1 text-black">{draft.incidentDate || "미입력"}</p>
                  </div>
                  <div>
                    <p className="text-small font-semibold text-gray-800">피해 유형</p>
                    <p className="text-body-1 text-black">{draft.damageType || "미입력"}</p>
                  </div>
                  <div>
                    <p className="text-small font-semibold text-gray-800">피해 경로</p>
                    <p className="text-body-1 text-black">{draft.discoveryRoute || "미입력"}</p>
                  </div>
                  <div>
                    <p className="text-small font-semibold text-gray-800">원본 URL</p>
                    {draft.sourceUrl ? (
                      <a
                        href={draft.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-body-1 text-secondary-600 underline"
                      >
                        {draft.sourceUrl}
                      </a>
                    ) : (
                      <p className="text-body-1 text-black">미입력</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-body-1 px-1 text-black">피해 내용</label>
                  <div className="h-[240px] w-full overflow-y-auto rounded-lg border border-gray-300 bg-gray-100 p-[17px]">
                    <p className="text-body-1 whitespace-pre-wrap text-gray-700">
                      {draft.description || "미입력"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex w-full flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-end sm:justify-between">
            <button
              type="button"
              onClick={handleDelete}
              className="cursor-pointer self-start text-[15px] leading-6 text-red-500 underline"
            >
              신고 문서 삭제
            </button>
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="border-primary-500 text-primary-500 text-body-2 active:bg-primary-50 flex h-12 items-center justify-center rounded border px-6 transition-colors"
                  >
                    취소
                  </button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={saveEditing}
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? "저장 중..." : "변경사항 저장"}
                  </Button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={startEditing}
                    className="border-primary-500 text-primary-500 text-body-2 active:bg-primary-50 flex h-12 items-center justify-center rounded border px-6 transition-colors"
                  >
                    내용수정
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalize}
                    disabled={finalizeMutation.isPending || report.status === "FINALIZED"}
                    className="border-primary-500 text-primary-500 text-body-2 active:bg-primary-50 flex h-12 items-center justify-center rounded border px-6 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {report.status === "FINALIZED"
                      ? "제출 확정됨"
                      : finalizeMutation.isPending
                        ? "제출 확정 중..."
                        : "신고서 제출 확정"}
                  </button>
                  <Button type="button" variant="primary" onClick={handleFindAgency}>
                    적합한 신고 기관 확인하기
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ConfirmModal
        open={deleteModalOpen}
        title="신고 문서를 삭제하시겠습니까?"
        description="삭제한 신고 문서는 복구할 수 없습니다."
        confirmLabel="삭제하기"
        cancelLabel="취소"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  );
}
