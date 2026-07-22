"use client";

import Link from "next/link";
import { useState } from "react";
import { supportReferrals } from "@/entities/agency/model";
import Arrow from "@/shared/asset/svg/Arrow";
import NoticeBanner from "@/shared/ui/NoticeBanner";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import AgencyCard from "./AgencyCard";
import SituationSelect from "./SituationSelect";

export default function SupportReferralPage() {
  const [selectedKey, setSelectedKey] = useState(supportReferrals[0].key);
  const selected =
    supportReferrals.find((referral) => referral.key === selectedKey) ?? supportReferrals[0];

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
                현재 피해 상황을 선택하면 가장 적합한 전문 기관과 바로 연결해 드립니다.
              </p>
            </div>
          </div>

          <div className="bg-primary-50 flex flex-col items-start justify-between gap-6 rounded-2xl p-6 sm:flex-row">
            <div className="flex flex-col gap-1">
              <p className="text-small text-gray-700">현재 피해 상황</p>
              <p className="text-h3 font-semibold text-black">{selected.situationLabel}</p>
              <p className="text-large text-gray-700">{selected.situationDescription}</p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-[280px] sm:shrink-0">
              <label className="text-large px-1 font-medium text-black">상황 변경</label>
              <SituationSelect
                referrals={supportReferrals}
                selectedKey={selectedKey}
                onSelect={setSelectedKey}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
              <div className="flex flex-col gap-2">
                <span className="bg-primary-50 text-primary-450 text-caption w-fit rounded-full px-3 py-1">
                  AI 맞춤 추천
                </span>
                <p className="text-h3 px-1 font-semibold text-black">
                  현재 상황에 가장 적합한 기관
                </p>
              </div>
              <p className="text-small px-1 text-gray-700">
                선택한 상황에 따라 자동으로 변경됩니다.
              </p>
            </div>
            <AgencyCard referral={selected} />
          </div>

          <NoticeBanner className="w-full">{selected.noticeMessage}</NoticeBanner>
        </div>
      </main>
      <Footer />
    </>
  );
}
