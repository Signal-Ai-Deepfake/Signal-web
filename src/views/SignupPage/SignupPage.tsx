"use client";

import StepHeader from "@/shared/ui/StepHeader";
import AuthPageShell from "@/widgets/AuthPageShell";
import Step1Terms from "./Step1Terms";
import Step2EmailCode from "./Step2EmailCode";
import Step2Password from "./Step2Password";
import Step3Profile from "./Step3Profile";
import Step4Photo from "./Step4Photo";
import StepComplete from "./StepComplete";
import StepShell from "./StepShell";
import { useSignupFlow } from "./useSignupFlow";

export default function SignupPage() {
  const { step, setStep, terms, account, profile, photo } = useSignupFlow();

  if (step === 1) {
    return (
      <AuthPageShell>
        <StepShell step={1}>
          <Step1Terms
            agreeTerms={terms.agreeTerms}
            agreePrivacy={terms.agreePrivacy}
            onAgreeAllChange={terms.handleAgreeAll}
            onAgreeTermsChange={terms.setAgreeTerms}
            onAgreePrivacyChange={terms.setAgreePrivacy}
            canProceed={terms.canProceed}
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
              account.emailVerified
                ? "사용할 비밀번호를 설정해 주세요."
                : "이메일로 받은 인증번호를 입력해 주세요."
            }
          />
          <div className="flex w-full flex-col gap-3">
            {!account.emailVerified ? (
              <Step2EmailCode
                email={account.email}
                onEmailChange={account.setEmail}
                codeSent={account.codeSent}
                onSendCode={account.handleSendCode}
                code={account.code}
                onCodeChange={account.setCode}
                secondsLeft={account.secondsLeft}
                showResendHint={account.showResendHint}
                canVerifyCode={account.canVerifyCode}
                onVerifyCode={account.handleVerifyCode}
                onBack={() => setStep(1)}
              />
            ) : (
              <Step2Password
                email={account.email}
                onChangeEmail={account.handleChangeEmail}
                password={account.password}
                onPasswordChange={account.setPassword}
                showPassword={account.showPassword}
                onTogglePassword={account.togglePassword}
                passwordConfirm={account.passwordConfirm}
                onPasswordConfirmChange={account.setPasswordConfirm}
                showPasswordConfirm={account.showPasswordConfirm}
                onTogglePasswordConfirm={account.togglePasswordConfirm}
                canProceed={account.canProceed}
                onBack={() => account.setEmailVerified(false)}
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
            name={profile.name}
            onNameChange={profile.setName}
            birthDate={profile.birthDate}
            onBirthDateChange={profile.setBirthDate}
            gender={profile.gender}
            onGenderChange={profile.setGender}
            canProceed={profile.canProceed}
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
            photoPreview={photo.photoPreview}
            fileInputRef={photo.fileInputRef}
            onPhotoChange={photo.handlePhotoChange}
            onBack={() => setStep(3)}
            onNext={photo.submit}
            nextDisabled={photo.isSubmitting}
            nextLabel={photo.isSubmitting ? "가입 처리 중..." : "다음"}
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
