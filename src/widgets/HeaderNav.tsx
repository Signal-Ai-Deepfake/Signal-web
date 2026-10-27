"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import FileText from "@/shared/asset/svg/FileText";
import Globe from "@/shared/asset/svg/Globe";
import Image from "@/shared/asset/svg/Image";
import Message from "@/shared/asset/svg/Message";
import ScanFace from "@/shared/asset/svg/ScanFace";
import FeatureCard from "@/shared/ui/FeatureCard";
import { useT } from "@/shared/i18n/I18nProvider";
import { widgetMessages } from "@/widgets/messages";

type NavItemKey = "detect" | "analyze" | "monitoring" | "chat" | "report";

export interface NavGroupDef {
  key: "analysis" | "support";
  items: { key: NavItemKey; icon: ComponentType; href: string }[];
}

export const analysisNavGroup: NavGroupDef = {
  key: "analysis",
  items: [
    { key: "detect", icon: ScanFace, href: "/detect" },
    { key: "analyze", icon: Image, href: "/analyze" },
    { key: "monitoring", icon: Globe, href: "/monitoring" },
  ],
};

export const supportNavGroup: NavGroupDef = {
  key: "support",
  items: [
    { key: "chat", icon: Message, href: "/chat" },
    { key: "report", icon: FileText, href: "/report" },
  ],
};

export const headerNavItems = [analysisNavGroup, supportNavGroup];

export function useNavGroupText() {
  const t = useT(widgetMessages);
  return (group: NavGroupDef) => ({
    label: t.nav[group.key],
    items: group.items.map((item) => ({ ...item, ...t.nav[item.key] })),
  });
}

export default function HeaderNav() {
  const localize = useNavGroupText();
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
    <nav ref={navRef} className="hidden items-center gap-8 md:flex">
      {headerNavItems.map(localize).map((nav, index) => (
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
