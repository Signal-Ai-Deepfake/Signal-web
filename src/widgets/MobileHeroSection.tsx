"use client";

import Arrow from "@/shared/asset/svg/Arrow";
import Lock from "@/shared/asset/svg/Lock";
import AnalysisStepList from "@/shared/ui/AnalysisStepList";
import LinkButton from "@/shared/ui/LinkButton";
import SectionBadge from "@/shared/ui/SectionBadge";
import TypingHeadline from "@/shared/ui/TypingHeadline";
import { useT } from "@/shared/i18n/I18nProvider";
import { widgetMessages } from "@/widgets/messages";
import { toTypingLines } from "@/widgets/BrandText";

export default function MobileHeroSection() {
  const t = useT(widgetMessages);
  return (
    <section className="relative w-full overflow-hidden px-5 pt-12 pb-8 md:hidden">
      <div className="bg-primary-50/60 pointer-events-none absolute top-0 right-0 size-[180px] translate-x-1/4 -translate-y-1/4 rounded-full" />
      <div className="bg-secondary-50/60 pointer-events-none absolute top-20 left-0 size-[140px] -translate-x-1/3 rounded-full" />
      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="mb-2 self-start">
            <SectionBadge>{t.hero.badge}</SectionBadge>
          </span>
          <TypingHeadline
            className="text-[28px] leading-[1.3] font-bold tracking-tight text-black"
            lines={toTypingLines(t.hero.mobileHeadline)}
          />
          <p className="text-body-2 pt-2 leading-[1.6] text-gray-800">
            {t.hero.mobileIntro[0]}
            <br />
            {t.hero.mobileIntro[1]}
          </p>
        </div>
        <AnalysisStepList percent={72} riskPercent={24} level="안전" />
        <LinkButton href="/analyze" variant="primary" className="w-full justify-center">
          {t.hero.cta}
        </LinkButton>
        <div className="flex items-center justify-center gap-1.5 opacity-70">
          <span className="text-gray-800 [&>svg]:h-4 [&>svg]:w-4">
            <Lock />
          </span>
          <p className="text-caption text-gray-800">{t.hero.encrypted}</p>
        </div>
        <a
          href="#mobile-features"
          className="text-caption mt-4 flex flex-col items-center gap-2 self-center text-gray-700"
        >
          {t.hero.scrollMore}
          <span className="animate-bounce motion-reduce:animate-none">
            <span className="block rotate-90 [&>svg]:h-4 [&>svg]:w-4">
              <Arrow />
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
