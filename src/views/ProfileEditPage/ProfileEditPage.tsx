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
import { resolveFileUrl } from "@/shared/lib/resolveFileUrl";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import { useT } from "@/shared/i18n/I18nProvider";
import { profileMessages } from "./messages";

interface ProfileDraft {
  name: string;
  age: string;
  gender: AuthGender;
}

const genderOptions: AuthGender[] = ["MALE", "FEMALE", "NONE"];

export default function ProfileEditPage() {
  const router = useRouter();
  const t = useT(profileMessages);
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
      toast.success(t.photoChanged);
    },
    onError: (error) => {
      toast.error(t.photoFailed, {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateMyProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, data);
      toast.success(t.saved);
    },
    onError: (error) => {
      toast.error(t.saveFailed, {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: deleteMyAccount,
    onSuccess: () => {
      clearAuthTokens();
      toast.success(t.withdrawn);
      router.push("/");
    },
    onError: (error) => {
      toast.error(t.withdrawFailed, {
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
      toast.error(t.checkNameAge);
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
      <main className="flex w-full flex-col items-center bg-white px-5 py-6 pb-[120px] md:py-10">
        <div className="flex w-full max-w-[960px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-2 md:gap-6">
            <h1 className="text-h3 font-bold text-black md:text-[32px] md:leading-[1.4] md:tracking-[-0.48px]">
              {t.title}
            </h1>
            <p className="text-small md:text-body-2 break-keep text-gray-700">{t.description}</p>
          </div>

          {isLoading || !draft || !profile ? (
            <div className="flex w-full flex-col items-center gap-8 rounded-2xl border border-gray-300 p-5 sm:p-8">
              <p className="text-body-2 text-gray-700">{t.loading}</p>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-6 rounded-2xl border border-gray-300 p-5 sm:p-8 md:gap-8">
              <div className="flex flex-wrap items-center gap-4 border-b border-gray-300 pb-6 md:gap-5 md:pb-7">
                <span className="bg-primary-50 text-primary-500 flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full text-[24px] font-semibold md:size-[78px]">
                  {profileImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={resolveFileUrl(profileImageUrl)}
                      alt=""
                      className="size-full object-cover"
                    />
                  ) : (
                    draft.name.charAt(0)
                  )}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-body-2 font-medium text-black">{t.photo}</p>
                  <p className="text-caption text-gray-700">{t.photoHint}</p>
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
                    {uploadPhotoMutation.isPending ? t.uploading : t.changePhoto}
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <Input
                  label={t.name}
                  value={draft.name}
                  onChange={(event) =>
                    setDraft((prev) => (prev ? { ...prev, name: event.target.value } : prev))
                  }
                />
                <Input
                  label={t.age}
                  type="number"
                  min={1}
                  value={draft.age}
                  onChange={(event) =>
                    setDraft((prev) => (prev ? { ...prev, age: event.target.value } : prev))
                  }
                  error={!isAgeValid ? t.ageInvalid : undefined}
                />
                <Input label={t.email} type="email" value={profile.email} disabled />
                <div className="flex flex-col gap-2">
                  <p className="text-body-1 px-1 text-black">{t.genderLabel}</p>
                  <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                    {genderOptions.map((option) => (
                      <GenderOption
                        key={option}
                        label={t.gender[option]}
                        selected={draft.gender === option}
                        onSelect={() =>
                          setDraft((prev) => (prev ? { ...prev, gender: option } : prev))
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
                  {t.cancel}
                </button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSave}
                  disabled={!canSave || updateProfileMutation.isPending}
                  className="h-[50px]"
                >
                  {updateProfileMutation.isPending ? t.saving : t.save}
                </Button>
              </div>
            </div>
          )}

          <div className="flex w-full flex-col items-start gap-4 rounded-xl border border-gray-300 p-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
            <div className="flex flex-col gap-1">
              <p className="text-body-2 font-medium text-black">{t.withdrawTitle}</p>
              <p className="text-small text-gray-700">{t.withdrawDescription}</p>
            </div>
            <button
              type="button"
              onClick={() => setWithdrawModalOpen(true)}
              className="text-small w-full shrink-0 cursor-pointer rounded-md border border-red-500 px-3.5 py-2.5 text-red-500 sm:w-auto"
            >
              {t.withdrawTitle}
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <ConfirmModal
        open={withdrawModalOpen}
        title={t.withdrawConfirmTitle}
        description={t.withdrawConfirmDescription}
        confirmLabel={t.withdrawConfirm}
        cancelLabel={t.cancel}
        onConfirm={handleWithdrawConfirm}
        onCancel={() => setWithdrawModalOpen(false)}
      />
    </>
  );
}
