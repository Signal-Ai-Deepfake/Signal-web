"use client";

import Link from "next/link";
import Logo from "@/shared/asset/svg/Logo";
import { useHideOnScroll } from "@/shared/lib/useHideOnScroll";
import LinkButton from "@/shared/ui/LinkButton";
import HeaderNav from "@/widgets/HeaderNav";
import MobileNavMenu from "@/widgets/MobileNavMenu";

export default function Header({ className = "" }: { className?: string }) {
  const hidden = useHideOnScroll();

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
        <div className="flex items-center justify-end gap-2 md:gap-4">
          <LinkButton
            href="/login"
            variant="outline"
            className="h-10 whitespace-nowrap md:h-[46px] md:w-[103px]"
          >
            로그인
          </LinkButton>
          <LinkButton
            href="/signup"
            variant="primary"
            className="hidden h-10 whitespace-nowrap min-[400px]:inline-flex md:h-12"
          >
            회원가입
          </LinkButton>
          <MobileNavMenu />
        </div>
      </div>
    </header>
  );
}
