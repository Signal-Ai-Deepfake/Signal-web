interface WebMatchCardProps {
  matchCount: number;
  unsupported?: boolean;
}

export default function WebMatchCard({ matchCount, unsupported = false }: WebMatchCardProps) {
  const shown = 3;
  const remaining = Math.max(matchCount - shown, 0);

  if (unsupported) {
    return (
      <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-300 px-8 py-6 lg:w-[400px]">
        <p className="text-body-1 font-semibold text-black">도용 의심 이미지 (웹 검색 결과)</p>
        <p className="text-body-2 text-gray-650">웹 검색 기반 도용 탐지는 아직 준비 중인 기능입니다.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-300 px-8 py-6 lg:w-[400px]">
      <p className="text-body-1 font-semibold text-black">도용 의심 이미지 (웹 검색 결과)</p>
      <div className="flex items-center gap-4">
        {Array.from({ length: shown }).map((_, index) => (
          <div key={index} className="bg-gray-100 size-[72px] shrink-0 rounded-lg" />
        ))}
        {remaining > 0 && (
          <div className="bg-gray-100 text-primary-500 text-body-2 flex size-[72px] shrink-0 items-center justify-center rounded-lg font-medium">
            +{remaining}
          </div>
        )}
      </div>
      <button
        type="button"
        className="border-primary-500 text-primary-500 text-body-2 flex h-[50px] w-full items-center justify-center rounded border"
      >
        모두 보기
      </button>
    </div>
  );
}
