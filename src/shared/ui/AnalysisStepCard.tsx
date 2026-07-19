import type { ReactNode } from "react";

interface AnalysisStepCardProps {
  step: string;
  title: string;
  size: "sm" | "lg";
  children: ReactNode;
}

const cardSize = {
  sm: "h-[360px] w-[240px]",
  lg: "h-[424px] w-[320px]",
} as const;

export default function AnalysisStepCard({ step, title, size, children }: AnalysisStepCardProps) {
  return (
    <div
      className={`flex flex-col shadow-xl gap-4 rounded-3xl border border-gray-200 bg-white py-4 px-6 ${cardSize[size]}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-body-2 text-primary-500 rounded-full bg-primary-50 px-3 py-2">{step}</span>
        <p className="text-body-2 text-black">{title}</p>
      </div>
      {children}
    </div>
  );
}
