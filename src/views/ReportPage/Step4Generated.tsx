"use client";

import BotOutline from "@/shared/asset/svg/BotOutline";
import Button from "@/shared/ui/Button";
import type { DraftSection } from "./Step3Draft";

interface Step4GeneratedProps {
  sections: DraftSection[];
  onBack: () => void;
  onFindAgency: () => void;
}

const urlTitles = new Set(["원본 URL"]);

export default function Step4Generated({ sections, onBack, onFindAgency }: Step4GeneratedProps) {
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
          <p className="text-caption text-primary-500 shrink-0">✓ 문서 생성 완료</p>
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
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-1.5 p-4">
                <p className="text-body-1 font-semibold text-black">{section.title}</p>
                {urlTitles.has(section.title) && section.body !== "미입력" ? (
                  <a
                    href={section.body}
                    target="_blank"
                    rel="noreferrer"
                    className="text-body-1 text-secondary-600 w-full text-ellipsis underline"
                  >
                    {section.body}
                  </a>
                ) : (
                  <p className="text-body-1 w-full whitespace-pre-wrap text-black">
                    {section.body}
                  </p>
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
        <Button type="button" variant="primary" onClick={onFindAgency}>
          적합한 신고 기관 확인하기
        </Button>
      </div>
    </div>
  );
}
