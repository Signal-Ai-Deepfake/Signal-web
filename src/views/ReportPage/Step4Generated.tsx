"use client";

import Button from "@/shared/ui/Button";
import DraftCardHeader from "./DraftCardHeader";
import StepNavigation from "./StepNavigation";
import type { DraftSection } from "./Step3Draft";

interface Step4GeneratedProps {
  sections: DraftSection[];
  onBack: () => void;
  onFindAgency: () => void;
}

const urlTitles = new Set(["원본 URL"]);

export default function Step4Generated({ sections, onBack, onFindAgency }: Step4GeneratedProps) {
  return (
    <div className="flex w-full flex-col gap-6 md:gap-8">
      <div className="flex w-full flex-col gap-5 rounded-2xl border border-gray-300 p-5 md:gap-6 md:p-8">
        <DraftCardHeader
          title="신고 문서가 준비되었어요"
          description="아래 내용을 바탕으로 적합한 기관에 신고를 진행해 주세요."
          status="문서 생성 완료"
        />

        <div className="flex flex-col gap-2">
          <label className="text-body-2 md:text-body-1 px-1 text-black">신고 내용</label>
          <div className="w-full divide-y divide-gray-200 overflow-y-auto rounded-lg border border-gray-300 md:max-h-[427px]">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-1 p-3 md:gap-1.5 md:p-4">
                <p className="text-body-2 md:text-body-1 font-semibold text-black">
                  {section.title}
                </p>
                {urlTitles.has(section.title) && section.body !== "미입력" ? (
                  <a
                    href={section.body}
                    target="_blank"
                    rel="noreferrer"
                    className="text-body-2 md:text-body-1 text-secondary-600 w-full break-all underline"
                  >
                    {section.body}
                  </a>
                ) : (
                  <p className="text-body-2 md:text-body-1 w-full break-words whitespace-pre-wrap text-black">
                    {section.body}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <StepNavigation onBack={onBack}>
        <Button type="button" variant="primary" className="w-full md:w-auto" onClick={onFindAgency}>
          적합한 신고 기관 확인하기
        </Button>
      </StepNavigation>
    </div>
  );
}
