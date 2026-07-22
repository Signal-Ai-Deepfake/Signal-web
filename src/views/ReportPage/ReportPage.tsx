"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createReport, finalizeReport, uploadReportEvidence } from "@/entities/report/api";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
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

function findSectionBody(sections: DraftSection[], title: string): string | undefined {
  const body = sections.find((section) => section.title === title)?.body.trim();
  return body && body !== "미입력" ? body : undefined;
}

export default function ReportPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [damageType, setDamageType] = useState<DamageType | null>(null);
  const [details, setDetails] = useState<ReportDetails>(emptyDetails);
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [generatedSections, setGeneratedSections] = useState<DraftSection[]>([]);
  const [reportId, setReportId] = useState<number | null>(null);
  const [finalized, setFinalized] = useState(false);

  const createReportMutation = useMutation({
    mutationFn: async (sections: DraftSection[]) => {
      const evidenceIds: number[] = [];
      if (evidenceFile) {
        try {
          const evidence = await uploadReportEvidence(evidenceFile);
          evidenceIds.push(evidence.evidenceId);
        } catch {
          toast.error("증거 자료 업로드에 실패했습니다. 첨부 없이 신고서를 생성합니다.");
        }
      }
      const sourceUrl = findSectionBody(sections, "원본 URL");
      return createReport({
        incidentDate: details.incidentDate || undefined,
        discoveryRoute: findSectionBody(sections, "피해 경로"),
        damageType: damageType ?? undefined,
        description: findSectionBody(sections, "피해 내용"),
        sourceUrls: sourceUrl ? [sourceUrl] : undefined,
        evidenceIds: evidenceIds.length > 0 ? evidenceIds : undefined,
      });
    },
    onSuccess: (response, sections) => {
      setReportId(response.reportId);
      setFinalized(response.status === "FINALIZED");
      setGeneratedSections(sections);
      setStep(4);
      toast.success("신고 문서를 생성했습니다.");
    },
    onError: (error) => {
      toast.error("신고 문서 생성에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const finalizeMutation = useMutation({
    mutationFn: () => {
      if (!reportId) throw new Error("신고서가 아직 생성되지 않았습니다.");
      return finalizeReport(reportId);
    },
    onSuccess: () => {
      setFinalized(true);
      toast.success("신고서 제출이 확정되었습니다.");
    },
    onError: (error) => {
      toast.error("신고서 제출 확정에 실패했습니다.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  function handleSubmit(sections: DraftSection[]) {
    if (createReportMutation.isPending) return;
    createReportMutation.mutate(sections);
  }

  function handleFinalize() {
    if (finalizeMutation.isPending || finalized) return;
    finalizeMutation.mutate();
  }

  function handleFindAgency() {
    router.push("/support-referral");
  }

  return (
    <>
      <SiteHeader />
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
                evidenceFile={evidenceFile}
                onEvidenceChange={setEvidenceFile}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && damageType && (
              <Step3Draft
                damageType={damageType}
                details={details}
                evidenceFileName={evidenceFile?.name ?? null}
                onBack={() => setStep(2)}
                onSubmit={handleSubmit}
                submitting={createReportMutation.isPending}
              />
            )}
            {step === 4 && (
              <Step4Generated
                sections={generatedSections}
                onBack={() => setStep(3)}
                onFindAgency={handleFindAgency}
                onFinalize={handleFinalize}
                finalizing={finalizeMutation.isPending}
                finalized={finalized}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
