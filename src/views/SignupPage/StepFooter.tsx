"use client";

import Link from "next/link";
import { useT } from "@/shared/i18n/I18nProvider";
import { authMessages } from "@/views/authMessages";

export default function StepFooter() {
  const t = useT(authMessages);
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="h-px w-full bg-gray-300" />
      <p className="text-body-2">
        <span className="text-gray-650">{t.signup.haveAccount}</span>
        <Link href="/login" className="text-secondary-500 cursor-pointer underline">
          {t.signup.login}
        </Link>
      </p>
    </div>
  );
}
