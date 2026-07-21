"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/shared/ui/Button";

interface ChatInputFormProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export default function ChatInputForm({ onSend, disabled }: ChatInputFormProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2.5 px-[22px] pt-3.5 pb-[22px]">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={disabled}
        placeholder="현재 상황을 입력해 주세요"
        className="text-body-1 placeholder:text-gray-600 h-[60px] flex-1 rounded-lg border border-gray-300 px-4 text-black outline-none focus:border-primary-400 disabled:bg-gray-200"
      />
      <Button type="submit" variant="primary" disabled={disabled} className="h-[60px] w-[104px]">
        전송
      </Button>
    </form>
  );
}
