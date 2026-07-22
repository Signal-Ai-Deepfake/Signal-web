import type { ComponentType, ReactNode } from "react";

interface ServiceCategoryProps {
  icon: ComponentType;
  label: string;
  description: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function ServiceCategory({
  icon: Icon,
  label,
  description,
  children,
  className = "",
}: ServiceCategoryProps) {
  return (
    <div
      className={`bg-primary-50 flex flex-col gap-4 rounded-2xl border border-gray-200 px-4 py-6 shadow-lg ${className}`}
    >
      <div className="flex gap-3">
        <div className="text-primary-500 flex shrink-0 items-center justify-center rounded-xl [&>svg]:h-13 [&>svg]:w-13">
          <Icon />
        </div>
        <div>
          <p className="text-body-1 text-primary-500 font-bold">{label}</p>
          <p className="text-body-1 text-gray-800">{description}</p>
        </div>
      </div>
      <div className="flex flex-1 gap-4">{children}</div>
    </div>
  );
}
