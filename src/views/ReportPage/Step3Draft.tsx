"use client";

import type { ReactNode } from "react";
import Button from "@/shared/ui/Button";
import DraftCardHeader from "./DraftCardHeader";
import StepNavigation from "./StepNavigation";
import type { ReportEvidence } from "./Step2Details";
import type { ReportDraft } from "./reportDraft";
import { useT } from "@/shared/i18n/I18nProvider";
import { reportMessages } from "./messages";

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
  const { draft: d } = useT(reportMessages);
  const t = useT(reportMessages);
  function update(field: keyof ReportDraft, value: string) {
    onChange({ ...draft, [field]: value });
  }

  return (
    <div className="flex w-full flex-col gap-6 md:gap-8">
      <div className="flex w-full flex-col gap-5 rounded-2xl border border-gray-300 p-5 md:gap-6 md:p-8">
        <DraftCardHeader
          title={d.reviewTitle}
          description={d.reviewDescription}
          status={d.written}
        />

        <div className="flex flex-col gap-2">
          <p className="text-body-2 md:text-body-1 px-1 text-black">{d.content}</p>
          <div className="w-full divide-y divide-gray-200 overflow-y-auto rounded-lg border border-gray-300 md:max-h-[427px]">
            <DraftRow title={d.overview}>
              <FixedText>{d.overviewText(draft.damageType.trim())}</FixedText>
            </DraftRow>
            <DraftRow title={d.incidentDate}>
              <input
                type="date"
                aria-label={d.incidentDate}
                value={draft.incidentDate}
                onChange={(event) => update("incidentDate", event.target.value)}
                className={fieldClass}
              />
            </DraftRow>
            <DraftRow title={d.damageType}>
              <input
                type="text"
                aria-label={d.damageType}
                value={draft.damageType}
                onChange={(event) => update("damageType", event.target.value)}
                className={fieldClass}
              />
            </DraftRow>
            <DraftRow title={d.route}>
              <input
                type="text"
                aria-label={d.route}
                placeholder={d.empty}
                value={draft.discoveryRoute}
                onChange={(event) => update("discoveryRoute", event.target.value)}
                className={`${fieldClass} placeholder:text-gray-600`}
              />
            </DraftRow>
            <DraftRow title={d.url}>
              <input
                type="url"
                aria-label={d.url}
                placeholder={d.empty}
                value={draft.sourceUrl}
                onChange={(event) => update("sourceUrl", event.target.value)}
                className={`${fieldClass} placeholder:text-gray-600`}
              />
            </DraftRow>
            <DraftRow title={d.description}>
              <textarea
                aria-label={d.description}
                value={draft.description}
                onChange={(event) => update("description", event.target.value)}
                rows={6}
                className={`${fieldClass} resize-none whitespace-pre-wrap`}
              />
            </DraftRow>
            <DraftRow title={d.notes}>
              <textarea
                aria-label={d.notes}
                placeholder={d.notesPlaceholder}
                value={draft.additionalNotes}
                onChange={(event) => update("additionalNotes", event.target.value)}
                rows={3}
                className={`${fieldClass} resize-none whitespace-pre-wrap placeholder:text-gray-600`}
              />
            </DraftRow>
            <DraftRow title={d.evidence}>
              <FixedText>{evidence?.name ?? d.noEvidence}</FixedText>
            </DraftRow>
            <DraftRow title={d.request}>
              <FixedText>{d.requestText}</FixedText>
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
          {submitting ? t.saving : submitLabel}
        </Button>
      </StepNavigation>
    </div>
  );
}
