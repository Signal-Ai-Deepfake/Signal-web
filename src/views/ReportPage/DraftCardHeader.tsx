"use client";

import BotOutline from "@/shared/asset/svg/BotOutline";
import { useT } from "@/shared/i18n/I18nProvider";
import { reportMessages } from "./messages";

interface DraftCardHeaderProps {
  title: string;
  description: string;
  status: string;
}

export default function DraftCardHeader({ title, description, status }: DraftCardHeaderProps) {
  const { draft } = useT(reportMessages);
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <span className="bg-primary-50 text-primary-500 text-caption w-fit rounded-full px-3 py-1">
            {draft.badge}
          </span>
          <p className="text-large md:text-h3 font-semibold break-keep text-black">{title}</p>
          <p className="text-small md:text-body-2 break-keep text-gray-800">{description}</p>
        </div>
        <p className="text-caption text-primary-500 shrink-0">✓ {status}</p>
      </div>

      <div className="bg-secondary-50 border-secondary-200 flex items-start gap-2 rounded-lg border p-3 md:items-center md:p-4">
        <span className="text-secondary-600 shrink-0 [&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-8 md:[&>svg]:w-8">
          <BotOutline />
        </span>
        <p className="text-small md:text-body-2 text-secondary-600 font-medium break-keep">
          {draft.aiNotice}
        </p>
      </div>
    </>
  );
}
