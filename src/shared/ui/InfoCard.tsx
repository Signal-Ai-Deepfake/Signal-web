import type { ComponentType } from "react";

interface InfoCardProps {
  icon: ComponentType;
  title: string;
  description: string;
  size?: "lg" | "md";
}

const cardSize = {
  lg: "w-[296px]",
  md: "w-[280px]",
} as const;

export default function InfoCard({ icon: Icon, title, description, size = "lg" }: InfoCardProps) {
  return (
    <div
      className={`row-span-3 grid min-h-[236px] grid-rows-subgrid content-start justify-items-center gap-y-0 rounded-2xl border border-gray-200 bg-white px-6 py-7 text-center ${cardSize[size]}`}
    >
      <div className="bg-secondary-400 text-primary-500 flex h-16 w-16 shrink-0 items-center justify-center rounded-full [&>svg]:h-10 [&>svg]:w-10">
        <Icon />
      </div>
      <p className="text-h3 mt-4 font-bold text-black">
        {title.split(/(?<=[·・])/).map((segment) => (
          <span key={segment} className="inline-block">
            {segment}
          </span>
        ))}
      </p>
      <p className="text-body-1 mt-2 text-gray-800">{description}</p>
    </div>
  );
}
