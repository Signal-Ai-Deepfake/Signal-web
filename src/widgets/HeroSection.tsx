import Image from "next/image";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import AnalysisStepRow from "@/shared/ui/AnalysisStepRow";
import AnalysisStepStack from "@/shared/ui/AnalysisStepStack";
import Button from "@/shared/ui/Button";
import FrameScale from "@/shared/ui/FrameScale";
import ScrollReveal from "@/shared/ui/ScrollReveal";
import SectionBadge from "@/shared/ui/SectionBadge";

export default function HeroSection() {
  return (
    <section className="hidden w-full bg-white md:block">
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
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center gap-12 px-5 py-20 xl:flex-row xl:items-center xl:justify-between xl:gap-16 xl:py-32">
          <ScrollReveal className="flex w-fit flex-col items-center gap-6 text-center xl:items-start xl:text-left">
            <span className="xl:hidden">
              <SectionBadge>AI 기반 딥페이크 피해 예방·탐지·대응</SectionBadge>
            </span>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-h1 font-bold break-keep text-black xl:whitespace-nowrap">
                  당신이 보낸 구조 신호,
                </h1>
                <h1 className="text-h1 font-bold break-keep xl:whitespace-nowrap">
                  <span className="text-secondary-400">Signal</span>
                  <span className="text-black">이 안전한 일상으로 답합니다.</span>
                </h1>
              </div>
              <div className="text-body-1 flex max-w-[640px] flex-col gap-1 break-keep text-gray-800 xl:max-w-none">
                <p className="xl:whitespace-nowrap">
                  디지털 괴롭힘부터 딥페이크까지, 홀로 감당하기 힘든 순간에 Signal을 켜세요.
                </p>
                <p className="xl:whitespace-nowrap">
                  AI 기술을 통해 가장 빠르고 정확하게 증거를 분석하고 맞춤형 대응 가이드를
                  제공합니다.
                </p>
              </div>
            </div>
            <Button variant="primary" className="gap-1">
              AI 분석 시작하기
              <span className="[&>svg]:h-6 [&>svg]:w-6">
                <ArrowUp />
              </span>
            </Button>
          </ScrollReveal>
          <ScrollReveal delay={120} className="w-full xl:hidden">
            <AnalysisStepRow
              percent={72}
              riskPercent={24}
              level="안전"
              message="현재 이미지는 안전합니다."
            />
          </ScrollReveal>
          <ScrollReveal delay={120} className="hidden xl:block">
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
  );
}
