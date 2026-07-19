"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Eye from "@/shared/asset/svg/Eye";
import EyeOff from "@/shared/asset/svg/EyeOff";
import LockOutline from "@/shared/asset/svg/LockOutline";
import Logo from "@/shared/asset/svg/Logo";
import Mail from "@/shared/asset/svg/Mail";
import Sparkle from "@/shared/asset/svg/Sparkle";
import Button from "@/shared/ui/Button";
import Checkbox from "@/shared/ui/Checkbox";
import Input from "@/shared/ui/Input";

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
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(110deg, #ffffff 49%, var(--color-secondary-50) 96%)",
      }}
    >
      <img
        src="/images/login/ellipse-1.svg"
        alt=""
        className="pointer-events-none absolute -left-24 top-40 h-[685px] w-[685px]"
      />
      <img
        src="/images/login/group-7.svg"
        alt=""
        className="pointer-events-none absolute -left-24 top-[380px] h-[640px] w-[640px]"
      />
      <img
        src="/images/login/ellipse-5.svg"
        alt=""
        className="pointer-events-none absolute -left-12 top-40 h-[504px] w-[504px]"
      />
      <img
        src="/images/login/wave-1.svg"
        alt=""
        className="pointer-events-none absolute right-0 top-[280px] hidden w-[500px] xl:block"
      />
      <img
        src="/images/login/wave-2.svg"
        alt=""
        className="pointer-events-none absolute right-0 top-[180px] hidden w-[480px] -rotate-12 xl:block"
      />
      <span className="pointer-events-none absolute right-40 top-[260px] hidden text-white xl:block [&>svg]:h-8 [&>svg]:w-8">
        <Sparkle />
      </span>
      <span className="pointer-events-none absolute right-16 top-[160px] hidden text-white xl:block [&>svg]:h-8 [&>svg]:w-8">
        <Sparkle />
      </span>
      <span className="text-secondary-200 pointer-events-none absolute left-16 top-[280px] hidden xl:block [&>svg]:h-8 [&>svg]:w-8">
        <Sparkle />
      </span>

      <header className="relative w-full border-b border-gray-300 bg-white">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center px-5">
          <Logo />
        </div>
      </header>

      <main className="relative flex items-center justify-center px-5 py-16">
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
              <button type="button" className="text-secondary-500 underline">
                회원가입
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
