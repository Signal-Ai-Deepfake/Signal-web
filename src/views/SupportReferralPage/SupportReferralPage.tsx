"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { getAgencies } from "@/entities/agency/api";
import Arrow from "@/shared/asset/svg/Arrow";
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
      <main className="flex w-full flex-col items-center bg-white px-5 py-10 pb-[120px]">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href="/" className="text-body-1 text-gray-700">
                홈
              </Link>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <Link href="/chat" className="text-body-1 text-primary-500">
                익명 상담 챗봇
              </Link>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <span className="text-body-1 text-primary-500">실제 기관 연결</span>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-h1 font-bold text-black">실제 기관 연결</h1>
              <p className="text-body-1 text-gray-700">
                현재 피해 상황을 선택하면 관련 지원 기관을 바로 연결해 드립니다.
              </p>
            </div>
          </div>

          <div className="bg-primary-50 flex flex-col items-start justify-between gap-6 rounded-2xl p-6 sm:flex-row">
            <div className="flex flex-col gap-1">
              <p className="text-small text-gray-700">현재 피해 상황</p>
              <p className="text-h3 font-semibold text-black">{selected.label}</p>
              <p className="text-large text-gray-700">{selected.description}</p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-[280px]">
              <label className="text-large px-1 font-medium text-black">상황 변경</label>
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
            <p className="text-h3 px-1 font-semibold text-black">지원 기관</p>

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
