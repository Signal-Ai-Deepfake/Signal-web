import type { ChatSummary } from "./types";

interface ChatSummaryCardProps {
  summary: ChatSummary;
}

export default function ChatSummaryCard({ summary }: ChatSummaryCardProps) {
  return (
    <div className="flex w-full flex-col gap-3.5 rounded-2xl border border-primary-50 bg-white p-[25px]">
      <p className="text-body-1 font-semibold text-black">AI 상담 요약</p>

      <div className="flex flex-col gap-1 border-b border-primary-50 pb-3.5">
        <p className="text-small font-semibold text-gray-800">현재 상황</p>
        <p className="text-small text-black">{summary.situation}</p>
      </div>

      <div className="flex flex-col gap-1 border-b border-primary-50 pb-3.5">
        <p className="text-small font-semibold text-gray-800">추천 대응 절차</p>
        <p className="text-small text-black">
          {summary.recommendedSteps.map((step, index) => `${index + 1}. ${step}`).join("   ")}
        </p>
      </div>

      <div className="flex flex-col gap-1.5 border-b border-primary-50 pb-3.5">
        <div className="flex items-center justify-between">
          <p className="text-small font-semibold text-gray-800">현재 위험 수준</p>
          <span className="text-caption rounded-full bg-secondary-50 px-2.5 py-1 text-secondary-500">
            {summary.riskLevel}
          </span>
        </div>
        <p className="text-small text-black">{summary.riskDescription}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-small font-semibold text-gray-800">상담 진행률</p>
          <p className="text-small font-semibold text-black">{summary.progressPercent}%</p>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-300">
          <div
            className="h-2 rounded-full bg-primary-500"
            style={{ width: `${summary.progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
