"use client";

import Eye from "@/shared/asset/svg/Eye";
import EyeOff from "@/shared/asset/svg/EyeOff";
import LockOutline from "@/shared/asset/svg/LockOutline";
import Mail from "@/shared/asset/svg/Mail";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import StepHeader from "@/shared/ui/StepHeader";
import { useT } from "@/shared/i18n/I18nProvider";
import { authMessages } from "@/views/authMessages";

interface StepNewPasswordProps {
  email: string;
  onChangeEmail: () => void;
  newPassword: string;
  onNewPasswordChange: (value: string) => void;
  showNewPassword: boolean;
  onToggleNewPassword: () => void;
  newPasswordConfirm: string;
  onNewPasswordConfirmChange: (value: string) => void;
  showNewPasswordConfirm: boolean;
  onToggleNewPasswordConfirm: () => void;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
}

export default function StepNewPassword({
  email,
  onChangeEmail,
  newPassword,
  onNewPasswordChange,
  showNewPassword,
  onToggleNewPassword,
  newPasswordConfirm,
  onNewPasswordConfirmChange,
  showNewPasswordConfirm,
  onToggleNewPasswordConfirm,
  canProceed,
  onBack,
  onNext,
}: StepNewPasswordProps) {
  const t = useT(authMessages);
  return (
    <>
      <StepHeader title={t.reset.newPasswordTitle} onBack={onBack} />
      <div className="flex w-full flex-col gap-3">
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
          label={t.reset.newPassword}
          icon={LockOutline}
          type={showNewPassword ? "text" : "password"}
          placeholder={t.reset.newPasswordPlaceholder}
          value={newPassword}
          onChange={(event) => onNewPasswordChange(event.target.value)}
          error={newPassword.length > 0 && newPassword.length < 8 ? t.passwordTooShort : undefined}
          rightSlot={
            <button
              type="button"
              onClick={onToggleNewPassword}
              className="shrink-0 cursor-pointer text-gray-600 [&>svg]:h-5 [&>svg]:w-5"
              aria-label={showNewPassword ? t.hidePassword : t.showPassword}
            >
              {showNewPassword ? <Eye /> : <EyeOff />}
            </button>
          }
        />
        <Input
          label={t.reset.newPasswordConfirm}
          icon={LockOutline}
          type={showNewPasswordConfirm ? "text" : "password"}
          placeholder={t.reset.newPasswordConfirmPlaceholder}
          value={newPasswordConfirm}
          onChange={(event) => onNewPasswordConfirmChange(event.target.value)}
          error={
            newPasswordConfirm.length > 0 && newPasswordConfirm !== newPassword
              ? t.passwordMismatch
              : undefined
          }
          rightSlot={
            <button
              type="button"
              onClick={onToggleNewPasswordConfirm}
              className="shrink-0 cursor-pointer text-gray-600 [&>svg]:h-5 [&>svg]:w-5"
              aria-label={showNewPasswordConfirm ? t.hidePassword : t.showPassword}
            >
              {showNewPasswordConfirm ? <Eye /> : <EyeOff />}
            </button>
          }
        />
        <Button
          type="button"
          variant="primary"
          className="h-11 w-full"
          disabled={!canProceed}
          onClick={onNext}
        >
          {t.next}
        </Button>
      </div>
    </>
  );
}
