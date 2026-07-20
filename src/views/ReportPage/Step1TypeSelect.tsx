import ArrowUp from "@/shared/asset/svg/ArrowUp";
import Button from "@/shared/ui/Button";
import ReportSectionCard from "./ReportSectionCard";

export type DamageType = "얼굴 도용" | "온라인 괴롭힘" | "개인정보 유출" | "딥페이크";

const damageTypes: { type: DamageType; description: string }[] = [
  { type: "얼굴 도용", description: "사진이 동의 없이 사용됐어요." },
  { type: "온라인 괴롭힘", description: "반복적인 비방이나 협박을 받았어요." },
  { type: "개인정보 유출", description: "개인정보가 공개되거나 악용됐어요." },
  { type: "딥페이크", description: "합성 이미지나 영상을 발견했어요." },
];

interface Step1TypeSelectProps {
  damageType: DamageType | null;
  onSelect: (type: DamageType) => void;
  onNext: () => void;
}

export default function Step1TypeSelect({ damageType, onSelect, onNext }: Step1TypeSelectProps) {
  return (
    <div className="flex w-full flex-col items-end gap-8">
      <ReportSectionCard
        step="01"
        title="어떤 피해를 겪으셨나요?"
        description="현재 상황과 가장 가까운 항목 하나를 선택해 주세요."
      >
        <div className="grid w-full grid-cols-2 gap-3">
          {damageTypes.map(({ type, description }) => {
            const selected = damageType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => onSelect(type)}
                className={`flex items-start gap-3 rounded-[10px] border p-5 text-left transition-colors ${
                  selected
                    ? "bg-primary-50 border-primary-450 active:bg-primary-100"
                    : "border-gray-300 bg-white hover:border-primary-300 active:bg-gray-100"
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
                  <span className="text-body-2 font-medium text-black">{type}</span>
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
        className="gap-1"
        disabled={!damageType}
        onClick={onNext}
      >
        다음
        <span className="[&>svg]:h-6 [&>svg]:w-6">
          <ArrowUp />
        </span>
      </Button>
    </div>
  );
}
