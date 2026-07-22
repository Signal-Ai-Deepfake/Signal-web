"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Arrow from "@/shared/asset/svg/Arrow";
import Logo from "@/shared/asset/svg/Logo";
import User from "@/shared/asset/svg/User";
import { useHideOnScroll } from "@/shared/lib/useHideOnScroll";
import { clearAuthTokens } from "@/shared/lib/authToken";
import HeaderNav from "@/widgets/HeaderNav";

const myMenuItems = [
  { label: "내 프로필", href: "/mypage/profile" },
  { label: "대화 내역", href: "/mypage/chats" },
  { label: "신고 문서 내역", href: "/mypage/reports" },
];

interface HeaderAuthenticatedProps {
  userName?: string;
  userAvatarUrl?: string;
}

export default function HeaderAuthenticated({
  userName = "사용자",
  userAvatarUrl,
}: HeaderAuthenticatedProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hidden = useHideOnScroll();

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function handleLogout() {
    clearAuthTokens();
    setOpen(false);
    router.push("/login");
  }

  return (
    <header
      className={`sticky top-0 z-30 w-full border-b border-gray-300 bg-white transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto grid h-20 max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-5">
        <Logo />
        <HeaderNav />
        <div ref={menuRef} className="relative flex items-center justify-end">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex cursor-pointer items-center gap-2 rounded-full p-1 transition-colors active:bg-gray-100"
          >
            <span className="bg-gray-200 flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full text-gray-600 [&>svg]:h-5 [&>svg]:w-5">
              {userAvatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={userAvatarUrl} alt="" className="size-full object-cover" />
              ) : (
                <User />
              )}
            </span>
            <span className="text-body-2 text-black">{userName}</span>
            <span
              className={`text-gray-600 transition-transform [&>svg]:h-3 [&>svg]:w-3 ${
                open ? "-rotate-90" : "rotate-90"
              }`}
            >
              <Arrow />
            </span>
          </button>
          {open && (
            <div className="absolute top-full right-0 z-20 mt-2 w-[180px] animate-[fade-in-up_0.2s_ease-out] rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
              {myMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-body-2 block w-full rounded-lg px-3 py-2.5 text-left text-black transition-colors hover:bg-gray-100 active:bg-gray-200"
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-1 h-px w-full bg-gray-300" />
              <button
                type="button"
                onClick={handleLogout}
                className="text-body-2 w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-black transition-colors hover:bg-gray-100 active:bg-gray-200"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
