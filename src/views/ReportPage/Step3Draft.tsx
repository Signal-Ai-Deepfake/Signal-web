"use client";

import { useMemo, useState } from "react";
import Button from "@/shared/ui/Button";
import DraftCardHeader from "./DraftCardHeader";
import StepNavigation from "./StepNavigation";
import type { DamageType } from "./Step1TypeSelect";
import type { ReportDetails, ReportEvidence } from "./Step2Details";

interface Step3DraftProps {
  damageType: DamageType;
  details: ReportDetails;
  evidence: ReportEvidence | null;
  onBack: () => void;
  onSubmit: (sections: DraftSection[]) => void;
  submitting?: boolean;
}

function formatDate(value: string) {
  if (!value) return "미입력";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export interface DraftSection {
  title: string;
  body: string;
}

const shortFieldTitles = new Set([
  "피해 발생 시점",
  "피해 유형",
  "피해 경로",
  "원본 URL",
  "증거 목록",
]);

const rowsByTitle: Record<string, number> = {
  "피해 개요": 2,
  "피해 내용": 6,
  "추가 전달 사항": 3,
  "요청 사항": 2,
};

function buildDraftSections(
  damageType: DamageType,
  details: ReportDetails,
  evidence: ReportEvidence | null,
): DraftSection[] {
  const sections: DraftSection[] = [
    { title: "피해 개요", body: `${damageType} 피해가 발생한 것으로 보여 신고합니다.` },
    { title: "피해 발생 시점", body: formatDate(details.incidentDate) },
    { title: "피해 유형", body: damageType },
    { title: "피해 경로", body: details.platform || "미입력" },
    { title: "원본 URL", body: details.url || "미입력" },
    { title: "피해 내용", body: details.description || "미입력" },
  ];
  if (details.additionalNotes.trim()) {
    sections.push({ title: "추가 전달 사항", body: details.additionalNotes });
  }
  sections.push({ title: "증거 목록", body: evidence?.name ?? "첨부된 자료 없음" });
  sections.push({
    title: "요청 사항",
    body: "해당 게시물의 삭제, 추가 확산 방지 및 필요한 조치를 요청합니다.",
  });

  return sections;
}

export default function Step3Draft({
  damageType,
  details,
  evidence,
  onBack,
  onSubmit,
  submitting = false,
}: Step3DraftProps) {
  const initialSections = useMemo(
    () => buildDraftSections(damageType, details, evidence),
    [damageType, details, evidence],
  );
  const [sections, setSections] = useState<DraftSection[]>(initialSections);

  function updateSectionBody(index: number, body: string) {
    setSections((prev) => prev.map((section, i) => (i === index ? { ...section, body } : section)));
  }

  return (
    <div className="flex w-full flex-col gap-6 md:gap-8">
      <div className="flex w-full flex-col gap-5 rounded-2xl border border-gray-300 p-5 md:gap-6 md:p-8">
        <DraftCardHeader
          title="신고 문서 초안을 확인해 주세요"
          description="아래 내용은 자유롭게 수정할 수 있습니다."
          status="작성 완료"
        />

        <div className="flex flex-col gap-2">
          <label className="text-body-2 md:text-body-1 px-1 text-black">신고 내용</label>
          <div className="w-full divide-y divide-gray-200 overflow-y-auto rounded-lg border border-gray-300 md:max-h-[427px]">
            {sections.map((section, index) => (
              <div key={section.title} className="flex flex-col gap-1 p-3 md:gap-1.5 md:p-4">
                <p className="text-body-2 md:text-body-1 font-semibold text-black">
                  {section.title}
                </p>
                {shortFieldTitles.has(section.title) ? (
                  <input
                    type="text"
                    value={section.body}
                    onChange={(event) => updateSectionBody(index, event.target.value)}
                    className="text-body-2 md:text-body-1 focus:border-secondary-500 w-full rounded border border-transparent px-1 py-1 text-black outline-none focus:border-b"
                  />
                ) : (
                  <textarea
                    value={section.body}
                    onChange={(event) => updateSectionBody(index, event.target.value)}
                    rows={rowsByTitle[section.title] ?? 3}
                    className="text-body-2 md:text-body-1 focus:border-secondary-500 w-full resize-none rounded border border-transparent px-1 py-1 whitespace-pre-wrap text-black outline-none focus:border-b"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <StepNavigation onBack={onBack}>
        <Button
          type="button"
          variant="primary"
          className="w-full md:w-auto"
          disabled={submitting}
          onClick={() => onSubmit(sections)}
        >
          {submitting ? "생성 중..." : "신고 문서 생성하기"}
        </Button>
      </StepNavigation>
    </div>
  );
}
