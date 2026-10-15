import Link from "next/link";
import ChevronLeft from "@/shared/asset/svg/ChevronLeft";
import Share from "@/shared/asset/svg/Share";

interface ResultMobileHeaderProps {
  onShare: () => void;
}

export default function ResultMobileHeader({ onShare }: ResultMobileHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-[6px] md:hidden print:hidden">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          aria-label="뒤로 가기"
          className="text-primary-500 active:bg-primary-50 flex size-10 items-center justify-center rounded-full [&>svg]:h-[18px] [&>svg]:w-[11.25px]"
        >
          <ChevronLeft />
        </Link>
        <h1 className="text-body-1 text-primary-500 font-bold">분석 결과</h1>
      </div>
      <button
        type="button"
        onClick={onShare}
        aria-label="결과 공유하기"
        className="text-primary-500 active:bg-primary-50 flex size-10 cursor-pointer items-center justify-center rounded-full [&>svg]:h-4 [&>svg]:w-3.5"
      >
        <Share />
      </button>
    </header>
  );
}
