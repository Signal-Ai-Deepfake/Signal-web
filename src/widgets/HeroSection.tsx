"use client";

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
import { useLocale, useT } from "@/shared/i18n/I18nProvider";
import { widgetMessages } from "@/widgets/messages";
import { toTypingLines } from "@/widgets/BrandText";

export default function HeroSection() {
  const t = useT(widgetMessages);
  const { locale } = useLocale();
  const nowrap = locale === "ko" ? "xl:whitespace-nowrap" : "";
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
              <SectionBadge>{t.hero.badge}</SectionBadge>
            </ScrollReveal>
            <TypingHeadline
              className={`text-h1 font-bold break-keep text-black ${nowrap}`}
              afterClassName="flex flex-col items-center gap-6 xl:items-start"
              lines={toTypingLines(t.hero.headline)}
            >
              <div className="text-body-1 flex max-w-[640px] flex-col gap-1 break-keep text-gray-800 xl:max-w-none">
                {t.hero.intro.map((line) => (
                  <p key={line} className={nowrap}>
                    {line}
                  </p>
                ))}
              </div>
              <LinkButton href="/analyze" variant="primary" className="gap-1">
                {t.hero.cta}
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
              message={t.hero.sampleMessage}
            />
          </ScrollReveal>
          <ScrollReveal distance={0} className="hidden xl:block">
            <AnalysisStepStack
              percent={72}
              riskPercent={24}
              level="안전"
              message={t.hero.sampleMessage}
            />
          </ScrollReveal>
        </div>
        <a
          href="#why-signal"
          className="text-caption hover:text-primary-500 absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-700 transition-colors"
        >
          {t.hero.scrollMore}
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
