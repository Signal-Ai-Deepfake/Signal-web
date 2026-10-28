"use client";

import Calendar from "@/shared/asset/svg/Calendar";
import User from "@/shared/asset/svg/User";
import Button from "@/shared/ui/Button";
import GenderOption from "@/shared/ui/GenderOption";
import Input from "@/shared/ui/Input";
import PrevButton from "@/shared/ui/PrevButton";
import StepHeader from "@/shared/ui/StepHeader";
import { useT } from "@/shared/i18n/I18nProvider";
import { authMessages } from "@/views/authMessages";

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
  const t = useT(authMessages);
  return (
    <>
      <StepHeader title={t.signup.profileTitle} description={t.signup.profileDescription} />
      <div className="flex w-full flex-col gap-3">
        <Input
          label={t.signup.name}
          icon={User}
          placeholder={t.signup.namePlaceholder}
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
        />
        <Input
          label={t.signup.birthDate}
          icon={Calendar}
          type="date"
          value={birthDate}
          onChange={(event) => onBirthDateChange(event.target.value)}
        />
        <div className="flex w-full flex-col gap-2">
          <label className="text-body-2 px-1 text-black">{t.signup.gender}</label>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-8">
            {GENDER_OPTIONS.map((option) => (
              <GenderOption
                key={option}
                label={t.signup.genderOptions[option]}
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
            {t.next}
          </Button>
        </div>
      </div>
    </>
  );
}
