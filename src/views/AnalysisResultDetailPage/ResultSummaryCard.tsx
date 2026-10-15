interface ResultSummaryCardProps {
  assessmentId: number;
  faceCount: number;
}

export default function ResultSummaryCard({ assessmentId, faceCount }: ResultSummaryCardProps) {
  return (
    <div className="flex w-full flex-col gap-1 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:border-gray-300 md:p-6">
      <div className="flex items-center gap-2">
        <span className="size-2 shrink-0 rounded-full bg-green-500" />
        <p className="text-small font-semibold text-green-500">분석 완료</p>
      </div>
      <h2 className="text-body-1 text-primary-500 font-bold">사진 위험도 분석</h2>
      <p className="text-caption text-gray-600">
        분석 번호 #{assessmentId} · 감지된 얼굴 {faceCount}명
      </p>
    </div>
  );
}
