"use client";

import { useEffect } from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-[360px] animate-[fade-in-up_0.2s_ease-out] flex-col gap-6 rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-body-1 font-semibold text-black">{title}</h2>
          {description && <p className="text-body-2 text-gray-700">{description}</p>}
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="border-primary-500 text-primary-500 text-body-2 active:bg-primary-50 flex h-[44px] cursor-pointer items-center justify-center rounded border px-5 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="text-body-2 flex h-[44px] cursor-pointer items-center justify-center rounded bg-red-500 px-5 font-semibold text-white transition-colors active:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
