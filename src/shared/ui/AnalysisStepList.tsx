import type { ReactNode } from "react";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import RiskTag from "@/shared/ui/RiskTag";

interface AnalysisStepListProps {
  percent: number;
  riskPercent: number;
  level: "안전" | "위험" | "주의";
}

function StepRow({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-gray-100 px-4 py-3">
      <span className="text-caption text-primary-500 bg-primary-50 rounded-full px-2 py-0.5">
        {step}
      </span>
      <p className="text-small font-medium text-black">{title}</p>
      <div className="ml-auto flex items-center gap-2">{children}</div>
    </div>
  );
}

export default function AnalysisStepList({ percent, riskPercent, level }: AnalysisStepListProps) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="text-caption bg-secondary-50 text-secondary-700 shrink-0 rounded-full px-2.5 py-1 font-semibold">
          예시 화면
        </span>
        <p className="text-caption text-gray-700">사진을 분석하면 이런 순서로 진행돼요.</p>
      </div>
      <div className="flex flex-col gap-2">
        <StepRow step="01" title="이미지 업로드">
          <p className="text-caption text-gray-700">JPG, PNG</p>
          <span className="text-primary-500 [&>svg]:h-5 [&>svg]:w-5">
            <ImageArrowUp />
          </span>
        </StepRow>
        <StepRow step="02" title="AI 분석 중">
          <div className="h-1.5 w-16 rounded-full bg-gray-300">
            <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${percent}%` }} />
          </div>
          <span className="text-caption text-primary-500 font-bold">{percent}%</span>
        </StepRow>
        <StepRow step="03" title="분석 완료">
          <span className="text-body-2 text-primary-500 font-bold">{riskPercent}%</span>
          <RiskTag level={level} />
        </StepRow>
      </div>
    </div>
  );
}
