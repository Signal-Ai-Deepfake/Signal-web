"use client";

import { useEffect, useRef, useState } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import FileText from "@/shared/asset/svg/FileText";
import Image from "@/shared/asset/svg/Image";
import Message from "@/shared/asset/svg/Message";
import ScanFace from "@/shared/asset/svg/ScanFace";
import FeatureCard from "@/shared/ui/FeatureCard";

const navItems = [
  {
    label: "AI 분석",
    items: [
      {
        icon: ScanFace,
        title: "얼굴 도용·딥페이크 탐지",
        description: "얼굴 도용 및 딥페이크 여부를 확인해요.",
        href: "/detect",
      },
      {
        icon: Image,
        title: "AI 이미지 분석",
        description: "사진의 위험도를 분석해요.",
        href: "/analyze",
      },
    ],
  },
  {
    label: "신고 지원",
    items: [
      {
        icon: Message,
        title: "익명 상담 챗봇",
        description: "AI 상담 챗봇이 24시간 상담해요.",
        href: "/chat",
      },
      {
        icon: FileText,
        title: "신고 지원",
        description: "신고 문서 작성과 기관 연계를 도와드려요.",
        href: "/report",
      },
    ],
  },
];

export default function HeaderNav() {
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
    const closeOnScroll = () => setOpenIndex(null);

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("scroll", closeOnScroll);
    };
  }, [openIndex]);

  return (
    <nav ref={navRef} className="flex items-center gap-8">
      {navItems.map((nav, index) => (
        <div
          key={nav.label}
          className="relative"
          onMouseEnter={() => setOpenIndex(index)}
          onMouseLeave={() => setOpenIndex(null)}
        >
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
  );
}
