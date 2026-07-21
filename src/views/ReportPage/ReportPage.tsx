"use client";

import { useState } from "react";
import { toast } from "sonner";
import Footer from "@/widgets/Footer";
import HeaderAuthenticated from "@/widgets/HeaderAuthenticated";
import ReportHero from "./ReportHero";
import Step1TypeSelect from "./Step1TypeSelect";
import type { DamageType } from "./Step1TypeSelect";
import Step2Details from "./Step2Details";
import type { ReportDetails } from "./Step2Details";
import Step3Draft from "./Step3Draft";
import type { DraftSection } from "./Step3Draft";
import Step4Generated from "./Step4Generated";

const emptyDetails: ReportDetails = {
  incidentDate: "",
  platform: "",
  url: "",
  description: "",
  additionalNotes: "",
};

export default function ReportPage() {
  const [step, setStep] = useState(1);
  const [damageType, setDamageType] = useState<DamageType | null>(null);
  const [details, setDetails] = useState<ReportDetails>(emptyDetails);
  const [evidenceFileName, setEvidenceFileName] = useState<string | null>(null);
  const [generatedSections, setGeneratedSections] = useState<DraftSection[]>([]);

  function handleSubmit(sections: DraftSection[]) {
    setGeneratedSections(sections);
    setStep(4);
  }

  function handleFindAgency() {
    toast.success("적합한 신고 기관을 확인하는 기능은 준비 중입니다.");
  }

  return (
    <>
      <HeaderAuthenticated />
      <main className="flex w-full flex-col items-center bg-white px-5 py-10 pb-[120px]">
        <div className="flex w-full max-w-[960px] flex-col items-start gap-8">
          <div className="w-full animate-[fade-in-up_0.4s_ease-out]">
            <ReportHero />
          </div>
          <div key={step} className="w-full animate-[step-in_0.35s_ease-out]">
            {step === 1 && (
              <Step1TypeSelect
                damageType={damageType}
                onSelect={setDamageType}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <Step2Details
                details={details}
                onChange={setDetails}
                evidenceFileName={evidenceFileName}
                onEvidenceChange={setEvidenceFileName}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && damageType && (
              <Step3Draft
                damageType={damageType}
                details={details}
                evidenceFileName={evidenceFileName}
                onBack={() => setStep(2)}
                onSubmit={handleSubmit}
              />
            )}
            {step === 4 && (
              <Step4Generated
                sections={generatedSections}
                onBack={() => setStep(3)}
                onFindAgency={handleFindAgency}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
