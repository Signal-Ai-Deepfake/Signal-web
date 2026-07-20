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
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-gray-300 p-8">
      <div className="flex items-start gap-4">
        <SectionBadge>{step}</SectionBadge>
        <div className="flex flex-col gap-1">
          <p className="text-h3 font-semibold text-black">{title}</p>
          <p className="text-body-2 text-gray-800">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
