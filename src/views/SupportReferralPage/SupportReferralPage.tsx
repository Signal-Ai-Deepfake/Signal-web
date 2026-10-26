"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAgencies } from "@/entities/agency/api";
import PageHeading from "@/shared/ui/PageHeading";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import AgencyCard from "./AgencyCard";
import { situationCategories } from "./situationCategories";
import SituationSelect from "./SituationSelect";

export default function SupportReferralPage() {
  const [selectedType, setSelectedType] = useState(situationCategories[0].type);
  const selected =
    situationCategories.find((category) => category.type === selectedType) ??
    situationCategories[0];

  const {
    data: agencies,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["agencies", selectedType],
    queryFn: () => getAgencies(selectedType),
  });

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-6 pb-[120px] md:py-10">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-6 md:gap-8">
          <PageHeading
            title="실제 기관 연결"
            description="현재 피해 상황을 선택하면 관련 지원 기관을 바로 연결해 드립니다."
            breadcrumbs={[{ label: "익명 상담 챗봇", href: "/chat" }, { label: "실제 기관 연결" }]}
          />

          <div className="bg-primary-50 flex flex-col items-start justify-between gap-5 rounded-2xl p-5 sm:flex-row md:gap-6 md:p-6">
            <div className="flex flex-col gap-1">
              <p className="text-small text-gray-700">현재 피해 상황</p>
              <p className="text-large md:text-h3 font-semibold text-black">{selected.label}</p>
              <p className="text-small md:text-large break-keep text-gray-700">
                {selected.description}
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-[280px]">
              <label className="text-small md:text-large px-1 font-medium text-black">
                상황 변경
              </label>
              <SituationSelect
                categories={situationCategories}
                selectedType={selectedType}
                onSelect={(type) =>
                  setSelectedType(type as (typeof situationCategories)[number]["type"])
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-large md:text-h3 px-1 font-semibold text-black">지원 기관</p>

            {isPending && <p className="text-body-1 px-1 text-gray-700">불러오는 중...</p>}

            {isError && (
              <p className="text-body-1 px-1 text-red-500">
                기관 목록을 불러오지 못했습니다.
                {error instanceof Error ? ` (${error.message})` : ""}
              </p>
            )}

            {agencies && agencies.length === 0 && (
              <p className="text-body-1 px-1 text-gray-700">
                해당 상황에 등록된 지원 기관이 없습니다.
              </p>
            )}

            {agencies && agencies.length > 0 && (
              <div className="flex flex-col gap-4">
                {agencies.map((agency) => (
                  <AgencyCard key={agency.agencyId} agency={agency} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
