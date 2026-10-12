import type { ComponentType } from "react";

interface StepCardProps {
  icon: ComponentType;
  step: string;
  title: string;
  description: string;
  emphasized?: boolean;
}

export default function StepCard({
  icon: Icon,
  step,
  title,
  description,
  emphasized = false,
}: StepCardProps) {
  return (
    <div
      className={`h-full w-full rounded-2xl border border-gray-200 bg-white p-4 md:h-[199px] md:w-[250px] md:p-6 ${
        emphasized ? "shadow-md" : ""
      }`}
    >
      <div className="flex items-end gap-1">
        <div className="bg-secondary-400 text-primary-700 flex size-12 shrink-0 items-center justify-center rounded-full md:size-16 [&>svg]:size-7 md:[&>svg]:size-10">
          <Icon />
        </div>
        <span className="bg-primary-50 text-small text-primary-700 rounded-full px-2.5 py-0.5">
          {step}
        </span>
      </div>
      <p
        className={`text-body-2 md:text-body-1 mt-4 text-gray-900 ${emphasized ? "font-bold" : "font-medium"}`}
      >
        {title}
      </p>
      <p className="text-small text-gray-650 mt-2">{description}</p>
    </div>
  );
}
