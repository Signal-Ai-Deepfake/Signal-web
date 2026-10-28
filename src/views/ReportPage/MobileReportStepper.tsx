"use client";

import { useT } from "@/shared/i18n/I18nProvider";
import { reportMessages } from "./messages";
const stepNumbers = [1, 2, 3, 4] as const;

export default function MobileReportStepper({ currentStep }: { currentStep: number }) {
  const t = useT(reportMessages);
  const steps = stepNumbers.map((step, index) => ({ step, label: t.steps[index] }));
  return (
    <div className="flex w-full items-center px-1 md:hidden">
      {steps.map(({ step, label }, index) => (
        <div key={step} className="contents">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`text-body-2 flex size-8 shrink-0 items-center justify-center rounded-full font-bold ${
                step <= currentStep ? "bg-primary-500 text-white" : "bg-primary-50 text-gray-800"
              }`}
            >
              {step}
            </div>
            <p
              className={`text-caption font-bold whitespace-nowrap ${
                step <= currentStep ? "text-primary-500" : "text-gray-800"
              }`}
            >
              {label}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 px-1.5 pb-6">
              <div
                className={`h-0.5 w-full ${step < currentStep ? "bg-primary-500" : "bg-primary-50"}`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
