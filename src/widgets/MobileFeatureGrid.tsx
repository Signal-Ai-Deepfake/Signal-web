import Link from "next/link";
import type { ComponentType } from "react";
import FileText from "@/shared/asset/svg/FileText";
import Message from "@/shared/asset/svg/Message";
import PhotoScan from "@/shared/asset/svg/PhotoScan";
import ScanFace from "@/shared/asset/svg/ScanFace";
import ScrollReveal from "@/shared/ui/ScrollReveal";

const features: {
  icon: ComponentType;
  title: string;
  description: string;
  iconBg: string;
  href?: string;
}[] = [
  {
    icon: PhotoScan,
    title: "AI 증거 분석",
    description: "사진 분석 및 결과 리포트",
    iconBg: "bg-primary-50",
    href: "/analyze",
  },
  {
    icon: Message,
    title: "익명 상담",
    description: "24시간 안전 챗봇 상담",
    iconBg: "bg-secondary-50",
    href: "/chat",
  },
  {
    icon: FileText,
    title: "피해 신고",
    description: "대응 절차 및 가이드",
    iconBg: "bg-primary-50",
    href: "/report",
  },
  {
    icon: ScanFace,
    title: "딥페이크 탐지",
    description: "얼굴 도용·합성 여부 확인",
    iconBg: "bg-secondary-50",
    href: "/detect",
  },
];

export default function MobileFeatureGrid() {
  return (
    <section id="mobile-features" className="w-full px-5 py-4 md:hidden">
      <div className="flex flex-col gap-4">
        <ScrollReveal distance={24} className="flex items-baseline justify-between gap-3">
          <h2 className="text-primary-500 text-h3 font-bold">주요 기능</h2>
          <p className="text-caption text-gray-700">카드를 누르면 바로 이동해요</p>
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-4">
          {features.map(({ icon: Icon, title, description, iconBg, href }, index) => {
            const content = (
              <>
                <div
                  className={`flex size-12 items-center justify-center rounded-xl ${iconBg} text-primary-500`}
                >
                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                    <Icon />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-body-2 font-bold text-black">{title}</h3>
                  <p className="text-caption text-gray-800">{description}</p>
                </div>
              </>
            );
            const cardStyle =
              "flex h-full flex-col gap-3 rounded-2xl border border-gray-300 bg-white p-5";

            return (
              <ScrollReveal key={title} delay={(index % 2) * 60} distance={24}>
                {href ? (
                  <Link href={href} className={`${cardStyle} transition-colors active:bg-gray-100`}>
                    {content}
                  </Link>
                ) : (
                  <div className={cardStyle}>{content}</div>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
