"use client";

import { useState } from "react";
import { createConnection, type AgencyResponse } from "@/entities/agency/api";
import Clock from "@/shared/asset/svg/Clock";
import HandHeart from "@/shared/asset/svg/HandHeart";
import Phone from "@/shared/asset/svg/Phone";

interface AgencyCardProps {
  agency: AgencyResponse;
}

function extractDialNumber(phone: string) {
  const match = phone.match(/[\d-]+/);
  return match ? match[0].replace(/-/g, "") : phone;
}

export default function AgencyCard({ agency }: AgencyCardProps) {
  const { agencyId, name, phone, website, availableHours, supportedActions } = agency;
  const [isConnecting, setIsConnecting] = useState(false);

  async function recordConnection(connectionType: "PHONE" | "WEB") {
    setIsConnecting(true);
    try {
      await createConnection(agencyId, { connectionType });
    } catch {
      // 연결 기록 실패는 사용자 흐름(전화 연결/사이트 이동)을 막지 않음
    } finally {
      setIsConnecting(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-8 rounded-2xl border border-gray-300 bg-white p-8 lg:flex-row lg:justify-between">
      <div className="flex flex-col gap-3">
        <p className="text-h3 font-semibold text-black">{name}</p>
        <div className="flex flex-col gap-2 pt-1">
          {availableHours && (
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-gray-700 [&>svg]:h-5 [&>svg]:w-5">
                <Clock />
              </span>
              <span className="text-large shrink-0 text-gray-700">운영시간</span>
              <span className="text-small text-gray-700">{availableHours}</span>
            </div>
          )}
          {supportedActions && supportedActions.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-gray-700 [&>svg]:h-6 [&>svg]:w-6">
                <HandHeart />
              </span>
              <span className="text-large shrink-0 text-gray-700">지원 항목</span>
              <span className="text-small text-gray-700">{supportedActions.join(" · ")}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 border-t border-gray-300 pt-6 lg:w-[381px] lg:shrink-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
        {phone && (
          <div className="flex flex-col gap-1">
            <p className="text-caption text-gray-700">상담 전화</p>
            <p className="text-h3 text-primary-450 font-bold break-keep">{phone}</p>
          </div>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          {phone && (
            <a
              href={`tel:${extractDialNumber(phone)}`}
              onClick={() => recordConnection("PHONE")}
              className="border-primary-500 text-primary-500 text-large hover:bg-primary-50 flex flex-1 items-center justify-center gap-2 rounded border px-6 py-3 transition-colors"
            >
              <span className="[&>svg]:h-5 [&>svg]:w-5">
                <Phone />
              </span>
              전화 연결
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              onClick={() => recordConnection("WEB")}
              className="bg-primary-500 text-large hover:bg-primary-400 flex flex-1 items-center justify-center rounded px-6 py-3 text-white transition-colors"
            >
              온라인 상담 이동
            </a>
          )}
        </div>
        {!phone && !website && (
          <p className="text-caption text-gray-700">등록된 연락처 정보가 없습니다.</p>
        )}
        {isConnecting && <p className="text-caption text-gray-700">연결 기록 중...</p>}
      </div>
    </div>
  );
}
