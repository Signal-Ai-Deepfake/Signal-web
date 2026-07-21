import Image from "next/image";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import AnalysisStepStack from "@/shared/ui/AnalysisStepStack";
import Button from "@/shared/ui/Button";
import FrameScale from "@/shared/ui/FrameScale";
import ScrollReveal from "@/shared/ui/ScrollReveal";

export default function HeroSection() {
  return (
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
              <div className="flex flex-col gap-1">
                <h1 className="text-h1 font-bold text-black lg:whitespace-nowrap">
                  당신이 보낸 구조 신호,
                </h1>
                <h1 className="text-h1 font-bold lg:whitespace-nowrap">
                  <span className="text-secondary-400">Signal</span>
                  <span className="text-black">이 안전한 일상으로 답합니다.</span>
                </h1>
              </div>
              <div className="text-body-1 flex flex-col gap-1 text-gray-800">
                <p className="lg:whitespace-nowrap">
                  디지털 괴롭힘부터 딥페이크까지, 홀로 감당하기 힘든 순간에 Signal을 켜세요.
                </p>
                <p className="lg:whitespace-nowrap">
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
  );
}
