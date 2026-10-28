"use client";

import type { ComponentType } from "react";
import Headset from "@/shared/asset/svg/Headset";
import ShieldCheck from "@/shared/asset/svg/ShieldCheck";
import Sparkle from "@/shared/asset/svg/Sparkle";
import ScrollReveal from "@/shared/ui/ScrollReveal";
import SectionBadge from "@/shared/ui/SectionBadge";
import { useT } from "@/shared/i18n/I18nProvider";
import { widgetMessages } from "@/widgets/messages";

const whySignalStyles: { icon: ComponentType; tint: string }[] = [
  { icon: Sparkle, tint: "bg-primary-50/50 border-primary-50" },
  { icon: ShieldCheck, tint: "bg-secondary-50/50 border-secondary-50" },
  { icon: Headset, tint: "bg-primary-50/50 border-primary-50" },
];

export default function MobileWhySignalList() {
  const t = useT(widgetMessages);
  const whySignalItems = t.whySignal.mobileItems.map((item, index) => ({
    ...item,
    ...whySignalStyles[index],
  }));
  return (
    <section className="w-full px-5 py-4 md:hidden">
      <div className="flex flex-col gap-4">
        <ScrollReveal distance={24} className="flex items-center justify-between">
          <h2 className="text-primary-500 text-h3 font-bold">{t.whySignal.mobileTitle}</h2>
          <SectionBadge>WHY SIGNAL</SectionBadge>
        </ScrollReveal>
        <div className="flex flex-col gap-3">
          {whySignalItems.map(({ icon: Icon, title, description, tint }) => (
            <ScrollReveal key={title} distance={24}>
              <div className={`flex items-center gap-4 rounded-2xl border p-4 ${tint}`}>
                <div className="text-primary-500 flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
                  <span className="[&>svg]:h-4 [&>svg]:w-4">
                    <Icon />
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-small font-bold text-black">{title}</h3>
                  <p className="text-caption text-gray-800">{description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
