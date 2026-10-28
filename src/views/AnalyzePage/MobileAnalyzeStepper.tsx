"use client";

import type { Status } from "./AnalyzePage";
import { useT } from "@/shared/i18n/I18nProvider";
import { analyzeMessages } from "./messages";

const stepNumbers = [1, 2, 3] as const;

function statusToStep(status: Status): 1 | 2 | 3 {
  if (status === "analyzing") return 2;
  if (status === "result") return 3;
  return 1;
}

export default function MobileAnalyzeStepper({ status }: { status: Status }) {
  const currentStep = statusToStep(status);
  const t = useT(analyzeMessages);
  const steps = stepNumbers.map((step, index) => ({ step, label: t.steps[index] }));

  return (
    <div className="flex w-full items-center px-2 md:hidden">
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
              className={`text-caption font-bold ${
                step <= currentStep ? "text-primary-500" : "text-gray-800"
              }`}
            >
              {label}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 px-2 pb-6">
              <div className="bg-primary-50 h-0.5 w-full" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
