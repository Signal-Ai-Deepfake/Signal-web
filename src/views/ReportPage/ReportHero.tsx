"use client";

import Link from "next/link";
import Arrow from "@/shared/asset/svg/Arrow";
import CheckCircle from "@/shared/asset/svg/CheckCircle";
import BackButton from "@/shared/ui/BackButton";
import { useT } from "@/shared/i18n/I18nProvider";
import { reportMessages } from "./messages";
import { uiMessages } from "@/shared/ui/messages";

export default function ReportHero() {
  const t = useT(reportMessages);
  const ui = useT(uiMessages);
  return (
    <div className="flex w-full flex-col gap-5 md:gap-6">
      <div className="flex max-w-[670px] flex-col gap-6">
        <BackButton className="md:hidden" />
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/" className="text-body-1 text-gray-800">
            {ui.home}
          </Link>
          <span className="text-gray-800 [&>svg]:h-[18px] [&>svg]:w-[18px]">
            <Arrow />
          </span>
          <span className="text-body-1 text-primary-500">{t.title}</span>
        </div>
        <div className="flex flex-col gap-2 md:gap-6">
          <h1 className="text-h3 md:text-h1 font-bold text-black">{t.title}</h1>
          <p className="text-small md:text-body-1 break-keep text-gray-800">
            {t.intro[0]}
            <br className="hidden md:block" /> {t.intro[1]}
          </p>
          <Link
            href="/report/guide"
            className="text-small md:text-body-2 text-primary-450 hover:text-primary-500 flex w-fit items-center gap-0.5 font-medium underline-offset-4 hover:underline"
          >
            {t.guideLink}
            <span className="[&>svg]:h-4 [&>svg]:w-2">
              <Arrow />
            </span>
          </Link>
        </div>
      </div>
      <div className="bg-primary-50 flex w-full items-start gap-2.5 rounded-lg px-4 py-3.5 md:gap-3.5 md:px-5 md:py-4.5">
        <span className="text-primary-500 mt-0.5 shrink-0 [&>svg]:h-5 [&>svg]:w-5 md:[&>svg]:h-6 md:[&>svg]:w-6">
          <CheckCircle />
        </span>
        <div className="flex flex-col gap-0.5">
          <p className="text-small text-primary-500">{t.localOnly}</p>
          <p className="md:text-small text-caption break-keep text-gray-800">{t.notPerfect}</p>
        </div>
      </div>
    </div>
  );
}
