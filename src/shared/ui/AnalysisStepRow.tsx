import type { ReactNode } from "react";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import RiskTag from "@/shared/ui/RiskTag";

interface AnalysisStepRowProps {
  percent: number;
  riskPercent: number;
  level: "안전" | "위험" | "주의";
  message: string;
}

function StepPanel({
  step,
  title,
  className,
  children,
}: {
  step: string;
  title: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex min-w-0 animate-[step-in_0.7s_ease-out_both] flex-col gap-3 rounded-2xl bg-gray-100 p-5 group-data-[typing=pending]/hero:[animation-play-state:paused] motion-reduce:animate-none ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-small text-primary-500 bg-primary-50 rounded-full px-2.5 py-1">
          {step}
        </span>
        <p className="text-small font-medium text-black">{title}</p>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3">{children}</div>
    </div>
  );
}

export default function AnalysisStepRow({
  percent,
  riskPercent,
  level,
  message,
}: AnalysisStepRowProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-xl">
      <div className="flex items-center gap-2">
        <span className="text-caption bg-secondary-50 text-secondary-700 rounded-full px-2.5 py-1 font-semibold">
          예시 화면
        </span>
        <p className="text-small text-gray-700">
          사진을 분석하면 이런 순서로 결과를 확인할 수 있어요.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <StepPanel step="01" title="이미지 업로드" className="[animation-delay:600ms]">
          <div className="flex h-[136px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-400 bg-white">
            <span className="text-primary-500 [&>svg]:h-8 [&>svg]:w-8">
              <ImageArrowUp />
            </span>
            <p className="text-caption text-gray-700">JPG, PNG 파일 지원</p>
          </div>
        </StepPanel>
        <StepPanel step="02" title="AI 분석 중" className="[animation-delay:950ms]">
          <div className="flex items-center justify-between">
            <p className="text-small font-bold text-black">분석 진행 중...</p>
            <span className="text-small text-primary-500 font-bold">{percent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-300">
            <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${percent}%` }} />
          </div>
          <p className="text-caption break-keep text-gray-700">
            얼굴 도용, 딥페이크 여부를 AI가 분석하고 있습니다.
          </p>
        </StepPanel>
        <StepPanel step="03" title="분석 완료" className="[animation-delay:1300ms]">
          <div className="flex items-center gap-2">
            <p className="text-h2 text-primary-500 font-bold">{riskPercent}%</p>
            <RiskTag level={level} />
          </div>
          <p className="text-caption break-keep text-gray-700">{message}</p>
          <div className="text-small bg-primary-50 text-primary-500 rounded py-2.5 text-center font-semibold">
            보호 가이드 보기
          </div>
        </StepPanel>
      </div>
    </div>
  );
}
