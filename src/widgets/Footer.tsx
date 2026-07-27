import Link from "next/link";

import Logo from "@/shared/asset/svg/Logo";

const serviceLinks = ["AI 이미지 분석", "얼굴 도용·딥페이크 탐지", "익명 상담 챗봇", "신고 지원"];
const legalLinks = [
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-body-2 text-gray-650">
              디지털 괴롭힘, 딥페이크, 얼굴 도용 등 온라인 위험을 AI 기술로 예방하고 대응합니다.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-large font-medium text-black">서비스</p>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link} className="text-body-2 text-gray-650">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-px w-full bg-gray-300" />
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-caption text-gray-600">© 2026 SIGNAL. All rights reserved.</p>
          <div className="flex gap-14">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-small text-gray-650 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
