import type { ReactNode } from "react";

interface StepNavigationProps {
  onBack: () => void;
  children: ReactNode;
}

export default function StepNavigation({ onBack, children }: StepNavigationProps) {
  return (
    <div className="flex w-full items-end gap-3 md:justify-between">
      <button
        type="button"
        onClick={onBack}
        className="border-primary-500 text-primary-500 text-body-2 active:bg-primary-50 flex h-12 w-24 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors md:w-[124px]"
      >
        이전
      </button>
      <div className="flex flex-1 justify-end md:flex-none">{children}</div>
    </div>
  );
}
