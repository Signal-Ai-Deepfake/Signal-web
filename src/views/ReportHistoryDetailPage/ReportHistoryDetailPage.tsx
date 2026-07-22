"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  deleteReport,
  getReport,
  updateReport,
  type ReportResponse,
  type UpdateReportRequest,
} from "@/entities/report/api";
import Arrow from "@/shared/asset/svg/Arrow";
import Button from "@/shared/ui/Button";
import ConfirmModal from "@/shared/ui/ConfirmModal";
import NoticeBanner from "@/shared/ui/NoticeBanner";
import { resolveFileUrl } from "@/shared/lib/resolveFileUrl";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";

interface ReportHistoryDetailPageProps {
  id: string;
}

interface EditableFields {
  incidentDate: string;
  damageType: string;
  discoveryRoute: string;
  sourceUrl: string;
  description: string;
}

function formatDateLong(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function ReportContentView({ report }: { report: ReportResponse }) {
  const sourceUrl = report.sourceUrls?.[0];
  return (
    <div className="text-body-1 text-gray-650 flex flex-col gap-6">
      <p>
        피해 개요
        <br />
        {report.damageType ?? "신고"} 피해가 발생한 것으로 보여 신고합니다.
      </p>
      <p>
        피해 발생 시점
        <br />
        {report.incidentDate ? formatDateLong(report.incidentDate) : "미입력"}
      </p>
      <p>
        피해 유형
        <br />
        {report.damageType || "미입력"}
      </p>
      <p>
        피해 경로
        <br />
        {report.discoveryRoute || "미입력"}
      </p>
      <p>
        원본 URL
        <br />
        {sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-secondary-600 underline"
          >
            {sourceUrl}
          </a>
        ) : (
          "미입력"
        )}
      </p>
      <p className="whitespace-pre-wrap">
        피해 내용
        <br />
        {report.description || "미입력"}
      </p>
      <p>
        증거 자료
        <br />
        {report.evidenceIds && report.evidenceIds.length > 0
          ? `첨부 파일 ${report.evidenceIds.length}건`
          : "첨부된 자료 없음"}
      </p>
      <p>
        요청 사항
        <br />
        해당 게시물의 삭제, 추가 확산 방지 및 필요한 조치를 요청합니다.
      </p>
    </div>
  );
}

export default function ReportHistoryDetailPage({ id }: ReportHistoryDetailPageProps) {
  const reportId = Number(id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<EditableFields | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const {
    data: report,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["reports", reportId],
    queryFn: () => getReport(reportId),
    enabled: Number.isFinite(reportId),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateReportRequest) => updateReport(reportId, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(["reports", reportId], updated);
      setIsEditing(false);
      toast.success("변경사항이 저장되었습니다.");
    },
    onError: (mutationError) => {
      toast.error("변경사항 저장에 실패했습니다.", {
        description: mutationError instanceof Error ? mutationError.message : undefined,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteReport(reportId),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["reports", reportId] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      setDeleteModalOpen(false);
      toast.success("신고 문서를 삭제했습니다.");
      router.push("/mypage/reports");
    },
    onError: (mutationError) => {
      setDeleteModalOpen(false);
      toast.error("신고 문서 삭제에 실패했습니다.", {
        description: mutationError instanceof Error ? mutationError.message : undefined,
      });
    },
  });

  if (!Number.isFinite(reportId)) {
    return (
      <>
        <SiteHeader />
        <main className="flex w-full flex-col items-center bg-white px-5 py-20">
          <p className="text-body-1 text-gray-700">잘못된 신고 문서 주소입니다.</p>
        </main>
        <Footer />
      </>
    );
  }

  function startEditing() {
    if (!report) return;
    setDraft({
      incidentDate: report.incidentDate ?? "",
      damageType: report.damageType ?? "",
      discoveryRoute: report.discoveryRoute ?? "",
      sourceUrl: report.sourceUrls?.[0] ?? "",
      description: report.description ?? "",
    });
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
  }

  function saveEditing() {
    if (!draft) return;
    updateMutation.mutate({
      incidentDate: draft.incidentDate || undefined,
      damageType: draft.damageType || undefined,
      discoveryRoute: draft.discoveryRoute || undefined,
      sourceUrls: draft.sourceUrl ? [draft.sourceUrl] : undefined,
      description: draft.description || undefined,
    });
  }

  function handleDelete() {
    setDeleteModalOpen(true);
  }

  function handleFindAgency() {
    router.push("/support-referral");
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
              {report && (
                <p className="text-body-1 text-gray-700">
                  {formatDateLong(report.createdAt)} 생성 ·{" "}
                  {report.status === "FINALIZED" ? "제출 완료" : "기관 제출용 초안"}
                </p>
              )}
            </div>
          </div>

          {isPending && <p className="text-body-1 text-gray-700">불러오는 중...</p>}

          {isError && (
            <p className="text-body-1 text-red-500">
              신고 문서를 불러오지 못했습니다.
              {error instanceof Error ? ` (${error.message})` : ""}
            </p>
          )}

          {report && (
            <>
              <div className="flex w-full flex-col items-center gap-6 rounded-2xl border border-gray-300 p-5 sm:p-8">
                <div className="flex w-full max-w-[960px] flex-col gap-1">
                  <p className="text-h3 font-semibold text-black">신고 문서 내용을 확인해 주세요</p>
                  {isEditing && (
                    <p className="text-body-2 text-gray-700">
                      아래 내용은 자유롭게 수정할 수 있습니다.
                    </p>
                  )}
                </div>

                <NoticeBanner className="w-full max-w-[960px]">
                  AI가 입력 내용을 정리한 문서입니다. 실제 제출 전 날짜, URL, 피해 내용을 한 번 더
                  확인해 주세요.
                </NoticeBanner>

                {report.documentUrl && (
                  <a
                    href={resolveFileUrl(report.documentUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-secondary-600 text-body-2 w-full max-w-[960px] underline"
                  >
                    생성된 신고 문서 파일 보기
                  </a>
                )}

                <div className="flex w-full max-w-[960px] flex-col gap-2">
                  <p className="text-body-1 text-black">신고 내용</p>
                  {isEditing && draft ? (
                    <div className="flex flex-col divide-y divide-gray-200 rounded-lg border border-gray-300">
                      <div className="flex flex-col gap-1.5 p-4">
                        <label className="text-body-1 font-semibold text-black">
                          피해 발생 시점
                        </label>
                        <input
                          type="date"
                          value={draft.incidentDate}
                          onChange={(event) =>
                            setDraft({ ...draft, incidentDate: event.target.value })
                          }
                          className="text-body-1 focus:border-secondary-500 w-full rounded border border-gray-300 px-3 py-2 text-black outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 p-4">
                        <label className="text-body-1 font-semibold text-black">피해 유형</label>
                        <input
                          type="text"
                          value={draft.damageType}
                          onChange={(event) =>
                            setDraft({ ...draft, damageType: event.target.value })
                          }
                          className="text-body-1 focus:border-secondary-500 w-full rounded border border-gray-300 px-3 py-2 text-black outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 p-4">
                        <label className="text-body-1 font-semibold text-black">피해 경로</label>
                        <input
                          type="text"
                          value={draft.discoveryRoute}
                          onChange={(event) =>
                            setDraft({ ...draft, discoveryRoute: event.target.value })
                          }
                          className="text-body-1 focus:border-secondary-500 w-full rounded border border-gray-300 px-3 py-2 text-black outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 p-4">
                        <label className="text-body-1 font-semibold text-black">원본 URL</label>
                        <input
                          type="url"
                          value={draft.sourceUrl}
                          onChange={(event) =>
                            setDraft({ ...draft, sourceUrl: event.target.value })
                          }
                          className="text-body-1 focus:border-secondary-500 w-full rounded border border-gray-300 px-3 py-2 text-black outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 p-4">
                        <label className="text-body-1 font-semibold text-black">피해 내용</label>
                        <textarea
                          value={draft.description}
                          onChange={(event) =>
                            setDraft({ ...draft, description: event.target.value })
                          }
                          rows={6}
                          className="text-body-1 focus:border-secondary-500 w-full resize-none rounded border border-gray-300 p-3 whitespace-pre-wrap text-black outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="h-[427px] w-full overflow-y-auto rounded-lg border border-gray-300 bg-gray-100 p-[17px]">
                      <ReportContentView report={report} />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-end sm:justify-between">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="cursor-pointer self-start text-[15px] leading-6 text-red-500 underline disabled:opacity-50"
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
                        disabled={updateMutation.isPending}
                        onClick={saveEditing}
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
                      <Button type="button" variant="primary" onClick={handleFindAgency}>
                        적합한 신고 기관 확인하기
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
      <ConfirmModal
        open={deleteModalOpen}
        title="신고 문서를 삭제할까요?"
        description="삭제한 신고 문서는 복구할 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={() => deleteMutation.mutate()}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  );
}
