"use client";

import Link from "next/link";

import Logo from "@/shared/asset/svg/Logo";
import { useT } from "@/shared/i18n/I18nProvider";
import { widgetMessages } from "@/widgets/messages";
import LanguageSwitcher from "@/widgets/LanguageSwitcher";

const serviceLinks = [
  { key: "analyze", href: "/analyze" },
  { key: "detect", href: "/detect" },
  { key: "chat", href: "/chat" },
  { key: "report", href: "/report" },
] as const;
const legalLinks = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
] as const;

export default function Footer() {
  const t = useT(widgetMessages);
  return (
    <footer className="w-full bg-gray-100">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-10 md:gap-8 md:py-16">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:gap-10">
          <div className="flex flex-col gap-4 max-md:[&>svg]:h-[30px] max-md:[&>svg]:w-[95px]">
            <Logo />
            <p className="text-small md:text-body-2 text-gray-650 break-keep">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-col gap-3 md:gap-5">
            <p className="text-large font-medium text-black">{t.footer.services}</p>
            <ul className="flex flex-col gap-2 md:gap-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-small md:text-body-2 text-gray-650 hover:text-primary-500 transition-colors hover:underline"
                  >
                    {t.nav[link.key].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-px w-full bg-gray-300" />
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-3">
            <LanguageSwitcher variant="list" />
            <p className="text-caption text-gray-600">© 2026 SIGNAL. All rights reserved.</p>
          </div>
          <div className="flex gap-6 md:gap-14">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-small text-gray-650 hover:underline"
              >
                {t.footer[link.key]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
