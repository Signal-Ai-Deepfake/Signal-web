"use client";

import Link from "next/link";
import Logo from "@/shared/asset/svg/Logo";
import { useIsLoggedIn } from "@/shared/lib/useIsLoggedIn";
import Header from "@/widgets/Header";
import HeaderAuthenticated from "@/widgets/HeaderAuthenticated";

export default function SiteHeader({ className = "" }: { className?: string }) {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn === null) {
    return (
      <header className={`sticky top-0 z-30 w-full border-b border-gray-300 bg-white ${className}`}>
        <div className="mx-auto flex h-20 max-w-[1280px] items-center px-5">
          <Link href="/" className="shrink-0 max-md:[&>svg]:h-[30px] max-md:[&>svg]:w-[95px]">
            <Logo />
          </Link>
        </div>
      </header>
    );
  }

  return isLoggedIn ? (
    <HeaderAuthenticated className={className} />
  ) : (
    <Header className={className} />
  );
}
