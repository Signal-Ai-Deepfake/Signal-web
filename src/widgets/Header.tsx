"use client";

import { useEffect, useRef, useState } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import FileText from "@/shared/asset/svg/FileText";
import Image from "@/shared/asset/svg/Image";
import Logo from "@/shared/asset/svg/Logo";
import Message from "@/shared/asset/svg/Message";
import ScanFace from "@/shared/asset/svg/ScanFace";
import Button from "@/shared/ui/Button";
import FeatureCard from "@/shared/ui/FeatureCard";

const navItems = [
  {
    label: "AI 분석",
    items: [
      {
        icon: ScanFace,
        title: "얼굴 도용·딥페이크 탐지",
        description: "얼굴 도용 및 딥페이크 여부를 확인해요.",
      },
      { icon: Image, title: "AI 이미지 분석", description: "사진의 위험도를 분석해요." },
    ],
  },
  {
    label: "신고 지원",
    items: [
      { icon: Message, title: "익명 상담 챗봇", description: "AI 상담 챗봇이 24시간 상담해요." },
      {
        icon: FileText,
        title: "신고 지원",
        description: "신고 문서 작성과 기관 연계를 도와드려요.",
      },
    ],
  },
];

export default function Header() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (openIndex === null) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [openIndex]);

  return (
    <header className="relative w-full border-b border-gray-300 bg-white">
      <div className="mx-auto grid h-20 max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-5">
        <Logo />
        <nav ref={navRef} className="flex items-center gap-8">
          {navItems.map((nav, index) => (
            <div key={nav.label} className="relative">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex cursor-pointer items-center gap-1"
              >
                <span className="text-body-2 text-black">{nav.label}</span>
                <span
                  className={`text-gray-600 transition-transform [&>svg]:h-3 [&>svg]:w-3 ${
                    openIndex === index ? "-rotate-90" : "rotate-90"
                  }`}
                >
                  <Arrow />
                </span>
              </button>
              {openIndex === index && (
                <div className="absolute top-full left-1/2 z-20 animate-[dropdown-in_0.2s_ease-out_forwards] pt-3">
                  <FeatureCard items={nav.items} />
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-4">
          <Button variant="outline" className="h-[46px] w-[103px]">
            로그인
          </Button>
          <Button variant="primary" className="h-12">
            회원가입
          </Button>
        </div>
      </div>
    </header>
  );
}
