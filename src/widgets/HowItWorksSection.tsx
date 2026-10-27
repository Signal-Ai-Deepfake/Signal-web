"use client";

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
import { useT } from "@/shared/i18n/I18nProvider";
import { widgetMessages } from "@/widgets/messages";

const stepIcons: ComponentType[] = [ImageArrowUp, Cpu, Chart, ShieldCheck];

export default function HowItWorksSection() {
  const t = useT(widgetMessages);
  const howItWorksSteps = t.howItWorks.steps.map((step, index) => ({
    ...step,
    icon: stepIcons[index],
    step: String(index + 1).padStart(2, "0"),
  }));
  return (
    <section id="how-it-works" className="w-full bg-white">
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
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center gap-10 px-5 py-10 md:gap-16 md:py-20 lg:py-24">
          <div className="flex w-full flex-col items-center gap-8">
            <ScrollReveal className="flex flex-col items-center gap-4 text-center">
              <SectionBadge>HOW IT WORKS</SectionBadge>
              <h2 className="text-h3 md:text-h2 text-primary-500 font-bold">
                {t.howItWorks.title}
              </h2>
              <p className="text-small md:text-body-1 break-keep text-gray-800">
                {t.howItWorks.description}
              </p>
            </ScrollReveal>
            <div className="grid w-full grid-cols-2 gap-3 md:gap-5 xl:flex xl:w-auto xl:items-center xl:justify-center xl:gap-6">
              {howItWorksSteps.map((step, index) => (
                <div key={step.step} className="flex items-stretch gap-6 xl:items-center">
                  <ScrollReveal delay={120 + index * 80} className="w-full xl:w-auto">
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
