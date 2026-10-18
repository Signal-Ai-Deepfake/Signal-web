"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { toast } from "sonner";
import { login, signup, uploadProfileImage, type AuthGender } from "@/entities/user/api";
import { setAuthTokens } from "@/shared/lib/authToken";
import type { Gender } from "./Step3Profile";
import { useEmailVerification } from "./useEmailVerification";

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

export function useSignupFlow() {
  const [step, setStep] = useState(1);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const verification = useEmailVerification();
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
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const signupMutation = useMutation({
    mutationFn: () =>
      signup({
        email: verification.email,
        password,
        verificationToken: verification.verificationToken,
        name,
        age: calculateAge(birthDate),
        gender: GENDER_MAP[gender as Gender],
        agreements: { termsOfService: agreeTerms, privacyPolicy: agreePrivacy },
      }),
    onSuccess: async () => {
      try {
        const tokens = await login({ email: verification.email, password });
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

  function handleAgreeAll(next: boolean) {
    setAgreeTerms(next);
    setAgreePrivacy(next);
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoPreview(URL.createObjectURL(file));
  }

  return {
    step,
    setStep,
    terms: {
      agreeTerms,
      agreePrivacy,
      setAgreeTerms,
      setAgreePrivacy,
      handleAgreeAll,
      canProceed: agreeTerms && agreePrivacy,
    },
    account: {
      ...verification,
      password,
      setPassword,
      passwordConfirm,
      setPasswordConfirm,
      showPassword,
      togglePassword: () => setShowPassword((prev) => !prev),
      showPasswordConfirm,
      togglePasswordConfirm: () => setShowPasswordConfirm((prev) => !prev),
      canProceed:
        password.length >= 8 && passwordConfirm.length > 0 && password === passwordConfirm,
    },
    profile: {
      name,
      setName,
      birthDate,
      setBirthDate,
      gender,
      setGender,
      canProceed: name.trim().length > 0 && birthDate.length > 0,
    },
    photo: {
      photoPreview,
      fileInputRef,
      handlePhotoChange,
      submit: () => signupMutation.mutate(),
      isSubmitting: signupMutation.isPending,
    },
  };
}
