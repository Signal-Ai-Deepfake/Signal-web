"use client";

import Link from "next/link";
import Button, { buttonStyle } from "@/shared/ui/Button";
import DraftCardHeader from "./DraftCardHeader";
import StepNavigation from "./StepNavigation";
import type { ReportEvidence } from "./Step2Details";
import {
  REQUEST_TEXT,
  evidenceText,
  formatDraftDate,
  overviewText,
  type ReportDraft,
} from "./reportDraft";

interface Step4GeneratedProps {
  draft: ReportDraft;
  evidence: ReportEvidence | null;
  reportId: number;
  onBack: () => void;
  onFindAgency: () => void;
}

function toHref(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function Step4Generated({
  draft,
  evidence,
  reportId,
  onBack,
  onFindAgency,
}: Step4GeneratedProps) {
  const sourceUrl = draft.sourceUrl.trim();
  const rows: { title: string; body: string }[] = [
    { title: "피해 개요", body: overviewText(draft.damageType) },
    { title: "피해 발생 시점", body: formatDraftDate(draft.incidentDate) },
    { title: "피해 유형", body: draft.damageType.trim() || "미입력" },
    { title: "피해 경로", body: draft.discoveryRoute.trim() || "미입력" },
    { title: "원본 URL", body: sourceUrl || "미입력" },
    { title: "피해 내용", body: draft.description.trim() || "미입력" },
    ...(draft.additionalNotes.trim()
      ? [{ title: "추가 전달 사항", body: draft.additionalNotes.trim() }]
      : []),
    { title: "증거 목록", body: evidenceText(evidence) },
    { title: "요청 사항", body: REQUEST_TEXT },
  ];

  return (
    <div className="flex w-full flex-col gap-6 md:gap-8">
      <div className="flex w-full flex-col gap-5 rounded-2xl border border-gray-300 p-5 md:gap-6 md:p-8">
        <DraftCardHeader
          title="신고 문서가 준비되었어요"
          description="내 신고 문서에서 내용을 확정하면 기관 제출용 문서로 보관됩니다."
          status="문서 생성 완료"
        />

        <div className="flex flex-col gap-2">
          <p className="text-body-2 md:text-body-1 px-1 text-black">신고 내용</p>
          <div className="w-full divide-y divide-gray-200 overflow-y-auto rounded-lg border border-gray-300 md:max-h-[427px]">
            {rows.map((row) => (
              <div key={row.title} className="flex flex-col gap-1 p-3 md:gap-1.5 md:p-4">
                <p className="text-body-2 md:text-body-1 font-semibold text-black">{row.title}</p>
                {row.title === "원본 URL" && sourceUrl ? (
                  <a
                    href={toHref(sourceUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-body-2 md:text-body-1 text-secondary-600 w-full break-all underline"
                  >
                    {sourceUrl}
                  </a>
                ) : (
                  <p className="text-body-2 md:text-body-1 w-full break-words whitespace-pre-wrap text-black">
                    {row.body}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <StepNavigation onBack={onBack}>
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <Link
            href={`/mypage/reports/${reportId}`}
            className={buttonStyle("outline", "w-full md:w-auto")}
          >
            내 신고 문서에서 확정하기
          </Link>
          <Button
            type="button"
            variant="primary"
            className="w-full md:w-auto"
            onClick={onFindAgency}
          >
            적합한 신고 기관 확인하기
          </Button>
        </div>
      </StepNavigation>
    </div>
  );
}
