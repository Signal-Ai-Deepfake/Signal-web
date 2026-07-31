import Warning from "@/shared/asset/svg/Warning";

export default function ScoreInfoTooltip() {
  return (
    <div className="group relative flex">
      <button
        type="button"
        aria-label="위험도 점수 산정 기준 보기"
        className="text-gray-600 flex cursor-pointer [&>svg]:h-5 [&>svg]:w-5"
      >
        <Warning />
      </button>
      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 w-max max-w-[320px] -translate-x-1/2 pb-3 opacity-0 transition-all duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
        <div className="text-caption relative break-keep rounded-lg border border-gray-200 bg-white px-5 py-3 text-center text-gray-700 shadow-lg">
          항목별 위험 점수를 중요도에 따라 가중 합산한 결과입니다.
          <div className="absolute -bottom-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rotate-45 border-r border-b border-gray-200 bg-white" />
        </div>
      </div>
    </div>
  );
}
