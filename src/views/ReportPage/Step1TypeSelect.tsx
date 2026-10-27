"use client";

import ArrowUp from "@/shared/asset/svg/ArrowUp";
import Button from "@/shared/ui/Button";
import ReportSectionCard from "./ReportSectionCard";
import { useT } from "@/shared/i18n/I18nProvider";
import { reportMessages } from "./messages";

export type DamageType = "얼굴 도용" | "온라인 괴롭힘" | "개인정보 유출" | "딥페이크";

const damageTypes: DamageType[] = ["얼굴 도용", "온라인 괴롭힘", "개인정보 유출", "딥페이크"];

interface Step1TypeSelectProps {
  damageType: DamageType | null;
  onSelect: (type: DamageType) => void;
  onNext: () => void;
}

export default function Step1TypeSelect({ damageType, onSelect, onNext }: Step1TypeSelectProps) {
  const t = useT(reportMessages);
  return (
    <div className="flex w-full flex-col items-end gap-6 md:gap-8">
      <ReportSectionCard step="01" title={t.step1.title} description={t.step1.description}>
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {damageTypes.map((type) => {
            const { label, description } = t.damageTypes[type];
            const selected = damageType === type;
            return (
              <button
                key={type}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(type)}
                className={`flex cursor-pointer items-start gap-3 rounded-[10px] border p-4 text-left transition-colors md:p-5 ${
                  selected
                    ? "bg-primary-50 border-primary-450 active:bg-primary-100"
                    : "hover:border-primary-300 border-gray-300 bg-white active:bg-gray-100"
                }`}
              >
                <span
                  className={`mt-1 flex size-[18px] shrink-0 items-center justify-center rounded-full border ${
                    selected ? "border-primary-500" : "border-gray-400"
                  }`}
                >
                  {selected && <span className="bg-primary-500 size-2.5 rounded-full" />}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-body-2 font-medium text-black">{label}</span>
                  <span className="text-small text-gray-800">{description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </ReportSectionCard>
      <Button
        type="button"
        variant="primary"
        className="w-full gap-1 md:w-auto"
        disabled={!damageType}
        onClick={onNext}
      >
        {t.next}
        <span className="[&>svg]:h-6 [&>svg]:w-6">
          <ArrowUp />
        </span>
      </Button>
    </div>
  );
}
