"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { toast } from "sonner";
import { uploadReportEvidence } from "@/entities/report/api";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import Calendar from "@/shared/asset/svg/Calendar";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import ReportSectionCard from "./ReportSectionCard";
import StepNavigation from "./StepNavigation";
import { useT } from "@/shared/i18n/I18nProvider";
import { reportMessages } from "./messages";

export interface ReportEvidence {
  id: number;
  name: string;
}

function isValidUrl(value: string) {
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    return new URL(candidate).hostname.includes(".");
  } catch {
    return false;
  }
}

export interface ReportDetails {
  incidentDate: string;
  platform: string;
  url: string;
  description: string;
  additionalNotes: string;
}

interface Step2DetailsProps {
  details: ReportDetails;
  onChange: (details: ReportDetails) => void;
  evidence: ReportEvidence | null;
  onEvidenceChange: (evidence: ReportEvidence | null) => void;
  onBack: () => void;
  onNext: () => void;
}

function TextArea({
  label,
  placeholder,
  value,
  onChange,
  hint,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-body-2 md:text-body-1 px-1 text-black">{label}</label>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="text-body-2 md:text-body-1 focus:border-secondary-500 min-h-[120px] w-full resize-none rounded-lg border border-gray-300 p-3 text-black outline-none placeholder:text-gray-600 md:min-h-[140px] md:p-4"
      />
      {hint && <p className="text-caption px-1 text-gray-800">{hint}</p>}
    </div>
  );
}

export default function Step2Details({
  details,
  onChange,
  evidence,
  onEvidenceChange,
  onBack,
  onNext,
}: Step2DetailsProps) {
  const t = useT(reportMessages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  async function uploadFile(file: File) {
    setIsUploading(true);
    try {
      const result = await uploadReportEvidence(file);
      onEvidenceChange({ id: result.evidenceId, name: file.name });
    } catch (error) {
      toast.error(t.step2.uploadFailed, {
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setIsUploading(false);
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    uploadFile(file);
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
    if (!file) return;
    uploadFile(file);
  }

  const canProceed = details.description.trim().length > 0;
  const urlError =
    details.url.trim().length > 0 && !isValidUrl(details.url) ? t.step2.invalidUrl : undefined;

  return (
    <div className="flex w-full flex-col gap-6 md:gap-8">
      <ReportSectionCard step="02" title={t.step2.title} description={t.step2.description}>
        <div className="flex w-full flex-col gap-5 md:gap-6">
          <div className="flex flex-col gap-4 border-t border-gray-300 pt-5 md:pt-6">
            <p className="text-body-2 md:text-body-1 font-semibold text-black">
              {t.step2.basicInfo}
            </p>
            <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
              <Input
                label={t.step2.incidentDate}
                icon={Calendar}
                type="date"
                value={details.incidentDate}
                onChange={(event) => onChange({ ...details, incidentDate: event.target.value })}
              />
              <Input
                label={t.step2.platform}
                placeholder={t.step2.platformPlaceholder}
                value={details.platform}
                onChange={(event) => onChange({ ...details, platform: event.target.value })}
              />
            </div>
            <Input
              label={t.step2.url}
              type="url"
              placeholder={t.step2.urlPlaceholder}
              value={details.url}
              onChange={(event) => onChange({ ...details, url: event.target.value })}
              error={urlError}
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-gray-300 pt-5 md:pt-6">
            <p className="text-body-2 md:text-body-1 font-semibold text-black">{t.step2.details}</p>
            <TextArea
              label={t.step2.whatHappened}
              placeholder={t.step2.whatHappenedPlaceholder}
              value={details.description}
              onChange={(value) => onChange({ ...details, description: value })}
              hint={t.step2.whatHappenedHint}
            />
            <TextArea
              label={t.step2.extra}
              placeholder={t.step2.extraPlaceholder}
              value={details.additionalNotes}
              onChange={(value) => onChange({ ...details, additionalNotes: value })}
            />
          </div>

          <div className="flex flex-col gap-2 border-t border-gray-300 pt-5 md:pt-6">
            <p className="text-body-2 md:text-body-1 font-semibold text-black">
              {t.step2.evidence}
            </p>
            <p className="text-caption text-gray-800">{t.step2.evidenceHint}</p>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex w-full flex-col items-center gap-5 rounded-2xl border-2 border-dashed px-3 py-6 transition-colors md:gap-6 ${
                isDragging ? "border-primary-500 bg-primary-50" : "border-gray-300"
              }`}
            >
              <div className="flex w-full flex-col items-center gap-2">
                <span className="text-black [&>svg]:h-10 [&>svg]:w-10 md:[&>svg]:h-12 md:[&>svg]:w-12">
                  <ImageArrowUp />
                </span>
                <p className="text-body-2 md:text-body-1 font-semibold text-black">
                  {t.step2.upload}
                </p>
                <p className="text-small md:text-body-2 text-gray-650 max-w-full text-center break-all">
                  {isUploading ? t.step2.uploading : (evidence?.name ?? t.step2.fileTypes)}
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="primary"
                className="min-w-[151px]"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {isUploading ? t.step2.uploading : t.step2.browse}
              </Button>
            </div>
          </div>
        </div>
      </ReportSectionCard>

      <StepNavigation onBack={onBack}>
        <Button
          type="button"
          variant="primary"
          className="w-full gap-1 md:w-auto"
          disabled={!canProceed}
          onClick={onNext}
        >
          {t.step2.toDraft}
          <span className="[&>svg]:h-6 [&>svg]:w-6">
            <ArrowUp />
          </span>
        </Button>
      </StepNavigation>
    </div>
  );
}
