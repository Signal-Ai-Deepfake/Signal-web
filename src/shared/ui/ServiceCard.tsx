import type { ComponentType } from "react";
import ArrowUp from "@/shared/asset/svg/ArrowUp";

interface ServiceCardProps {
  icon: ComponentType;
  title: string;
  description: string;
}

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div className="group flex w-[280px] flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-secondary-500 hover:shadow-lg cursor-pointer">
      <div>
        <div className="text-primary-700 [&>svg]:h-6 [&>svg]:w-6">
          <Icon />
        </div>
        <p className="text-large mt-3 font-semibold text-gray-900">{title}</p>
        <p className="text-small text-gray-650 mt-1">{description}</p>
      </div>
      <div className="text-gray-650 group-hover:text-primary-500 mt-4 self-end transition-colors [&>svg]:h-5 [&>svg]:w-5">
        <ArrowUp />
      </div>
    </div>
  );
}
