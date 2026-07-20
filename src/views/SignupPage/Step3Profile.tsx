import Calendar from "@/shared/asset/svg/Calendar";
import User from "@/shared/asset/svg/User";
import Button from "@/shared/ui/Button";
import GenderOption from "@/shared/ui/GenderOption";
import Input from "@/shared/ui/Input";
import PrevButton from "@/shared/ui/PrevButton";
import StepHeader from "@/shared/ui/StepHeader";

export type Gender = "남" | "여" | "선택 안함";

const GENDER_OPTIONS: Gender[] = ["남", "여", "선택 안함"];

interface Step3ProfileProps {
  name: string;
  onNameChange: (value: string) => void;
  birthDate: string;
  onBirthDateChange: (value: string) => void;
  gender: Gender | null;
  onGenderChange: (gender: Gender) => void;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
}

export default function Step3Profile({
  name,
  onNameChange,
  birthDate,
  onBirthDateChange,
  gender,
  onGenderChange,
  canProceed,
  onBack,
  onNext,
}: Step3ProfileProps) {
  return (
    <>
      <StepHeader title="기본 정보 입력" description="서비스 이용을 위한 기본 정보를 입력해 주세요." />
      <div className="flex w-full flex-col gap-3">
        <Input
          label="이름"
          icon={User}
          placeholder="이름을 입력해 주세요."
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
        />
        <Input
          label="생년월일"
          icon={Calendar}
          type="date"
          value={birthDate}
          onChange={(event) => onBirthDateChange(event.target.value)}
        />
        <div className="flex w-full flex-col gap-2">
          <label className="text-body-2 px-1 text-black">성별</label>
          <div className="flex items-center gap-8">
            {GENDER_OPTIONS.map((option) => (
              <GenderOption
                key={option}
                label={option}
                selected={gender === option}
                onSelect={() => onGenderChange(option)}
              />
            ))}
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 pt-3">
          <PrevButton onClick={onBack} />
          <Button
            type="button"
            variant="primary"
            className="h-11"
            disabled={!canProceed}
            onClick={onNext}
          >
            다음
          </Button>
        </div>
      </div>
    </>
  );
}
