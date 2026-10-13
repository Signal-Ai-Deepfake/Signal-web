import Image from "next/image";
import Arrow from "@/shared/asset/svg/Arrow";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import AnalysisStepRow from "@/shared/ui/AnalysisStepRow";
import AnalysisStepStack from "@/shared/ui/AnalysisStepStack";
import FrameScale from "@/shared/ui/FrameScale";
import LinkButton from "@/shared/ui/LinkButton";
import ScrollReveal from "@/shared/ui/ScrollReveal";
import SectionBadge from "@/shared/ui/SectionBadge";
import TypingHeadline from "@/shared/ui/TypingHeadline";

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
        <div
          data-typing="pending"
          className="group/hero relative mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center gap-12 px-5 pt-20 pb-36 xl:flex-row xl:items-center xl:justify-between xl:gap-16 xl:py-32"
        >
          <div className="flex w-fit flex-col items-center gap-6 text-center xl:items-start xl:text-left">
            <ScrollReveal className="xl:hidden">
              <SectionBadge>AI 기반 딥페이크 피해 예방·탐지·대응</SectionBadge>
            </ScrollReveal>
            <TypingHeadline
              className="text-h1 font-bold break-keep text-black xl:whitespace-nowrap"
              afterClassName="flex flex-col items-center gap-6 xl:items-start"
              lines={[
                [{ text: "당신이 보낸 구조 신호," }],
                [
                  { text: "Signal", className: "text-secondary-400" },
                  { text: "이 안전한 일상으로 답합니다." },
                ],
              ]}
            >
              <div className="text-body-1 flex max-w-[640px] flex-col gap-1 break-keep text-gray-800 xl:max-w-none">
                <p className="xl:whitespace-nowrap">
                  디지털 괴롭힘부터 딥페이크까지, 홀로 감당하기 힘든 순간에 Signal을 켜세요.
                </p>
                <p className="xl:whitespace-nowrap">
                  AI 기술을 통해 가장 빠르고 정확하게 증거를 분석하고 맞춤형 대응 가이드를
                  제공합니다.
                </p>
              </div>
              <LinkButton href="/analyze" variant="primary" className="gap-1">
                AI 분석 시작하기
                <span className="[&>svg]:h-6 [&>svg]:w-6">
                  <ArrowUp />
                </span>
              </LinkButton>
            </TypingHeadline>
          </div>
          <ScrollReveal distance={0} className="w-full xl:hidden">
            <AnalysisStepRow
              percent={72}
              riskPercent={24}
              level="안전"
              message="현재 이미지는 안전합니다."
            />
          </ScrollReveal>
          <ScrollReveal distance={0} className="hidden xl:block">
            <AnalysisStepStack
              percent={72}
              riskPercent={24}
              level="안전"
              message="현재 이미지는 안전합니다."
            />
          </ScrollReveal>
        </div>
        <a
          href="#why-signal"
          className="text-caption hover:text-primary-500 absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-700 transition-colors"
        >
          스크롤해서 더 알아보기
          <span className="animate-bounce motion-reduce:animate-none">
            <span className="block rotate-90 [&>svg]:h-4 [&>svg]:w-4">
              <Arrow />
            </span>
          </span>
        </a>
      </FrameScale>
    </section>
  );
}
