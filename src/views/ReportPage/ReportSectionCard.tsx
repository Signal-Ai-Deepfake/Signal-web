import type { ReactNode } from "react";
import SectionBadge from "@/shared/ui/SectionBadge";

interface ReportSectionCardProps {
  step: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function ReportSectionCard({
  step,
  title,
  description,
  children,
}: ReportSectionCardProps) {
  return (
    <div className="flex w-full flex-col gap-5 rounded-2xl border border-gray-300 p-5 md:gap-6 md:p-8">
      <div className="flex flex-col items-start gap-3 md:flex-row md:gap-4">
        <SectionBadge>{step}</SectionBadge>
        <div className="flex flex-col gap-1">
          <p className="text-large md:text-h3 font-semibold text-black">{title}</p>
          <p className="text-small md:text-body-2 break-keep text-gray-800">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
