"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import Home from "@/shared/asset/svg/Home";
import Message from "@/shared/asset/svg/Message";
import PhotoScan from "@/shared/asset/svg/PhotoScan";
import User from "@/shared/asset/svg/User";
import { useIsLoggedIn } from "@/shared/lib/useIsLoggedIn";

const navItems: { icon: ComponentType; label: string; href: string }[] = [
  { icon: Home, label: "홈", href: "/" },
  { icon: PhotoScan, label: "분석", href: "/analyze" },
  { icon: Message, label: "채팅", href: "/chat" },
  { icon: User, label: "마이페이지", href: "/mypage/profile" },
];

export default function MobileBottomNav() {
  const isLoggedIn = useIsLoggedIn();
  const pathname = usePathname();

  if (!isLoggedIn) return null;

  return (
    <>
      <div className="h-16 w-full md:hidden" aria-hidden />
      <nav className="fixed bottom-0 left-0 z-30 flex h-16 w-full items-center justify-around border-t border-gray-300 bg-white md:hidden">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${
                isActive ? "text-primary-500" : "text-gray-500"
              }`}
            >
              <span className="[&>svg]:h-6 [&>svg]:w-6">
                <Icon />
              </span>
              <span className="text-caption">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
