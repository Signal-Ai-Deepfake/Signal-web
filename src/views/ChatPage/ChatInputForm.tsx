"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Plus from "@/shared/asset/svg/Plus";
import Send from "@/shared/asset/svg/Send";
import Button from "@/shared/ui/Button";
import { useT } from "@/shared/i18n/I18nProvider";
import { chatMessages } from "./messages";

interface ChatInputFormProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  menuOpen?: boolean;
  onToggleMenu?: () => void;
}

export default function ChatInputForm({
  onSend,
  disabled,
  menuOpen = false,
  onToggleMenu,
}: ChatInputFormProps) {
  const t = useT(chatMessages);
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 border-t border-gray-300 bg-white px-5 py-3 md:items-stretch md:gap-2.5 md:border-t-0 md:px-[22px] md:pt-3.5 md:pb-[22px]"
    >
      {onToggleMenu && (
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label={menuOpen ? t.input.closeSettings : t.input.openSettings}
          aria-expanded={menuOpen}
          className="bg-primary-50 text-primary-500 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full md:hidden"
        >
          <span
            className={`transition-transform duration-200 [&>svg]:h-4 [&>svg]:w-3.5 ${
              menuOpen ? "rotate-45" : ""
            }`}
          >
            <Plus />
          </span>
        </button>
      )}
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={disabled}
        placeholder={t.input.placeholder}
        className="text-small bg-primary-50 focus:ring-primary-200 md:text-body-1 md:focus:border-primary-400 h-10 min-w-0 flex-1 rounded-2xl px-4 text-black outline-none placeholder:text-gray-800/50 focus:ring-2 disabled:opacity-60 md:h-[60px] md:rounded-lg md:border md:border-gray-300 md:bg-white md:placeholder:text-gray-600 md:focus:ring-0 md:disabled:bg-gray-200 md:disabled:opacity-100"
      />
      <button
        type="submit"
        disabled={disabled}
        aria-label={t.input.send}
        className="bg-primary-500 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-white disabled:cursor-not-allowed disabled:bg-gray-200 md:hidden"
      >
        <span className="[&>svg]:size-3.5">
          <Send />
        </span>
      </button>
      <div className="hidden md:flex">
        <Button
          type="submit"
          variant="primary"
          disabled={disabled}
          className="h-[60px] min-w-[104px]"
        >
          {t.input.send}
        </Button>
      </div>
    </form>
  );
}
