import BotOutline from "@/shared/asset/svg/BotOutline";

export default function DraftCardHeader({ status }: { status: string }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <span className="bg-primary-50 text-primary-500 text-caption w-fit rounded-full px-3 py-1">
            기관 제출용 초안
          </span>
          <p className="text-large md:text-h3 font-semibold break-keep text-black">
            신고 문서 초안을 확인해 주세요
          </p>
          <p className="text-small md:text-body-2 text-gray-800">
            아래 내용은 자유롭게 수정할 수 있습니다.
          </p>
        </div>
        <p className="text-caption text-primary-500 shrink-0">✓ {status}</p>
      </div>

      <div className="bg-secondary-50 border-secondary-200 flex items-start gap-2 rounded-lg border p-3 md:items-center md:p-4">
        <span className="text-secondary-600 shrink-0 [&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-8 md:[&>svg]:w-8">
          <BotOutline />
        </span>
        <p className="text-small md:text-body-2 text-secondary-600 font-medium break-keep">
          AI가 입력 내용을 정리한 문서입니다. 실제 제출 전 날짜, URL, 피해 내용을 한 번 더 확인해
          주세요.
        </p>
      </div>
    </>
  );
}
