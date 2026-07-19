import type { ComponentType } from "react";
import Image from "next/image";
import Chart from "@/shared/asset/svg/Chart";
import Cpu from "@/shared/asset/svg/Cpu";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import ShieldCheck from "@/shared/asset/svg/ShieldCheck";
import FrameScale from "@/shared/ui/FrameScale";
import ScrollReveal from "@/shared/ui/ScrollReveal";
import SectionBadge from "@/shared/ui/SectionBadge";
import StepArrow from "@/shared/ui/StepArrow";
import StepCard from "@/shared/ui/StepCard";
import CtaCard from "@/widgets/CtaCard";

const howItWorksSteps: {
  icon: ComponentType;
  step: string;
  title: string;
  description: string;
}[] = [
  {
    icon: ImageArrowUp,
    step: "01",
    title: "이미지 업로드",
    description: "분석할 사진을 업로드합니다.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI 위험도 분석",
    description: "AI 위험 요소와 노출 가능성을 분석합니다.",
  },
  {
    icon: Chart,
    step: "03",
    title: "분석결과 확인",
    description: "위험도와 원인, 주요 요소를 확인할 수 있습니다.",
  },
  {
    icon: ShieldCheck,
    step: "04",
    title: "보호 가이드 제공",
    description: "상황에 맞는 보호 방법과 대응 가이드를 제공합니다.",
  },
];

export default function HowItWorksSection() {
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
          src="/images/landing/ellipse-purple-2.svg"
          alt=""
          width={824}
          height={824}
          className="pointer-events-none absolute -top-60 -left-60 h-[824px] w-[824px]"
        />
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center gap-16 px-5">
          <div className="flex flex-col items-center gap-8">
            <ScrollReveal className="flex flex-col items-center gap-4 text-center">
              <SectionBadge>HOW IT WORKS</SectionBadge>
              <h2 className="text-h2 text-primary-500 font-bold">AI 분석은 이렇게 진행돼요</h2>
              <p className="text-body-1 text-gray-800">
                사진 한 장으로 위험을 분석하고, 안전한 대응 방법을 안내해 드립니다.
              </p>
            </ScrollReveal>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {howItWorksSteps.map((step, index) => (
                <div key={step.step} className="flex items-center gap-6">
                  <ScrollReveal delay={120 + index * 80}>
                    <StepCard {...step} />
                  </ScrollReveal>
                  {index < howItWorksSteps.length - 1 && <StepArrow />}
                </div>
              ))}
            </div>
          </div>
          <ScrollReveal delay={450} distance={24} className="w-full">
            <CtaCard />
          </ScrollReveal>
        </div>
      </FrameScale>
    </section>
  );
}
