"use client";

import { useEffect, useRef, useState } from "react";
import type { SituationCategory } from "./situationCategories";
import Arrow from "@/shared/asset/svg/Arrow";

interface SituationSelectProps {
  categories: SituationCategory[];
  selectedType: string;
  onSelect: (type: string) => void;
}

export default function SituationSelect({
  categories,
  selectedType,
  onSelect,
}: SituationSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = categories.find((category) => category.type === selectedType);

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
        <span>{selected?.label}</span>
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
          {categories.map((category) => (
            <button
              key={category.type}
              type="button"
              onClick={() => {
                onSelect(category.type);
                setOpen(false);
              }}
              className={`text-body-2 block w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-gray-100 active:bg-gray-200 ${
                category.type === selectedType ? "text-primary-500 font-medium" : "text-black"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
