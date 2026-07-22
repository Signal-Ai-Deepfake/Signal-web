"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { toast } from "sonner";
import Button from "@/shared/ui/Button";
import ConfirmModal from "@/shared/ui/ConfirmModal";
import GenderOption from "@/shared/ui/GenderOption";
import Input from "@/shared/ui/Input";
import {
  deleteMyAccount,
  updateMyProfile,
  uploadProfileImage,
  type AuthGender,
  type UserResponse,
} from "@/entities/user/api";
import { MY_PROFILE_QUERY_KEY, useMyProfile } from "@/entities/user/useMyProfile";
import { clearAuthTokens } from "@/shared/lib/authToken";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";

interface ProfileDraft {
  name: string;
  age: string;
  gender: AuthGender;
}

const genderOptions: { value: AuthGender; label: string }[] = [
  { value: "MALE", label: "남" },
  { value: "FEMALE", label: "여" },
  { value: "NONE", label: "선택 안함" },
];

export default function ProfileEditPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useMyProfile();

  const [draft, setDraft] = useState<ProfileDraft | null>(null);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [syncedProfile, setSyncedProfile] = useState<UserResponse | undefined>(undefined);
  const photoInputRef = useRef<HTMLInputElement>(null);

  if (profile && profile !== syncedProfile) {
    setSyncedProfile(profile);
    setDraft({ name: profile.name, age: String(profile.age), gender: profile.gender });
    if (profileImageUrl === null && profile.profileImageUrl) {
      setProfileImageUrl(profile.profileImageUrl);
    }
  }

  const uploadPhotoMutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data) => {
      setProfileImageUrl(data.profileImageUrl);
      toast.success("프로필 사진을 변경했습니다.");
    },
    onError: (error) => {
      toast.error("프로필 사진 변경에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateMyProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, data);
      toast.success("변경사항이 저장되었습니다.");
    },
    onError: (error) => {
      toast.error("변경사항 저장에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: deleteMyAccount,
    onSuccess: () => {
      clearAuthTokens();
      toast.success("탈퇴가 완료되었습니다.");
      router.push("/");
    },
    onError: (error) => {
      toast.error("회원 탈퇴에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const ageNumber = draft ? Number(draft.age) : NaN;
  const isAgeValid = Number.isInteger(ageNumber) && ageNumber > 0;
  const canSave = !!draft && draft.name.trim().length > 0 && isAgeValid;

  function handleCancel() {
    if (!profile) return;
    setDraft({ name: profile.name, age: String(profile.age), gender: profile.gender });
  }

  function handleSave() {
    if (!draft || !canSave) {
      toast.error("이름과 나이를 확인해 주세요.");
      return;
    }
    updateProfileMutation.mutate({ name: draft.name, age: ageNumber, gender: draft.gender });
  }

  function handlePhotoChange() {
    photoInputRef.current?.click();
  }

  function handlePhotoFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || uploadPhotoMutation.isPending) return;
    uploadPhotoMutation.mutate(file);
  }

  function handleWithdrawConfirm() {
    setWithdrawModalOpen(false);
    if (withdrawMutation.isPending) return;
    withdrawMutation.mutate();
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

          {isLoading || !draft || !profile ? (
            <div className="flex w-full flex-col items-center gap-8 rounded-2xl border border-gray-300 p-5 sm:p-8">
              <p className="text-body-2 text-gray-700">프로필 정보를 불러오는 중입니다...</p>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-8 rounded-2xl border border-gray-300 p-5 sm:p-8">
              <div className="flex flex-wrap items-center gap-5 border-b border-gray-300 pb-7">
                <span className="bg-primary-50 text-primary-500 flex size-[78px] shrink-0 items-center justify-center overflow-hidden rounded-full text-[24px] font-semibold">
                  {profileImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profileImageUrl} alt="" className="size-full object-cover" />
                  ) : (
                    draft.name.charAt(0)
                  )}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-body-2 font-medium text-black">프로필 사진</p>
                  <p className="text-caption text-gray-700">JPG, PNG · 최대 5MB</p>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoFileSelected}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={handlePhotoChange}
                    disabled={uploadPhotoMutation.isPending}
                    className="bg-primary-50 text-primary-500 text-body-2 mt-1 w-fit cursor-pointer rounded px-3 py-1.5 font-medium disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {uploadPhotoMutation.isPending ? "업로드 중..." : "사진 변경"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <Input
                  label="이름"
                  value={draft.name}
                  onChange={(event) =>
                    setDraft((prev) => (prev ? { ...prev, name: event.target.value } : prev))
                  }
                />
                <Input
                  label="나이"
                  type="number"
                  min={1}
                  value={draft.age}
                  onChange={(event) =>
                    setDraft((prev) => (prev ? { ...prev, age: event.target.value } : prev))
                  }
                  error={!isAgeValid ? "나이를 올바르게 입력해 주세요." : undefined}
                />
                <Input label="이메일" type="email" value={profile.email} disabled />
                <div className="flex flex-col gap-2">
                  <p className="text-body-1 px-1 text-black">성별</p>
                  <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                    {genderOptions.map((option) => (
                      <GenderOption
                        key={option.value}
                        label={option.label}
                        selected={draft.gender === option.value}
                        onSelect={() =>
                          setDraft((prev) => (prev ? { ...prev, gender: option.value } : prev))
                        }
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
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSave}
                  disabled={!canSave || updateProfileMutation.isPending}
                  className="h-[50px]"
                >
                  {updateProfileMutation.isPending ? "저장 중..." : "변경사항 저장"}
                </Button>
              </div>
            </div>
          )}

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
