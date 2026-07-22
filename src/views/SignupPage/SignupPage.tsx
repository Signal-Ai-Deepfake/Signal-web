"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { toast } from "sonner";
import StepHeader from "@/shared/ui/StepHeader";
import AuthPageShell from "@/widgets/AuthPageShell";
import {
  login,
  sendVerification,
  signup,
  uploadProfileImage,
  verifyCode as verifyCodeRequest,
  type AuthGender,
} from "@/entities/user/api";
import { setAuthTokens } from "@/shared/lib/authToken";
import Step1Terms from "./Step1Terms";
import Step2EmailCode from "./Step2EmailCode";
import Step2Password from "./Step2Password";
import Step3Profile from "./Step3Profile";
import type { Gender } from "./Step3Profile";
import Step4Photo from "./Step4Photo";
import StepComplete from "./StepComplete";
import StepShell from "./StepShell";

const CODE_DURATION_SECONDS = 300;

const GENDER_MAP: Record<Gender, AuthGender> = {
  남: "MALE",
  여: "FEMALE",
  "선택 안함": "NONE",
};

function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

export default function SignupPage() {
  const [step, setStep] = useState(1);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");
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

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  function handleAgreeAll(next: boolean) {
    setAgreeTerms(next);
    setAgreePrivacy(next);
  }

  const sendVerificationMutation = useMutation({
    mutationFn: () => sendVerification({ email, purpose: "SIGNUP" }),
    onSuccess: () => {
      setCodeSent(true);
      setSecondsLeft(CODE_DURATION_SECONDS);
      toast.success("인증번호를 보냈습니다.");
    },
    onError: (error) => {
      toast.error("인증번호 전송에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: () => verifyCodeRequest({ email, code, purpose: "SIGNUP" }),
    onSuccess: (token) => {
      setVerificationToken(token);
      setEmailVerified(true);
      toast.success("이메일 인증이 완료되었습니다.");
    },
    onError: (error) => {
      toast.error("인증번호가 올바르지 않습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const signupMutation = useMutation({
    mutationFn: () =>
      signup({
        email,
        password,
        verificationToken,
        name,
        age: calculateAge(birthDate),
        gender: GENDER_MAP[gender as Gender],
        agreements: { termsOfService: agreeTerms, privacyPolicy: agreePrivacy },
      }),
    onSuccess: async () => {
      // 계정 생성 자체는 끝났으므로, 이후 자동 로그인/사진 업로드가 실패해도
      // "회원가입 실패"로 보여주지 않고 완료 화면으로 보낸다 (재시도 시 "이미 가입된 이메일" 오류 방지).
      try {
        const tokens = await login({ email, password });
        setAuthTokens(tokens.accessToken, tokens.refreshToken);
        const photoFile = fileInputRef.current?.files?.[0];
        if (photoFile) {
          try {
            await uploadProfileImage(photoFile);
          } catch {
            toast.error("프로필 사진 등록에 실패했습니다. 마이페이지에서 다시 시도해 주세요.");
          }
        }
        toast.success("회원가입이 완료되었습니다.");
      } catch {
        toast.success("회원가입이 완료되었습니다. 로그인 후 이용해 주세요.");
      }
      setStep(5);
    },
    onError: (error) => {
      toast.error("회원가입에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  function handleSendCode() {
    if (sendVerificationMutation.isPending) return;
    sendVerificationMutation.mutate();
  }

  function handleVerifyCode() {
    if (code.length === 6 && !verifyCodeMutation.isPending) verifyCodeMutation.mutate();
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
  const canVerifyCode =
    codeSent && secondsLeft > 0 && code.length === 6 && !verifyCodeMutation.isPending;
  const showResendHint = codeSent && secondsLeft <= CODE_DURATION_SECONDS - 5;
  const canProceedStep2 =
    password.length >= 8 && passwordConfirm.length > 0 && password === passwordConfirm;
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
            onNext={() => signupMutation.mutate()}
            nextDisabled={signupMutation.isPending}
            nextLabel={signupMutation.isPending ? "가입 처리 중..." : "다음"}
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
