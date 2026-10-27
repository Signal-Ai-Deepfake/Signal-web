"use client";

import Eye from "@/shared/asset/svg/Eye";
import EyeOff from "@/shared/asset/svg/EyeOff";
import LockOutline from "@/shared/asset/svg/LockOutline";
import Mail from "@/shared/asset/svg/Mail";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import PrevButton from "@/shared/ui/PrevButton";
import { useT } from "@/shared/i18n/I18nProvider";
import { authMessages } from "@/views/authMessages";

interface Step2PasswordProps {
  email: string;
  onChangeEmail: () => void;
  password: string;
  onPasswordChange: (value: string) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  passwordConfirm: string;
  onPasswordConfirmChange: (value: string) => void;
  showPasswordConfirm: boolean;
  onTogglePasswordConfirm: () => void;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
}

export default function Step2Password({
  email,
  onChangeEmail,
  password,
  onPasswordChange,
  showPassword,
  onTogglePassword,
  passwordConfirm,
  onPasswordConfirmChange,
  showPasswordConfirm,
  onTogglePasswordConfirm,
  canProceed,
  onBack,
  onNext,
}: Step2PasswordProps) {
  const t = useT(authMessages);
  return (
    <>
      <Input
        label={t.email}
        icon={Mail}
        value={email}
        disabled
        rightSlot={
          <button
            type="button"
            onClick={onChangeEmail}
            className="text-small shrink-0 cursor-pointer text-gray-600"
          >
            {t.change}
          </button>
        }
      />
      <Input
        label={t.password}
        icon={LockOutline}
        type={showPassword ? "text" : "password"}
        placeholder={t.passwordPlaceholder}
        value={password}
        onChange={(event) => onPasswordChange(event.target.value)}
        error={password.length > 0 && password.length < 8 ? t.passwordTooShort : undefined}
        rightSlot={
          <button
            type="button"
            onClick={onTogglePassword}
            className="shrink-0 cursor-pointer text-gray-600 [&>svg]:h-5 [&>svg]:w-5"
            aria-label={showPassword ? t.hidePassword : t.showPassword}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        }
      />
      <Input
        label={t.passwordConfirm}
        icon={LockOutline}
        type={showPasswordConfirm ? "text" : "password"}
        placeholder={t.passwordConfirmPlaceholder}
        value={passwordConfirm}
        onChange={(event) => onPasswordConfirmChange(event.target.value)}
        error={
          passwordConfirm.length > 0 && passwordConfirm !== password
            ? t.passwordMismatch
            : undefined
        }
        rightSlot={
          <button
            type="button"
            onClick={onTogglePasswordConfirm}
            className="shrink-0 cursor-pointer text-gray-600 [&>svg]:h-5 [&>svg]:w-5"
            aria-label={showPasswordConfirm ? t.hidePassword : t.showPassword}
          >
            {showPasswordConfirm ? <Eye /> : <EyeOff />}
          </button>
        }
      />
      <div className="grid w-full grid-cols-2 gap-2">
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
    </>
  );
}
