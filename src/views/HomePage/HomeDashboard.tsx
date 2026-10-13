"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getMyAssessments } from "@/entities/analysis/api";
import { useMyProfile } from "@/entities/user/useMyProfile";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import AnalysisStepRow from "@/shared/ui/AnalysisStepRow";
import AnalysisStepStack from "@/shared/ui/AnalysisStepStack";
import FrameScale from "@/shared/ui/FrameScale";
import LinkButton from "@/shared/ui/LinkButton";
import ScrollReveal from "@/shared/ui/ScrollReveal";
import QuickFeaturesSection from "./QuickFeaturesSection";
import RecentResultsSection from "./RecentResultsSection";

export default function HomeDashboard() {
  const { data: profile } = useMyProfile();
  const { data: assessments } = useQuery({
    queryKey: ["riskAssessments"],
    queryFn: getMyAssessments,
  });

  return (
    <main className="flex w-full flex-col items-center gap-8 bg-white pb-10 md:gap-16 md:pb-24">
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
          <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center gap-12 px-5 py-8 md:py-20 xl:flex-row xl:items-center xl:justify-between xl:gap-16 xl:py-32">
            <ScrollReveal className="flex w-full flex-col items-start gap-6 md:w-fit md:items-center md:text-center xl:items-start xl:text-left">
              <div className="flex flex-col gap-3 md:gap-6">
                <h1 className="md:text-h1 text-[28px] leading-[1.3] font-bold break-keep text-black xl:whitespace-nowrap">
                  안녕하세요, {profile?.name ?? "사용자"}님
                </h1>
                <div className="text-body-2 md:text-body-1 flex flex-col gap-1 break-keep text-gray-800">
                  <p className="xl:whitespace-nowrap">걱정은 줄이고, 안전은 더하고.</p>
                  <p className="xl:whitespace-nowrap">
                    AI가 사진 속 위험 요소를 먼저 확인해 드립니다.
                  </p>
                </div>
              </div>
              <LinkButton href="/analyze" variant="primary" className="w-full gap-1 md:w-auto">
                내 디지털 일상 점검하기
                <span className="[&>svg]:h-6 [&>svg]:w-6">
                  <ArrowUp />
                </span>
              </LinkButton>
            </ScrollReveal>
            <ScrollReveal delay={120} className="hidden w-full md:block xl:hidden">
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
      <QuickFeaturesSection />
      <RecentResultsSection results={(assessments ?? []).slice(0, 3)} />
    </main>
  );
}
