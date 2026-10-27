"use client";

import { Fragment } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import BotOutline from "@/shared/asset/svg/BotOutline";
import CheckCircle from "@/shared/asset/svg/CheckCircle";
import FileCheck from "@/shared/asset/svg/FileCheck";
import Globe from "@/shared/asset/svg/Globe";
import ScanFace from "@/shared/asset/svg/ScanFace";
import { useT } from "@/shared/i18n/I18nProvider";
import { uiMessages } from "@/shared/ui/messages";

const stepIcons = [ScanFace, Globe, BotOutline, FileCheck];

export default function AnalysisGuideCard() {
  const t = useT(uiMessages);
  const steps = stepIcons.map((icon, index) => ({ icon, label: t.detectSteps[index] }));

  return (
    <div className="w-full rounded-3xl border border-gray-200 bg-white p-5 md:h-[458px] md:p-8 lg:flex-1">
      <div className="mx-auto flex h-full max-w-[477px] flex-col justify-center">
        <div className="flex flex-col gap-3">
          <p className="text-body-1 font-semibold text-black">{t.uploadGuideTitle}</p>
          <ul className="flex flex-col gap-3">
            {t.uploadGuideItems.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <div className="text-primary-500 shrink-0 [&>svg]:h-6 [&>svg]:w-6">
                  <CheckCircle />
                </div>
                <span className="text-small md:text-large text-gray-650 font-semibold break-keep">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="my-6 h-px bg-gray-200 md:my-8" />
        <div className="flex flex-col gap-3">
          <p className="text-body-1 font-semibold text-black">{t.detectProcessTitle}</p>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <Fragment key={step.label}>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-primary-500 bg-primary-50 flex size-11 shrink-0 items-center justify-center rounded-lg md:size-14 [&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-8 md:[&>svg]:w-8">
                    <step.icon />
                  </div>
                  <p className="text-caption text-center whitespace-pre-line text-gray-800">
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="shrink-0 text-gray-600 [&>svg]:h-5 [&>svg]:w-2.5 md:[&>svg]:h-6 md:[&>svg]:w-3">
                    <Arrow />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
