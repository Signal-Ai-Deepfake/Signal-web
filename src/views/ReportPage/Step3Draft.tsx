"use client";

import type { ReactNode } from "react";
import Button from "@/shared/ui/Button";
import DraftCardHeader from "./DraftCardHeader";
import StepNavigation from "./StepNavigation";
import type { ReportEvidence } from "./Step2Details";
import { REQUEST_TEXT, evidenceText, overviewText, type ReportDraft } from "./reportDraft";

interface Step3DraftProps {
  draft: ReportDraft;
  evidence: ReportEvidence | null;
  onChange: (draft: ReportDraft) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting?: boolean;
  submitLabel: string;
}

const fieldClass =
  "text-body-2 md:text-body-1 focus:border-secondary-500 w-full rounded border border-transparent px-1 py-1 text-black outline-none focus:border-b";

function DraftRow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 p-3 md:gap-1.5 md:p-4">
      <p className="text-body-2 md:text-body-1 font-semibold text-black">{title}</p>
      {children}
    </div>
  );
}

function FixedText({ children }: { children: ReactNode }) {
  return <p className="text-body-2 md:text-body-1 text-gray-650 px-1 py-1">{children}</p>;
}

export default function Step3Draft({
  draft,
  evidence,
  onChange,
  onBack,
  onSubmit,
  submitting = false,
  submitLabel,
}: Step3DraftProps) {
  function update(field: keyof ReportDraft, value: string) {
    onChange({ ...draft, [field]: value });
  }

  return (
    <div className="flex w-full flex-col gap-6 md:gap-8">
      <div className="flex w-full flex-col gap-5 rounded-2xl border border-gray-300 p-5 md:gap-6 md:p-8">
        <DraftCardHeader
          title="신고 문서 초안을 확인해 주세요"
          description="회색 항목은 자동으로 작성되며, 나머지 내용은 자유롭게 수정할 수 있습니다."
          status="작성 완료"
        />

        <div className="flex flex-col gap-2">
          <p className="text-body-2 md:text-body-1 px-1 text-black">신고 내용</p>
          <div className="w-full divide-y divide-gray-200 overflow-y-auto rounded-lg border border-gray-300 md:max-h-[427px]">
            <DraftRow title="피해 개요">
              <FixedText>{overviewText(draft.damageType)}</FixedText>
            </DraftRow>
            <DraftRow title="피해 발생 시점">
              <input
                type="date"
                aria-label="피해 발생 시점"
                value={draft.incidentDate}
                onChange={(event) => update("incidentDate", event.target.value)}
                className={fieldClass}
              />
            </DraftRow>
            <DraftRow title="피해 유형">
              <input
                type="text"
                aria-label="피해 유형"
                value={draft.damageType}
                onChange={(event) => update("damageType", event.target.value)}
                className={fieldClass}
              />
            </DraftRow>
            <DraftRow title="피해 경로">
              <input
                type="text"
                aria-label="피해 경로"
                placeholder="미입력"
                value={draft.discoveryRoute}
                onChange={(event) => update("discoveryRoute", event.target.value)}
                className={`${fieldClass} placeholder:text-gray-600`}
              />
            </DraftRow>
            <DraftRow title="원본 URL">
              <input
                type="url"
                aria-label="원본 URL"
                placeholder="미입력"
                value={draft.sourceUrl}
                onChange={(event) => update("sourceUrl", event.target.value)}
                className={`${fieldClass} placeholder:text-gray-600`}
              />
            </DraftRow>
            <DraftRow title="피해 내용">
              <textarea
                aria-label="피해 내용"
                value={draft.description}
                onChange={(event) => update("description", event.target.value)}
                rows={6}
                className={`${fieldClass} resize-none whitespace-pre-wrap`}
              />
            </DraftRow>
            <DraftRow title="추가 전달 사항">
              <textarea
                aria-label="추가 전달 사항"
                placeholder="추가로 전달할 내용이 있다면 적어 주세요."
                value={draft.additionalNotes}
                onChange={(event) => update("additionalNotes", event.target.value)}
                rows={3}
                className={`${fieldClass} resize-none whitespace-pre-wrap placeholder:text-gray-600`}
              />
            </DraftRow>
            <DraftRow title="증거 목록">
              <FixedText>{evidenceText(evidence)}</FixedText>
            </DraftRow>
            <DraftRow title="요청 사항">
              <FixedText>{REQUEST_TEXT}</FixedText>
            </DraftRow>
          </div>
        </div>
      </div>

      <StepNavigation onBack={onBack}>
        <Button
          type="button"
          variant="primary"
          className="w-full md:w-auto"
          disabled={submitting || !draft.description.trim()}
          onClick={onSubmit}
        >
          {submitting ? "저장 중..." : submitLabel}
        </Button>
      </StepNavigation>
    </div>
  );
}
