"use client";

import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import AnalysisStepCard from "@/shared/ui/AnalysisStepCard";
import { useT } from "@/shared/i18n/I18nProvider";
import { uiMessages } from "@/shared/ui/messages";

export default function UploadStepCard() {
  const t = useT(uiMessages);
  return (
    <AnalysisStepCard step="01" title={t.stepUpload} size="sm">
      <div className="flex h-[119px] w-[192px] flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-[10px] py-4">
        <div className="text-primary-500 [&>svg]:h-10 [&>svg]:w-10">
          <ImageArrowUp />
        </div>
        <p className="text-body-2 text-black">{t.stepUpload}</p>
        <p className="text-caption text-center text-gray-700">{t.fileTypes}</p>
      </div>
      <div className="h-[121px] w-[192px] rounded-xl border border-gray-200 bg-gray-50 px-[10px] py-4" />
    </AnalysisStepCard>
  );
}
