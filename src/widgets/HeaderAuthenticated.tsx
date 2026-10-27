"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Arrow from "@/shared/asset/svg/Arrow";
import Bell from "@/shared/asset/svg/Bell";
import Logo from "@/shared/asset/svg/Logo";
import User from "@/shared/asset/svg/User";
import { useHideOnScroll } from "@/shared/lib/useHideOnScroll";
import { clearAuthTokens } from "@/shared/lib/authToken";
import { resolveFileUrl } from "@/shared/lib/resolveFileUrl";
import { logout } from "@/entities/user/api";
import { useMyProfile } from "@/entities/user/useMyProfile";
import HeaderNav from "@/widgets/HeaderNav";
import { useT } from "@/shared/i18n/I18nProvider";
import { widgetMessages } from "@/widgets/messages";
import LanguageSwitcher from "@/widgets/LanguageSwitcher";

const myMenuItems = [
  { label: "myProfile", href: "/mypage/profile" },
  { label: "myChats", href: "/mypage/chats" },
  { label: "myReports", href: "/mypage/reports" },
] as const;

export default function HeaderAuthenticated({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hidden = useHideOnScroll();
  const { data: profile } = useMyProfile();
  const t = useT(widgetMessages);
  const userName = profile?.name ?? t.header.defaultUserName;
  const userAvatarUrl = profile?.profileImageUrl;

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

  async function handleLogout() {
    await logout().catch(() => undefined);
    clearAuthTokens();
    setOpen(false);
    router.push("/");
  }

  return (
    <header
      className={`sticky top-0 z-30 w-full border-b border-gray-300 bg-white transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${className}`}
    >
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="shrink-0 max-md:[&>svg]:h-[30px] max-md:[&>svg]:w-[95px]">
          <Logo />
        </Link>
        <HeaderNav />
        <div ref={menuRef} className="relative flex items-center justify-end gap-4 md:gap-2">
          <LanguageSwitcher className="hidden md:block" />
          <button
            type="button"
            aria-label={t.header.notifications}
            className="text-primary-500 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors active:bg-gray-200 md:hidden"
          >
            <Bell />
          </button>
          <button
            type="button"
            aria-label={t.header.myMenu}
            onClick={() => setOpen((prev) => !prev)}
            className="flex cursor-pointer items-center gap-2 rounded-full transition-colors active:bg-gray-100 md:p-1"
          >
            <span className="border-primary-50 flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-gray-200 text-gray-600 md:size-8 md:border-0 [&>svg]:h-5 [&>svg]:w-5">
              {userAvatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resolveFileUrl(userAvatarUrl)}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <User />
              )}
            </span>
            <span className="text-body-2 hidden text-black md:inline">{userName}</span>
            <span
              className={`hidden text-gray-600 transition-transform md:inline [&>svg]:h-3 [&>svg]:w-3 ${
                open ? "-rotate-90" : "rotate-90"
              }`}
            >
              <Arrow />
            </span>
          </button>
          {open && (
            <div className="absolute top-full right-0 z-20 mt-2 w-[260px] animate-[fade-in-up_0.2s_ease-out] rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="flex items-center gap-3 p-4">
                <span className="text-body-1 flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 font-semibold text-gray-600 [&>svg]:h-6 [&>svg]:w-6">
                  {userAvatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={resolveFileUrl(userAvatarUrl)}
                      alt=""
                      className="size-full object-cover"
                    />
                  ) : (
                    userName.charAt(0)
                  )}
                </span>
                <div className="flex min-w-0 flex-col">
                  <p className="text-body-1 truncate font-semibold text-black">{userName}</p>
                  {profile?.email && (
                    <p className="text-small truncate text-gray-600">{profile.email}</p>
                  )}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200" />
              <div className="p-2">
                {myMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-body-2 block w-full rounded-lg px-3 py-3 text-left text-black transition-colors hover:bg-gray-100 active:bg-gray-200"
                  >
                    {t.header[item.label]}
                  </Link>
                ))}
              </div>
              <div className="h-px w-full bg-gray-200" />
              <LanguageSwitcher variant="list" className="px-4 py-3 md:hidden" />
              <div className="h-px w-full bg-gray-200 md:hidden" />
              <div className="p-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-body-2 w-full cursor-pointer rounded-lg px-3 py-3 text-left text-red-500 transition-colors hover:bg-gray-100 active:bg-gray-200"
                >
                  {t.header.logout}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
