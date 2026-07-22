import type { ChangeEvent, RefObject } from "react";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import User from "@/shared/asset/svg/User";
import Button from "@/shared/ui/Button";
import PrevButton from "@/shared/ui/PrevButton";
import StepHeader from "@/shared/ui/StepHeader";

interface Step4PhotoProps {
  photoPreview: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onPhotoChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}

export default function Step4Photo({
  photoPreview,
  fileInputRef,
  onPhotoChange,
  onBack,
  onNext,
  nextDisabled = false,
  nextLabel = "다음",
}: Step4PhotoProps) {
  return (
    <>
      <StepHeader title="프로필 설정" />
      <div className="flex w-full flex-col items-center gap-8">
        <div className="bg-gray-200 flex size-32 items-center justify-center overflow-hidden rounded-full">
          {photoPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoPreview} alt="" className="size-full object-cover" />
          ) : (
            <span className="text-gray-400 [&>svg]:h-[88px] [&>svg]:w-[88px]">
              <User />
            </span>
          )}
        </div>
        <div className="flex w-full max-w-[240px] flex-col items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onPhotoChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="border-secondary-500 text-secondary-500 flex w-full cursor-pointer items-center justify-center gap-3 rounded border px-5 py-2.5"
          >
            <span className="[&>svg]:h-5 [&>svg]:w-5">
              <ImageArrowUp />
            </span>
            <span className="text-body-2 font-medium">사진 업로드</span>
          </button>
          <p className="text-body-2 text-gray-650 text-center">
            지금 등록하지 않아도
            <br />
            나중에 언제든 추가할 수 있습니다.
          </p>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        <PrevButton onClick={onBack} />
        <Button
          type="button"
          variant="primary"
          className="h-11"
          disabled={nextDisabled}
          onClick={onNext}
        >
          {nextLabel}
        </Button>
      </div>
    </>
  );
}
