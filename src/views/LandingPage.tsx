import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import Chart from "@/shared/asset/svg/Chart";
import Cpu from "@/shared/asset/svg/Cpu";
import FileText from "@/shared/asset/svg/FileText";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import Lock from "@/shared/asset/svg/Lock";
import Message from "@/shared/asset/svg/Message";
import ScanFace from "@/shared/asset/svg/ScanFace";
import ScanUser from "@/shared/asset/svg/ScanUser";
import ShieldCheck from "@/shared/asset/svg/ShieldCheck";
import Sparkle from "@/shared/asset/svg/Sparkle";
import AnalysisStepStack from "@/shared/ui/AnalysisStepStack";
import Button from "@/shared/ui/Button";
import InfoCard from "@/shared/ui/InfoCard";
import ScrollReveal from "@/shared/ui/ScrollReveal";
import StepCard from "@/shared/ui/StepCard";

function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="bg-primary-50 text-primary-500 text-caption rounded-full px-4 py-1">
      {children}
    </span>
  );
}

function StepArrow() {
  return (
    <div className="hidden shrink-0 text-gray-600 md:block [&>svg]:h-6 [&>svg]:w-6">
      <ArrowUp />
    </div>
  );
}

function FrameScale({ children }: { children: ReactNode }) {
  return <div className="relative grid min-h-[950px] w-full overflow-hidden">{children}</div>;
}

function HeroSection() {
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
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center gap-16 px-5 lg:flex-row lg:items-center lg:justify-between">
          <ScrollReveal className="flex w-fit flex-col items-start gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-h1 font-bold whitespace-nowrap text-black">
                  당신이 보낸 구조 신호,
                </h1>
                <h1 className="text-h1 font-bold whitespace-nowrap">
                  <span className="text-secondary-400">Signal</span>
                  <span className="text-black">이 안전한 일상으로 답합니다.</span>
                </h1>
              </div>
              <div className="text-body-1 flex flex-col gap-1 text-gray-800">
                <p className="whitespace-nowrap">
                  디지털 괴롭힘부터 딥페이크까지, 홀로 감당하기 힘든 순간에 Signal을 켜세요.
                </p>
                <p className="whitespace-nowrap">
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

const whySignalItems: { icon: ComponentType; title: string; description: string }[] = [
  {
    icon: ScanUser,
    title: "AI 이미지 분석",
    description: "사진 속 위험 요소를 AI가 분석하고 안전 여부를 확인합니다.",
  },
  {
    icon: ScanFace,
    title: "얼굴 도용·딥페이크 탐지",
    description: "얼굴 도용과 AI 합성 여부를 빠르고 정확하게 분석합니다.",
  },
  {
    icon: Message,
    title: "익명 상담 챗봇",
    description: "익명으로 상담하며 상황에 맞는 대응 방법을 안내받을 수 있습니다.",
  },
  {
    icon: FileText,
    title: "신고 지원",
    description: "신고에 필요한 절차와 문서 작성을 쉽고 빠르게 도와드립니다.",
  },
];

function WhySignalSection() {
  return (
    <section className="w-full bg-white">
      <FrameScale>
        <div className="mx-auto flex w-full max-w-[1360px] flex-col items-center justify-center gap-10 px-5">
          <ScrollReveal className="flex flex-col items-center gap-4 text-center">
            <SectionBadge>WHY SIGNAL</SectionBadge>
            <h2 className="text-h2 font-bold">
              <span className="text-secondary-400">Signal</span>
              <span className="text-primary-500">이 필요한 이유</span>
            </h2>
            <p className="text-body-1 text-gray-800">
              온라인에서 마주하는 다양한 위험, 예방부터 대응까지 Signal이 함께합니다.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-4">
            {whySignalItems.map((item, index) => (
              <ScrollReveal key={item.title} delay={120 + index * 80}>
                <InfoCard {...item} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </FrameScale>
    </section>
  );
}

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

function CtaCard() {
  return (
    <div
      className="relative w-full max-w-[1280px] overflow-hidden rounded-2xl"
      style={{
        backgroundImage: "linear-gradient(78deg, #ffffff 52%, var(--color-secondary-50) 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-start gap-6 px-9 py-10">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="text-h3 font-semibold text-black">혼자 고민하지 마세요.</p>
            <p className="text-h3 font-semibold">
              <span className="text-secondary-400">Signal</span>
              <span className="text-black">이 함께 안전한 해결 방법을 찾아드립니다.</span>
            </p>
          </div>
          <p className="text-small text-gray-800">
            AI 분석부터 익명 상담, 신고 지원까지 한 곳에서 이용해 보세요.
          </p>
        </div>
        <Button variant="primary" className="gap-1">
          익명 상담 시작하기
          <span className="[&>svg]:h-6 [&>svg]:w-6">
            <ArrowUp />
          </span>
        </Button>
        <div className="flex items-center gap-1 text-gray-800">
          <span className="[&>svg]:h-6 [&>svg]:w-6">
            <Lock />
          </span>
          <p className="text-small">모든 상담 내용은 익명으로 안전하게 보호됩니다.</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[560px] lg:block">
        <Image
          src="/images/landing/wave-2.svg"
          alt=""
          width={966}
          height={156}
          className="absolute top-[45%] left-0 h-auto w-[480px]"
        />
        <Image
          src="/images/landing/wave-1.svg"
          alt=""
          width={966}
          height={156}
          className="absolute top-[30%] left-4 h-auto w-[480px] -rotate-6"
        />
        <Image
          src="/images/landing/ellipse-1.svg"
          alt=""
          width={420}
          height={420}
          className="absolute top-1/2 right-[-40px] h-[420px] w-[420px] -translate-y-1/2"
        />
        <Image
          src="/images/landing/ellipse-5.svg"
          alt=""
          width={300}
          height={300}
          className="absolute top-1/2 right-16 h-[300px] w-[300px] -translate-y-1/2"
        />
        <Image
          src="/images/landing/group-7.svg"
          alt=""
          width={300}
          height={300}
          className="absolute top-1/2 right-1 h-[300px] w-[300px] -translate-y-1/2"
        />
        <span className="absolute top-9 right-44 text-white [&>svg]:h-5 [&>svg]:w-5">
          <Sparkle />
        </span>
        <span className="absolute top-16 right-14 text-white [&>svg]:h-5 [&>svg]:w-5">
          <Sparkle />
        </span>
        <span className="text-secondary-200 absolute top-10 right-72 [&>svg]:h-5 [&>svg]:w-5">
          <Sparkle />
        </span>
      </div>
    </div>
  );
}

function HowItWorksSection() {
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

export default function LandingPage() {
  return (
    <main className="flex w-full flex-col items-center bg-white">
      <HeroSection />
      <WhySignalSection />
      <HowItWorksSection />
    </main>
  );
}
