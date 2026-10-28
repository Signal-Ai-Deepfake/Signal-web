"use client";

import Image from "next/image";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import Lock from "@/shared/asset/svg/Lock";
import Sparkle from "@/shared/asset/svg/Sparkle";
import LinkButton from "@/shared/ui/LinkButton";
import { useT } from "@/shared/i18n/I18nProvider";
import { widgetMessages } from "@/widgets/messages";
import BrandText from "@/widgets/BrandText";

export default function CtaCard() {
  const t = useT(widgetMessages);
  return (
    <div
      id="cta"
      className="relative w-full max-w-[1280px] overflow-hidden rounded-2xl"
      style={{
        backgroundImage: "linear-gradient(78deg, #ffffff 52%, var(--color-secondary-50) 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-start gap-6 px-5 py-7 md:px-9 md:max-xl:items-center md:max-xl:py-14 md:max-xl:text-center xl:py-10">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="text-body-1 md:text-h3 font-semibold text-black">{t.cta.line1}</p>
            <p className="text-body-1 md:text-h3 font-semibold break-keep">
              <BrandText segments={t.cta.line2} className="text-black" />
            </p>
          </div>
          <p className="text-small break-keep text-gray-800">{t.cta.description}</p>
        </div>
        <LinkButton href="/chat" variant="primary" className="w-full gap-1 md:w-auto">
          {t.cta.button}
          <span className="[&>svg]:h-6 [&>svg]:w-6">
            <ArrowUp />
          </span>
        </LinkButton>
        <div className="flex items-center gap-1 text-gray-800">
          <span className="shrink-0 [&>svg]:h-6 [&>svg]:w-6">
            <Lock />
          </span>
          <p className="text-caption md:text-small">{t.cta.note}</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[560px] xl:block">
        <Image
          src="/images/landing/wave-2.svg"
          alt=""
          width={966}
          height={156}
          className="absolute top-[45%] left-0 h-auto w-[480px]"
        />
        <Image
          src="/images/landing/wave-1.svg"
          alt=""
          width={966}
          height={156}
          className="absolute top-[30%] left-4 h-auto w-[480px] -rotate-6"
        />
        <Image
          src="/images/landing/ellipse-1.svg"
          alt=""
          width={420}
          height={420}
          className="absolute top-1/2 right-[-40px] h-[420px] w-[420px] -translate-y-1/2"
        />
        <Image
          src="/images/landing/ellipse-5.svg"
          alt=""
          width={300}
          height={300}
          className="absolute top-1/2 right-16 h-[300px] w-[300px] -translate-y-1/2"
        />
        <Image
          src="/images/landing/group-7.svg"
          alt=""
          width={300}
          height={300}
          className="absolute top-1/2 right-1 h-[300px] w-[300px] -translate-y-1/2"
        />
        <span className="absolute top-9 right-44 text-white [&>svg]:h-5 [&>svg]:w-5">
          <Sparkle />
        </span>
        <span className="absolute top-16 right-14 text-white [&>svg]:h-5 [&>svg]:w-5">
          <Sparkle />
        </span>
        <span className="text-secondary-200 absolute top-10 right-72 [&>svg]:h-5 [&>svg]:w-5">
          <Sparkle />
        </span>
      </div>
    </div>
  );
}
