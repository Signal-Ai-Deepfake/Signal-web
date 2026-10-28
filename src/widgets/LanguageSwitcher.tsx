"use client";

import { useEffect, useRef, useState } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import Globe from "@/shared/asset/svg/Globe";
import { localeNames, locales } from "@/shared/i18n/config";
import { useLocale, useT } from "@/shared/i18n/I18nProvider";
import { widgetMessages } from "@/widgets/messages";

interface LanguageSwitcherProps {
  variant?: "dropdown" | "list";
  className?: string;
}

export default function LanguageSwitcher({
  variant = "dropdown",
  className = "",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();
  const t = useT(widgetMessages);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
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

  if (variant === "list") {
    return (
      <div
        role="group"
        aria-label={t.header.language}
        className={`flex flex-wrap items-center gap-1.5 ${className}`}
      >
        <span className="text-gray-650 mr-1 [&>svg]:h-4 [&>svg]:w-4">
          <Globe />
        </span>
        {locales.map((option) => {
          const active = option === locale;
          return (
            <button
              key={option}
              type="button"
              lang={option}
              aria-pressed={active}
              onClick={() => setLocale(option)}
              className={`text-small cursor-pointer rounded-full px-2.5 py-1.5 whitespace-nowrap transition-colors md:px-3 ${
                active
                  ? "bg-primary-500 font-semibold text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {localeNames[option]}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={t.header.language}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="text-body-2 flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-2 whitespace-nowrap text-gray-800 transition-colors hover:bg-gray-100"
      >
        <span className="[&>svg]:h-5 [&>svg]:w-5">
          <Globe />
        </span>
        {localeNames[locale]}
        <span
          className={`text-gray-600 transition-transform [&>svg]:h-3 [&>svg]:w-3 ${
            open ? "-rotate-90" : "rotate-90"
          }`}
        >
          <Arrow />
        </span>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={t.header.language}
          className="absolute top-full right-0 z-40 mt-2 w-40 animate-[fade-in-up_0.2s_ease-out] rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg"
        >
          {locales.map((option) => {
            const active = option === locale;
            return (
              <li key={option} role="option" aria-selected={active}>
                <button
                  type="button"
                  lang={option}
                  onClick={() => {
                    setLocale(option);
                    setOpen(false);
                  }}
                  className={`text-body-2 w-full cursor-pointer rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-gray-100 ${
                    active ? "text-primary-500 font-semibold" : "text-black"
                  }`}
                >
                  {localeNames[option]}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
