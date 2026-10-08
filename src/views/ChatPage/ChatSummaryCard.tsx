import type { ChatSummary } from "./types";

interface ChatSummaryCardProps {
  summary: ChatSummary;
}

export default function ChatSummaryCard({ summary }: ChatSummaryCardProps) {
  return (
    <div className="flex w-full flex-col gap-3.5 rounded-2xl border border-primary-50 bg-white p-[25px]">
      <p className="text-body-1 font-semibold text-black">AI 상담 요약</p>

      {summary.situation && (
        <div className="flex flex-col gap-1 border-b border-primary-50 pb-3.5">
          <p className="text-small font-semibold text-gray-800">현재 상황</p>
          <p className="text-small text-black">{summary.situation}</p>
        </div>
      )}

      {summary.recommendedSteps.length > 0 && (
        <div className="flex flex-col gap-1 border-b border-primary-50 pb-3.5">
          <p className="text-small font-semibold text-gray-800">추천 대응 절차</p>
          <p className="text-small text-black">
            {summary.recommendedSteps.map((step, index) => `${index + 1}. ${step}`).join("   ")}
          </p>
        </div>
      )}

      {summary.crisisDetected && (
        <div className="flex flex-col gap-1 border-b border-primary-50 pb-3.5">
          <p className="text-small font-semibold text-gray-800">긴급 상황 감지</p>
          <p className="text-small text-black">전문 기관의 도움을 고려해 주세요.</p>
        </div>
      )}

      {summary.recommendedAgencies.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="text-small font-semibold text-gray-800">추천 전문 기관</p>
          <p className="text-small text-black">{summary.recommendedAgencies.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
