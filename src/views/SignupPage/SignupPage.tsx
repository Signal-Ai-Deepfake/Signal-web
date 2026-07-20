"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import StepHeader from "@/shared/ui/StepHeader";
import AuthPageShell from "@/widgets/AuthPageShell";
import Step1Terms from "./Step1Terms";
import Step2EmailCode from "./Step2EmailCode";
import Step2Password from "./Step2Password";
import Step3Profile from "./Step3Profile";
import type { Gender } from "./Step3Profile";
import Step4Photo from "./Step4Photo";
import StepComplete from "./StepComplete";
import StepShell from "./StepShell";

const CODE_DURATION_SECONDS = 179;

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

  function handleChangeEmail() {
    setEmailVerified(false);
    setCodeSent(false);
    setCode("");
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
          <Step1Terms
            agreeTerms={agreeTerms}
            agreePrivacy={agreePrivacy}
            onAgreeAllChange={handleAgreeAll}
            onAgreeTermsChange={setAgreeTerms}
            onAgreePrivacyChange={setAgreePrivacy}
            canProceed={canProceedStep1}
            onNext={() => setStep(2)}
          />
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
              <Step2EmailCode
                email={email}
                onEmailChange={setEmail}
                codeSent={codeSent}
                onSendCode={handleSendCode}
                code={code}
                onCodeChange={setCode}
                secondsLeft={secondsLeft}
                showResendHint={showResendHint}
                canVerifyCode={canVerifyCode}
                onVerifyCode={handleVerifyCode}
                onBack={() => setStep(1)}
              />
            ) : (
              <Step2Password
                email={email}
                onChangeEmail={handleChangeEmail}
                password={password}
                onPasswordChange={setPassword}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword((prev) => !prev)}
                passwordConfirm={passwordConfirm}
                onPasswordConfirmChange={setPasswordConfirm}
                showPasswordConfirm={showPasswordConfirm}
                onTogglePasswordConfirm={() => setShowPasswordConfirm((prev) => !prev)}
                canProceed={canProceedStep2}
                onBack={() => setEmailVerified(false)}
                onNext={() => setStep(3)}
              />
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
          <Step3Profile
            name={name}
            onNameChange={setName}
            birthDate={birthDate}
            onBirthDateChange={setBirthDate}
            gender={gender}
            onGenderChange={setGender}
            canProceed={canProceedStep3}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        </StepShell>
      </AuthPageShell>
    );
  }

  if (step === 4) {
    return (
      <AuthPageShell>
        <StepShell step={4}>
          <Step4Photo
            photoPreview={photoPreview}
            fileInputRef={fileInputRef}
            onPhotoChange={handlePhotoChange}
            onBack={() => setStep(3)}
            onNext={() => setStep(5)}
          />
        </StepShell>
      </AuthPageShell>
    );
  }

  return (
    <AuthPageShell>
      <StepComplete />
    </AuthPageShell>
  );
}
