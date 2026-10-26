"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import ChevronLeft from "@/shared/asset/svg/ChevronLeft";
import Logo from "@/shared/asset/svg/Logo";
import Sparkle from "@/shared/asset/svg/Sparkle";
import { useGoBack } from "@/shared/lib/useGoBack";
import { useHideOnScroll } from "@/shared/lib/useHideOnScroll";

export const authCardClass =
  "relative flex w-full motion-safe:animate-[fade-in-up_0.4s_ease-out] flex-col gap-5 rounded-2xl bg-white px-6 py-8 shadow-md md:max-w-[520px] md:px-14 md:py-10 lg:px-12 lg:py-8";

export default function AuthPageShell({ children }: { children: ReactNode }) {
  const hidden = useHideOnScroll();
  const goBack = useGoBack();

  return (
    <div className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-[linear-gradient(170deg,#ffffff_5%,var(--color-secondary-50)_40%,var(--color-secondary-100)_100%)] md:bg-[linear-gradient(110deg,#ffffff_49%,var(--color-secondary-50)_96%)]">
      <img
        src="/images/login/ellipse-1.svg"
        alt=""
        className="pointer-events-none absolute -top-10 -left-56 size-[620px] md:top-40 md:-left-24 md:size-[685px]"
      />
      <img
        src="/images/login/group-7.svg"
        alt=""
        className="pointer-events-none absolute top-[300px] -left-48 size-[520px] md:top-[380px] md:-left-24 md:size-[640px]"
      />
      <img
        src="/images/login/ellipse-5.svg"
        alt=""
        className="pointer-events-none absolute top-16 -left-36 size-[400px] md:top-40 md:-left-12 md:size-[504px]"
      />
      <img
        src="/images/login/wave-1.svg"
        alt=""
        className="pointer-events-none absolute right-0 bottom-16 w-[340px] md:hidden xl:top-[280px] xl:bottom-auto xl:block xl:w-[500px] xl:opacity-100"
      />
      <img
        src="/images/login/wave-2.svg"
        alt=""
        className="pointer-events-none absolute top-[180px] right-0 hidden w-[480px] -rotate-12 xl:block"
      />
      <span className="pointer-events-none absolute top-[260px] right-40 hidden text-white xl:block [&>svg]:h-8 [&>svg]:w-8">
        <Sparkle />
      </span>
      <span className="pointer-events-none absolute right-8 bottom-40 text-white md:hidden xl:top-[160px] xl:right-16 xl:bottom-auto xl:block [&>svg]:h-6 [&>svg]:w-6 xl:[&>svg]:h-8 xl:[&>svg]:w-8">
        <Sparkle />
      </span>
      <span className="text-secondary-200 pointer-events-none absolute top-20 right-6 md:hidden xl:top-[280px] xl:right-auto xl:left-16 xl:block [&>svg]:h-6 [&>svg]:w-6 xl:[&>svg]:h-8 xl:[&>svg]:w-8">
        <Sparkle />
      </span>

      <header
        className={`sticky top-0 z-30 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm md:border-gray-300 md:bg-white md:backdrop-blur-none md:transition-transform md:duration-300 ${
          hidden ? "md:-translate-y-full" : ""
        }`}
      >
        <div className="relative mx-auto flex h-14 max-w-[1280px] items-center justify-center px-5 md:h-20 md:justify-start">
          <button
            type="button"
            onClick={goBack}
            aria-label="뒤로 가기"
            className="text-primary-500 active:bg-primary-50 absolute left-2 flex size-10 cursor-pointer items-center justify-center rounded-full md:hidden [&>svg]:h-[18px] [&>svg]:w-[11.25px]"
          >
            <ChevronLeft />
          </button>
          <Link
            href="/"
            aria-label="Signal 홈"
            className="max-md:[&>svg]:h-[26px] max-md:[&>svg]:w-[82px]"
          >
            <Logo />
          </Link>
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center px-5 py-8 md:py-16">
        {children}
      </main>
    </div>
  );
}
