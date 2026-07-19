import type { ComponentType } from "react";
import FileText from "@/shared/asset/svg/FileText";
import Message from "@/shared/asset/svg/Message";
import ScanFace from "@/shared/asset/svg/ScanFace";
import ScanUser from "@/shared/asset/svg/ScanUser";
import FrameScale from "@/shared/ui/FrameScale";
import InfoCard from "@/shared/ui/InfoCard";
import ScrollReveal from "@/shared/ui/ScrollReveal";
import SectionBadge from "@/shared/ui/SectionBadge";

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

export default function WhySignalSection() {
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
