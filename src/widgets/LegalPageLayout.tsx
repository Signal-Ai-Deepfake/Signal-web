"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Arrow from "@/shared/asset/svg/Arrow";
import BackButton from "@/shared/ui/BackButton";
import Footer from "@/widgets/Footer";
import LegalTableOfContents from "@/widgets/LegalTableOfContents";
import SiteHeader from "@/widgets/SiteHeader";
import { useT } from "@/shared/i18n/I18nProvider";
import { widgetMessages } from "@/widgets/messages";
import { uiMessages } from "@/shared/ui/messages";

interface LegalPageLayoutProps {
  breadcrumbLabel: string;
  title: string;
  description: string;
  tocItems: { id: string; label: string }[];
  children: ReactNode;
}

export default function LegalPageLayout({
  breadcrumbLabel,
  title,
  description,
  tocItems,
  children,
}: LegalPageLayoutProps) {
  const t = useT(widgetMessages);
  const ui = useT(uiMessages);
  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-6 pb-[120px] md:py-10">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-6">
            <BackButton className="md:hidden" />
            <div className="hidden flex-wrap items-center gap-x-4 gap-y-2 md:flex">
              <Link href="/" className="text-body-1 text-gray-700">
                {ui.home}
              </Link>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <span className="text-body-1 text-primary-500">{breadcrumbLabel}</span>
            </div>
            <div className="flex flex-col gap-2 md:gap-6">
              <h1 className="text-h3 md:text-h1 font-bold text-black">{title}</h1>
              <p className="text-small md:text-body-1 break-keep text-gray-700">{description}</p>
            </div>
          </div>

          {t.legal.translationNotice && (
            <p className="bg-primary-50 text-primary-500 text-small rounded-lg px-4 py-3 font-medium">
              {t.legal.translationNotice}
            </p>
          )}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <LegalTableOfContents items={tocItems} />
            <article className="flex min-w-0 flex-1 flex-col">{children}</article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
