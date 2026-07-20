import Button from "@/shared/ui/Button";
import StepHeader from "@/shared/ui/StepHeader";
import TermsRow from "@/shared/ui/TermsRow";
import PrivacyPolicyContent from "./PrivacyPolicyContent";
import TermsOfServiceContent from "./TermsOfServiceContent";

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
  return (
    <>
      <StepHeader title="약관에 동의해 주세요" description="서비스 이용을 위해 약관에 동의해 주세요." />
      <div className="flex w-full flex-col gap-3">
        <div className="overflow-hidden rounded-lg border border-gray-300">
          <TermsRow
            label="전체 동의"
            checked={agreeTerms && agreePrivacy}
            onChange={onAgreeAllChange}
          />
        </div>
        <div className="flex flex-col divide-y divide-gray-300 overflow-hidden rounded-lg border border-gray-300">
          <TermsRow
            label="이용약관 동의"
            required
            checked={agreeTerms}
            onChange={onAgreeTermsChange}
            content={<TermsOfServiceContent />}
          />
          <TermsRow
            label="개인정보 처리방침 동의"
            required
            checked={agreePrivacy}
            onChange={onAgreePrivacyChange}
            content={<PrivacyPolicyContent />}
          />
        </div>
      </div>
      <Button type="button" variant="primary" className="w-full" disabled={!canProceed} onClick={onNext}>
        다음
      </Button>
    </>
  );
}
