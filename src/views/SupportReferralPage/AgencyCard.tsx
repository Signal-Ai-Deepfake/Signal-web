import type { SupportReferral } from "@/entities/agency/model";
import Clock from "@/shared/asset/svg/Clock";
import HandHeart from "@/shared/asset/svg/HandHeart";
import Headset from "@/shared/asset/svg/Headset";
import Phone from "@/shared/asset/svg/Phone";

interface AgencyCardProps {
  referral: SupportReferral;
}

function extractDialNumber(phone: string) {
  const match = phone.match(/[\d-]+/);
  return match ? match[0].replace(/-/g, "") : phone;
}

export default function AgencyCard({ referral }: AgencyCardProps) {
  const {
    agencyName,
    agencyDescription,
    supportFields,
    operatingHours,
    consultMethod,
    phoneNumber,
    onlineUrl,
  } = referral;

  return (
    <div className="flex w-full flex-col gap-8 rounded-2xl border border-gray-300 bg-white p-8 lg:flex-row lg:justify-between">
      <div className="flex flex-col gap-3">
        <p className="text-h3 font-semibold text-black">{agencyName}</p>
        <p className="text-small text-gray-700">{agencyDescription}</p>
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-gray-700 [&>svg]:h-6 [&>svg]:w-6">
              <HandHeart />
            </span>
            <span className="text-large shrink-0 text-gray-700">지원 분야</span>
            <span className="text-small text-gray-700">{supportFields}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-gray-700 [&>svg]:h-5 [&>svg]:w-5">
              <Clock />
            </span>
            <span className="text-large shrink-0 text-gray-700">운영시간</span>
            <span className="text-small text-gray-700">{operatingHours}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-gray-700 [&>svg]:h-5 [&>svg]:w-5">
              <Headset />
            </span>
            <span className="text-large shrink-0 text-gray-700">상담 방법</span>
            <span className="text-small text-gray-700">{consultMethod}</span>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 border-t border-gray-300 pt-6 lg:w-[381px] lg:shrink-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
        {phoneNumber && (
          <div className="flex flex-col gap-1">
            <p className="text-caption text-gray-700">상담 전화</p>
            <p className="text-h3 text-primary-450 font-bold break-keep">{phoneNumber}</p>
          </div>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          {phoneNumber && (
            <a
              href={`tel:${extractDialNumber(phoneNumber)}`}
              className="border-primary-500 text-primary-500 text-large hover:bg-primary-50 flex flex-1 items-center justify-center gap-2 rounded border px-6 py-3 transition-colors"
            >
              <span className="[&>svg]:h-5 [&>svg]:w-5">
                <Phone />
              </span>
              전화 연결
            </a>
          )}
          {onlineUrl && (
            <a
              href={onlineUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-primary-500 text-large hover:bg-primary-400 flex flex-1 items-center justify-center rounded px-6 py-3 text-white transition-colors"
            >
              온라인 상담 이동
            </a>
          )}
        </div>
        <p className="text-caption text-center text-gray-700">
          전화 또는 기관 공식 페이지로 바로 연결됩니다.
        </p>
      </div>
    </div>
  );
}
