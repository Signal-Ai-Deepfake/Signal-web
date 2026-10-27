"use client";

import CheckCircle from "@/shared/asset/svg/CheckCircle";
import LinkButton from "@/shared/ui/LinkButton";
import { authCardClass } from "@/widgets/AuthPageShell";
import { useT } from "@/shared/i18n/I18nProvider";
import { authMessages } from "@/views/authMessages";

export default function StepComplete() {
  const t = useT(authMessages);
  return (
    <div className={`${authCardClass} items-center lg:max-w-[480px]`}>
      <div className="text-secondary-500 [&>svg]:h-14 [&>svg]:w-14">
        <CheckCircle />
      </div>
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-h3 font-bold text-black">{t.signup.completeTitle}</h1>
        <p className="text-body-2 text-gray-800">
          {t.signup.completeDescription[0]}
          <br />
          {t.signup.completeDescription[1]}
        </p>
      </div>
      <LinkButton href="/login" variant="primary" className="w-full">
        {t.goToLogin}
      </LinkButton>
    </div>
  );
}
