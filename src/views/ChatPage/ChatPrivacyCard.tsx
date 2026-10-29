"use client";

import Link from "next/link";
import LockOutline from "@/shared/asset/svg/LockOutline";
import Switch from "@/shared/ui/Switch";
import { useT } from "@/shared/i18n/I18nProvider";
import { chatMessages } from "./messages";

interface ChatPrivacyCardProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  locked?: boolean;
  guest?: boolean;
}

export default function ChatPrivacyCard({
  checked,
  onChange,
  locked = false,
  guest = false,
}: ChatPrivacyCardProps) {
  const t = useT(chatMessages);
  return (
    <div className="bg-primary-50 flex w-full flex-col gap-4 rounded-2xl p-5">
      <div className="flex items-start gap-1">
        <span className="text-primary-500 shrink-0 [&>svg]:h-6 [&>svg]:w-6">
          <LockOutline />
        </span>
        <div className="flex flex-col">
          <p className="text-small text-primary-500 font-medium">{t.privacy.anonymous}</p>
          <p className="text-caption text-gray-700">{t.privacy.notStored}</p>
        </div>
      </div>

      <div className="h-px w-full bg-gray-300" />

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-small font-semibold text-black">{t.privacy.saveHistory}</p>
          <p className="text-caption text-gray-700">
            {guest ? t.privacy.loginRequired : checked ? t.privacy.agreed : t.privacy.notSaved}
          </p>
        </div>
        <Switch checked={!guest && checked} onChange={onChange} disabled={guest || locked} />
      </div>

      {guest ? (
        <p className="text-caption break-keep text-gray-700">
          {t.privacy.guestNotSaved}
          {!locked && (
            <>
              {" "}
              {t.privacy.guestPrefix}{" "}
              <Link href="/login" className="text-primary-500 font-semibold underline">
                {t.privacy.login}
              </Link>
              {t.privacy.guestSuffix}
            </>
          )}
        </p>
      ) : (
        <p className="text-caption text-gray-700">
          {locked ? t.privacy.locked : t.privacy.consentHint}
        </p>
      )}
    </div>
  );
}
