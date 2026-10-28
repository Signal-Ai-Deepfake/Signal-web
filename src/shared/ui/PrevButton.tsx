"use client";

import { useT } from "@/shared/i18n/I18nProvider";
import { uiMessages } from "@/shared/ui/messages";
export default function PrevButton({ onClick }: { onClick: () => void }) {
  const t = useT(uiMessages);
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-body-2 flex h-11 cursor-pointer items-center justify-center rounded border border-gray-400 text-gray-600"
    >
      {t.prev}
    </button>
  );
}
