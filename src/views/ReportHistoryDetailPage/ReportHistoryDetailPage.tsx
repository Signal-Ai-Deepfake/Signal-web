"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  deleteReport,
  finalizeReport,
  getReport,
  updateReport,
  type ReportResponse,
  type UpdateReportRequest,
} from "@/entities/report/api";
import Button from "@/shared/ui/Button";
import ConfirmModal from "@/shared/ui/ConfirmModal";
import NoticeBanner from "@/shared/ui/NoticeBanner";
import PageHeading from "@/shared/ui/PageHeading";
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
  additionalNotes: string;
}

function formatDateLong(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function ReportContentView({ report }: { report: ReportResponse }) {
  const sourceUrl = report.sourceUrls?.[0];
  return (
    <div className="text-small md:text-body-1 text-gray-650 flex flex-col gap-4 break-words md:gap-6">
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
            className="text-secondary-600 break-all underline"
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
      {report.additionalNotes && (
        <p className="whitespace-pre-wrap">
          추가 전달 사항
          <br />
          {report.additionalNotes}
        </p>
      )}
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
  const [finalizeModalOpen, setFinalizeModalOpen] = useState(false);

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

  const finalizeMutation = useMutation({
    mutationFn: () => finalizeReport(reportId),
    onSuccess: (result) => {
      queryClient.setQueryData(
        ["reports", reportId],
        report ? { ...report, status: result.status, documentUrl: result.documentUrl } : report,
      );
      setFinalizeModalOpen(false);
      toast.success("신고 문서를 확정했습니다.");
    },
    onError: (mutationError) => {
      setFinalizeModalOpen(false);
      toast.error("신고 문서 확정에 실패했습니다.", {
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
      additionalNotes: report.additionalNotes ?? "",
    });
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
  }

  function saveEditing() {
    if (!draft) return;
    const valueOrNull = (value: string) => value.trim() || null;
    updateMutation.mutate({
      incidentDate: valueOrNull(draft.incidentDate),
      damageType: valueOrNull(draft.damageType),
      discoveryRoute: valueOrNull(draft.discoveryRoute),
      sourceUrls: draft.sourceUrl.trim() ? [draft.sourceUrl.trim()] : [],
      description: valueOrNull(draft.description),
      additionalNotes: valueOrNull(draft.additionalNotes),
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
      <main className="flex w-full flex-col items-center bg-white px-5 py-6 pb-[120px] md:py-10">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-6 md:gap-8">
          <PageHeading
            title="신고 문서"
            description={
              report
                ? `${formatDateLong(report.createdAt)} 생성 · ${
                    report.status === "FINALIZED" ? "제출 완료" : "기관 제출용 초안"
                  }`
                : undefined
            }
            breadcrumbs={[
              { label: "신고 문서 내역", href: "/mypage/reports" },
              { label: "신고 문서 내역 상세" },
            ]}
            backHref="/mypage/reports"
          />

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
                  <p className="text-body-2 md:text-body-1 text-black">신고 내용</p>
                  {isEditing && draft ? (
                    <div className="flex flex-col divide-y divide-gray-200 rounded-lg border border-gray-300">
                      <div className="flex flex-col gap-1.5 p-3 md:p-4">
                        <label className="text-body-2 md:text-body-1 font-semibold text-black">
                          피해 발생 시점
                        </label>
                        <input
                          type="date"
                          value={draft.incidentDate}
                          onChange={(event) =>
                            setDraft({ ...draft, incidentDate: event.target.value })
                          }
                          className="text-body-2 md:text-body-1 focus:border-secondary-500 w-full rounded border border-gray-300 px-3 py-2 text-black outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 p-3 md:p-4">
                        <label className="text-body-2 md:text-body-1 font-semibold text-black">
                          피해 유형
                        </label>
                        <input
                          type="text"
                          value={draft.damageType}
                          onChange={(event) =>
                            setDraft({ ...draft, damageType: event.target.value })
                          }
                          className="text-body-2 md:text-body-1 focus:border-secondary-500 w-full rounded border border-gray-300 px-3 py-2 text-black outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 p-3 md:p-4">
                        <label className="text-body-2 md:text-body-1 font-semibold text-black">
                          피해 경로
                        </label>
                        <input
                          type="text"
                          value={draft.discoveryRoute}
                          onChange={(event) =>
                            setDraft({ ...draft, discoveryRoute: event.target.value })
                          }
                          className="text-body-2 md:text-body-1 focus:border-secondary-500 w-full rounded border border-gray-300 px-3 py-2 text-black outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 p-3 md:p-4">
                        <label className="text-body-2 md:text-body-1 font-semibold text-black">
                          원본 URL
                        </label>
                        <input
                          type="url"
                          value={draft.sourceUrl}
                          onChange={(event) =>
                            setDraft({ ...draft, sourceUrl: event.target.value })
                          }
                          className="text-body-2 md:text-body-1 focus:border-secondary-500 w-full rounded border border-gray-300 px-3 py-2 text-black outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 p-3 md:p-4">
                        <label className="text-body-2 md:text-body-1 font-semibold text-black">
                          피해 내용
                        </label>
                        <textarea
                          value={draft.description}
                          onChange={(event) =>
                            setDraft({ ...draft, description: event.target.value })
                          }
                          rows={6}
                          className="text-body-2 md:text-body-1 focus:border-secondary-500 w-full resize-none rounded border border-gray-300 p-3 whitespace-pre-wrap text-black outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 p-3 md:p-4">
                        <label className="text-body-2 md:text-body-1 font-semibold text-black">
                          추가 전달 사항
                        </label>
                        <textarea
                          value={draft.additionalNotes}
                          onChange={(event) =>
                            setDraft({ ...draft, additionalNotes: event.target.value })
                          }
                          rows={3}
                          className="text-body-2 md:text-body-1 focus:border-secondary-500 w-full resize-none rounded border border-gray-300 p-3 whitespace-pre-wrap text-black outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full overflow-y-auto rounded-lg border border-gray-300 bg-gray-100 p-4 md:h-[427px] md:p-[17px]">
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
                      {report.status === "DRAFT" && (
                        <button
                          type="button"
                          onClick={() => setFinalizeModalOpen(true)}
                          disabled={finalizeMutation.isPending}
                          className="border-primary-500 text-primary-500 text-body-2 active:bg-primary-50 flex h-12 items-center justify-center rounded border px-6 transition-colors disabled:opacity-50"
                        >
                          {finalizeMutation.isPending ? "확정하는 중..." : "신고 문서 확정하기"}
                        </button>
                      )}
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
      <ConfirmModal
        open={finalizeModalOpen}
        title="신고 문서를 확정할까요?"
        description="확정하면 더 이상 초안 수정 이력이 아닌 제출용 문서로 표시됩니다."
        confirmLabel="확정"
        cancelLabel="취소"
        onConfirm={() => finalizeMutation.mutate()}
        onCancel={() => setFinalizeModalOpen(false)}
      />
    </>
  );
}
