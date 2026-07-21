"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import Arrow from "@/shared/asset/svg/Arrow";
import Button from "@/shared/ui/Button";
import NoticeBanner from "@/shared/ui/NoticeBanner";
import { getReportDocumentById } from "@/entities/report/model";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";

interface ReportHistoryDetailPageProps {
  id: string;
}

export default function ReportHistoryDetailPage({ id }: ReportHistoryDetailPageProps) {
  const document = getReportDocumentById(id);
  const [content, setContent] = useState(document?.content ?? "");
  const [draft, setDraft] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  if (!document) {
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

  function startEditing() {
    setDraft(content);
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
  }

  function saveEditing() {
    setContent(draft);
    setIsEditing(false);
    toast.success("변경사항이 저장되었습니다.");
  }

  function handleDelete() {
    toast.success("신고 문서 삭제 기능은 준비 중입니다.");
  }

  function handleFindAgency() {
    toast.success("적합한 신고 기관을 확인하는 기능은 준비 중입니다.");
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
                {document.createdAtLong} 생성 · 기관 제출용 초안
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

            <div className="flex flex-col gap-2">
              <label className="text-body-1 px-1 text-black">신고 내용</label>
              {isEditing ? (
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  className="text-body-1 focus:border-secondary-500 h-[427px] w-full resize-none rounded-lg border border-gray-300 p-[17px] whitespace-pre-wrap text-black outline-none"
                />
              ) : (
                <div className="h-[427px] w-full overflow-y-auto rounded-lg border border-gray-300 bg-gray-100 p-[17px]">
                  <p className="text-body-1 whitespace-pre-wrap text-gray-700">{content}</p>
                </div>
              )}
            </div>
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
                  <Button type="button" variant="primary" onClick={saveEditing}>
                    변경사항 저장
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
        </div>
      </main>
      <Footer />
    </>
  );
}
