"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { sendVerification, verifyCode as verifyCodeRequest } from "@/entities/user/api";

const CODE_DURATION_SECONDS = 300;

export function useEmailVerification() {
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
