"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import { canGoBack, useGoBack } from "@/shared/lib/useGoBack";
import { useT } from "@/shared/i18n/I18nProvider";
import { uiMessages } from "@/shared/ui/messages";

interface BackButtonProps {
  href?: string;
  className?: string;
}

export default function BackButton({ href = "/", className = "" }: BackButtonProps) {
  const goBack = useGoBack(href);
  const t = useT(uiMessages);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    if (!canGoBack()) return;
    event.preventDefault();
    goBack();
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`text-body-2 flex items-center gap-1 text-gray-800 ${className}`}
    >
      <span className="block rotate-180 [&>svg]:h-4 [&>svg]:w-4">
        <Arrow />
      </span>
      {t.back}
    </Link>
  );
}
