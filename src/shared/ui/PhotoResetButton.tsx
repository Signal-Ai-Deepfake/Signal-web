"use client";

import type { ButtonHTMLAttributes } from "react";
import Delete from "@/shared/asset/svg/Delete";
import { useT } from "@/shared/i18n/I18nProvider";
import { uiMessages } from "@/shared/ui/messages";

export default function PhotoResetButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const t = useT(uiMessages);
  return (
    <button
      type="button"
      className="flex h-[40px] min-w-[137px] items-center justify-center gap-2 rounded bg-red-50 px-3 text-red-500 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-red-50"
      {...props}
    >
      <div className="[&>svg]:h-6 [&>svg]:w-6">
        <Delete />
      </div>
      <span className="text-body-2 font-medium">{t.resetPhoto}</span>
    </button>
  );
}
