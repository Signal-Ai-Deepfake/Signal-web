"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import Calendar from "@/shared/asset/svg/Calendar";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import ReportSectionCard from "./ReportSectionCard";

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
  evidenceFile: File | null;
  onEvidenceChange: (file: File | null) => void;
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
      <label className="text-body-1 px-1 text-black">{label}</label>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="text-body-1 placeholder:text-gray-600 focus:border-secondary-500 min-h-[140px] w-full resize-none rounded-lg border border-gray-300 p-4 text-black outline-none"
      />
      {hint && <p className="text-caption text-gray-800 px-1">{hint}</p>}
    </div>
  );
}

export default function Step2Details({
  details,
  onChange,
  evidenceFile,
  onEvidenceChange,
  onBack,
  onNext,
}: Step2DetailsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    onEvidenceChange(file ?? null);
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
    onEvidenceChange(file);
  }

  const canProceed = details.description.trim().length > 0;
  const urlError =
    details.url.trim().length > 0 && !isValidUrl(details.url)
      ? "올바른 URL 형식으로 입력해 주세요."
      : undefined;

  return (
    <div className="flex w-full flex-col gap-8">
      <ReportSectionCard
        step="01"
        title="피해 상황을 알려주세요"
        description="확실하지 않은 내용은 비워두거나 대략적으로 적어도 괜찮습니다."
      >
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-4 border-t border-gray-300 pt-6">
            <p className="text-body-1 font-semibold text-black">기본 정보</p>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="피해 발생 일시"
                icon={Calendar}
                type="date"
                value={details.incidentDate}
                onChange={(event) => onChange({ ...details, incidentDate: event.target.value })}
              />
              <Input
                label="피해 발생 플랫폼"
                placeholder="예: 인스타그램, 유튜브, 카카오톡"
                value={details.platform}
                onChange={(event) => onChange({ ...details, platform: event.target.value })}
              />
            </div>
            <Input
              label="발견한 원본 URL"
              type="url"
              placeholder="피해 게시물이나 계정 주소를 붙여 넣어 주세요."
              value={details.url}
              onChange={(event) => onChange({ ...details, url: event.target.value })}
              error={urlError}
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-gray-300 pt-6">
            <p className="text-body-1 font-semibold text-black">피해 내용</p>
            <TextArea
              label="어떤 일이 있었는지 적어주세요"
              placeholder="발견한 내용과 현재 상황을 편하게 적어주세요."
              value={details.description}
              onChange={(value) => onChange({ ...details, description: value })}
              hint="누가, 언제, 어디에서, 어떤 행동을 했는지 적으면 초안이 더 정확해져요."
            />
            <TextArea
              label="추가로 전달할 내용"
              placeholder="추가로 기관에 전달하고 싶은 내용이 있다면 적어 주세요."
              value={details.additionalNotes}
              onChange={(value) => onChange({ ...details, additionalNotes: value })}
            />
          </div>

          <div className="flex flex-col gap-2 border-t border-gray-300 pt-6">
            <p className="text-body-1 font-semibold text-black">증거 자료</p>
            <p className="text-caption text-gray-800">
              캡처 이미지나 영상을 첨부하면 피해 확인에 도움이 됩니다.
            </p>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex w-full flex-col items-center gap-6 rounded-2xl border-2 border-dashed px-3 py-6 transition-colors ${
                isDragging ? "border-primary-500 bg-primary-50" : "border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-black [&>svg]:h-12 [&>svg]:w-12">
                  <ImageArrowUp />
                </span>
                <p className="text-body-1 font-semibold text-black">사진 또는 영상 업로드</p>
                <p className="text-body-2 text-gray-650">
                  {evidenceFile?.name ?? "JPG , PNG 파일 지원"}
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
                className="w-[151px]"
                onClick={() => fileInputRef.current?.click()}
              >
                파일 찾기
              </Button>
            </div>
          </div>
        </div>
      </ReportSectionCard>

      <div className="flex w-full items-start justify-between">
        <button
          type="button"
          onClick={onBack}
          className="border-primary-500 text-primary-500 text-body-2 flex h-12 w-[124px] items-center justify-center rounded border transition-colors active:bg-primary-50"
        >
          이전
        </button>
        <Button
          type="button"
          variant="primary"
          className="gap-1"
          disabled={!canProceed}
          onClick={onNext}
        >
          초안 확인하기
          <span className="[&>svg]:h-6 [&>svg]:w-6">
            <ArrowUp />
          </span>
        </Button>
      </div>
    </div>
  );
}
