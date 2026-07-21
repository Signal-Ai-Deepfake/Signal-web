"use client";

import type { ReactNode } from "react";
import Logo from "@/shared/asset/svg/Logo";
import Sparkle from "@/shared/asset/svg/Sparkle";
import { useHideOnScroll } from "@/shared/lib/useHideOnScroll";

export default function AuthPageShell({ children }: { children: ReactNode }) {
  const hidden = useHideOnScroll();

  return (
    <div
      className="relative flex min-h-screen w-full flex-col overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(110deg, #ffffff 49%, var(--color-secondary-50) 96%)",
      }}
    >
      <img
        src="/images/login/ellipse-1.svg"
        alt=""
        className="pointer-events-none absolute -left-24 top-40 h-[685px] w-[685px]"
      />
      <img
        src="/images/login/group-7.svg"
        alt=""
        className="pointer-events-none absolute -left-24 top-[380px] h-[640px] w-[640px]"
      />
      <img
        src="/images/login/ellipse-5.svg"
        alt=""
        className="pointer-events-none absolute -left-12 top-40 h-[504px] w-[504px]"
      />
      <img
        src="/images/login/wave-1.svg"
        alt=""
        className="pointer-events-none absolute right-0 top-[280px] hidden w-[500px] xl:block"
      />
      <img
        src="/images/login/wave-2.svg"
        alt=""
        className="pointer-events-none absolute right-0 top-[180px] hidden w-[480px] -rotate-12 xl:block"
      />
      <span className="pointer-events-none absolute right-40 top-[260px] hidden text-white xl:block [&>svg]:h-8 [&>svg]:w-8">
        <Sparkle />
      </span>
      <span className="pointer-events-none absolute right-16 top-[160px] hidden text-white xl:block [&>svg]:h-8 [&>svg]:w-8">
        <Sparkle />
      </span>
      <span className="text-secondary-200 pointer-events-none absolute left-16 top-[280px] hidden xl:block [&>svg]:h-8 [&>svg]:w-8">
        <Sparkle />
      </span>

      <header
        className={`sticky top-0 z-30 w-full border-b border-gray-300 bg-white transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1280px] items-center px-5">
          <Logo />
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center px-5 py-16">{children}</main>
    </div>
  );
}
