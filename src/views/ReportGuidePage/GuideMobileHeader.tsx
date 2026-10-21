"use client";

import { useRouter } from "next/navigation";
import ChevronLeft from "@/shared/asset/svg/ChevronLeft";
import Share from "@/shared/asset/svg/Share";

export default function GuideMobileHeader({ onShare }: { onShare: () => void }) {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) router.back();
    else router.push("/report");
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-[6px] md:hidden">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={goBack}
          aria-label="뒤로 가기"
          className="text-primary-500 active:bg-primary-50 flex size-10 cursor-pointer items-center justify-center rounded-full [&>svg]:h-[18px] [&>svg]:w-[11.25px]"
        >
          <ChevronLeft />
        </button>
        <h1 className="text-body-1 font-bold text-black">신고 가이드</h1>
      </div>
      <button
        type="button"
        onClick={onShare}
        aria-label="신고 가이드 공유하기"
        className="text-primary-500 active:bg-primary-50 flex size-10 cursor-pointer items-center justify-center rounded-full [&>svg]:h-4 [&>svg]:w-3.5"
      >
        <Share />
      </button>
    </header>
  );
}
