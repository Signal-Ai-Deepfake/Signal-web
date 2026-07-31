import type { ReactNode } from "react";
import StepIndicator from "@/shared/ui/StepIndicator";
import StepFooter from "./StepFooter";

const TOTAL_STEPS = 4;

export default function StepShell({ step, children }: { step: number; children: ReactNode }) {
  return (
    <div className="flex w-full max-w-[480px] flex-col gap-5 rounded-2xl bg-white px-12 py-8 shadow-md">
      <div className="flex w-full flex-col items-center gap-8">
        <StepIndicator total={TOTAL_STEPS} current={step} />
        {children}
      </div>
      <StepFooter />
    </div>
  );
}
