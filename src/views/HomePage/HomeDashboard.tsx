import Image from "next/image";
import { recentAnalysisResults } from "@/entities/analysis/model";
import { mockUserProfile } from "@/entities/user/model";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import AnalysisStepStack from "@/shared/ui/AnalysisStepStack";
import FrameScale from "@/shared/ui/FrameScale";
import LinkButton from "@/shared/ui/LinkButton";
import ScrollReveal from "@/shared/ui/ScrollReveal";
import QuickFeaturesSection from "./QuickFeaturesSection";
import RecentResultsSection from "./RecentResultsSection";

export default function HomeDashboard() {
  return (
    <main className="flex w-full flex-col items-center gap-16 bg-white pb-24">
      <section className="w-full bg-white">
        <FrameScale>
          <Image
            src="/images/landing/ellipse-blue.svg"
            alt=""
            width={824}
            height={824}
            className="pointer-events-none absolute -top-40 -right-40 h-[824px] w-[824px]"
          />
          <Image
            src="/images/landing/ellipse-purple.svg"
            alt=""
            width={824}
            height={824}
            className="pointer-events-none absolute -top-96 left-24 h-[824px] w-[824px]"
          />
          <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center gap-16 px-5 py-24 lg:flex-row lg:items-center lg:justify-between lg:py-32">
            <ScrollReveal className="flex w-fit flex-col items-start gap-6">
              <div className="flex flex-col gap-6">
                <h1 className="text-h1 font-bold text-black lg:whitespace-nowrap">
                  안녕하세요, {mockUserProfile.name}님
                </h1>
                <div className="text-body-1 flex flex-col gap-1 text-gray-800">
                  <p className="lg:whitespace-nowrap">걱정은 줄이고, 안전은 더하고.</p>
                  <p className="lg:whitespace-nowrap">
                    AI가 사진 속 위험 요소를 먼저 확인해 드립니다.
                  </p>
                </div>
              </div>
              <LinkButton href="/analyze" variant="primary" className="gap-1">
                내 디지털 일상 점검하기
                <span className="[&>svg]:h-6 [&>svg]:w-6">
                  <ArrowUp />
                </span>
              </LinkButton>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <AnalysisStepStack
                percent={72}
                riskPercent={24}
                level="안전"
                message="현재 이미지는 안전합니다."
              />
            </ScrollReveal>
          </div>
        </FrameScale>
      </section>
      <QuickFeaturesSection />
      <RecentResultsSection results={recentAnalysisResults} />
    </main>
  );
}
