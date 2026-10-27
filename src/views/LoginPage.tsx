"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import Eye from "@/shared/asset/svg/Eye";
import EyeOff from "@/shared/asset/svg/EyeOff";
import LockOutline from "@/shared/asset/svg/LockOutline";
import Mail from "@/shared/asset/svg/Mail";
import Button from "@/shared/ui/Button";
import Checkbox from "@/shared/ui/Checkbox";
import Input from "@/shared/ui/Input";
import AuthPageShell, { authCardClass } from "@/widgets/AuthPageShell";
import { login } from "@/entities/user/api";
import { setAuthTokens } from "@/shared/lib/authToken";
import { useT } from "@/shared/i18n/I18nProvider";
import { loginMessages } from "@/views/loginMessages";

export default function LoginPage() {
  const router = useRouter();
  const t = useT(loginMessages);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuthTokens(data.accessToken, data.refreshToken);
      toast.success(t.success);
      router.push("/");
    },
    onError: (error) => {
      toast.error(t.failed, {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const canSubmit = email.length > 0 && password.length > 0 && !loginMutation.isPending;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginMutation.mutate({ email, password });
  }

  return (
    <AuthPageShell>
      <div className={`${authCardClass} lg:max-w-[440px]`}>
        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-h3 font-bold text-black md:mt-8">{t.title}</h1>
              <p className="text-body-2 text-gray-800">{t.subtitle}</p>
            </div>
            <div className="flex flex-col gap-1">
              <Input
                label={t.email}
                icon={Mail}
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                label={t.password}
                icon={LockOutline}
                type={showPassword ? "text" : "password"}
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="shrink-0 cursor-pointer text-gray-600 [&>svg]:h-5 [&>svg]:w-5"
                    aria-label={showPassword ? t.hidePassword : t.showPassword}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <Checkbox checked={keepLoggedIn} onChange={setKeepLoggedIn} label={t.keepLoggedIn} />
              <Link
                href="/forgot-password"
                className="text-small md:text-body-2 cursor-pointer whitespace-nowrap text-gray-600"
              >
                {t.forgotPassword}
              </Link>
            </div>
            <Button type="submit" variant="primary" className="w-full" disabled={!canSubmit}>
              {loginMutation.isPending ? t.submitting : t.submit}
            </Button>
          </div>
        </form>
        <div className="flex flex-col items-center gap-5 md:mb-8">
          <div className="h-px w-full bg-gray-300" />
          <p className="text-body-2">
            <span className="text-gray-650">{t.noAccount}</span>
            <Link href="/signup" className="text-secondary-500 cursor-pointer underline">
              {t.signup}
            </Link>
          </p>
        </div>
      </div>
    </AuthPageShell>
  );
}
