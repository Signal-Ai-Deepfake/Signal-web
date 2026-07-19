"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import Eye from "@/shared/asset/svg/Eye";
import EyeOff from "@/shared/asset/svg/EyeOff";
import LockOutline from "@/shared/asset/svg/LockOutline";
import Mail from "@/shared/asset/svg/Mail";
import Button from "@/shared/ui/Button";
import Checkbox from "@/shared/ui/Checkbox";
import Input from "@/shared/ui/Input";
import AuthPageShell from "@/widgets/AuthPageShell";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const canSubmit = email.length > 0 && password.length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <AuthPageShell>
      <div className="flex w-full max-w-[512px] flex-col gap-6 rounded-2xl bg-white px-16 py-10 shadow-md">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-h2 font-bold text-black">로그인</h1>
              <p className="text-body-1 text-gray-800">Signal 계정으로 로그인 하세요.</p>
            </div>
            <div className="flex flex-col gap-1">
              <Input
                label="이메일"
                icon={Mail}
                type="email"
                placeholder="이메일 주소를 입력해 주세요."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                label="비밀번호"
                icon={LockOutline}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해 주세요."
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-600 shrink-0 [&>svg]:h-6 [&>svg]:w-6"
                    aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <Checkbox checked={keepLoggedIn} onChange={setKeepLoggedIn} label="로그인 상태 유지" />
              <button type="button" className="text-body-2 text-gray-600">
                비밀번호를 잊으셨나요?
              </button>
            </div>
            <Button type="submit" variant="primary" className="w-full" disabled={!canSubmit}>
              로그인 하기
            </Button>
          </div>
        </form>
        <div className="flex flex-col items-center gap-6">
          <div className="h-px w-full bg-gray-300" />
          <p className="text-body-1">
            <span className="text-gray-650">계정이 없으신가요? </span>
            <Link href="/signup" className="text-secondary-500 underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </AuthPageShell>
  );
}
