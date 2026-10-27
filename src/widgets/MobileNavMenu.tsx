"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "@/shared/asset/svg/Menu";
import LinkButton from "@/shared/ui/LinkButton";
import { headerNavItems, useNavGroupText } from "@/widgets/HeaderNav";
import { useT } from "@/shared/i18n/I18nProvider";
import { widgetMessages } from "@/widgets/messages";
import LanguageSwitcher from "@/widgets/LanguageSwitcher";

export default function MobileNavMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const localize = useNavGroupText();
  const t = useT(widgetMessages);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const closeOnScroll = () => setOpen(false);

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("scroll", closeOnScroll);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="md:hidden">
      <button
        type="button"
        aria-label={open ? t.header.closeMenu : t.header.openMenu}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        onClick={() => setOpen((prev) => !prev)}
        className="text-primary-500 active:bg-primary-50 flex size-10 cursor-pointer items-center justify-center rounded-full"
      >
        <Menu />
      </button>
      {open && (
        <nav
          id="mobile-nav-menu"
          className="absolute inset-x-0 top-full flex max-h-[calc(100dvh-5rem)] animate-[fade-in-up_0.2s_ease-out] flex-col gap-5 overflow-y-auto border-b border-gray-300 bg-white px-5 pt-4 pb-6 shadow-lg"
        >
          {headerNavItems.map(localize).map((group) => (
            <div key={group.label} className="flex flex-col gap-1">
              <p className="text-caption text-gray-650 px-3 font-semibold">{group.label}</p>
              {group.items.map(({ icon: Icon, title, href }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`text-body-2 flex items-center gap-3 rounded-xl px-3 py-3 transition-colors active:bg-gray-100 ${
                      active ? "bg-primary-50 text-primary-500 font-semibold" : "text-black"
                    }`}
                  >
                    <span className="bg-primary-50 text-primary-500 flex size-9 shrink-0 items-center justify-center rounded-lg [&>svg]:h-5 [&>svg]:w-5">
                      <Icon />
                    </span>
                    {title}
                  </Link>
                );
              })}
            </div>
          ))}
          <LinkButton
            href="/signup"
            variant="primary"
            className="h-12 w-full"
            onClick={() => setOpen(false)}
          >
            {t.header.signupToSave}
          </LinkButton>
          <LanguageSwitcher variant="list" className="justify-center" />
        </nav>
      )}
    </div>
  );
}
