"use client";

import { Fragment, useId, useState } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import { useT } from "@/shared/i18n/I18nProvider";
import { guideMessages } from "./guideContent";

export default function GuideCaseAccordion() {
  const t = useT(guideMessages);
  const guideCases = t.cases;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="flex w-full flex-col">
      <div className="flex items-center justify-between py-6 md:pt-0">
        <h2 className="text-xl font-bold text-black md:text-[28px]">{t.casesTitle}</h2>
        <span className="bg-primary-50 text-primary-500 rounded-full px-3 py-1 text-[13px] font-medium">
          {t.caseCount(guideCases.length)}
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {guideCases.map(({ title, description, actions }, index) => {
          const open = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          return (
            <Fragment key={title}>
              {index > 0 && (
                <li aria-hidden className="px-4">
                  <div className="bg-primary-50 h-px w-full" />
                </li>
              )}
              <li
                className={`rounded-2xl border transition-colors ${
                  open ? "bg-primary-50 border-primary-500/10" : "border-transparent"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl p-4 text-left ${
                    open ? "" : "hover:bg-gray-100 active:bg-gray-200"
                  }`}
                >
                  <span
                    className={`text-[15px] leading-[1.5] break-keep ${
                      open ? "text-primary-500 font-bold" : "font-medium text-black"
                    }`}
                  >
                    {title}
                  </span>
                  <span
                    className={`shrink-0 transition-transform duration-200 [&>svg]:h-5 [&>svg]:w-2.5 ${
                      open ? "text-primary-500 rotate-90" : "text-gray-600"
                    }`}
                  >
                    <Arrow />
                  </span>
                </button>
                <div
                  id={panelId}
                  inert={!open}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`flex flex-col gap-3 px-4 pb-4 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none ${
                        open ? "translate-y-0 opacity-100 delay-75" : "-translate-y-2 opacity-0"
                      }`}
                    >
                      <p className="text-small text-primary-500/80 leading-[1.625] break-keep">
                        {description}
                      </p>
                      <ul className="flex flex-col gap-1.5 rounded-xl bg-white/70 p-3">
                        {actions.map((action) => (
                          <li
                            key={action}
                            className="text-small text-primary-500 flex gap-2 leading-[1.5] break-keep"
                          >
                            <span className="bg-primary-450 mt-2 size-1 shrink-0 rounded-full" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </section>
  );
}
