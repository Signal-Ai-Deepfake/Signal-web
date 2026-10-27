"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { sendVerification, verifyCode as verifyCodeRequest } from "@/entities/user/api";
import { useT } from "@/shared/i18n/I18nProvider";
import { authMessages } from "@/views/authMessages";

const CODE_DURATION_SECONDS = 300;

export function useEmailVerification() {
  const t = useT(authMessages);
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!codeSent) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [codeSent]);

  const sendVerificationMutation = useMutation({
    mutationFn: () => sendVerification({ email, purpose: "SIGNUP" }),
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
    mutationFn: () => verifyCodeRequest({ email, code, purpose: "SIGNUP" }),
    onSuccess: (token) => {
      setVerificationToken(token);
      setEmailVerified(true);
      toast.success(t.verified);
    },
    onError: (error) => {
      toast.error(t.codeInvalid, {
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

  return {
    email,
    setEmail,
    emailVerified,
    setEmailVerified,
    verificationToken,
    codeSent,
    code,
    setCode,
    secondsLeft,
    handleSendCode,
    handleVerifyCode,
    handleChangeEmail,
    canVerifyCode:
      codeSent && secondsLeft > 0 && code.length === 6 && !verifyCodeMutation.isPending,
    showResendHint: codeSent && secondsLeft <= CODE_DURATION_SECONDS - 5,
  };
}
