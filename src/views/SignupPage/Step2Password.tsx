import Eye from "@/shared/asset/svg/Eye";
import EyeOff from "@/shared/asset/svg/EyeOff";
import LockOutline from "@/shared/asset/svg/LockOutline";
import Mail from "@/shared/asset/svg/Mail";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import PrevButton from "@/shared/ui/PrevButton";

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
  return (
    <>
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
        label="비밀번호"
        icon={LockOutline}
        type={showPassword ? "text" : "password"}
        placeholder="비밀번호를 입력해 주세요."
        value={password}
        onChange={(event) => onPasswordChange(event.target.value)}
        rightSlot={
          <button
            type="button"
            onClick={onTogglePassword}
            className="cursor-pointer text-gray-600 shrink-0 [&>svg]:h-5 [&>svg]:w-5"
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        }
      />
      <Input
        label="비밀번호 확인"
        icon={LockOutline}
        type={showPasswordConfirm ? "text" : "password"}
        placeholder="비밀번호를 다시 입력해 주세요."
        value={passwordConfirm}
        onChange={(event) => onPasswordConfirmChange(event.target.value)}
        error={
          passwordConfirm.length > 0 && passwordConfirm !== password
            ? "비밀번호가 일치하지 않습니다."
            : undefined
        }
        rightSlot={
          <button
            type="button"
            onClick={onTogglePasswordConfirm}
            className="cursor-pointer text-gray-600 shrink-0 [&>svg]:h-5 [&>svg]:w-5"
            aria-label={showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 표시"}
          >
            {showPasswordConfirm ? <Eye /> : <EyeOff />}
          </button>
        }
      />
      <div className="grid w-full grid-cols-2 gap-2">
        <PrevButton onClick={onBack} />
        <Button type="button" variant="primary" className="h-11" disabled={!canProceed} onClick={onNext}>
          다음
        </Button>
      </div>
    </>
  );
}
