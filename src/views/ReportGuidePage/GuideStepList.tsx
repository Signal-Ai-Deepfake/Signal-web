"use client";

import { useT } from "@/shared/i18n/I18nProvider";
import { guideMessages } from "./guideContent";

export default function GuideStepList() {
  const t = useT(guideMessages);
  const guideSteps = t.steps;
  return (
    <section className="flex w-full flex-col gap-4 md:gap-6">
      <h2 className="text-xl font-bold text-black md:text-[28px]">{t.stepsTitle}</h2>
      <ol className="grid w-full grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
        {guideSteps.map(({ title, description }, index) => (
          <li
            key={title}
            className="border-primary-50 flex gap-4 rounded-2xl border bg-white p-4 shadow-sm md:flex-col md:gap-5 md:p-6"
          >
            <span className="bg-primary-500 text-small md:text-body-2 flex size-8 shrink-0 items-center justify-center rounded-full font-bold text-white md:size-10">
              {index + 1}
            </span>
            <div className="flex flex-col gap-1 md:gap-2">
              <h3 className="text-body-2 md:text-body-1 font-bold text-black">{title}</h3>
              <p className="text-small text-gray-650 leading-[1.625] break-keep">{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
