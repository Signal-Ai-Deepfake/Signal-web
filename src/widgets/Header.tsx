"use client";

import Logo from "@/shared/asset/svg/Logo";
import { useHideOnScroll } from "@/shared/lib/useHideOnScroll";
import LinkButton from "@/shared/ui/LinkButton";
import HeaderNav from "@/widgets/HeaderNav";

export default function Header() {
  const hidden = useHideOnScroll();

  return (
    <header
      className={`sticky top-0 z-30 w-full border-b border-gray-300 bg-white transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto grid h-20 max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-5">
        <Logo />
        <HeaderNav />
        <div className="flex items-center justify-end gap-4">
          <LinkButton href="/login" variant="outline" className="h-[46px] w-[103px]">
            로그인
          </LinkButton>
          <LinkButton href="/signup" variant="primary" className="h-12">
            회원가입
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
