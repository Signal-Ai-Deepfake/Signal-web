import type { ReactNode } from "react";
import StepIndicator from "@/shared/ui/StepIndicator";
import StepTransition from "@/shared/ui/StepTransition";
import StepFooter from "./StepFooter";
import { authCardClass } from "@/widgets/AuthPageShell";

const TOTAL_STEPS = 4;

interface StepShellProps {
  step: number;
  order?: number;
  children: ReactNode;
}

export default function StepShell({ step, order = step, children }: StepShellProps) {
  return (
    <div className={`${authCardClass} lg:max-w-[480px]`}>
      <div className="flex w-full flex-col items-center gap-8">
        <StepIndicator total={TOTAL_STEPS} current={step} />
        <StepTransition order={order} className="flex w-full flex-col items-center gap-8">
          {children}
        </StepTransition>
      </div>
      <StepFooter />
    </div>
  );
}
