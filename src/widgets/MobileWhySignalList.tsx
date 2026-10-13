import type { ComponentType } from "react";
import Headset from "@/shared/asset/svg/Headset";
import ShieldCheck from "@/shared/asset/svg/ShieldCheck";
import Sparkle from "@/shared/asset/svg/Sparkle";
import ScrollReveal from "@/shared/ui/ScrollReveal";
import SectionBadge from "@/shared/ui/SectionBadge";

const whySignalItems: {
  icon: ComponentType;
  title: string;
  description: string;
  tint: string;
}[] = [
  {
    icon: Sparkle,
    title: "빠르고 정확한 AI 분석",
    description: "유해 콘텐츠를 즉시 판별하고 증거화합니다.",
    tint: "bg-primary-50/50 border-primary-50",
  },
  {
    icon: ShieldCheck,
    title: "철저한 익명성 보장",
    description: "개인정보를 노출하지 않고 도움을 받으세요.",
    tint: "bg-secondary-50/50 border-secondary-50",
  },
  {
    icon: Headset,
    title: "전문가 직접 연결",
    description: "법률, 심리 전문가와 신속하게 연계해 드립니다.",
    tint: "bg-primary-50/50 border-primary-50",
  },
];

export default function MobileWhySignalList() {
  return (
    <section className="w-full px-5 py-4 md:hidden">
      <div className="flex flex-col gap-4">
        <ScrollReveal distance={24} className="flex items-center justify-between">
          <h2 className="text-primary-500 text-h3 font-bold">왜 Signal인가요?</h2>
          <SectionBadge>WHY SIGNAL</SectionBadge>
        </ScrollReveal>
        <div className="flex flex-col gap-3">
          {whySignalItems.map(({ icon: Icon, title, description, tint }, index) => (
            <ScrollReveal key={title} delay={80 + index * 80} distance={24}>
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
