"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AuthPageShell from "@/widgets/AuthPageShell";
import { resetPassword, sendVerification, verifyCode as verifyCodeRequest } from "@/entities/user/api";
import StepComplete from "./StepComplete";
import StepEmailCode from "./StepEmailCode";
import StepNewPassword from "./StepNewPassword";

const CODE_DURATION_SECONDS = 300;

type Stage = "email-code" | "new-password" | "complete";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("email-code");

  const [email, setEmail] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
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

  const sendVerificationMutation = useMutation({
    mutationFn: () => sendVerification({ email, purpose: "PASSWORD_RESET" }),
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
    mutationFn: () => verifyCodeRequest({ email, code, purpose: "PASSWORD_RESET" }),
    onSuccess: (token) => {
      setVerificationToken(token);
      setStage("new-password");
      toast.success("이메일 인증이 완료되었습니다.");
    },
    onError: (error) => {
      toast.error("인증번호가 올바르지 않습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: () => resetPassword({ email, verificationToken, newPassword, newPasswordConfirm }),
    onSuccess: () => {
      setStage("complete");
      toast.success("비밀번호가 변경되었습니다.");
    },
    onError: (error) => {
      toast.error("비밀번호 변경에 실패했습니다.", {
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

  const canVerifyCode =
    codeSent && secondsLeft > 0 && code.length === 6 && !verifyCodeMutation.isPending;
  const showResendHint = codeSent && secondsLeft <= CODE_DURATION_SECONDS - 5;
  const canProceedNewPassword =
    newPassword.length >= 8 &&
    newPasswordConfirm.length > 0 &&
    newPassword === newPasswordConfirm &&
    !resetPasswordMutation.isPending;

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
              onVerifyCode={handleVerifyCode}
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
              onNext={() => resetPasswordMutation.mutate()}
            />
          )}

          {stage === "complete" && <StepComplete />}
        </div>
      </div>
    </AuthPageShell>
  );
}
