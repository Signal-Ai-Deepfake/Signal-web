"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ComponentType } from "react";
import Home from "@/shared/asset/svg/Home";
import Message from "@/shared/asset/svg/Message";
import PhotoScan from "@/shared/asset/svg/PhotoScan";
import User from "@/shared/asset/svg/User";
import { useIsLoggedIn } from "@/shared/lib/useIsLoggedIn";
import { analysisNavGroup, supportNavGroup } from "@/widgets/HeaderNav";

type NavGroup = typeof analysisNavGroup;

type Tab =
  | { kind: "link"; icon: ComponentType; label: string; href: string; match: string[] }
  | { kind: "sheet"; icon: ComponentType; label: string; group: NavGroup; match: string[] };

const tabs: Tab[] = [
  { kind: "link", icon: Home, label: "홈", href: "/", match: [] },
  {
    kind: "sheet",
    icon: PhotoScan,
    label: "분석",
    group: analysisNavGroup,
    match: analysisNavGroup.items.map((item) => item.href),
  },
  {
    kind: "sheet",
    icon: Message,
    label: "상담·신고",
    group: supportNavGroup,
    match: [...supportNavGroup.items.map((item) => item.href), "/support-referral"],
  },
  { kind: "link", icon: User, label: "마이페이지", href: "/mypage/profile", match: ["/mypage"] },
];

const tabClass = "flex flex-col items-center gap-1 px-4 py-2";

function TabContent({ icon: Icon, label }: { icon: ComponentType; label: string }) {
  return (
    <>
      <span className="[&>svg]:h-6 [&>svg]:w-6">
        <Icon />
      </span>
      <span className="text-caption">{label}</span>
    </>
  );
}

export default function MobileBottomNav() {
  const isLoggedIn = useIsLoggedIn();
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [group, setGroup] = useState<NavGroup>(analysisNavGroup);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sheetOpen) return;
    sheetRef.current?.querySelector<HTMLElement>("a[href]")?.focus({ preventScroll: true });
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSheetOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [sheetOpen]);

  if (!isLoggedIn) return null;

  function isTabActive(tab: Tab) {
    if (tab.kind === "link" && tab.href === "/") return pathname === "/";
    const paths = tab.kind === "link" ? [tab.href, ...tab.match] : tab.match;
    return paths.some((path) => pathname.startsWith(path));
  }

  function openSheet(nextGroup: NavGroup) {
    setGroup(nextGroup);
    setSheetOpen(true);
  }

  return (
    <>
      <div
        className="h-[calc(4rem+env(safe-area-inset-bottom))] w-full md:hidden print:hidden"
        aria-hidden
      />
      <nav className="fixed bottom-0 left-0 z-30 flex h-[calc(4rem+env(safe-area-inset-bottom))] w-full items-center justify-around border-t border-gray-300 bg-white pb-[env(safe-area-inset-bottom)] md:hidden print:hidden">
        {tabs.map((tab) => {
          const isActive = isTabActive(tab);
          if (tab.kind === "link") {
            return (
              <Link
                key={tab.label}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={`${tabClass} ${isActive ? "text-primary-500" : "text-gray-650"}`}
              >
                <TabContent icon={tab.icon} label={tab.label} />
              </Link>
            );
          }
          const isOpen = sheetOpen && group === tab.group;
          return (
            <button
              key={tab.label}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              aria-current={isActive ? "page" : undefined}
              onClick={() => openSheet(tab.group)}
              className={`${tabClass} cursor-pointer ${
                isActive || isOpen ? "text-primary-500" : "text-gray-650"
              }`}
            >
              <TabContent icon={tab.icon} label={tab.label} />
            </button>
          );
        })}
      </nav>

      <div
        className={`fixed inset-0 z-40 md:hidden print:hidden ${sheetOpen ? "" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label={group.label}
        aria-hidden={!sheetOpen}
        inert={!sheetOpen}
      >
        <button
          type="button"
          aria-label="닫기"
          onClick={() => setSheetOpen(false)}
          className={`absolute inset-0 cursor-default bg-black/40 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            sheetOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          ref={sheetRef}
          className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 rounded-t-3xl bg-white px-5 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
            sheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <span aria-hidden className="mx-auto mb-2 h-1 w-10 rounded-full bg-gray-300" />
          <p className="text-body-1 px-1 pb-1 font-bold text-black">{group.label}</p>
          {group.items.map(({ icon: Icon, title, description, href }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSheetOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-4 rounded-2xl p-3 transition-colors active:bg-gray-100 ${
                  isActive ? "bg-primary-50" : ""
                }`}
              >
                <span className="bg-primary-50 text-primary-500 flex size-12 shrink-0 items-center justify-center rounded-xl [&>svg]:h-6 [&>svg]:w-6">
                  <Icon />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span
                    className={`text-body-2 font-semibold ${
                      isActive ? "text-primary-500" : "text-black"
                    }`}
                  >
                    {title}
                  </span>
                  <span className="text-small text-gray-650 break-keep">{description}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
