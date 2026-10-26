"use client";

import Link from "next/link";
import { toast } from "sonner";
import Arrow from "@/shared/asset/svg/Arrow";
import { buttonStyle } from "@/shared/ui/Button";
import { useIsLoggedIn } from "@/shared/lib/useIsLoggedIn";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import GuideCaseAccordion from "./GuideCaseAccordion";
import GuideHelpCard from "./GuideHelpCard";
import GuideMobileHeader from "./GuideMobileHeader";
import GuideStepList from "./GuideStepList";

async function shareGuide() {
  const url = window.location.href;
  if (navigator.share) {
    try {
      await navigator.share({ title: "Signal 신고 가이드", url });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error("공유하지 못했습니다.");
    }
    return;
  }
  try {
    await navigator.clipboard.writeText(url);
    toast.success("신고 가이드 링크를 복사했어요.");
  } catch {
    toast.error("링크를 복사하지 못했습니다.");
  }
}

export default function ReportGuidePage() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <>
      <SiteHeader className="max-md:hidden" />
      <GuideMobileHeader onShare={shareGuide} />
      <main className="flex w-full flex-col items-center bg-gray-100 md:px-5 md:py-10 md:pb-[120px]">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col md:gap-10">
          <div className="hidden flex-col gap-6 md:flex">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-body-1 text-gray-800">
                홈
              </Link>
              <span className="text-gray-800 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <Link href="/report" className="text-body-1 text-gray-800">
                신고 지원
              </Link>
              <span className="text-gray-800 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <span className="text-body-1 text-primary-500">신고 가이드</span>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-h1 font-bold text-black">신고 가이드</h1>
              <p className="text-body-1 text-gray-800">
                피해를 발견했을 때 무엇부터 해야 하는지, 상황별로 차근차근 안내해 드립니다.
              </p>
            </div>
          </div>

          <div className="px-5 py-8 md:p-0">
            <GuideStepList />
          </div>

          <div className="grid w-full grid-cols-1 items-start lg:grid-cols-[1fr_360px] lg:gap-8">
            <div className="md:border-primary-50 rounded-t-[32px] bg-white px-5 py-4 shadow-[0px_-8px_10px_rgba(0,0,0,0.02)] md:rounded-2xl md:border md:p-8 md:shadow-sm">
              <GuideCaseAccordion />
            </div>
            <aside className="flex flex-col gap-4 bg-white px-5 pt-4 pb-8 md:bg-transparent md:px-0 md:pt-8 md:pb-0 lg:sticky lg:top-28 lg:pt-0">
              <GuideHelpCard />
              <div className="border-primary-50 hidden flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex">
                <div className="flex flex-col gap-1">
                  <h3 className="text-body-1 font-bold text-black">신고 문서가 필요하신가요?</h3>
                  <p className="text-small text-gray-650 break-keep">
                    기억나는 내용만 입력하면 기관에 제출하기 좋은 형태로 정리해 드려요.
                  </p>
                </div>
                <Link href="/report" className={buttonStyle("primary", "w-full")}>
                  신고 지원 시작하기
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <div
        className={`border-primary-50 sticky z-20 w-full border-t bg-white p-5 md:hidden ${
          isLoggedIn ? "bottom-[calc(4rem+env(safe-area-inset-bottom))]" : "bottom-0"
        }`}
      >
        <Link
          href="/report"
          className="bg-primary-500 text-body-2 active:bg-primary-700 flex w-full items-center justify-center rounded-2xl py-5 font-bold text-white drop-shadow-[0px_8px_10px_rgba(45,75,102,0.2)] transition-colors"
        >
          신고 지원 시작하기
        </Link>
      </div>
      <Footer />
    </>
  );
}
