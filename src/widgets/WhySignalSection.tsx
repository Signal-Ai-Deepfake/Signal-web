"use client";

import type { ComponentType } from "react";
import FileText from "@/shared/asset/svg/FileText";
import Message from "@/shared/asset/svg/Message";
import ScanFace from "@/shared/asset/svg/ScanFace";
import ScanUser from "@/shared/asset/svg/ScanUser";
import FrameScale from "@/shared/ui/FrameScale";
import InfoCard from "@/shared/ui/InfoCard";
import ScrollReveal from "@/shared/ui/ScrollReveal";
import SectionBadge from "@/shared/ui/SectionBadge";
import { useT } from "@/shared/i18n/I18nProvider";
import { widgetMessages } from "@/widgets/messages";
import BrandText from "@/widgets/BrandText";

const whySignalIcons: ComponentType[] = [ScanUser, ScanFace, Message, FileText];

export default function WhySignalSection() {
  const t = useT(widgetMessages);
  const whySignalItems = t.whySignal.items.map((item, index) => ({
    ...item,
    icon: whySignalIcons[index],
  }));
  return (
    <section id="why-signal" className="hidden w-full bg-white md:block">
      <FrameScale>
        <div className="mx-auto flex w-full max-w-[1360px] flex-col items-center justify-center gap-10 px-5 py-20 lg:py-24">
          <ScrollReveal className="flex flex-col items-center gap-4 text-center">
            <SectionBadge>WHY SIGNAL</SectionBadge>
            <h2 className="text-h2 font-bold">
              <BrandText segments={t.whySignal.title} className="text-primary-500" />
            </h2>
            <p className="text-body-1 text-gray-800">{t.whySignal.description}</p>
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
