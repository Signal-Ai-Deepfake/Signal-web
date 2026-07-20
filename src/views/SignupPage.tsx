"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import Calendar from "@/shared/asset/svg/Calendar";
import Check from "@/shared/asset/svg/Check";
import CheckCircle from "@/shared/asset/svg/CheckCircle";
import Eye from "@/shared/asset/svg/Eye";
import EyeOff from "@/shared/asset/svg/EyeOff";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import LockOutline from "@/shared/asset/svg/LockOutline";
import Mail from "@/shared/asset/svg/Mail";
import User from "@/shared/asset/svg/User";
import Warning from "@/shared/asset/svg/Warning";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import LinkButton from "@/shared/ui/LinkButton";
import StepIndicator from "@/shared/ui/StepIndicator";
import AuthPageShell from "@/widgets/AuthPageShell";

const TOTAL_STEPS = 4;
const CODE_DURATION_SECONDS = 179;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function TermsRow({
  label,
  required = false,
  checked,
  onChange,
}: {
  label: string;
  required?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex w-full items-center justify-between bg-white px-5 py-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="flex cursor-pointer items-center gap-3"
      >
        <span
          className={`flex size-6 shrink-0 items-center justify-center rounded-md ${
            checked ? "bg-secondary-500 text-white" : "border border-gray-400"
          }`}
        >
          <Check checked={checked} />
        </span>
        <span className="text-body-2 text-black">
          {label}
          {required && <span className="text-secondary-500"> (필수)</span>}
        </span>
      </button>
      {required && (
        <span className="rotate-90 text-gray-700 [&>svg]:h-6 [&>svg]:w-3">
          <Arrow />
        </span>
      )}
    </div>
  );
}

function PrevButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-body-2 flex h-11 cursor-pointer items-center justify-center rounded border border-gray-400 text-gray-600"
    >
      이전
    </button>
  );
}

function StepFooter() {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="h-px w-full bg-gray-300" />
      <p className="text-body-2">
        <span className="text-gray-650">이미 계정이 있으신가요? </span>
        <Link href="/login" className="text-secondary-500 cursor-pointer underline">
          로그인
        </Link>
      </p>
    </div>
  );
}

function GenderOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button type="button" onClick={onSelect} className="flex cursor-pointer items-center gap-3">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-gray-400">
        {selected && <span className="bg-secondary-500 size-2.5 rounded-full" />}
      </span>
      <span className="text-body-2 text-black">{label}</span>
    </button>
  );
}

interface StepHeaderProps {
  title: string;
  description?: string;
}

function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <div className="flex w-full flex-col items-center gap-2 text-center">
      <h1 className="text-h3 font-bold text-black">{title}</h1>
      {description && <p className="text-body-2 text-gray-800">{description}</p>}
    </div>
  );
}

function StepShell({ step, children }: { step: number; children: ReactNode }) {
  return (
    <div className="flex w-full max-w-[480px] flex-col gap-5 rounded-2xl bg-white px-12 py-8 shadow-md">
      <div className="flex w-full flex-col items-center gap-8">
        <StepIndicator total={TOTAL_STEPS} current={step} />
        {children}
      </div>
      <StepFooter />
    </div>
  );
}

type Gender = "남" | "여" | "선택 안함";

export default function SignupPage() {
  const [step, setStep] = useState(1);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<Gender | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!codeSent) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [codeSent]);

  function handleAgreeAll(next: boolean) {
    setAgreeTerms(next);
    setAgreePrivacy(next);
  }

  function handleSendCode() {
    setCodeSent(true);
    setSecondsLeft(CODE_DURATION_SECONDS);
  }

  function handleVerifyCode() {
    if (code.length === 6) setEmailVerified(true);
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoPreview(URL.createObjectURL(file));
  }

  const canProceedStep1 = agreeTerms && agreePrivacy;
  const canVerifyCode = code.length === 6;
  const showResendHint = codeSent && secondsLeft <= CODE_DURATION_SECONDS - 10;
  const canProceedStep2 =
    password.length > 0 && passwordConfirm.length > 0 && password === passwordConfirm;
  const canProceedStep3 = name.trim().length > 0 && birthDate.length > 0;

  if (step === 1) {
    return (
      <AuthPageShell>
        <StepShell step={1}>
          <StepHeader title="약관에 동의해 주세요" description="서비스 이용을 위해 약관에 동의해 주세요." />
          <div className="flex w-full flex-col gap-3">
            <div className="overflow-hidden rounded-lg border border-gray-300">
              <TermsRow
                label="전체 동의"
                checked={agreeTerms && agreePrivacy}
                onChange={handleAgreeAll}
              />
            </div>
            <div className="flex flex-col divide-y divide-gray-300 overflow-hidden rounded-lg border border-gray-300">
              <TermsRow label="이용약관 동의" required checked={agreeTerms} onChange={setAgreeTerms} />
              <TermsRow
                label="개인정보 처리방침 동의"
                required
                checked={agreePrivacy}
                onChange={setAgreePrivacy}
              />
            </div>
          </div>
          <Button
            type="button"
            variant="primary"
            className="w-full"
            disabled={!canProceedStep1}
            onClick={() => setStep(2)}
          >
            다음
          </Button>
        </StepShell>
      </AuthPageShell>
    );
  }

  if (step === 2) {
    return (
      <AuthPageShell>
        <StepShell step={2}>
          <StepHeader
            title="이메일 인증"
            description={
              emailVerified ? "사용할 비밀번호를 설정해 주세요." : "이메일로 받은 인증번호를 입력해 주세요."
            }
          />
          <div className="flex w-full flex-col gap-3">
            {!emailVerified ? (
              <>
                <div className="flex w-full flex-col gap-2">
                  <label className="text-body-2 px-1 text-black">이메일</label>
                  <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <div className="focus-within:border-secondary-500 flex h-[52px] w-full items-center gap-2 rounded-lg border border-gray-400 p-3 transition-colors sm:w-[244px] sm:shrink-0">
                      <span className="text-gray-600 shrink-0 [&>svg]:h-5 [&>svg]:w-5">
                        <Mail />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="이메일을 입력해 주세요."
                        className="text-body-2 placeholder:text-gray-600 min-w-0 flex-1 text-black outline-none"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="primary"
                      className="text-small h-[52px] w-full text-center leading-tight sm:w-[128px] sm:shrink-0"
                      disabled={!email}
                      onClick={handleSendCode}
                    >
                      인증번호 보내기
                    </Button>
                  </div>
                </div>
                <Input
                  label="인증번호"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="인증번호 6자리를 입력하세요."
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
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
                    <p className="text-body-2 text-secondary-500">
                      이메일이 오지 않나요? 스팸함을 확인해주세요.
                    </p>
                  </div>
                )}
                <div className="grid w-full grid-cols-2 gap-2">
                  <PrevButton onClick={() => setStep(1)} />
                  <Button
                    type="button"
                    variant="primary"
                    className="h-11"
                    disabled={!canVerifyCode}
                    onClick={handleVerifyCode}
                  >
                    인증하기
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Input
                  label="이메일"
                  icon={Mail}
                  value={email}
                  disabled
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => {
                        setEmailVerified(false);
                        setCodeSent(false);
                        setCode("");
                      }}
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
                  onChange={(event) => setPassword(event.target.value)}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
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
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                  error={
                    passwordConfirm.length > 0 && passwordConfirm !== password
                      ? "비밀번호가 일치하지 않습니다."
                      : undefined
                  }
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPasswordConfirm((prev) => !prev)}
                      className="cursor-pointer text-gray-600 shrink-0 [&>svg]:h-5 [&>svg]:w-5"
                      aria-label={showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 표시"}
                    >
                      {showPasswordConfirm ? <Eye /> : <EyeOff />}
                    </button>
                  }
                />
                <div className="grid w-full grid-cols-2 gap-2">
                  <PrevButton onClick={() => setEmailVerified(false)} />
                  <Button
                    type="button"
                    variant="primary"
                    className="h-11"
                    disabled={!canProceedStep2}
                    onClick={() => setStep(3)}
                  >
                    다음
                  </Button>
                </div>
              </>
            )}
          </div>
        </StepShell>
      </AuthPageShell>
    );
  }

  if (step === 3) {
    return (
      <AuthPageShell>
        <StepShell step={3}>
          <StepHeader title="기본 정보 입력" description="서비스 이용을 위한 기본 정보를 입력해 주세요." />
          <div className="flex w-full flex-col gap-3">
            <Input
              label="이름"
              icon={User}
              placeholder="이름을 입력해 주세요."
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              label="생년월일"
              icon={Calendar}
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
            />
            <div className="flex w-full flex-col gap-2">
              <label className="text-body-2 px-1 text-black">성별</label>
              <div className="flex items-center gap-8">
                {(["남", "여", "선택 안함"] as const).map((option) => (
                  <GenderOption
                    key={option}
                    label={option}
                    selected={gender === option}
                    onSelect={() => setGender(option)}
                  />
                ))}
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-2 pt-3">
              <PrevButton onClick={() => setStep(2)} />
              <Button
                type="button"
                variant="primary"
                className="h-11"
                disabled={!canProceedStep3}
                onClick={() => setStep(4)}
              >
                다음
              </Button>
            </div>
          </div>
        </StepShell>
      </AuthPageShell>
    );
  }

  if (step === 4) {
    return (
      <AuthPageShell>
        <StepShell step={4}>
          <StepHeader title="프로필 설정" />
          <div className="flex w-full flex-col items-center gap-8">
            <div className="bg-gray-200 flex size-32 items-center justify-center overflow-hidden rounded-full">
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoPreview} alt="" className="size-full object-cover" />
              ) : (
                <span className="text-gray-400 [&>svg]:h-[88px] [&>svg]:w-[88px]">
                  <User />
                </span>
              )}
            </div>
            <div className="flex w-full max-w-[240px] flex-col items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="border-secondary-500 text-secondary-500 flex w-full cursor-pointer items-center justify-center gap-3 rounded border px-5 py-2.5"
              >
                <span className="[&>svg]:h-5 [&>svg]:w-5">
                  <ImageArrowUp />
                </span>
                <span className="text-body-2 font-medium">사진 업로드</span>
              </button>
              <p className="text-body-2 text-gray-650 text-center">
                지금 등록하지 않아도
                <br />
                나중에 언제든 추가할 수 있습니다.
              </p>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-2">
            <PrevButton onClick={() => setStep(3)} />
            <Button
              type="button"
              variant="primary"
              className="h-11"
              onClick={() => setStep(5)}
            >
              다음
            </Button>
          </div>
        </StepShell>
      </AuthPageShell>
    );
  }

  return (
    <AuthPageShell>
      <div className="flex w-full max-w-[480px] flex-col items-center gap-5 rounded-2xl bg-white px-12 py-8 shadow-md">
        <div className="text-secondary-500 [&>svg]:h-14 [&>svg]:w-14">
          <CheckCircle />
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-h3 font-bold text-black">회원가입 완료</h1>
          <p className="text-body-2 text-gray-800">
            회원가입이 완료되었습니다.
            <br />
            로그인 후 서비스를 이용해주세요.
          </p>
        </div>
        <LinkButton href="/login" variant="primary" className="w-full">
          로그인 하러가기
        </LinkButton>
      </div>
    </AuthPageShell>
  );
}
