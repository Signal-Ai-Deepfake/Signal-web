import Eye from "@/shared/asset/svg/Eye";
import EyeOff from "@/shared/asset/svg/EyeOff";
import LockOutline from "@/shared/asset/svg/LockOutline";
import Mail from "@/shared/asset/svg/Mail";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import StepHeader from "@/shared/ui/StepHeader";

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
  return (
    <>
      <StepHeader title="새 비밀번호 설정" onBack={onBack} />
      <div className="flex w-full flex-col gap-3">
        <Input
          label="이메일"
          icon={Mail}
          value={email}
          disabled
          rightSlot={
            <button
              type="button"
              onClick={onChangeEmail}
              className="text-small cursor-pointer text-gray-600 shrink-0"
            >
              변경
            </button>
          }
        />
        <Input
          label="새 비밀번호"
          icon={LockOutline}
          type={showNewPassword ? "text" : "password"}
          placeholder="새 비밀번호를 입력해 주세요."
          value={newPassword}
          onChange={(event) => onNewPasswordChange(event.target.value)}
          error={
            newPassword.length > 0 && newPassword.length < 8
              ? "비밀번호는 8자 이상이어야 합니다."
              : undefined
          }
          rightSlot={
            <button
              type="button"
              onClick={onToggleNewPassword}
              className="cursor-pointer text-gray-600 shrink-0 [&>svg]:h-5 [&>svg]:w-5"
              aria-label={showNewPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
            >
              {showNewPassword ? <Eye /> : <EyeOff />}
            </button>
          }
        />
        <Input
          label="새 비밀번호 확인"
          icon={LockOutline}
          type={showNewPasswordConfirm ? "text" : "password"}
          placeholder="새 비밀번호를 다시 입력해 주세요."
          value={newPasswordConfirm}
          onChange={(event) => onNewPasswordConfirmChange(event.target.value)}
          error={
            newPasswordConfirm.length > 0 && newPasswordConfirm !== newPassword
              ? "비밀번호가 일치하지 않습니다."
              : undefined
          }
          rightSlot={
            <button
              type="button"
              onClick={onToggleNewPasswordConfirm}
              className="cursor-pointer text-gray-600 shrink-0 [&>svg]:h-5 [&>svg]:w-5"
              aria-label={showNewPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 표시"}
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
          다음
        </Button>
      </div>
    </>
  );
}
