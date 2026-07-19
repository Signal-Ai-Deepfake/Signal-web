import type { ComponentType } from "react";

interface FeatureCardItem {
  icon: ComponentType;
  title: string;
  description: string;
}

interface FeatureCardProps {
  items: FeatureCardItem[];
}

export default function FeatureCard({ items }: FeatureCardProps) {
  return (
    <div className="h-[214px] w-[289px] rounded-2xl border border-gray-200 bg-white px-4 shadow-sm">
      {items.map((item, index) => (
        <div key={item.title}>
          {index > 0 && <div className=" h-px bg-gray-300"/>}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary-50 text-primary-500 flex h-14 w-14 shrink-0 items-center justify-center rounded-lg [&>svg]:h-8 [&>svg]:w-8">
                <item.icon />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-small text-black">{item.title}</p>
                <p className="text-caption text-gray-700">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
