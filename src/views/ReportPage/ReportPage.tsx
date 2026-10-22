"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createReport, updateReport } from "@/entities/report/api";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import MobileReportStepper from "./MobileReportStepper";
import ReportHero from "./ReportHero";
import Step1TypeSelect from "./Step1TypeSelect";
import type { DamageType } from "./Step1TypeSelect";
import Step2Details from "./Step2Details";
import type { ReportDetails, ReportEvidence } from "./Step2Details";
import Step3Draft from "./Step3Draft";
import Step4Generated from "./Step4Generated";
import { createDraft, toReportRequest, type ReportDraft } from "./reportDraft";

const emptyDetails: ReportDetails = {
  incidentDate: "",
  platform: "",
  url: "",
  description: "",
  additionalNotes: "",
};

export default function ReportPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [damageType, setDamageType] = useState<DamageType | null>(null);
  const [details, setDetails] = useState<ReportDetails>(emptyDetails);
  const [evidence, setEvidence] = useState<ReportEvidence | null>(null);
  const [draft, setDraft] = useState<ReportDraft | null>(null);
  const [reportId, setReportId] = useState<number | null>(null);

  const saveReportMutation = useMutation({
    mutationFn: async (currentDraft: ReportDraft) => {
      const payload = toReportRequest(currentDraft, evidence);
      if (reportId !== null) {
        await updateReport(reportId, payload);
        return reportId;
      }
      const created = await createReport(payload);
      return created.reportId;
    },
    onSuccess: (savedId) => {
      const isUpdate = reportId !== null;
      setReportId(savedId);
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      setStep(4);
      toast.success(isUpdate ? "신고 문서를 수정했습니다." : "신고 문서를 생성했습니다.");
    },
    onError: (error) => {
      toast.error("신고 문서 저장에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  function goToDraft() {
    if (!damageType) return;
    setDraft(createDraft(damageType, details));
    setStep(3);
  }

  function handleSubmit() {
    if (!draft || saveReportMutation.isPending) return;
    saveReportMutation.mutate(draft);
  }

  function handleFindAgency() {
    router.push("/support-referral");
  }

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-6 pb-[120px] md:py-10">
        <div className="flex w-full max-w-[960px] flex-col items-start gap-6 md:gap-8">
          <div className="flex w-full animate-[fade-in-up_0.4s_ease-out] flex-col gap-6">
            <ReportHero />
            <MobileReportStepper currentStep={step} />
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
                evidence={evidence}
                onEvidenceChange={setEvidence}
                onBack={() => setStep(1)}
                onNext={goToDraft}
              />
            )}
            {step === 3 && draft && (
              <Step3Draft
                draft={draft}
                evidence={evidence}
                onChange={setDraft}
                onBack={() => setStep(2)}
                onSubmit={handleSubmit}
                submitting={saveReportMutation.isPending}
                submitLabel={reportId === null ? "신고 문서 생성하기" : "수정 내용 저장하기"}
              />
            )}
            {step === 4 && draft && reportId !== null && (
              <Step4Generated
                draft={draft}
                evidence={evidence}
                reportId={reportId}
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
