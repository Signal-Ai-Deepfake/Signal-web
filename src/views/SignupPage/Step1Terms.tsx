"use client";

import Button from "@/shared/ui/Button";
import StepHeader from "@/shared/ui/StepHeader";
import TermsRow from "@/shared/ui/TermsRow";
import PrivacyPolicyContent from "./PrivacyPolicyContent";
import TermsOfServiceContent from "./TermsOfServiceContent";
import { useT } from "@/shared/i18n/I18nProvider";
import { authMessages } from "@/views/authMessages";

interface Step1TermsProps {
  agreeTerms: boolean;
  agreePrivacy: boolean;
  onAgreeAllChange: (next: boolean) => void;
  onAgreeTermsChange: (checked: boolean) => void;
  onAgreePrivacyChange: (checked: boolean) => void;
  canProceed: boolean;
  onNext: () => void;
}

export default function Step1Terms({
  agreeTerms,
  agreePrivacy,
  onAgreeAllChange,
  onAgreeTermsChange,
  onAgreePrivacyChange,
  canProceed,
  onNext,
}: Step1TermsProps) {
  const t = useT(authMessages);
  return (
    <>
      <StepHeader title={t.signup.termsTitle} description={t.signup.termsDescription} />
      <div className="flex w-full flex-col gap-3">
        <div className="overflow-hidden rounded-lg border border-gray-300">
          <TermsRow
            label={t.signup.agreeAll}
            checked={agreeTerms && agreePrivacy}
            onChange={onAgreeAllChange}
          />
        </div>
        <div className="flex flex-col divide-y divide-gray-300 overflow-hidden rounded-lg border border-gray-300">
          <TermsRow
            label={t.signup.agreeTerms}
            required
            checked={agreeTerms}
            onChange={onAgreeTermsChange}
            content={<TermsOfServiceContent />}
          />
          <TermsRow
            label={t.signup.agreePrivacy}
            required
            checked={agreePrivacy}
            onChange={onAgreePrivacyChange}
            content={<PrivacyPolicyContent />}
          />
        </div>
      </div>
      <Button
        type="button"
        variant="primary"
        className="w-full"
        disabled={!canProceed}
        onClick={onNext}
      >
        {t.next}
      </Button>
    </>
  );
}
