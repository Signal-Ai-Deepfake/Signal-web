"use client";

import Mail from "@/shared/asset/svg/Mail";
import Warning from "@/shared/asset/svg/Warning";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import PrevButton from "@/shared/ui/PrevButton";
import { useT } from "@/shared/i18n/I18nProvider";
import { authMessages } from "@/views/authMessages";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

interface Step2EmailCodeProps {
  email: string;
  onEmailChange: (value: string) => void;
  codeSent: boolean;
  onSendCode: () => void;
  code: string;
  onCodeChange: (value: string) => void;
  secondsLeft: number;
  showResendHint: boolean;
  canVerifyCode: boolean;
  onVerifyCode: () => void;
  onBack: () => void;
}

export default function Step2EmailCode({
  email,
  onEmailChange,
  codeSent,
  onSendCode,
  code,
  onCodeChange,
  secondsLeft,
  showResendHint,
  canVerifyCode,
  onVerifyCode,
  onBack,
}: Step2EmailCodeProps) {
  const t = useT(authMessages);
  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <label className="text-body-2 px-1 text-black">{t.email}</label>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="focus-within:border-secondary-500 flex h-[52px] w-full items-center gap-2 rounded-lg border border-gray-400 p-3 transition-colors sm:min-w-0 sm:flex-1">
            <span className="shrink-0 text-gray-600 [&>svg]:h-5 [&>svg]:w-5">
              <Mail />
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder={t.emailPlaceholder}
              className="text-body-2 min-w-0 flex-1 text-black outline-none placeholder:text-gray-600"
            />
          </div>
          <Button
            type="button"
            variant="primary"
            className="text-small h-[52px] w-full text-center leading-tight sm:w-32 sm:shrink-0"
            disabled={!email}
            onClick={onSendCode}
          >
            {t.sendCode}
          </Button>
        </div>
      </div>
      <Input
        label={t.code}
        type="text"
        inputMode="numeric"
        maxLength={6}
        placeholder={t.codePlaceholder}
        value={code}
        onChange={(event) => onCodeChange(event.target.value.replace(/\D/g, "").slice(0, 6))}
        onKeyDown={(event) => {
          if (event.key === "Enter" && canVerifyCode) onVerifyCode();
        }}
        disabled={!codeSent}
        rightSlot={
          codeSent &&
          secondsLeft > 0 && (
            <span className="text-body-2 text-secondary-500 shrink-0">
              {formatTime(secondsLeft)}
            </span>
          )
        }
      />
      {showResendHint && (
        <div className="bg-secondary-50 border-secondary-200 flex h-[60px] animate-[fade-in-up_0.25s_ease-out] items-center gap-2.5 rounded-lg border p-4">
          <span className="text-secondary-500 shrink-0 [&>svg]:h-5 [&>svg]:w-5">
            <Warning />
          </span>
          <p className="text-body-2 text-secondary-500">{t.noEmail}</p>
        </div>
      )}
      <div className="grid w-full grid-cols-2 gap-2">
        <PrevButton onClick={onBack} />
        <Button
          type="button"
          variant="primary"
          className="h-11"
          disabled={!canVerifyCode}
          onClick={onVerifyCode}
        >
          {t.verify}
        </Button>
      </div>
    </>
  );
}
