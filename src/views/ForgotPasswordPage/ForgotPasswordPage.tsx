"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthPageShell from "@/widgets/AuthPageShell";
import StepComplete from "./StepComplete";
import StepEmailCode from "./StepEmailCode";
import StepNewPassword from "./StepNewPassword";

const CODE_DURATION_SECONDS = 179;

type Stage = "email-code" | "new-password" | "complete";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("email-code");

  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);

  useEffect(() => {
    if (!codeSent) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [codeSent]);

  function handleSendCode() {
    setCodeSent(true);
    setSecondsLeft(CODE_DURATION_SECONDS);
  }

  const canVerifyCode = codeSent && secondsLeft > 0 && code.length === 6;
  const showResendHint = codeSent && secondsLeft <= CODE_DURATION_SECONDS - 10;
  const canProceedNewPassword =
    newPassword.length >= 8 && newPasswordConfirm.length > 0 && newPassword === newPasswordConfirm;

  return (
    <AuthPageShell>
      <div className="flex w-full max-w-[480px] flex-col gap-5 rounded-2xl bg-white px-12 py-8 shadow-md">
        <div key={stage} className="flex w-full animate-[fade-in-up_0.3s_ease-out] flex-col gap-5">
          {stage === "email-code" && (
            <StepEmailCode
              email={email}
              onEmailChange={setEmail}
              codeSent={codeSent}
              onSendCode={handleSendCode}
              code={code}
              onCodeChange={setCode}
              secondsLeft={secondsLeft}
              showResendHint={showResendHint}
              canVerifyCode={canVerifyCode}
              onVerifyCode={() => setStage("new-password")}
              onBack={() => router.push("/login")}
            />
          )}

          {stage === "new-password" && (
            <StepNewPassword
              email={email}
              onChangeEmail={() => setStage("email-code")}
              newPassword={newPassword}
              onNewPasswordChange={setNewPassword}
              showNewPassword={showNewPassword}
              onToggleNewPassword={() => setShowNewPassword((prev) => !prev)}
              newPasswordConfirm={newPasswordConfirm}
              onNewPasswordConfirmChange={setNewPasswordConfirm}
              showNewPasswordConfirm={showNewPasswordConfirm}
              onToggleNewPasswordConfirm={() => setShowNewPasswordConfirm((prev) => !prev)}
              canProceed={canProceedNewPassword}
              onBack={() => setStage("email-code")}
              onNext={() => setStage("complete")}
            />
          )}

          {stage === "complete" && <StepComplete />}
        </div>
      </div>
    </AuthPageShell>
  );
}
