"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import StepTransition from "@/shared/ui/StepTransition";
import AuthPageShell, { authCardClass } from "@/widgets/AuthPageShell";
import {
  resetPassword,
  sendVerification,
  verifyCode as verifyCodeRequest,
} from "@/entities/user/api";
import StepComplete from "./StepComplete";
import StepEmailCode from "./StepEmailCode";
import StepNewPassword from "./StepNewPassword";
import { useT } from "@/shared/i18n/I18nProvider";
import { authMessages } from "@/views/authMessages";

const CODE_DURATION_SECONDS = 300;

type Stage = "email-code" | "new-password" | "complete";

const STAGE_ORDER: Record<Stage, number> = {
  "email-code": 1,
  "new-password": 2,
  complete: 3,
};

export default function ForgotPasswordPage() {
  const t = useT(authMessages);
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
      toast.success(t.codeSent);
    },
    onError: (error) => {
      toast.error(t.codeSendFailed, {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: () => verifyCodeRequest({ email, code, purpose: "PASSWORD_RESET" }),
    onSuccess: (token) => {
      setVerificationToken(token);
      setStage("new-password");
      toast.success(t.verified);
    },
    onError: (error) => {
      toast.error(t.codeInvalid, {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: () => resetPassword({ email, verificationToken, newPassword, newPasswordConfirm }),
    onSuccess: () => {
      setStage("complete");
      toast.success(t.reset.changed);
    },
    onError: (error) => {
      toast.error(t.reset.changeFailed, {
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
      <div className={`${authCardClass} lg:max-w-[480px]`}>
        <StepTransition order={STAGE_ORDER[stage]} className="flex w-full flex-col gap-5">
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
        </StepTransition>
      </div>
    </AuthPageShell>
  );
}
