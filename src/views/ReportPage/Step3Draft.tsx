"use client";

import { useMemo, useState } from "react";
import BotOutline from "@/shared/asset/svg/BotOutline";
import Button from "@/shared/ui/Button";
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
    <div className="flex w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-6 rounded-2xl border border-gray-300 p-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <span className="bg-primary-50 text-primary-500 text-caption w-fit rounded-full px-3 py-1">
              기관 제출용 초안
            </span>
            <p className="text-h3 font-semibold text-black">신고 문서 초안을 확인해 주세요</p>
            <p className="text-body-2 text-gray-800">아래 내용은 자유롭게 수정할 수 있습니다.</p>
          </div>
          <p className="text-caption text-primary-500 shrink-0">✓ 작성 완료</p>
        </div>

        <div className="bg-secondary-50 border-secondary-200 flex items-center gap-2 rounded-lg border p-4">
          <span className="text-secondary-600 shrink-0 [&>svg]:h-8 [&>svg]:w-8">
            <BotOutline />
          </span>
          <p className="text-body-2 text-secondary-600 font-medium">
            AI가 입력 내용을 정리한 문서입니다. 실제 제출 전 날짜, URL, 피해 내용을 한 번 더 확인해
            주세요.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-body-1 px-1 text-black">신고 내용</label>
          <div className="max-h-[427px] w-full divide-y divide-gray-200 overflow-y-auto rounded-lg border border-gray-300">
            {sections.map((section, index) => (
              <div key={section.title} className="flex flex-col gap-1.5 p-4">
                <p className="text-body-1 font-semibold text-black">{section.title}</p>
                {shortFieldTitles.has(section.title) ? (
                  <input
                    type="text"
                    value={section.body}
                    onChange={(event) => updateSectionBody(index, event.target.value)}
                    className="text-body-1 focus:border-secondary-500 w-full rounded border border-transparent px-1 py-1 text-black outline-none focus:border-b"
                  />
                ) : (
                  <textarea
                    value={section.body}
                    onChange={(event) => updateSectionBody(index, event.target.value)}
                    rows={rowsByTitle[section.title] ?? 3}
                    className="text-body-1 focus:border-secondary-500 w-full resize-none rounded border border-transparent px-1 py-1 whitespace-pre-wrap text-black outline-none focus:border-b"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full items-start justify-between">
        <button
          type="button"
          onClick={onBack}
          className="border-primary-500 text-primary-500 text-body-2 active:bg-primary-50 flex h-12 w-[124px] items-center justify-center rounded border transition-colors"
        >
          이전
        </button>
        <Button
          type="button"
          variant="primary"
          disabled={submitting}
          onClick={() => onSubmit(sections)}
        >
          {submitting ? "생성 중..." : "신고 문서 생성하기"}
        </Button>
      </div>
    </div>
  );
}
