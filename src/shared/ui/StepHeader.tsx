"use client";

import Arrow from "@/shared/asset/svg/Arrow";
import { useT } from "@/shared/i18n/I18nProvider";
import { uiMessages } from "@/shared/ui/messages";

interface StepHeaderProps {
  title: string;
  description?: string;
  onBack?: () => void;
}

export default function StepHeader({ title, description, onBack }: StepHeaderProps) {
  const t = useT(uiMessages);
  return (
    <div className="flex w-full flex-col items-center gap-2 text-center">
      <div className="relative flex w-full items-center justify-center">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label={t.back}
            className="absolute left-0 cursor-pointer text-black [&>svg]:h-4 [&>svg]:w-4"
          >
            <span className="block rotate-180">
              <Arrow />
            </span>
          </button>
        )}
        <h1 className="text-h3 font-bold text-black">{title}</h1>
      </div>
      {description && <p className="text-body-2 text-gray-800">{description}</p>}
    </div>
  );
}
