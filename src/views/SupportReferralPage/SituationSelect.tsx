"use client";

import { useEffect, useRef, useState } from "react";
import type { SupportReferral } from "@/entities/agency/model";
import Arrow from "@/shared/asset/svg/Arrow";

interface SituationSelectProps {
  referrals: SupportReferral[];
  selectedKey: string;
  onSelect: (key: string) => void;
}

export default function SituationSelect({
  referrals,
  selectedKey,
  onSelect,
}: SituationSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = referrals.find((referral) => referral.key === selectedKey);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-body-2 hover:border-primary-300 flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-[17px] py-[13px] text-left text-black transition-colors"
      >
        <span>{selected?.situationLabel}</span>
        <span
          className={`shrink-0 text-gray-700 transition-transform [&>svg]:h-3 [&>svg]:w-3 ${
            open ? "-rotate-90" : "rotate-90"
          }`}
        >
          <Arrow />
        </span>
      </button>
      {open && (
        <div className="absolute top-full left-0 z-20 mt-2 w-full animate-[fade-in-up_0.2s_ease-out] rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
          {referrals.map((referral) => (
            <button
              key={referral.key}
              type="button"
              onClick={() => {
                onSelect(referral.key);
                setOpen(false);
              }}
              className={`text-body-2 block w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-gray-100 active:bg-gray-200 ${
                referral.key === selectedKey ? "text-primary-500 font-medium" : "text-black"
              }`}
            >
              {referral.situationLabel}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
