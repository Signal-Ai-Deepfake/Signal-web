"use client";

import { useState } from "react";
import { toast } from "sonner";
import Calendar from "@/shared/asset/svg/Calendar";
import Button from "@/shared/ui/Button";
import ConfirmModal from "@/shared/ui/ConfirmModal";
import GenderOption from "@/shared/ui/GenderOption";
import Input from "@/shared/ui/Input";
import { mockUserProfile } from "@/entities/user/model";
import type { Gender, UserProfile } from "@/entities/user/model";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";

const genderOptions: { value: Gender; label: string }[] = [
  { value: "male", label: "남" },
  { value: "female", label: "여" },
  { value: "unspecified", label: "선택 안함" },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProfileEditPage() {
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [draft, setDraft] = useState<UserProfile>(mockUserProfile);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const isEmailValid = EMAIL_REGEX.test(draft.email);
  const emailError = !isEmailValid
    ? "올바른 이메일 형식으로 입력해 주세요. (예: name@example.com)"
    : undefined;

  function handleCancel() {
    setDraft(profile);
    setEmailTouched(false);
  }

  function handleSave() {
    if (!isEmailValid) {
      setEmailTouched(true);
      toast.error("이메일 형식을 확인해 주세요.");
      return;
    }
    setProfile(draft);
    toast.success("변경사항이 저장되었습니다.");
  }

  function handlePhotoChange() {
    toast.success("프로필 사진 변경 기능은 준비 중입니다.");
  }

  function handleWithdrawConfirm() {
    setWithdrawModalOpen(false);
    toast.success("회원 탈퇴 기능은 준비 중입니다.");
  }

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-10 pb-[120px]">
        <div className="flex w-full max-w-[960px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h1 className="text-[32px] leading-[1.4] font-bold tracking-[-0.48px] text-black">
              내 프로필
            </h1>
            <p className="text-body-2 text-gray-700">
              회원 정보와 프로필을 확인하고 변경할 수 있습니다.
            </p>
          </div>

          <div className="flex w-full flex-col gap-8 rounded-2xl border border-gray-300 p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-5 border-b border-gray-300 pb-7">
              <span className="bg-primary-50 text-primary-500 flex size-[78px] shrink-0 items-center justify-center rounded-full text-[24px] font-semibold">
                {draft.name.charAt(0)}
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-body-2 font-medium text-black">프로필 사진</p>
                <p className="text-caption text-gray-700">JPG, PNG · 최대 5MB</p>
                <button
                  type="button"
                  onClick={handlePhotoChange}
                  className="bg-primary-50 text-primary-500 text-body-2 mt-1 w-fit cursor-pointer rounded px-3 py-1.5 font-medium"
                >
                  사진 변경
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <Input
                label="이름"
                value={draft.name}
                onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
              />
              <Input
                label="생년월일"
                icon={Calendar}
                value={draft.birthDate}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, birthDate: event.target.value }))
                }
              />
              <Input
                label="이메일"
                type="email"
                value={draft.email}
                onChange={(event) => setDraft((prev) => ({ ...prev, email: event.target.value }))}
                onBlur={() => setEmailTouched(true)}
                error={emailTouched ? emailError : undefined}
              />
              <div className="flex flex-col gap-2">
                <p className="text-body-1 px-1 text-black">성별</p>
                <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                  {genderOptions.map((option) => (
                    <GenderOption
                      key={option.value}
                      label={option.label}
                      selected={draft.gender === option.value}
                      onSelect={() => setDraft((prev) => ({ ...prev, gender: option.value }))}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse items-stretch justify-end gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleCancel}
                className="border-primary-500 text-primary-500 text-body-2 active:bg-primary-50 flex h-[50px] cursor-pointer items-center justify-center rounded border px-6 transition-colors"
              >
                취소
              </button>
              <Button type="button" variant="primary" onClick={handleSave} className="h-[50px]">
                변경사항 저장
              </Button>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-4 rounded-xl border border-gray-300 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-body-2 font-medium text-black">회원 탈퇴</p>
              <p className="text-small text-gray-700">
                탈퇴하면 저장된 정보와 이용 내역이 삭제됩니다.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setWithdrawModalOpen(true)}
              className="text-small w-full shrink-0 cursor-pointer rounded-md border border-red-500 px-3.5 py-2.5 text-red-500 sm:w-auto"
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <ConfirmModal
        open={withdrawModalOpen}
        title="정말 탈퇴하시겠습니까?"
        description="탈퇴하면 저장된 정보와 이용 내역이 모두 삭제되며 되돌릴 수 없습니다."
        confirmLabel="탈퇴하기"
        cancelLabel="취소"
        onConfirm={handleWithdrawConfirm}
        onCancel={() => setWithdrawModalOpen(false)}
      />
    </>
  );
}
